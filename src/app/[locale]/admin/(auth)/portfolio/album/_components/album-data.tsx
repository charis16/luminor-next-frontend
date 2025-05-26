"use client";

import { ScrollShadow } from "@heroui/scroll-shadow";
import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import DOMPurify from "dompurify";

import { useAlbumContext } from "../_context";

import ButtonEdit from "./button-edit";
import ButtonDelete from "./button-delete";

export default function AlbumDataPage() {
  const { albums } = useAlbumContext();

  return (
    <ScrollShadow hideScrollBar className="h-[calc(100vh-20rem)]">
      <div className="grid grid-cols-1 gap-4">
        {albums.map((album) => (
          <Card
            key={album.uuid}
            isFooterBlurred
            className="w-full h-[500px] col-span-12 sm:col-span-7 relative"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                {album.category_name}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(album.description),
                }}
                className="text-white/90 font-medium text-xl"
              />
            </CardHeader>
            {album.thumbnail && (
              <Image
                removeWrapper
                alt={album.description}
                className="z-0 w-full h-full object-cover"
                src={album.thumbnail}
              />
            )}
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <div className="flex items-center gap-3 text-white">
                  <Image
                    alt={album.user_id}
                    className="w-8 h-8 rounded-full border border-white object-cover"
                    src={album.user_avatar || "/images/default-avatar.png"}
                  />
                  <span className="text-sm">{album.user_name}</span>
                </div>
              </div>
              <div className="inline-flex gap-4">
                <ButtonDelete uuid={album.uuid} />
                <ButtonEdit slug={album.uuid} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </ScrollShadow>
  );
}
