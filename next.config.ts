import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "realestate44.runasp.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "realestate44.runasp.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
