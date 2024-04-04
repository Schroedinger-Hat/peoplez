import nodemailer from "nodemailer";
import { env } from "@/env";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_SERVER_HOST,
  port: env.EMAIL_SERVER_PORT,
  secure: true,
  auth: {
    user: env.EMAIL_SERVER_USER,
    pass: env.EMAIL_SERVER_PASSWORD,
  },
});

export { transporter };
