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

export interface VerifyEmailMailProps extends BaseEmailProps {
  verifyEmailLink?: string
}

export const VerifyEmailMail = ({
  user,
  verifyEmailLink,
}: VerifyEmailMailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Verify your email address</Preview>
        <Container style={container}>
          <Section>
            <Text style={text}>
              Hi {user?.name?.split(" ")?.[0]?.trim() ?? "there"},
            </Text>
            <Text style={text}>
              Please verify your email address by clicking the button below:
            </Text>
            <Button style={button} href={verifyEmailLink}>
              Verify Email
            </Button>
            <Text style={text}>
              If you didn&apos;t sign up for this account, you can safely ignore
              this email.
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

VerifyEmailMail.PreviewProps = {
  user: {
    name: "Alan",
  },
  verifyEmailLink: "https://example.com/verify-email", // Example link
} as VerifyEmailMailProps

export default VerifyEmailMail

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
