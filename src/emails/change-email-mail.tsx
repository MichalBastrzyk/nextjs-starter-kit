import * as React from "react"

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

import type { BaseEmailProps } from "@/server/notifications"

export interface ChangeEmailMailProps extends BaseEmailProps {
  newEmail: string
  verifyEmailLink?: string
}

export const ChangeEmailMail = ({
  user,
  newEmail,
  verifyEmailLink,
}: ChangeEmailMailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Confirm your new email address</Preview>
        <Container style={container}>
          <Section>
            <Text style={text}>
              Hi {user?.name?.split(" ")?.[0]?.trim() ?? "there"},
            </Text>
            <Text style={text}>
              We received a request to change your email address from{" "}
              {user?.email} to {newEmail}.
            </Text>
            <Text style={text}>
              Please confirm this change by clicking the button below:
            </Text>
            <Button style={button} href={verifyEmailLink}>
              Confirm Email Change
            </Button>
            <Text style={text}>
              We&apos;ll send you a new verification email to your new email
              address.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ChangeEmailMail.PreviewProps = {
  user: {
    name: "Alan",
    email: "old@example.com",
  },
  newEmail: "new@example.com",
  verifyEmailLink: "https://example.com/verify-email-change", // Example link
} as ChangeEmailMailProps

export default ChangeEmailMail

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
}

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
}

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
}

const button = {
  backgroundColor: "#171717",
  borderRadius: "10px",
  color: "#fafafa",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
}
