import { AlbumData, AlbumSearchInput, ButtonAdd } from "./_components";
import { AlbumProvider } from "./_context/album-context";

import { TitlePage } from "@/app/admin/_components";

export default function IndexPage() {
  return (
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
  );
}
