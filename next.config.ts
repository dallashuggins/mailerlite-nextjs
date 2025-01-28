import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MAILERLITE_NEWSLETTER_GROUP: process.env.MAILERLITE_NEWSLETTER_GROUP,
    MAILERLITE_API_KEY: process.env.MAILERLITE_API_KEY,
  },
};

export default nextConfig;
