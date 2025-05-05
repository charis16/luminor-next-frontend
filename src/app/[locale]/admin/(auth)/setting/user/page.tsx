import { ButtonAdd, TableData, TeamSearchInput } from "./_components";
import { UserProvider } from "./_context";

import { TitlePage } from "@/app/[locale]/admin/_components";

export default function UserPage() {
  return (
    <UserProvider>
      <div className="flex flex-col gap-6">
        <TitlePage
          description="Easily manage users for your website"
          title="Users"
        >
          <ButtonAdd />
        </TitlePage>

        <TeamSearchInput />
        <TableData />
      </div>
    </UserProvider>
  );
}
