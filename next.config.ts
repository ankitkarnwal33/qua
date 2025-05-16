import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // skips _all_ TS errors during next build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
