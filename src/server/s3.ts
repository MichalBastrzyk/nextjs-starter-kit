import { S3Client } from "@aws-sdk/client-s3"

import { env } from "@/env"

export const s3 = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
  // LocalStack doesn't support virtual host style
  forcePathStyle: env.S3_FORCE_PATH_STYLE,
})

export const BUCKET_NAME = env.S3_BUCKET_NAME
