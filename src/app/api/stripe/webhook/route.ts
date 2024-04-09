import { type NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/services/stripe";
import type Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const endpointSecret = "";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    console.log(`⚠️  Webhook signature missing.`);
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }
  let event: Stripe.Event;

  const requestBody = await req.text();
  try {
    event = stripe.webhooks.constructEvent(
      requestBody,
      signature,
      endpointSecret,
    );
  } catch (err: any) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  switch (event.type) {
    case "customer.subscription.created":
      console.log(`💰 Subscription created!`);
      break;
    case "customer.subscription.deleted":
      console.log(`💔 Subscription deleted.`);
      break;
    case "customer.subscription.updated":
      console.log(`🔄 Subscription updated.`);
      break;
    default:
      console.log(`❌ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
