import type { NextConfig } from "next"

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    inlineCss: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
