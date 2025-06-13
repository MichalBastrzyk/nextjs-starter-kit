import { notFound } from "next/navigation"

import { getCurrentSession } from "@/lib/auth-server"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { EMAIL_CONFIG, sendNotification } from "@/server/notifications"

import { env } from "@/env"

async function serverAction(form: FormData) {
  "use server"
  const type = form.get("type") as keyof typeof EMAIL_CONFIG
  const auth = await getCurrentSession()

  if (!auth) {
    console.error("No user session")
    return
  }

  const user = auth.user

  switch (type) {
    case "LOGIN":
      await sendNotification("LOGIN", {
        user,
        loginInfo: {
          date: new Date(),
          device: "Chrome on Windows 11",
          location: "San Francisco, California, United States",
          ip: "192.168.1.1",
        },
        supportLink: "https://example.com/support",
      })
      break
    case "CHANGE_EMAIL":
      await sendNotification("CHANGE_EMAIL", {
        user,
        newEmail: "new@example.com",
        verifyEmailLink: "https://example.com/verify-email-change",
      })
      break
    case "RESET_PASSWORD":
      await sendNotification("RESET_PASSWORD", {
        user,
        resetPasswordLink: "https://example.com/reset-password",
      })
      break
    case "VERIFY_EMAIL":
      await sendNotification("VERIFY_EMAIL", {
        user,
        verifyEmailLink: "https://example.com/verify-email",
      })
      break
  }

  console.log(type)
}

export default async function Page() {
  if (env.NODE_ENV === "production") {
    return notFound()
  }

  const emailTypes = Object.keys(EMAIL_CONFIG)

  return (
    <div className="grid min-h-screen place-items-center">
      <form action={serverAction} className="flex flex-col gap-4">
        <Select name="type" defaultValue={emailTypes[0]}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {emailTypes.map((type) => (
              <SelectItem value={type} key={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button>Send</Button>
      </form>
    </div>
  )
}
