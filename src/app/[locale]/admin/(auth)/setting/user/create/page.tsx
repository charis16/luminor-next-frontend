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
          urlBack="/admin/setting/user"
        >
          <ButtonSave />
        </TitlePage>

        <ScrollShadow
          hideScrollBar
          className="max-h-[calc(100dvh-40dvh)] md:max-h-[calc(100dvh-25dvh)]"
        >
          <Form />
        </ScrollShadow>
      </div>
    </UserProvider>
  );
}
