"use client"

import { signOut } from "next-auth/react"

export function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className={
        "flex rounded-md bg-red-600 px-5 py-3 text-gray-100 hover:bg-red-600/80"
      }
    >
      <span className={"text-sm font-semibold"}>Logout</span>
    </button>
  )
}
