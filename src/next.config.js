/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: "standalone",
  images: {
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
        source: "/images/(.*)", // match file di public/images/
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // cache 1 tahun
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
