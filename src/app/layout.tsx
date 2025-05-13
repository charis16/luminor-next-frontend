import "quill/dist/quill.snow.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { fontSans } from "@/config/fonts";
import { siteConfigPublic } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfigPublic.name,
    template: `%s - ${siteConfigPublic.name}`,
  },
  description: siteConfigPublic.description,
  icons: { icon: "/favicon.ico" },
  twitter: {
    card: "summary_large_image",
    title: siteConfigPublic.name,
    description: siteConfigPublic.description,
    images: ["/og.png"],
  },
  openGraph: {
    title: siteConfigPublic.name,
    description: siteConfigPublic.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <HeroUIProvider>
          <NextThemesProvider attribute="class" forcedTheme="dark">
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
        {children}
      </body>
    </html>
  );
}
