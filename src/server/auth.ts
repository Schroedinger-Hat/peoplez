import { PrismaAdapter } from "@auth/prisma-adapter"
import { getServerSession, type NextAuthOptions } from "next-auth"
import { type Adapter } from "next-auth/adapters"
import EmailProvider, {
  type SendVerificationRequestParams,
} from "next-auth/providers/email"
import { env } from "@/env"
import { inDevEnvironment } from "@/lib/envs"
import { db } from "@/services/db"
import { type Provider } from "next-auth/providers/index"

const providers: Provider[] = []

if (env.EMAIL_SERVER_HOST) {
  const emailProvider = EmailProvider({
    from: env.EMAIL_FROM,
    server: {
      auth: {
        pass: env.EMAIL_SERVER_PASSWORD,
        user: env.EMAIL_SERVER_USER,
      },
      host: env.EMAIL_SERVER_HOST,
      port: Number(env.EMAIL_SERVER_PORT),
    },
  })

  providers.push({
    ...emailProvider,
    async sendVerificationRequest(params: SendVerificationRequestParams) {
      if (inDevEnvironment) {
        console.log("\nRequested a magic link, signin with url:", params.url)
      }
      return emailProvider.sendVerificationRequest(params)
    },
  })
} else {
  console.warn(
    "Email server not configured, login and emails will not be available.",
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
