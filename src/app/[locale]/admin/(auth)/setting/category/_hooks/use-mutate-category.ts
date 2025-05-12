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
      const url = uuid ? `/api/category/${uuid}` : "/api/category/submit";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            name: data.category,
            is_published: data.isPublished,
          }),
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to save category");
      }

      return res.data;
    },
  });
}
