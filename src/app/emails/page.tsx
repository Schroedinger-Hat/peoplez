"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const EmailsPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const sendEmail = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
      })

      console.log(response)

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
      <Button onClick={sendEmail}>
        {loading ? "Sending..." : "Send Confirmation Email"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {children}
    </div>
  )
}

export default EmailsPage
