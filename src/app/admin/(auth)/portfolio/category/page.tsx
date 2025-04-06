import ButtonAdd from "./_components/button-add";
import CategorySearchInput from "./_components/category-search-input";
import TableData from "./_components/table-data";
import { CategoryProvider } from "./_context/category-context";

import TitlePage from "@/app/admin/_components/title-page";

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
