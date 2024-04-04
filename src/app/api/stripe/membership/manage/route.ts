import {type NextApiRequest, NextApiResponse} from "next";
import {stripe} from "@/server/stripe";
import {env} from "@/env";
import {NextResponse} from "next/server";

export async function POST(req: NextApiRequest) {
  const checkoutSession = await stripe.checkout.sessions.retrieve("xxx");

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer as string,
    return_url: `${env.NEXTAUTH_URL}/me`,
  });

  return NextResponse.redirect(portalSession.url, 303);
}