import "dotenv/config"

import fs from "fs"
import path from "path"

import { PutObjectCommand } from "@aws-sdk/client-s3"

import { s3 } from "@/server/s3"

async function seedS3() {
  const MEDIA_DIR = path.join(__dirname, "..", "..", "mock-assets")
  const BUCKET_NAME = "test-bucket"

  const fileNames = fs.readdirSync(MEDIA_DIR)

  console.log(`Seeding ${fileNames.length} media files...`)

  await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(MEDIA_DIR, fileName)

      const fileStream = fs.createReadStream(filePath)

      const key = `${fileName.split(".")[0]}-${crypto.randomUUID()}.${fileName.split(".")[1]}`

      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileStream,
      }

      console.log(`Uploading ${filePath} to s3://${BUCKET_NAME}/${key}...`)

      const command = new PutObjectCommand(uploadParams)

      return s3.send(command)
    })
  )
}

async function seed() {
  await seedS3()
}

seed()
  .catch((error) => {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
