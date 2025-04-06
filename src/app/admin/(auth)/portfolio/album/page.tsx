import ButtonAdd from "./_components/button-add";
import { AlbumProvider } from "./_context/album-context";
import AlbumDataPage from "./_components/album-data";
import AlbumSearchInput from "./_components/album-search-input";

import TitlePage from "@/app/admin/_components/title-page";

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
        <AlbumDataPage />
      </div>
    </AlbumProvider>
  );
}
