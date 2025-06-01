import { useMutation } from "@tanstack/react-query";

import { CategoryFormValues } from "../_type";

import { goFetcher, safeRawCall } from "@/utils/api";

interface MutateCategoryInput {
  uuid?: string;
  data: CategoryFormValues;
}

export function useMutateCategory() {
  return useMutation({
    mutationFn: async ({ uuid, data }: MutateCategoryInput) => {
      const formData = new FormData();

      formData.append(
        "slug",
        data.slug ?? data.category.toLowerCase().replace(/\s+/g, "-"),
      );
      formData.append("name", data.category);
      formData.append("description", data.description);
      formData.append("is_published", data.isPublished ? "1" : "0");

      if (Array.isArray(data.image) && data.image[0] instanceof File) {
        formData.append("image", data.image[0]);
      }

      const url = uuid
        ? `/api/admin/category/${uuid}`
        : "/api/admin/category/submit";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          data: formData,
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to save category");
      }

      return res.data;
    },
  });
}
