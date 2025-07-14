const createNextIntlPlugin = require("next-intl/plugin");

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["cdn.luminorpictures.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.luminorpictures.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = createNextIntlPlugin()(nextConfig);
