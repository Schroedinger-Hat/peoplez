import {type NextApiRequest, NextApiResponse} from "next";
import {stripe} from "@/server/stripe";
import {env} from "@/env";
import {NextResponse} from "next/server";

export async function POST(req: NextApiRequest) {
  const prices = await stripe.prices.list({
    expand: ["data.product"],
    lookup_keys: [env.STRIPE_PRICES_LOOKUP_KEY]
  })

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    payment_method_types: ["card"],
    line_items: prices.data.map((price) => ({
      price: price.id,
      quantity: 1,
    })),
    mode: "subscription",
    success_url: `${env.NEXTAUTH_URL}/me`,
    cancel_url: `${env.NEXTAUTH_URL}/me`,
  });

  if (!session.url) {
    return NextResponse.json({}, {status: 404});
  }

  return NextResponse.redirect(session.url, 303);
}
