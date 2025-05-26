import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeRawCall } from "@/utils/api";
import { AlbumDetail } from "@/types/album-lists";

interface MutateFaqDeleteInput {
  uuid?: AlbumDetail["uuid"];
}

export function useDeleteAlbum() {
  return useMutation({
    mutationFn: async ({ uuid }: MutateFaqDeleteInput) => {
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
