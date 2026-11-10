import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "realestate44.runasp.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;