import nodemailer, { type Transporter } from "nodemailer"
import { env } from "@/env"
import type SMTPTransport from "nodemailer/lib/smtp-transport"

let _nodemailer: Transporter | undefined

export const canUseEmail = (): boolean =>
  !!env.EMAIL_SERVER_HOST && !!env.EMAIL_SERVER_PORT

const mailer = (): Transporter => {
  if (!_nodemailer) {
    if (!canUseEmail()) {
      throw new Error("Mail server is not configured")
    }

    _nodemailer = nodemailer.createTransport({
      auth: {
        pass: env.EMAIL_SERVER_PASSWORD,
        user: env.EMAIL_SERVER_USER,
      },
      host: env.EMAIL_SERVER_HOST,
      port: env.EMAIL_SERVER_PORT,
      secure: true,
    } as SMTPTransport.Options) as Transporter
  }

  return _nodemailer
}

export { mailer }
