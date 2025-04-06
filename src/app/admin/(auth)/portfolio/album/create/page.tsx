import { ScrollShadow } from "@heroui/scroll-shadow";

import AlbumForm from "../_components/form";
import { AlbumProvider } from "../_context/album-context";
import ButtonSave from "../_components/button-save";

import TitlePage from "@/app/admin/_components/title-page";

export default async function AlbumCreatePage() {
  return (
    <AlbumProvider>
      <div className="flex flex-col gap-6">
        <TitlePage
          withBackButton
          description="Organize and manage your photo albums effortlessly"
          title="Create a New Album"
        >
          <ButtonSave />
        </TitlePage>

        <ScrollShadow
          hideScrollBar
          className="md:h-[calc(100vh-15rem)] h-[calc(100vh-19rem)]"
        >
          <AlbumForm />
        </ScrollShadow>
      </div>
    </AlbumProvider>
  );
}
