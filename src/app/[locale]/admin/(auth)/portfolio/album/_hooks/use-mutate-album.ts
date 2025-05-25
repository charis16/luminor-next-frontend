import { useMutation } from "@tanstack/react-query";

import { AlbumFormValues } from "../_type";

import { goFetcher, safeRawCall } from "@/utils/api";

interface MutateInput {
  uuid?: string;
  data: AlbumFormValues;
}

export function useMutateAlbum() {
  return useMutation({
    mutationFn: async ({ uuid, data }: MutateInput) => {
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

      formData.append("thumbnail", data.thumbnail);
      if (Array.isArray(data.images)) {
        data.images.forEach((file, _) => {
          if (file instanceof File) {
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
