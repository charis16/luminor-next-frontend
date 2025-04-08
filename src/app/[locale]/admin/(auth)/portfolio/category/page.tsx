import { ButtonAdd, CategorySearchInput, TableData } from "./_components";
import { CategoryProvider } from "./_context/category-context";

import { TitlePage } from "@/app/[locale]/admin/_components";

export default function CategoryPage() {
  return (
    <CategoryProvider>
      <div className="flex flex-col gap-6">
        <TitlePage
          description="Manage your category album collections easily"
          title="Categories"
        >
          <ButtonAdd />
        </TitlePage>

        <CategorySearchInput />
        <TableData />
      </div>
    </CategoryProvider>
  );
}
