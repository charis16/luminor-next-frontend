import { ScrollShadow } from "@heroui/scroll-shadow";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { AboutUsProvider } from "./_context";
import { ButtonSave, Form } from "./_components";
import { getOptions } from "./_hooks/use-about-us";

import { TitlePage } from "@/app/[locale]/admin/_components";
import getQueryClient from "@/utils/react-query";
import { getAuthCookieHeader } from "@/utils/get-cookies-server";

export default async function AboutPage() {
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
    <HydrationBoundary key="about-us" state={dehydrate(queryClient)}>
      <AboutUsProvider>
        <div className="flex flex-col gap-6">
          <TitlePage
            description="Manage and update the content for the About Us section displayed on the Home & About Us page"
            title="About Us"
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
      </AboutUsProvider>
    </HydrationBoundary>
  );
}
