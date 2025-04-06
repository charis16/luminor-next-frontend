import { ScrollShadow } from "@heroui/scroll-shadow";

import { CategoryProvider } from "../_context/category-context";
import ButtonSave from "../_components/button-save";
import CategoryForm from "../_components/form";

import TitlePage from "@/app/admin/_components/title-page";

export default function CreateCategoryPage() {
  return (
    <CategoryProvider>
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
          className="md:h-[calc(100vh-15rem)] h-[calc(100vh-19rem)]"
        >
          <CategoryForm />
        </ScrollShadow>
      </div>
    </CategoryProvider>
  );
}
