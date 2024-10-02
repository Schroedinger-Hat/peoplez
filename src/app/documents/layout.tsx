import Image from "next/image"
import Link from "next/link"

import logo from "@/images/logo-white.svg"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div
        className={"flex items-center justify-between bg-zinc-900 px-8 py-4"}
      >
        <div className={"flex items-center"}>
          <Image src={logo} alt={"logo"} width={42} className={"mr-4"} />
          <span className={"inline text-sm font-bold text-gray-200"}>
            {"MARKETING_NAME"}
          </span>
        </div>
        <div>
          <Link href={"/"} className={"inline text-sm text-gray-200"}>
            Back
          </Link>
        </div>
      </div>
      <div className="container py-16 sm:px-8 md:px-8 lg:w-3/4">{children}</div>
      <footer></footer>
    </>
  )
}
