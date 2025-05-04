"use client"

import * as React from "react"

import { UploadCloudIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
} from "@/components/ui/file-upload"
import { useFileUploader } from "@/components/hooks/use-file-upload"

interface FileUploaderProps {
  maxFiles?: number
  maxSize?: number
  accept?: string
}

// TODO: Add a check icon when the file is uploaded
export function FileUploader({
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = "image/*",
}: FileUploaderProps) {
  const { files, setFiles, isUploading, handleOnUpload, handleOnFileValidate } =
    useFileUploader({ maxSize, accept })

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onUpload={handleOnUpload}
      onFileValidate={handleOnFileValidate}
      accept={accept}
      maxFiles={maxFiles}
      maxSize={maxSize}
      disabled={isUploading}
      className="mx-auto w-full max-w-lg"
      multiple
    >
      <FileUploadDropzone className="hover:border-primary/50 flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <UploadCloudIcon className="text-muted-foreground h-10 w-10" />
          <div className="space-y-2">
            <p className="font-medium">Drag & drop images here</p>
            <p className="text-muted-foreground text-sm">
              Or click to browse (max {maxFiles} files, up to{" "}
              {maxSize / (1024 * 1024)}MB each)
            </p>
          </div>
        </div>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
              </div>
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <XIcon />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress className="h-1 w-full" />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  )
}
