import { redirect, RedirectType } from "next/navigation"

import { DevPage } from "@/app/devPage"
import { inDevEnvironment } from "@/lib/envs"

export const metadata = {
  title: "Homepage",
  description: "Main page of the website.",
}

export default async function HomePage() {
  if (inDevEnvironment) return <DevPage />
  else redirect("/members", RedirectType.replace)
}
