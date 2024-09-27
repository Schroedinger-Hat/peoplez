import Stripe from "stripe"

import { env } from "@/env"

let _stripe: Stripe

const stripe = () => {
  if (!_stripe)
    _stripe = new Stripe(env.STRIPE_PRIVATE_KEY, {
      apiVersion: "2023-10-16",
    })

  return _stripe
}

export { stripe }
