import { render } from "@react-email/components"
import type { User } from "better-auth/types"

import { tryCatch } from "@/lib/try-catch"

import {
  ChangeEmailMail,
  type ChangeEmailMailProps,
} from "@/emails/change-email-mail"
import {
  LoginNotificationMail,
  type LoginNotificationMailProps,
} from "@/emails/login-notification-mail"
import {
  ResetPasswordMail,
  type ResetPasswordMailProps,
} from "@/emails/reset-password-mail"
import {
  VerifyEmailMail,
  type VerifyEmailMailProps,
} from "@/emails/verify-email-mail"

import { sendEmail } from "./mailer"

export interface BaseEmailProps {
  user: User
}

export type EmailTemplate =
  | { type: "LOGIN"; props: LoginNotificationMailProps }
  | { type: "CHANGE_EMAIL"; props: ChangeEmailMailProps }
  | { type: "RESET_PASSWORD"; props: ResetPasswordMailProps }
  | { type: "VERIFY_EMAIL"; props: VerifyEmailMailProps }

// Define email configurations
export const EMAIL_CONFIG = {
  LOGIN: {
    subject: "Recent login to your account",
    logPrefix: "New sign in",
    template: (props: LoginNotificationMailProps) => (
      <LoginNotificationMail {...props} />
    ),
  },
  CHANGE_EMAIL: {
    subject: "Verify change of email address",
    logPrefix: "Change email verification",
    template: (props: ChangeEmailMailProps) => <ChangeEmailMail {...props} />,
  },
  RESET_PASSWORD: {
    subject: "Reset your password",
    logPrefix: "Reset password",
    template: (props: ResetPasswordMailProps) => (
      <ResetPasswordMail {...props} />
    ),
  },
  VERIFY_EMAIL: {
    subject: "Verify your email address",
    logPrefix: "Verification",
    template: (props: VerifyEmailMailProps) => <VerifyEmailMail {...props} />,
  },
}

export async function sendNotification<T extends EmailTemplate["type"]>(
  type: T,
  props: Extract<EmailTemplate, { type: T }>["props"]
) {
  const config = EMAIL_CONFIG[type]
  const template = config.template
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  const emailHtml = await render(template(props as any))

  // All props include a user with an email
  const to = props.user.email

  const { data, error } = await tryCatch(
    sendEmail({
      to,
      subject: config.subject,
      html: emailHtml,
    })
  )

  if (error) {
    console.error(`[AUTH] Error sending ${config.logPrefix} email:`, error)
    return { success: false, error }
  } else {
    console.log(`[AUTH] ${config.logPrefix} email sent`, data)
    return { success: true, data }
  }
}
