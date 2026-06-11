import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Pin the workspace root — stray lockfiles in parent dirs confuse inference */
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
