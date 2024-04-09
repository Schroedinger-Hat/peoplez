"use server";

import { db } from "@/services/db";

export async function sendMagicLink(prevState: any, formData: FormData) {
  const user = await db.user.findFirst({
    where: {
      email: formData.email,
    },
  });

  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }

  return {
    status: "success",
    message: `Welcome, ${formData.email}`,
  };
}
