import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: "build",
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
