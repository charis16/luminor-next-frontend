import { ScrollShadow } from "@heroui/scroll-shadow";
import { notFound } from "next/navigation";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { ButtonSave, Form } from "./_components";
import { ContactInformationProvider } from "./_context";
import { getContactInformationOptions } from "./_hooks/use-contact-information";

import { TitlePage } from "@/app/[locale]/admin/_components";
import getQueryClient from "@/utils/react-query";
import { getAuthCookieHeader } from "@/utils/get-cookies-server";

export default async function ContactInformationPage() {
  const queryClient = getQueryClient();
  const cookieHeader = await getAuthCookieHeader();

  try {
    await queryClient.ensureQueryData(
      getContactInformationOptions(cookieHeader),
    );
  } catch (err: any) {
    if (err?.status === 403) {
      return notFound(); // ⬅️ Redirect ke halaman 404
    }

    throw err; // lempar error lainnya
  }

  return (
    <HydrationBoundary key="contact-list" state={dehydrate(queryClient)}>
      <ContactInformationProvider enabled>
        <div className="flex flex-col gap-6">
          <TitlePage
            description="Edit and manage Contact information for the website."
            title="Contact Information"
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
      </ContactInformationProvider>
    </HydrationBoundary>
  );
}
