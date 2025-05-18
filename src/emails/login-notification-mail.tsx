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

export interface LoginNotificationMailProps extends BaseEmailProps {
  loginInfo: {
    date: Date
    device: string
    location: string
    ip: string
  }
  supportLink?: string
}

export const LoginNotificationMail = ({
  user,
  loginInfo,
  supportLink = "https://example.com/support",
}: LoginNotificationMailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(loginInfo.date)

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Recent login to your account</Preview>
        <Container style={container}>
          <Section>
            <Text style={heading}>
              Hi {user?.name?.split(" ")?.[0]?.trim() ?? "there"},
            </Text>
            <Text style={subheading}>
              We noticed a recent login to your account.
            </Text>
            <Text style={text}>
              <strong>Time: </strong>
              {formattedDate}
            </Text>
            <Text style={text}>
              <strong>Device: </strong>
              {loginInfo.device}
            </Text>
            <Text style={text}>
              <strong>Location: </strong>
              {loginInfo.location}
            </Text>
            <Text style={note}>
              *Approximate geographic location based on IP address:{" "}
              {loginInfo.ip}
            </Text>
            <Text style={text}>
              If this was you, there&apos;s nothing else you need to do.
            </Text>
            <Text style={text}>
              If this wasn&apos;t you or if you have additional questions,
              please visit our support page for assistance.
            </Text>
            <Button style={button} href={supportLink}>
              Go to Support
            </Button>
            <Text style={securityNote}>
              To keep your account secure, please don&apos;t forward this email
              to anyone.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

LoginNotificationMail.PreviewProps = {
  user: {
    id: "123",
    name: "Jane Smith",
    email: "jane@example.com",
    emailVerified: true,
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date("2022-01-01"),
  },
  loginInfo: {
    date: new Date("May 17, 2025, 3:14 pm"),
    device: "Chrome on Windows 11",
    location: "San Francisco, California, United States",
    ip: "192.168.1.1",
  },
  supportLink: "https://example.com/support",
} as LoginNotificationMailProps

export default LoginNotificationMail

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
}

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
}

const heading = {
  fontSize: "22px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "600",
  color: "#171717",
  lineHeight: "32px",
  marginBottom: "20px",
}

const subheading = {
  fontSize: "18px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "600",
  color: "#171717",
  lineHeight: "26px",
  marginBottom: "20px",
}

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
}

const note = {
  fontSize: "14px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#606060",
  lineHeight: "22px",
  marginBottom: "20px",
}

const securityNote = {
  fontSize: "14px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#606060",
  lineHeight: "22px",
  marginTop: "30px",
  fontStyle: "italic",
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
  marginTop: "25px",
}
