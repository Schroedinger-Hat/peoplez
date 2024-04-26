import Stripe from "stripe"
import { stripe } from "@/services/stripe"
import { env } from "@/env"
import pino from "pino"
import { getLogger } from "@/logging/log-util"
import { db } from "@/services/db"
import { MembershipStatus } from "@prisma/client"

const logger = getLogger("stripe-webhook")

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Subscription

  if (event.type === "customer.subscription.updated") {
    return await updateSubscription(session)
  }

  if (event.type === "customer.subscription.deleted") {
    return await cancelSubscription(session)
  }

  return new Response(`Nothing to do: ${event.type}`, { status: 200 })
}

async function cancelSubscription(
  subscription: Stripe.Subscription,
): Promise<Response> {
  logger.info(`Subscription canceled: ${subscription.id}`)
  let membership = await db.membership.findUnique({
    where: {
      stripeSubscriptionId: subscription.id,
    },
  })
  if (!membership) {
    logger.warn(`Membership not found for subscription: ${subscription.id}`)
    return new Response(`No membership found`, { status: 404 })
  }

  await db.membership.update({
    where: {
      id: membership.id,
    },
    data: {
      status: "EXPIRED",
    },
  })

  return new Response(`Subscription updated`, { status: 200 })
}

async function updateSubscription(
  subscription: Stripe.Subscription,
): Promise<Response> {
  logger.info(`Subscription updated: ${subscription.id}`)

  if (subscription.status !== "active") {
    logger.info(`Subscription is not active: ${subscription.id}`)
  }

  let membership = await db.membership.findUnique({
    where: {
      stripeSubscriptionId: subscription.id,
    },
  })
  if (!membership) {
    logger.warn(`Membership not found for subscription: ${subscription.id}`)
    return new Response(`No membership found`, { status: 404 })
  }

  try {
    await db.membership.update({
      where: {
        id: membership.id,
      },
      data: {
        status: getNextStatusGivenCurrentStatus(membership.status),
        lastPaymentAt: new Date(subscription.current_period_start),
        expiresAt: new Date(subscription.current_period_end),
      },
    })
  } catch (error: any) {
    logger.error(`Error updating subscription: ${error.message}`)
    return new Response(`Error updating subscription`, { status: 500 })
  }

  return new Response(`Subscription updated`, { status: 200 })
}

function getNextStatusGivenCurrentStatus(
  currentStatus: MembershipStatus,
): MembershipStatus {
  if (
    currentStatus === MembershipStatus.PENDING ||
    currentStatus === MembershipStatus.WAITING
  ) {
    return MembershipStatus.WAITING
  }

  if (currentStatus === MembershipStatus.ACTIVE) {
    return MembershipStatus.ACTIVE
  }

  throw new Error(`Unexpected status: ${currentStatus}`)
}
