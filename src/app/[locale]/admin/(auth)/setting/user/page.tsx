// app/[locale]/admin/users/page.tsx

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { UserProvider } from "./_context";
import { ButtonAdd, TableData, TeamSearchInput } from "./_components";

import { TitlePage } from "@/app/[locale]/admin/_components";
import getQueryClient from "@/utils/react-query";
import { getUserListsOptions } from "@/hooks/use-user-lists";
import { getAuthCookieHeader } from "@/utils/get-cookies-server";

export default async function UserPage() {
  const queryClient = getQueryClient();
  const cookieHeader = await getAuthCookieHeader();

  await queryClient.ensureQueryData(
    getUserListsOptions(1, "", 10, cookieHeader),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
