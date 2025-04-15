import * as React from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { getCurrentSession } from "@/lib/auth-server"
import { ImageGallery } from "@/components/image-uploader/image-gallery"
import {
  Shell,
  ShellDescription,
  ShellHeading,
  ShellTitle,
} from "@/components/shell"

import { getUserImages } from "@/server/actions/s3-upload"

import { FileUploaderDialog } from "./file-uploader-dialog"

export const metadata: Metadata = {
  title: "Image Uploader",
  description: "Upload and manage your images",
}

export default async function ImagesPage() {
  const auth = await getCurrentSession()

  if (!auth?.session) {
    redirect("/sign-in")
  }

  const images = await getUserImages()

  return (
    <Shell variant="sidebar" className="flex flex-col">
      <div className="flex w-full flex-1 items-center justify-between">
        <ShellHeading>
          <ShellTitle>Image Uploader</ShellTitle>
          <ShellDescription>Upload and manage your images.</ShellDescription>
        </ShellHeading>
        <FileUploaderDialog />
      </div>

      <React.Suspense fallback={<div>Loading images...</div>}>
        <ImageGallery initialImages={images} />
      </React.Suspense>
    </Shell>
  )
}
