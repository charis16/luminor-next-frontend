import { ScrollShadow } from "@heroui/scroll-shadow";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getCategoryByUUIDOptions } from "../../_hooks/use-category-by-uuid";
import { CategoryProvider } from "../../_context";
import { ButtonSave, Form } from "../../_components";

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

  await queryClient.ensureQueryData(getCategoryByUUIDOptions(id, cookieHeader));

  return (
    <HydrationBoundary key={id} state={dehydrate(queryClient)}>
      <CategoryProvider key={id} enabled={false}>
        <div className="flex flex-col gap-6">
          <TitlePage
            withBackButton
            description="Easily create and customize your category"
            title="Edit Category"
            urlBack={"/admin/setting/category"}
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
      </CategoryProvider>
    </HydrationBoundary>
  );
}
