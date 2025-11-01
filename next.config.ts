import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img-v1.raydium.io",
      },
      {
        protocol: "https",
        hostname: "dd.dexscreener.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dexscreener.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
