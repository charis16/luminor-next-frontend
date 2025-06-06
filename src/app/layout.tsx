import "quill/dist/quill.snow.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { cookies } from "next/headers";

import Providers from "./providers";

import { fontSans } from "@/config/fonts";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Luminor Photography",
  description:
    "Luminor Photography is a professional photography service capturing timeless moments.",
  keywords: ["photography", "event", "wedding"],
  openGraph: {
    title: "Luminor Photography",
    description:
      "Luminor Photography captures weddings and events with professionalism and creativity.",
    images: [`${baseUrl}/images/web-app-manifest-512x512.png`],
  },
  twitter: {
    title: "Luminor Photography",
    description: "Capture your most precious moments with Luminor Photography.",
    images: [`${baseUrl}/images/web-app-manifest-512x512.png`],
  },
  alternates: {
    canonical: `${baseUrl}/`,
  },
};

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("luminor_locale")?.value || "id";

  return (
    <html suppressHydrationWarning lang={locale}>
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
