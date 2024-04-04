import {env} from "@/env";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2023-10-16",
});

export {stripe};
