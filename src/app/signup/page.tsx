import SignupForm from "@/app/signup/form"
import { db } from "@/services/db"

export const metadata = {
  title: "Sign Up",
  description: "Sign up for a membership",
}

function getData() {
  return db.membershipTemplate.findMany({
    orderBy: [
      {
        priceAmount: "asc",
      },
    ],
  })
}

export default async function SignupPage() {
  const membershipTemplates = await getData()

  return (
    <>
      <SignupForm membershipTemplates={membershipTemplates} />
    </>
  )
}
