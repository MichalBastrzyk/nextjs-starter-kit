import * as React from "react"

import { IconUpload, IconUserCircle } from "@tabler/icons-react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { resizeAndCropImage } from "@/lib/image-manipulation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

import {
  getPresignedUploadUrl,
  saveImageMetadata,
} from "@/server/actions/s3-upload"

export function ProfilePicture() {
  const { data: sessionData } = authClient.useSession()

  const [isPending, startTransition] = React.useTransition()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function openFileDialog() {
    fileInputRef.current?.click()
  }

  function handleAvatarChange(file: File) {
    if (!sessionData) return
    toast.promise(
      (async () => {
        try {
          const resizedFile = await resizeAndCropImage(
            file,
            sessionData.user.id,
            256,
            file.type.split("/")[1] ?? "png"
          )

          const { presignedUrl, objectKey } = await getPresignedUploadUrl(
            resizedFile.name,
            resizedFile.type
          )

          const response = await fetch(presignedUrl, {
            method: "PUT",
            body: resizedFile,
          })

          if (!response.ok) {
            throw new Error("Failed to upload image")
          }

          await saveImageMetadata({
            originalFilename: resizedFile.name,
            size: resizedFile.size,
            mimeType: resizedFile.type,
            objectKey,
            width: 256,
            height: 256,
          })

          const image = `http://localhost:4566/test-bucket/${objectKey}`

          const { error } = await authClient.updateUser({ image })

          if (error) {
            throw new Error(error.message)
          }
        } catch (error) {
          throw error instanceof Error
            ? error
            : new Error("Unknown error occurred")
        }
      })(),
      {
        loading: "Uploading avatar...",
        success: "Avatar uploaded",
        error: "Failed to upload avatar",
      }
    )
  }

  return (
    <Card>
      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        onChange={(e) => {
          startTransition(() => {
            const file = e.target.files?.item(0)
            if (file) void handleAvatarChange(file)
          })
        }}
        hidden
        disabled={isPending}
      />
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>Avatar</CardTitle>
          <CardDescription className="pt-1.5">
            Click on the avatar to upload a new one from your computer.
          </CardDescription>
        </div>
        <button
          type="button"
          onClick={openFileDialog}
          className="group"
          disabled={isPending}
        >
          <Avatar className="size-18 relative cursor-pointer">
            <AvatarImage
              src={sessionData?.user.image ?? undefined}
              className="transition-opacity group-hover:opacity-50"
            />
            <AvatarFallback>
              <IconUserCircle className="transition-opacity group-hover:opacity-50" />
            </AvatarFallback>
            <IconUpload className="absolute left-1/2 top-1/2 z-10 size-8 -translate-x-1/2 -translate-y-1/2 opacity-0 shadow-md transition-opacity group-hover:opacity-100" />
          </Avatar>
        </button>
      </CardContent>
      <CardFooter className="text-muted-foreground border-t text-sm">
        Avatar is not required but strongly recommended.
      </CardFooter>
    </Card>
  )
}
