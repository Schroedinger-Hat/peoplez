import "@/styles/globals.css"

import { Inter } from "next/font/google"

import NextAuthProvider from "@/context/NextAuthProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const BASIC_METADATA = {
  NAME: "Peoplez",
  DESCRIPTION:
    "Peoplez is an open-source, self-hosted organisation management software that allows you to manage basic needs of your nonprofit organisation",
  URL: "https://peoplez.schroedinger-hat.org",
}

export const metadata = {
  title: { default: "Homepage", template: `%s | ${BASIC_METADATA.NAME}` },
  description: BASIC_METADATA.DESCRIPTION,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    // images: "Needs to be added"
    description: BASIC_METADATA.DESCRIPTION,
    siteName: BASIC_METADATA.NAME,
    title: BASIC_METADATA.NAME,
    type: "website",
    url: BASIC_METADATA.URL,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@schrodinger_hat",
    description: BASIC_METADATA.DESCRIPTION,
    site: BASIC_METADATA.URL,
    // images: {
    //   url: "http://needs-to-be-added.png",
    //   alt: "Schroedinger Hat Logo",
    // },
  },
}

interface LayoutInterface {
  children: React.ReactNode
}

export default async function RootLayout({ children }: LayoutInterface) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
