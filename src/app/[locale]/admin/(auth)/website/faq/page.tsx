import { ButtonAdd, FaqSearchInput, TableData } from "./_components";
import { FaqProvider } from "./_context";

import { TitlePage } from "@/app/[locale]/admin/_components";

export default function FaqPage() {
  return (
    <FaqProvider>
      <div className="flex flex-col gap-6">
        <TitlePage
          description="Easily manage frequently asked questions for your website"
          title="FAQs"
        >
          <ButtonAdd />
        </TitlePage>

        <FaqSearchInput />
        <TableData />
      </div>
    </FaqProvider>
  );
}
