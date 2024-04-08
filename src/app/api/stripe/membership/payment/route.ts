import { type NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/server/stripe";
import { env } from "@/env";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/server/db";
import { authOptions } from "@/server/auth";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const serverSession = await getServerSession(authOptions);
  if (!serverSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const membership = await db.membership.findFirst({
    where: {
      userId: serverSession.user.id,
      status: "PENDING",
    },
  });

  if (!membership) {
    return NextResponse.json(
      { message: "Membership not found" },
      { status: 404 },
    );
  }

  const prices = await stripe.prices.list({
    expand: ["data.product"],
    lookup_keys: [env.STRIPE_PRICES_LOOKUP_KEY],
  });

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    line_items: prices.data.map((price) => ({
      price: price.id,
      quantity: 1,
    })),
    mode: "subscription",
    success_url: `${env.NEXTAUTH_URL}/me`,
    cancel_url: `${env.NEXTAUTH_URL}/me`,
    customer_email: serverSession.user.email,
  });
  if (!session.url) {
    return NextResponse.json({}, { status: 404 });
  }

  await db.membership.updateMany({
    where: {
      id: membership.id,
    },
    data: {
      stripeSubscriptionId: session.id,
    },
  });

  return NextResponse.redirect(session.url, 303);
}
