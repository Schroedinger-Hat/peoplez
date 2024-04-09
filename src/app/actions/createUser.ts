"use server";

import { db } from "@/services/db";

export async function createUser(prevState: any, formData: FormData) {
  const user = await db.user.findFirst({
    where: {
      email: formData.email,
    },
  });

  if (user) {
    return {
      status: "error",
      message: "User already exist",
    };
  }

  const newUser = await db.user.create({
    data: {
      email: formData.email,
      name: "Davide Imola",
    },
  });

  await db.membership.create({
    data: {
      userId: newUser.id,
      status: "PENDING",
      stripeSubscriptionId: "xxx",
    },
  });

  return {
    status: "success",
    message: `Welcome, ${formData.email}`,
  };
}
