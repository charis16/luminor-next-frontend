import { ScrollShadow } from "@heroui/scroll-shadow";

import { ButtonSave, Form } from "../_components";
import { UserProvider } from "../_context";

import { TitlePage } from "@/app/[locale]/admin/_components";

export default function CreatePage() {
  return (
    <UserProvider>
      <div className="flex flex-col gap-6">
        <TitlePage
          withBackButton
          description="Easily create and customize your user"
          title="Create a New User"
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
    </UserProvider>
  );
}
