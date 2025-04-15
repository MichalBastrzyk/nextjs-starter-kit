"use client"

import * as React from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { getUserImages } from "@/server/actions/s3-upload"

export interface ImageGalleryProps {
  initialImages: Awaited<ReturnType<typeof getUserImages>>
}

export function ImageGallery({ initialImages }: ImageGalleryProps) {
  const [images, setImages] = React.useState(initialImages)
  const [isLoading, setIsLoading] = React.useState(false)

  const refreshImages = async () => {
    setIsLoading(true)
    try {
      const freshImages = await getUserImages()
      setImages(freshImages)
    } catch (error) {
      console.error("Failed to refresh images:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Images</CardTitle>
            <CardDescription>
              {images.length > 0
                ? `You have ${images.length} image${images.length !== 1 ? "s" : ""} uploaded.`
                : "You haven't uploaded any images yet."}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshImages}
            disabled={isLoading}
          >
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {images.map((image, i) => (
              <div
                key={image.id}
                className="bg-muted group relative aspect-square overflow-hidden rounded-lg border"
              >
                <Image
                  src={image.downloadUrl}
                  alt={image.originalFilename}
                  width={256}
                  height={256}
                  quality={50}
                  priority={i < 3}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="size-full object-cover transition-all group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-muted/50 rounded-lg border px-4 py-8 text-center">
            <p className="text-muted-foreground text-sm">
              No images found. Upload some images to see them here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
