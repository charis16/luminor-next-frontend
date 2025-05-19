import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ButtonAdd, FaqSearchInput, TableData } from "./_components";
import { FaqProvider } from "./_context";
import { getFaqListsOptions } from "./_hooks/use-faq-lists";

import getQueryClient from "@/utils/react-query";
import { TitlePage } from "@/app/[locale]/admin/_components";
import { getAuthCookieHeader } from "@/utils/get-cookies-server";

export default async function FaqPage() {
  const queryClient = getQueryClient();
  const cookieHeader = await getAuthCookieHeader();

  try {
    await queryClient.ensureQueryData(
      getFaqListsOptions(1, "", 10, cookieHeader),
    );
  } catch (err: any) {
    if (err?.status === 403) {
      return notFound(); // ⬅️ Redirect ke halaman 404
    }

    throw err; // lempar error lainnya
  }

  return (
    <HydrationBoundary key="faq-list" state={dehydrate(queryClient)}>
      <FaqProvider key="faq list" enabled>
        <div className="flex flex-col gap-6">
          <TitlePage
            description="Easily manage frequently asked questions for your website"
            title="FAQs"
          >
            <ButtonAdd />
          </TitlePage>

          <FaqSearchInput />
          <TableData />
        </div>
      </FaqProvider>
    </HydrationBoundary>
  );
}
