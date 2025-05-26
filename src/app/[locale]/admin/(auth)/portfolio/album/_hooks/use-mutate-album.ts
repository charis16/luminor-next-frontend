import { useMutation } from "@tanstack/react-query";

import { AlbumFormValues } from "../_type";

import { goFetcher, safeRawCall } from "@/utils/api";

interface MutateInput {
  uuid?: string;
  data: AlbumFormValues;
  mediaValue: {
    id?: string;
    url: string;
    isThumbnail?: boolean;
  }[];
}

export function useMutateAlbum() {
  return useMutation({
    mutationFn: async ({ uuid, data, mediaValue }: MutateInput) => {
      const formData = new FormData();

      formData.append(
        "slug",
        data.slug ?? data.title.toLowerCase().replace(/\s+/g, "-"),
      );
      formData.append("title", data.title);
      formData.append("category_id", data.category);
      formData.append("description", data.description);
      formData.append("user_id", data.author);
      formData.append("is_published", data.isPublished ? "true" : "false");

      if (data.thumbnail instanceof File) {
        formData.append("thumbnail", data.thumbnail);
      } else {
        if (data.thumbnail) {
          formData.append("thumbnail_url", data.thumbnail);
        }
        const mediaNonThumbnail = mediaValue.filter(
          (media) =>
            media.url !== data.thumbnail &&
            media.url !== undefined &&
            media.url !== null,
        );

        const mediaUrls = mediaNonThumbnail
          .map((media) => media.url)
          .filter((url) => url !== undefined && url !== null && url !== "");

        if (mediaUrls.length > 0) {
          formData.append("media_url", mediaUrls.join(","));
        }
      }

      if (Array.isArray(data.images)) {
        data.images.forEach((file, _) => {
          // Exclude thumbnail if it's the same File object
          if (
            file instanceof File &&
            !(data.thumbnail instanceof File && file === data.thumbnail)
          ) {
            formData.append("images", file);
          }
        });
      }

      const url = uuid ? `/api/admin/album/${uuid}` : "/api/admin/album";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          data: formData,
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to save album");
      }

      return res.data;
    },
  });
}
