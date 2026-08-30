/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@workspace/ui"],

  async rewrites() {
    const backendUrl = process.env.BACKEND_URL

    if (!backendUrl) {
      throw new Error("BACKEND_URL is not defined")
    }

    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ]
  },
}

export default nextConfig
