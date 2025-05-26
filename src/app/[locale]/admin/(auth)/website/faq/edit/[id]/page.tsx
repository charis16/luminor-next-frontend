import { ScrollShadow } from "@heroui/scroll-shadow";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { ButtonSave, Form } from "../../_components";
import { getFaqByUUIDOptions } from "../../_hooks/use-faq-by-uuid";
import { FaqProvider } from "../../_context";

import { TitlePage } from "@/app/[locale]/admin/_components";
import getQueryClient from "@/utils/react-query";
import { getAuthCookieHeader } from "@/utils/get-cookies-server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();
  const cookieHeader = await getAuthCookieHeader();

  try {
    await queryClient.ensureQueryData(getFaqByUUIDOptions(id, cookieHeader));
  } catch (err: any) {
    if (err?.status === 403) {
      return notFound(); // ⬅️ Redirect ke halaman 404
    }

    throw err;
  }

  return (
    <HydrationBoundary key={id} state={dehydrate(queryClient)}>
      <FaqProvider key={id} enabled={false}>
        <div className="flex flex-col gap-6">
          <TitlePage
            withBackButton
            description="Edit and update your FAQ details"
            title="Edit Faq"
            urlBack={"/admin/website/faq"}
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
      </FaqProvider>
    </HydrationBoundary>
  );
}
