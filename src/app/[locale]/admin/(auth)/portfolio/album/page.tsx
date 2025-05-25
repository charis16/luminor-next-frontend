import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { AlbumData, AlbumSearchInput, ButtonAdd } from "./_components";
import { AlbumProvider } from "./_context";
import { getListsOptions } from "./_hooks/use-album-lists";

import getQueryClient from "@/utils/react-query";
import { TitlePage } from "@/app/[locale]/admin/_components";
import { getAuthCookieHeader } from "@/utils/get-cookies-server";

export default async function IndexPage() {
  const queryClient = getQueryClient();
  const cookieHeader = await getAuthCookieHeader();

  try {
    await queryClient.ensureQueryData(getListsOptions(1, "", 10, cookieHeader));
  } catch (err: any) {
    if (err?.status === 403 || err?.status === 404) {
      return notFound(); // ⬅️ Redirect ke halaman 404
    }

    throw err; // lempar error lainnya
  }

  return (
    <HydrationBoundary key="album-list" state={dehydrate(queryClient)}>
      <AlbumProvider>
        <div className="flex flex-col gap-6">
          <TitlePage
            description="Manage your photography collections easily"
            title="Albums"
          >
            <ButtonAdd />
          </TitlePage>

          <AlbumSearchInput />
          <AlbumData />
        </div>
      </AlbumProvider>
    </HydrationBoundary>
  );
}
