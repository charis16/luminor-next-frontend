import "quill/dist/quill.snow.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import Providers from "./providers";

import { fontSans } from "@/config/fonts";
import { WebsiteMetadataResponse } from "@/types/website";

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/website`, {
    cache: "no-store", // hindari cache supaya data selalu fresh
  });

  const { data }: WebsiteMetadataResponse = await res.json();

  const metaDesc =
    data.meta_desc ||
    "Luminor Photography is a professional photography service specializing in capturing moments that matter. From weddings to corporate events, we bring your vision to life.";

  const metaName = data.meta_title || "Luminor Photography";

  const keywords = data.meta_keyword?.split(",").map((kw) => kw.trim()) ?? [
    "photography",
    "wedding photographer",
    "event photographer",
  ];

  return {
    title: {
      default: "Luminor Photography",
      template: `%s - Luminor Photography`,
    },
    keywords,
    description:
      data.meta_desc ||
      "Luminor Photography is a professional photography service specializing in capturing moments that matter. From weddings to corporate events, we bring your vision to life.",
    openGraph: {
      title: metaName,
      description: metaDesc,
      images: [data.og_image ?? "/og.png"],
    },
    twitter: {
      title: metaName,
      description: metaDesc,
      images: [data.og_image ?? "/og.png"],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html suppressHydrationWarning lang={params.locale}>
      <head />
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
