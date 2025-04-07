import { ScrollShadow } from "@heroui/scroll-shadow";

import { SeoMetadataProvider } from "./_context";
import { ButtonSave, Form } from "./_components";

import { TitlePage } from "@/app/admin/_components";

export default function SeoMetadataPage() {
  return (
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
  );
}
