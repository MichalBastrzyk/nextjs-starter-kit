"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { IconDeviceDesktop, IconDeviceMobile } from "@tabler/icons-react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { UAParser } from "ua-parser-js"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useAuthData } from "../use-auth-data"

type Session = (typeof authClient.$Infer.Session)["session"]

export function SessionsCard() {
  const { data: sessions, refetch } = useAuthData({
    queryFn: async () => {
      const { data, error } = await authClient.listSessions()

      if (error) {
        return {
          data: null,
          error: new Error(error.message ?? "Failed to fetch sessions"),
        }
      }

      return { data, error: null }
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>
          Manage your active sessions and revoke access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          {sessions?.map((session) => (
            <SessionCell key={session.id} session={session} refetch={refetch} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function SessionCell({
  session,
  refetch,
}: {
  session: Session
  refetch: () => void
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const { data: sessionData } = authClient.useSession()

  const isCurrentSession = session.id === sessionData?.session?.id

  async function handleSignOut() {
    setIsLoading(true)

    if (isCurrentSession) {
      router.push("/sign-out")
    } else {
      const { error } = await authClient.revokeSession({
        token: session.token,
      })

      if (error) {
        toast.error(error.message ?? "Failed to sign out")
        return
      }

      toast.success("Signed out")

      refetch()
    }

    setIsLoading(false)
  }

  const parser = UAParser(session.userAgent!)
  const isMobile = parser.device.type === "mobile"

  return (
    <li className="flex items-center justify-between rounded-xl border px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="bg-foreground text-background rounded-full p-1.5">
          {isMobile ? (
            <IconDeviceMobile className="size-6" />
          ) : (
            <IconDeviceDesktop className="size-6" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">
            {isCurrentSession ? "Current Session" : "Other Session"}
          </p>
          <p className="text-muted-foreground text-xs">
            {parser.os.name}, {parser.browser.name}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        disabled={isLoading}
        onClick={handleSignOut}
      >
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {isCurrentSession ? "Sign Out" : "Revoke"}
      </Button>
    </li>
  )
}
