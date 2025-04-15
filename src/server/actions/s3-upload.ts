"use server"

import { randomUUID } from "crypto"

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3"
// Note: You'll need to install this package:
// npm install @aws-sdk/s3-request-presigner
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { and, eq } from "drizzle-orm"

import { getCurrentSession } from "@/lib/auth-server"

import { db } from "@/server/db"
import { imagesTable } from "@/server/db/schema"
import { BUCKET_NAME, s3 } from "@/server/s3"

/**
 * Generates a unique S3 object key for an image
 */
function generateS3Key(filename: string, userId: string): string {
  const extension = filename.split(".").pop() ?? ""
  const uuid = randomUUID()
  return `uploads/${userId}/${uuid}.${extension}`
}

/**
 * Generates a presigned URL for uploading an image to S3
 */
export async function getPresignedUploadUrl(
  filename: string,
  contentType: string
) {
  const session = await getCurrentSession()

  // Check if user is authenticated
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id
  const objectKey = generateS3Key(filename, userId)

  // Create command for putting an object to S3
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: objectKey,
    ContentType: contentType,
    // Optional metadata
    Metadata: {
      userId,
      originalFilename: filename,
    },
  })

  // Generate the presigned URL
  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }) // 1 hour expiry

  return {
    presignedUrl,
    objectKey,
    bucketName: BUCKET_NAME,
  }
}

/**
 * Generates a presigned URL for downloading an image from S3
 */
export async function getPresignedDownloadUrl(objectKey: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: objectKey,
  })

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }) // 1 hour expiry

  return presignedUrl
}

/**
 * Saves image metadata to the database after successful upload
 */
export async function saveImageMetadata({
  originalFilename,
  size,
  mimeType,
  width,
  height,
  objectKey,
}: {
  originalFilename: string
  size: number
  mimeType: string
  width?: number
  height?: number
  objectKey: string
}) {
  const session = await getCurrentSession()

  // Check if user is authenticated
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id

  const imageId = randomUUID()

  await db.insert(imagesTable).values({
    id: imageId,
    originalFilename,
    size,
    mimeType,
    width,
    height,
    s3ObjectKey: objectKey,
    s3BucketName: BUCKET_NAME,
    userId,
  })

  return imageId
}

/**
 * Deletes an image from S3 and the database
 */
export async function deleteImage(imageId: string) {
  const session = await getCurrentSession()

  // Check if user is authenticated
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id

  // First, get the image details
  const image = await db.query.imagesTable.findFirst({
    where: (images, { eq, and }) =>
      and(eq(images.id, imageId), eq(images.userId, userId)),
  })

  if (!image) {
    throw new Error("Image not found or you don't have permission to delete it")
  }

  // Delete from S3
  const command = new DeleteObjectCommand({
    Bucket: image.s3BucketName,
    Key: image.s3ObjectKey,
  })

  await s3.send(command)

  // Delete from database
  await db
    .delete(imagesTable)
    .where(and(eq(imagesTable.id, imageId), eq(imagesTable.userId, userId)))

  return { success: true }
}

/**
 * Lists a user's images
 */
export async function getUserImages() {
  const session = await getCurrentSession()

  // Check if user is authenticated
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id

  const images = await db.query.imagesTable.findMany({
    where: (images, { eq }) => eq(images.userId, userId),
    orderBy: (images, { desc }) => [desc(images.createdAt)],
  })

  // Generate temporary download URLs for each image
  const imagesWithUrls = await Promise.all(
    images.map(async (image) => {
      const downloadUrl = await getPresignedDownloadUrl(image.s3ObjectKey)
      return {
        ...image,
        downloadUrl,
      }
    })
  )

  return imagesWithUrls
}
