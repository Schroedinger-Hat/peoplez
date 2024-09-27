import nodemailer from "nodemailer"

import { env } from "@/env"

const transporter = nodemailer.createTransport({
  auth: {
    pass: env.EMAIL_SERVER_PASSWORD,
    user: env.EMAIL_SERVER_USER,
  },
  host: env.EMAIL_SERVER_HOST,
  port: env.EMAIL_SERVER_PORT,
  secure: true,
})

export { transporter }
