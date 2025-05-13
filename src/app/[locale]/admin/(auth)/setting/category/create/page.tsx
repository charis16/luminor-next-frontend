import { ScrollShadow } from "@heroui/scroll-shadow";

import { CategoryProvider } from "../_context";
import ButtonSave from "../_components/button-save";
import CategoryForm from "../_components/form";

import TitlePage from "@/app/[locale]/admin/_components/title-page";

export default function CreateCategoryPage() {
  return (
    <CategoryProvider key="create category" enabled={false}>
      <div className="flex flex-col gap-6">
        <TitlePage
          withBackButton
          description="Easily create and customize your photo categories"
          title="Create a New Category"
        >
          <ButtonSave />
        </TitlePage>

        <ScrollShadow
          hideScrollBar
          className="max-h-[calc(100dvh-40dvh)] md:max-h-[calc(100dvh-25dvh)]"
        >
          <CategoryForm />
        </ScrollShadow>
      </div>
    </CategoryProvider>
  );
}
