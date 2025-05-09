import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;
