import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/courses",
        destination: "/open-programs",
        permanent: true,
      },
      {
        source: "/courses/:slug",
        destination: "/open-programs/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about/founder",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
