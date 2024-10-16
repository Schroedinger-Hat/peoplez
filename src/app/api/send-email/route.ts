// src/app/api/send-email/route.ts
import { NextResponse } from "next/server"
import { mailer } from "@/services/nodemailer"
import { confirmationEmail } from "@/emails/renders/membershipConfirmedEmailRender"

export async function POST() {
  try {
    const response = await mailer().sendMail({
      from: "noreply@schrodinger-hat.org", // TODO: needs to be updated
      to: "email@gmail.com", // TODO: needs to be updated
      subject:
        "Welcome to the Open Source community! Welcome to Schroedinger Hat",
      html: confirmationEmail,
    })

    console.log("Email sent response:", response)

    return NextResponse.json({ message: "Email sent successfully!" })
  } catch (error) {
    console.error("Error sending email:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: "Failed to send email", details: errorMessage },
      { status: 500 },
    )
  }
}
