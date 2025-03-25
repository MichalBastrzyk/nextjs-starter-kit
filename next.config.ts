import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
