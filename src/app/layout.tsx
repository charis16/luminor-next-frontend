import "quill/dist/quill.snow.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import Providers from "./providers";

import { fontSans } from "@/config/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const fallbackImage = "/web-app-manifest-512x512.png";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/website`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch metadata");
    }

    const json = await res.json();
    const data = json?.data;

    const metaDesc =
      data?.meta_desc ||
      "Luminor Photography is a professional photography service specializing in capturing moments that matter. From weddings to corporate events, we bring your vision to life.";

    const metaName = data?.meta_title || "Luminor Photography";

    const keywords =
      typeof data?.meta_keyword === "string" && data.meta_keyword.trim()
        ? data.meta_keyword.split(",").map((kw: string) => kw.trim())
        : ["photography", "wedding photographer", "event photographer"];

    // Ensure og_image is a full absolute URL
    const ogImage = data?.og_image?.startsWith("http")
      ? data.og_image
      : `${baseUrl}${data?.og_image || fallbackImage}`;

    return {
      title: {
        default: "Luminor Photography",
        template: `%s - Luminor Photography`,
      },
      keywords,
      description: metaDesc,
      openGraph: {
        title: metaName,
        description: metaDesc,
        images: [ogImage],
      },
      twitter: {
        title: metaName,
        description: metaDesc,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: "Luminor Photography",
      description:
        "Luminor Photography is a professional photography service specializing in capturing moments that matter.",
      openGraph: {
        title: "Luminor Photography",
        description:
          "Luminor Photography is a professional photography service specializing in capturing moments that matter.",
        images: [`${baseUrl}${fallbackImage}`],
      },
      twitter: {
        title: "Luminor Photography",
        description:
          "Luminor Photography is a professional photography service specializing in capturing moments that matter.",
        images: [`${baseUrl}${fallbackImage}`],
      },
    };
  }
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
