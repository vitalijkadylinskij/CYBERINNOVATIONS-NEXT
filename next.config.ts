import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/my-app",
  assetPrefix: "/my-app",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
