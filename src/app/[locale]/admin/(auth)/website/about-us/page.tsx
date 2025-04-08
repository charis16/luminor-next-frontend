import { ScrollShadow } from "@heroui/scroll-shadow";

import { AboutUsProvider } from "./_context/about-us-context";
import { ButtonSave, Form } from "./_components";

import { TitlePage } from "@/app/[locale]/admin/_components";

export default function AboutPage() {
  return (
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
  );
}
