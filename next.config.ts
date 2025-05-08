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
    // React Compiler allows for automatic React Optimization by memoizing and other stuff like that.
    // https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
    // If you feel like your app refereshes in development mode are to slow, you can disable this.
    // DISABLED BECAUSE: This does not work well yet with the tanstack table
    // reactCompiler: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4566",
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
