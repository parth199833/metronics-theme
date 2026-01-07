import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Turbopack is now the default for dev and build
  // No need to specify --turbopack flag anymore
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
