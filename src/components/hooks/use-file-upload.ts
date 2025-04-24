import * as React from "react"

import { toast } from "sonner"

import { getImageDimensions } from "@/lib/image-manipulation"
import { tryCatch } from "@/lib/try-catch"

import {
  getPresignedUploadUrl,
  saveImageMetadata,
} from "@/server/actions/s3-upload"

/**
 * A custom hook for handling file uploads to S3 with progress tracking and validation.
 *
 * @param props - Configuration options for the file upload
 * @param props.maxSize - Maximum allowed file size in bytes (defaults to 5MB)
 * @param props.maxFiles - Maximum number of files allowed (defaults to 5)
 * @param props.accept - MIME types to accept (defaults to "image/*")
 *
 * @returns {Object} Upload state and handler functions
 * @returns {File[]} files - Array of files currently selected
 * @returns {Function} setFiles - State setter for files array
 * @returns {boolean} isUploading - Whether files are currently being uploaded
 * @returns {Function} handleOnUpload - Callback to handle file upload process
 * @returns {Function} handleOnFileValidate - Callback to validate files before upload
 * @returns {Function} abortUpload - Callback to abort ongoing uploads
 */
export function useFileUploader({
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = "image/*",
}: {
  maxSize?: number
  accept?: string
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const [isUploading, setIsUploading] = React.useState(false)

  // Handle upload to S3 using presigned URLs
  // TODO: This function needs a refactor to be reduce the level of nesting
  const handleOnUpload = React.useCallback(
    async (
      filesToUpload: File[],
      options: {
        onProgress: (file: File, progress: number) => void
        onSuccess: (file: File) => void
        onError: (file: File, error: Error) => void
      }
    ) => {
      setIsUploading(true)

      try {
        await Promise.all(
          filesToUpload.map(async (file) => {
            try {
              // Set initial progress
              options.onProgress(file, 0)

              // Get a presigned URL from the server
              const { presignedUrl, objectKey } = await getPresignedUploadUrl(
                file.name,
                file.type
              )

              // Use XMLHttpRequest for progress tracking
              const xhr = new XMLHttpRequest()
              xhr.open("PUT", presignedUrl)
              xhr.setRequestHeader("Content-Type", file.type)

              // Track real upload progress
              xhr.upload.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                  const percentComplete = Math.round(
                    (event.loaded / event.total) * 100
                  )
                  options.onProgress(file, percentComplete)
                }
              })

              // Upload the file
              await new Promise<void>((resolve, reject) => {
                xhr.onload = () => {
                  if (xhr.status >= 200 && xhr.status < 300) {
                    resolve()
                  } else {
                    reject(new Error(`Upload failed with status ${xhr.status}`))
                  }
                }
                xhr.onerror = () =>
                  reject(new Error("Network error during upload"))
                xhr.send(file)
              })

              // Get dimensions if it's an image
              let dimensions: { width?: number; height?: number } = {
                width: undefined,
                height: undefined,
              }

              if (file.type.startsWith("image/")) {
                const { data, error } = await tryCatch(getImageDimensions(file))

                if (error) {
                  console.warn("Could not get image dimensions:", error)
                } else {
                  dimensions = data
                }
              }

              // Save metadata to our database
              await saveImageMetadata({
                originalFilename: file.name,
                size: file.size,
                mimeType: file.type,
                objectKey,
                width: dimensions.width,
                height: dimensions.height,
              })

              // Indicate success
              options.onProgress(file, 100)
              options.onSuccess(file)

              toast.success(`Successfully uploaded ${file.name}`)
            } catch (error) {
              if (
                error instanceof Error &&
                error.message === "Upload aborted"
              ) {
                toast.info(`Upload of ${file.name} canceled`)
              } else {
                console.error("Error uploading file:", error)
                options.onError(
                  file,
                  error instanceof Error ? error : new Error("Upload failed")
                )
                toast.error(`Failed to upload ${file.name}`)
              }
            }
          })
        )
      } finally {
        setIsUploading(false)
      }
    },
    []
  )

  // Validate files before upload
  // TODO: Maybe try to move this to zod
  const handleOnFileValidate = React.useCallback(
    (file: File) => {
      // Check if the file size is within limits
      if (file.size > maxSize) {
        return `File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`
      }

      // Check if the file type matches the accepted types
      if (accept && accept !== "*") {
        const acceptedTypes = accept.split(",").map((type) => type.trim())
        const fileType = file.type

        // Check if any accepted type matches the file type (handling wildcards)
        const isAccepted = acceptedTypes.some((type) => {
          if (type.endsWith("/*")) {
            const prefix = type.split("/*")[0]
            return fileType.startsWith(prefix + "/")
          }
          return type === fileType
        })

        if (!isAccepted) {
          return `File type ${fileType} is not accepted. Accepted types: ${accept}`
        }
      }

      return null // No error
    },
    [maxSize, accept]
  )

  return {
    files,
    setFiles,
    isUploading,
    handleOnUpload,
    handleOnFileValidate,
  }
}
