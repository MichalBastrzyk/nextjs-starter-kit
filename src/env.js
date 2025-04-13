import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),

    // TURSO
    TURSO_CONNECTION_URL: z.string(),
    TURSO_AUTH_TOKEN:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),

    // AUTH
    BETTER_AUTH_SECRET: z.string(),

    // EMAIL
    EMAIL_HOST: z.string(),
    EMAIL_PORT: z.coerce.number(),
    EMAIL_USER: z.string(),
    EMAIL_PASSWORD: z.string(),
    EMAIL_FROM_ADDRESS: z.string(),

    // S3 (default values are for localstack)
    S3_ACCESS_KEY_ID: z.string().default("test"),
    S3_SECRET_ACCESS_KEY: z.string().default("test"),
    S3_REGION: z.string().default("eu-west-1"),
    S3_ENDPOINT: z.string().default("http://localhost:4566"),
    S3_BUCKET_NAME: z.string().default("test-bucket"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,

    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
