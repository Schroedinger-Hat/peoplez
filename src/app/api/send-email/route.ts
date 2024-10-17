// src/app/api/send-email/route.ts
import { NextResponse } from "next/server"
import { mailer } from "@/services/nodemailer"
import { confirmationEmail } from "@/emails/renders/membershipConfirmedEmailRender"
import { approvedEmail } from "@/emails/renders/membershipApprovedEmail"
import { rejectedEmail } from "@/emails/renders/membershipRejectedEmail"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  if (!type) {
    return NextResponse.json(
      { error: "Missing 'type' query parameter" },
      { status: 400 },
    )
  }

  try {
    let response
    switch (type) {
      case "confirmation":
        response = await sendConfirmationEmail()
        break
      case "approved":
        response = await sendApprovedEmail()
        break
      case "rejected":
        response = await sendRejectionEmail()
        break
      default:
        return NextResponse.json(
          { error: "Invalid 'type' query parameter" },
          { status: 400 },
        )
    }

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

const sendConfirmationEmail = async () => {
  return mailer().sendMail({
    from: "noreply@schroedinger-hat.org", // TODO: needs to be updated
    to: "email@gmail.com", // TODO: needs to be updated
    subject:
      "Welcome to the Open Source community! Welcome to Schroedinger Hat",
    html: confirmationEmail,
  })
}

const sendRejectionEmail = async () => {
  return mailer().sendMail({
    from: "noreply@schroedinger-hat.org", // TODO: needs to be updated
    to: "email@gmail.com", // TODO: needs to be updated
    subject:
      "Welcome to the Open Source community! Welcome to Schroedinger Hat",
    html: rejectedEmail,
  })
}

const sendApprovedEmail = async () => {
  return mailer().sendMail({
    from: "noreply@schroedinger-hat.org", // TODO: needs to be updated
    to: "email@gmail.com", // TODO: needs to be updated
    subject:
      "Welcome to the Open Source community! Welcome to Schroedinger Hat",
    html: approvedEmail,
  })
}
