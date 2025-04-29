import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: "build",
  reactStrictMode: process.env.NODE_ENV === "development",
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
