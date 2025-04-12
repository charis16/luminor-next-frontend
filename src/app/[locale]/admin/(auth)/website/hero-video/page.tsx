import { ScrollShadow } from "@heroui/scroll-shadow";

import { TitlePage } from "../../../_components";

import { ButtonSave, Form } from "./_components";
import { HeroVideoProvider } from "./_context";

export default function HeroVideoPage() {
  return (
    <HeroVideoProvider>
      <div className="flex flex-col gap-6">
        <TitlePage
          description="Edit and manage Hero Video settings for the website."
          title="Hero Video"
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
    </HeroVideoProvider>
  );
}
