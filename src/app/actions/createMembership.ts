"use server"

import { MembershipStatus } from "@prisma/client"

import { type ServerActionState, ServerActionStatus } from "@/app/actions/types"
import { db } from "@/services/db"
import { canUseStripe, stripe } from "@/services/stripe"

const MEMBERSHIP_PRICE_ID = "price_1P3HNlCXdJySzBrwlcoAQqS2" // TODO: Remove the hardcoded price ID

export interface FormProps {
  email: string
  firstName: string
  lastName: string
  socialSecurityNumber: string
  membershipTemplateId: string
}

export async function createMembership(
  prevState: ServerActionState,
  data: FormProps,
): Promise<ServerActionState> {
  if (!canUseStripe()) {
    return {
      errors: [
        {
          message: "Stripe is not configured",
        },
      ],
      status: ServerActionStatus.Error,
    }
  }
  // Avoid double membership creation
  if (prevState.nextStep === "providePayment") return prevState

  // Fetch membershipTemplate
  const membershipTemplate = await db.membershipTemplate.findUnique({
    where: {
      id: data.membershipTemplateId,
    },
  })

  // No template, return error
  if (!membershipTemplate) {
    return {
      errors: [
        {
          message: "Membership template not found",
        },
      ],
      status: ServerActionStatus.Error,
    }
  }

  // Check for user
  let user = await db.user.findFirst({
    where: {
      email: data.email,
    },
  })

  // No User found, creates it
  if (!user) {
    // Query to create user
    user = await db.user.create({
      data: {
        email: data.email,
        emailVerified: new Date(),
        name: `${data.firstName} ${data.lastName}`.trim(),
      },
    })
  }

  // User is not linked to Stripe, creates it
  if (!user.stripeCustomerId) {
    // Create customer to Stripe and link it to user
    const stripeCustomer = await stripe().customers.create({
      email: data.email,
      name: `${data.firstName} ${data.lastName}`.trim(),
    })

    user.stripeCustomerId = stripeCustomer.id
    await db.user.update({
      data: { stripeCustomerId: stripeCustomer.id },
      where: { id: user.id },
    })
  }

  // Lookup for membership
  let membership = await db.membership.findFirst({
    where: {
      status: {
        not: MembershipStatus.PENDING,
      },
      userId: user.id,
    },
  })

  // Membership already exists, block creation
  if (membership) {
    return {
      errors: [
        {
          message: "Membership already exists",
        },
      ],
      status: ServerActionStatus.Error,
    }
  }

  // Creates membership
  membership = await db.membership.create({
    data: {
      socialSecurityNumber: data.socialSecurityNumber,
      status: MembershipStatus.PENDING,
      userId: user.id,
      membershipTemplateId: membershipTemplate.id,
    },
  })

  // Create Stripe subscription
  const stripeSubscription = await stripe().subscriptions.create({
    customer: user.stripeCustomerId,
    expand: ["latest_invoice.payment_intent"],
    items: [
      {
        price: MEMBERSHIP_PRICE_ID,
      },
    ],
    payment_behavior: "default_incomplete",
    payment_settings: {
      payment_method_types: ["card", "link", "paypal", "sepa_debit"],
    },
  })

  // Update membership
  membership.stripeSubscriptionId = stripeSubscription.id
  await db.membership.update({
    data: { stripeSubscriptionId: stripeSubscription.id },
    where: { id: membership.id },
  })

  // Return secret to client to finalize payment
  return {
    nextStep: "providePayment",
    payload: {
      // eslint-disable-next-line
      clientSecret: (stripeSubscription?.latest_invoice as any)?.payment_intent
        ?.client_secret,
      membershipId: membership.id,
    },
    status: ServerActionStatus.Success,
  }
}
