"use client"

import * as React from "react"

import type * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  CogIcon,
  CreditCardIcon,
  LockIcon,
  TriangleAlertIcon,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { DeleteAccountCard } from "./settings/delete-account-card"
import { EmailCard } from "./settings/email-card"
import { NameCard } from "./settings/name-card"
import { PasswordCard } from "./settings/password-card"
import { ProfilePicture } from "./settings/profile-picture-card"
import { SessionsCard } from "./settings/sessions-card"

const settings = [
  {
    name: "General",
    icon: CogIcon,
    url: "/settings/general",
  },
  {
    name: "Security",
    icon: LockIcon,
    url: "/settings/security",
  },
  {
    name: "Billing",
    icon: CreditCardIcon,
    url: "/settings/billing",
  },
  {
    name: "Danger Zone",
    icon: TriangleAlertIcon,
    url: "/settings/danger-zone",
  },
]

export function UserProfileModal({
  open,
  onOpenChange,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger> & {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent className="w-full !max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex size-full flex-col gap-6 sm:flex-row">
          <SidebarMenu className="w-64 flex-initial">
            <ul>
              {settings.map((setting) => (
                <SidebarMenuItem key={setting.name}>
                  <SidebarMenuButton asChild>
                    <a href={setting.url}>
                      <setting.icon />
                      <span>{setting.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </ul>
          </SidebarMenu>
          <ScrollArea className="h-[calc(100vh-200px)] flex-1">
            <div className="grid gap-4 py-4">
              <ProfilePicture />
              <NameCard />
              <EmailCard />
              <PasswordCard />
              <SessionsCard />
              <DeleteAccountCard />
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
