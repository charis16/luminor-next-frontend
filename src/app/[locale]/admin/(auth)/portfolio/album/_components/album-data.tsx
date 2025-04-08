"use client";

import { ScrollShadow } from "@heroui/scroll-shadow";
import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";

import { useAlbumContext } from "../_context/album-context";

import ButtonEdit from "./button-edit";

export default function AlbumDataPage() {
  const { filteredAlbums } = useAlbumContext();

  return (
    <ScrollShadow hideScrollBar className="h-[calc(100vh-20rem)]">
      <div className="grid grid-cols-1 gap-4">
        {filteredAlbums.map((album) => (
          <Card
            key={album.id}
            isFooterBlurred
            className="w-full h-[500px] col-span-12 sm:col-span-7"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                {album.category}
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                {album.description}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt={album.description}
              className="z-0 w-full h-full object-cover"
              src={album.thumbnail}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex items-center gap-3 text-white">
                  <Image
                    alt={album.authorName}
                    className="w-8 h-8 rounded-full border border-white object-cover"
                    src={album.authorAvatar}
                  />
                  <span className="text-sm">{album.authorName}</span>
                </div>
              </div>
              <ButtonEdit slug={album.slug} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollShadow>
  );
}
