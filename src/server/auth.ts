import { PrismaAdapter } from "@auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth"
import { type Adapter } from "next-auth/adapters"
import DiscordProvider from "next-auth/providers/discord"
import EmailProvider from "next-auth/providers/email"

import { env } from "@/env"
import { inDevEnvironment } from "@/lib/envs"
import { db } from "@/services/db"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"]
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const emailProvider = EmailProvider({
  from: env.EMAIL_FROM,
  server: {
    auth: {
      pass: env.EMAIL_SERVER_PASSWORD,
      user: env.EMAIL_SERVER_USER,
    },
    host: env.EMAIL_SERVER_HOST,
    port: env.EMAIL_SERVER_PORT,
  },
})

const providers = [
  {
    ...emailProvider,
    async sendVerificationRequest(params) {
      if (inDevEnvironment) {
        console.log("\nRequested a magic link, signin with url:", params.url)
      } else {
        return emailProvider.sendVerificationRequest(params)
      }
    },
  },
]

if (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET) {
  providers.push(
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  )
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
  },
  providers: providers,
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
