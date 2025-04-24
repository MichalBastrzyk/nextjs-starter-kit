"use client"

import * as React from "react"

import { XIcon } from "lucide-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { tryCatch } from "@/lib/try-catch"
import { Button } from "@/components/ui/button"

export function Banner() {
  const { data: sessionData, isPending } = authClient.useSession()

  const [isOpen, setIsOpen] = React.useState(true)

  if (isPending) {
    return null
  }

  if (sessionData && !sessionData.user.emailVerified && isOpen) {
    return (
      <div className="bg-primary text-primary-foreground sticky top-0 z-50 flex h-12 w-full items-center justify-between px-8">
        <div></div>

        <div className="flex items-center justify-center space-x-2">
          <p className="text-center text-sm">
            Your email is not verified. Please verify it by clicking the link in
            the email we sent you.
          </p>
          <Button
            size="sm"
            className="cursor-pointer invert"
            onClick={async () => {
              const { error } = await tryCatch(
                authClient.sendVerificationEmail({
                  email: sessionData?.user.email,
                })
              )

              if (error) {
                console.error(
                  "[AUTH] Error sending verification email: ",
                  error
                )

                toast.error("Error sending verification email", {
                  description: error.message,
                })
              }
            }}
          >
            Resend Email
          </Button>
        </div>

        <Button size="sm" className="invert" onClick={() => setIsOpen(false)}>
          <XIcon className="size-4" />
        </Button>
      </div>
    )
  }

  return null
}
