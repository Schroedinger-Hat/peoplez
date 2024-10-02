"use server"

import { type ServerActionState, ServerActionStatus } from "@/app/actions/types"
import { db } from "@/services/db"
import { PricePeriod, type PriceUnit } from "@prisma/client"

export interface FormProps {
  id: string
  title: string
  description?: string
  features?: string
  priceAmount: number
  priceUnit: PriceUnit
  stripePriceId: string
}

export async function editMembershipTemplate(
  prevState: ServerActionState,
  data: FormProps,
): Promise<ServerActionState> {
  // Query to create user
  const membershipTemplate = await db.membershipTemplate.update({
    where: {
      id: data.id,
    },
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
      updatedAt: new Date(),
    },
  })

  return {
    status: ServerActionStatus.Success,
    payload: membershipTemplate,
  }
}
