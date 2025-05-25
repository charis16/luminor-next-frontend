import { ScrollShadow } from "@heroui/scroll-shadow";

import { FaqProvider } from "../_context";
import { ButtonSave, Form } from "../_components";

import { TitlePage } from "@/app/[locale]/admin/_components";

export default function CreatePage() {
  return (
    <FaqProvider enabled={false}>
      <div className="flex flex-col gap-6">
        <TitlePage
          withBackButton
          description="Easily create and customize your FAQ entries"
          title="Create a New FAQ"
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
  );
}
