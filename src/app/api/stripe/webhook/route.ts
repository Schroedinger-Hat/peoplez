import {type NextApiRequest, NextApiResponse} from "next";
import {stripe} from "@/server/stripe";
import type Stripe from "stripe";
import {NextResponse} from "next/server";

const endpointSecret = "";

export async function POST(req: NextApiRequest) {
  const signature = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecret
    );
  } catch (err: any) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }

  switch (event.type) {
    case 'customer.subscription.created':
      console.log(`💰 Subscription created!`);
      break;
    case 'customer.subscription.deleted':
      console.log(`💔 Subscription deleted.`);
      break;
    case 'customer.subscription.updated':
      console.log(`🔄 Subscription updated.`);
      break;
    case 'customer.subscription.paused':
      console.log(`⏸ Subscription paused.`);
      break;
    case 'customer.subscription.resumed':
      console.log(`▶️ Subscription resumed.`);
      break;
    default:
      console.log(`❌ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({received: true}, {status: 200})
}
