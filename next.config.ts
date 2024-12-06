import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/filestotext', // Add this for subfolder deployment
  assetPrefix: '/filestotext/', // Add this for correct asset loading
  trailingSlash: true, // This helps with static hosting
};

export default nextConfig;
