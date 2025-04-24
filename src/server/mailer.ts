import nodemailer from "nodemailer"
import type Mail from "nodemailer/lib/mailer"

import { tryCatch } from "@/lib/try-catch"

import { env } from "@/env"

export const sendEmail = async (mailOptions: Mail.Options) => {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: false, // Set to false for local SMTP servers like Mailpit that don't support TLS
    // `true` would imply implicit TLS wrapper, usually on port 465.
    // Nodemailer will automatically attempt STARTTLS on port 587 if `secure: false`.
    requireTLS: false, // Don't require TLS for local testing
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASSWORD,
    },
    logger: process.env.NODE_ENV === "development",
  })

  if (!transporter) {
    throw new Error(
      "Email transporter is not initialized. Check configuration and logs."
    )
  }
  if (!env.EMAIL_FROM_ADDRESS) {
    throw new Error(
      "Default FROM address is not configured. Check MAIL_FROM_ADDRESS env var."
    )
  }

  const { data, error } = await tryCatch(
    transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from ?? env.EMAIL_FROM_ADDRESS,
    })
  )

  if (error) {
    console.error("Error sending email:", error)
    throw error // Re-throw the error to be handled by the caller
  }

  console.log("Message sent: %s", data.messageId)
  return data
}
