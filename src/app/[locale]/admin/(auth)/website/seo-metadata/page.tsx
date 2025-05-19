import { ScrollShadow } from "@heroui/scroll-shadow";
import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { SeoMetadataProvider } from "./_context";
import { ButtonSave, Form } from "./_components";
import { getOptions } from "./_hooks/use-seo-metadata";

import { TitlePage } from "@/app/[locale]/admin/_components";
import getQueryClient from "@/utils/react-query";
import { getAuthCookieHeader } from "@/utils/get-cookies-server";

export default async function SeoMetadataPage() {
  const queryClient = getQueryClient();
  const cookieHeader = await getAuthCookieHeader();

  try {
    await queryClient.ensureQueryData(getOptions(cookieHeader));
  } catch (err: any) {
    if (err?.status === 403) {
      return notFound(); // ⬅️ Redirect ke halaman 404
    }

    throw err; // lempar error lainnya
  }

  return (
    <HydrationBoundary key="seo-metadata" state={dehydrate(queryClient)}>
      <SeoMetadataProvider>
        <div className="flex flex-col gap-6">
          <TitlePage
            description="Edit and manage SEO metadata for the website."
            title="SEO Metadata"
          >
            <ButtonSave />
          </TitlePage>

          <ScrollShadow
            hideScrollBar
            className="md:h-[calc(100vh-15rem)] h-[calc(100vh-19rem)]"
          >
            <Form />
          </ScrollShadow>
        </div>
      </SeoMetadataProvider>
    </HydrationBoundary>
  );
}
