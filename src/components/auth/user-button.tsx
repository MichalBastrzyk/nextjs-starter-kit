"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

import {
  IconDashboard,
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react"

import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

const UserProfileModal = dynamic(
  () =>
    import("@/components/auth/user-profile-modal").then(
      (mod) => mod.UserProfileModal
    ),
  { ssr: false }
)

export function UserButton() {
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false)
  const { data: auth, isPending } = authClient.useSession()

  if (isPending) {
    return <Skeleton className="h-12.5 w-[16rem] rounded-lg p-6" />
  }

  if ((!isPending && !auth) || auth === null) {
    return (
      <Button size="lg" variant="outline" className="p-6" asChild>
        <Link href="/sign-in">
          <IconUserCircle />
          Sign in
        </Link>
      </Button>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" variant="outline" className="p-6">
            <Avatar className="size-8">
              <AvatarImage src={auth.user.image ?? undefined} />
              <AvatarFallback className="size-8">
                {auth.user.name
                  .split(" ")
                  .map((name) => name.charAt(0))
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{auth.user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {auth.user.email}
              </span>
            </div>
            <IconDotsVertical className="ml-auto size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="size-8">
                <AvatarImage src={auth.user.image ?? undefined} />
                <AvatarFallback>
                  {auth.user.name
                    .split(" ")
                    .map((name) => name.charAt(0))
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{auth.user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {auth.user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <IconDashboard />
                Dashboard
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsProfileModalOpen(true)}>
            <IconUserCircle />
            Your Profile
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/sign-out">
              <IconLogout />
              Log out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
      />
    </>
  )
}
