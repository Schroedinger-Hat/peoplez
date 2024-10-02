"use server"

import { type ServerActionState, ServerActionStatus } from "@/app/actions/types"
import { db } from "@/services/db"
import { PricePeriod, type PriceUnit } from "@prisma/client"

export interface FormProps {
  title: string
  description?: string
  features?: string
  priceAmount: number
  priceUnit: PriceUnit
  stripePriceId: string
}

export async function createMembershipTemplate(
  prevState: ServerActionState,
  data: FormProps,
): Promise<ServerActionState> {
  // Query to create user
  const membershipTemplate = await db.membershipTemplate.create({
    data: {
      title: data.title,
      description: data.description,
      features: data.features?.length
        ? data.features.split(",").filter(Boolean)
        : [],
      priceAmount: data.priceAmount * 100,
      priceUnit: data.priceUnit,
      pricePeriod: PricePeriod.Yearly,
      stripePriceId: data.stripePriceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  return {
    status: ServerActionStatus.Success,
    payload: membershipTemplate,
  }
}
