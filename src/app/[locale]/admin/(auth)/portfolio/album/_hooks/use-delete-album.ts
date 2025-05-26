import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeRawCall } from "@/utils/api";
import { AlbumDetail } from "@/types/album-lists";

interface MutateDeleteInput {
  uuid?: AlbumDetail["uuid"];
  urlImage?: string;
}

export function useDeleteAlbum() {
  return useMutation({
    mutationFn: async ({ uuid }: MutateDeleteInput) => {
      if (!uuid) throw new Error("UUID is required to delete album");

      const [res, err] = await safeRawCall(
        goFetcher.raw(`/api/admin/album/${uuid}`, "DELETE"),
      );

      if (err || !res?.data) {
        throw new Error("Failed to delete album. Please try again later.");
      }

      return res.data;
    },
  });
}

export function useDeleteImage() {
  return useMutation({
    mutationFn: async ({ uuid, urlImage }: MutateDeleteInput) => {
      if (!uuid) throw new Error("UUID is required to delete image");

      const [res, err] = await safeRawCall(
        goFetcher.raw(`/api/admin/album/${uuid}/image`, "PATCH", {
          data: { urlImage },
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );

      if (err || !res?.data) {
        throw new Error("Failed to delete image. Please try again later.");
      }

      return res.data;
    },
  });
}
