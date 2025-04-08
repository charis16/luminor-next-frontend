import "quill/dist/quill.snow.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import { Providers } from "./providers";

import { routing } from "@/i18n/routing";
import { fontSans } from "@/config/fonts";
import { siteConfigPublic } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfigPublic.name,
    template: `%s - ${siteConfigPublic.name}`,
  },
  description: siteConfigPublic.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-dvh bg-background font-sans antialiased relative",
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider>
          <Providers
            themeProps={{
              attribute: "class",
              defaultTheme: "dark",
              forcedTheme: "dark",
            }}
          >
            <div className="relative flex flex-col h-screen">
              <main className="flex-grow">{children}</main>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
