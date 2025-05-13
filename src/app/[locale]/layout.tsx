import "quill/dist/quill.snow.css";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";

import Providers from "./providers";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <NextIntlClientProvider locale={locale}>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}
