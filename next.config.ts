import type { NextConfig } from "next"

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js"

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    ppr: "incremental",
    inlineCss: true,
    // DISABLED BECAUSE: This does not work well yet with the tanstack table
    // reactCompiler: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
      {
        hostname: "images.unsplash.com",
      },
    ],
  },

  // This is run in the CI already
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig
