"use client"

import * as React from "react"

import { IconUserCircle } from "@tabler/icons-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

import { DeleteAccountCard } from "./settings/delete-account-card"
import { EmailCard } from "./settings/email-card"
import { NameCard } from "./settings/name-card"
import { PasswordCard } from "./settings/password-card"
import { ProfilePicture } from "./settings/profile-picture-card"
import { SessionsCard } from "./settings/sessions-card"

export function UserProfileModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <IconUserCircle />
        Your Profile
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid gap-4 py-4">
            <ProfilePicture />
            <NameCard />
            <EmailCard />
            <PasswordCard />
            <SessionsCard />
            <DeleteAccountCard />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
