import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in every response header.
  poweredByHeader: false,
  images: {
    // The source photos are ~2 MB PNGs; serve them as AVIF/WebP instead.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Hero video + poster are always requested with `?v=<modified time>` (see
        // versionedPublicUrl), so a changed file gets a new URL and can be cached "forever".
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
