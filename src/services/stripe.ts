import Stripe from "stripe"
import { env } from "@/env"

let _stripe: Stripe

export const canUseStripe = (): boolean => !!env.STRIPE_PRIVATE_KEY

const stripe = () => {
  if (!_stripe) {
    if (!canUseStripe()) {
      throw new Error("Stripe is not configured")
    }
    _stripe = new Stripe(env.STRIPE_PRIVATE_KEY!, { apiVersion: "2023-10-16" })
  }

  return _stripe
}

export { stripe }
