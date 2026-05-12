import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "travellingcambodia.com",
      },
      {
        protocol: "https",
        hostname: "himalayanwarrior.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "www.worldtribune.org",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/bookings",
        destination:
          "https://travelengine-booking-iapi-152348523675.us-central1.run.app/v1/bookings",
      },
    ];
  },
};

export default nextConfig;
