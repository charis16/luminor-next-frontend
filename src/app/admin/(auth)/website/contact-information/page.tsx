import { ScrollShadow } from "@heroui/scroll-shadow";

import { ButtonSave, Form } from "./_components";
import { ContactInformationProvider } from "./_context";

import { TitlePage } from "@/app/admin/_components";

export default function ContactInformationPage() {
  return (
    <ContactInformationProvider>
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
  );
}
