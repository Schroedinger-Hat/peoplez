"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const CONFIRMATION_EMAIL = `confirmation`
const APPROVED_EMAIL = `approved`
const REJECTED_EMAIL = `rejected`

const EmailsPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const sendEmail = async (type: string) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`/api/send-email?type=${type}`, {
        method: "POST",
      })

      if (response.ok) {
        setSuccess("Email sent successfully!")
      } else {
        throw new Error("Failed to send email")
      }
    } catch (err) {
      setError("There was an error sending the email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full">
      <Button onClick={() => sendEmail(CONFIRMATION_EMAIL)}>
        {loading ? "Sending..." : "Send Confirmation Email"}
      </Button>
      <Button onClick={() => sendEmail(APPROVED_EMAIL)}>
        {loading ? "Sending..." : "Send Approved Email"}
      </Button>
      <Button onClick={() => sendEmail(REJECTED_EMAIL)}>
        {loading ? "Sending..." : "Send Rejected Email"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {children}
    </div>
  )
}

export default EmailsPage
