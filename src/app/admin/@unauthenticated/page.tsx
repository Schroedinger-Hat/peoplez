"use client"

import { LoginForm } from "@/app/shared/login/form"
import { Target } from "@/app/shared/login/types"

export default function AdminLogin() {
  return (
    <main className="flex h-screen items-center justify-center bg-zinc-900">
      <div>
        <LoginForm
          target={Target.AdminPortal}
          description={
            "Enter your email below, we're going to send you a magic link"
          }
        />
      </div>
    </main>
  )
}
