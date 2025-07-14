import "quill/dist/quill.snow.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { cookies } from "next/headers";

import Providers from "./providers";

import { fontSans } from "@/config/fonts";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Luminor",
  description:
    "Luminor Photography & Videography adalah penyedia jasa foto dan video profesional untuk pernikahan, prewedding, event, dan commercial di Indonesia. Kami mengabadikan momen berharga Anda dengan sentuhan artistik dan profesional.",
  keywords: [
    "fotografi",
    "videografi",
    "photography",
    "videography",
    "wedding",
    "prewedding",
    "event",
    "commercial",
    "photographer",
    "videographer",
    "fotografer",
    "videografer",
    "foto pernikahan",
    "video pernikahan",
    "foto prewedding",
    "video prewedding",
    "dokumentasi acara",
    "dokumentasi event",
    "foto komersial",
    "video komersial",
    "jasa foto",
    "jasa video",
    "photography service",
    "videography service",
    "professional photographer",
    "professional videographer",
    "wedding photographer",
    "wedding videographer",
    "event photographer",
    "event videographer",
    "commercial photographer",
    "commercial videographer",
    "luminor",
    "luminor photography",
    "luminor videography",
  ],
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Luminor Photography & Videography",
    description:
      "Luminor Photography & Videography adalah penyedia jasa foto dan video profesional untuk pernikahan, prewedding, event, dan commercial di Indonesia. Kami mengabadikan momen berharga Anda dengan sentuhan artistik dan profesional.",
    url: `${baseUrl}/`,
    siteName: "Luminor Photography & Videography",
    images: [
      {
        url: `${baseUrl}/images/web-app-manifest-1200x300.png`,
        width: 1200,
        height: 630,
        alt: "Luminor Photography & Videography Logo",
        type: "image/png",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminor Photography & Videography",
    description:
      "Luminor Photography & Videography adalah penyedia jasa foto dan video profesional untuk pernikahan, prewedding, event, dan commercial di Indonesia. Kami mengabadikan momen berharga Anda dengan sentuhan artistik dan profesional.",
    images: [`${baseUrl}/images/web-app-manifest-1200x300.png`],
    site: "@luminorphotography",
    creator: "@luminorphotography",
  },
  alternates: {
    canonical: `${baseUrl}/`,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("luminor_locale")?.value || "id";

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>
      <body
        className={clsx(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", forcedTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
