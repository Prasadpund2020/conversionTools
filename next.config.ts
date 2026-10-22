import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: "/pdf-tools",
        destination: "/all-tools/pdf",
      },
      {
        source: "/image-tools",
        destination: "/all-tools/image",
      },
      {
        source: "/video-tools",
        destination: "/all-tools/video-audio",
      },
      {
        source: "/audio-tools",
        destination: "/all-tools/video-audio",
      },
      {
        source: "/downloader-tools",
        destination: "/all-tools/downloaders",
      },
    ];
  },
};

export default nextConfig;
