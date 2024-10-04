"use server"

import { MembershipStatus } from "@prisma/client"
import { db } from "@/services/db"

import { Target } from "@/app/shared/login/types"

export interface ServerActionState {
  checked: boolean
  valid: boolean
  email?: string
}

interface FormProps {
  email: string
  target: string
}

export async function validateUserEmail(
  prevState: ServerActionState,
  data: FormProps,
) {
  console.log(data)

  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  })

  // No user means that is not valid
  if (!user)
    return {
      checked: true,
      valid: false,
    }

  // No need for further checks if the target is the admin portal
  if (data.target === (Target.AdminPortal as string)) {
    return {
      checked: true,
      email: data.email,
      valid: true,
    }
  }

  // User without membership means that is not valid
  const membership = await db.membership.findFirst({
    where: {
      status: {
        not: MembershipStatus.PENDING,
      },
      userId: user.id,
    },
  })
  if (!membership)
    return {
      checked: true,
      valid: false,
    }

  return {
    checked: true,
    email: data.email,
    valid: true,
  }
}
