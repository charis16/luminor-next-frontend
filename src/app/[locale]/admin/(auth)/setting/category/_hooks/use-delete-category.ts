import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeRawCall } from "@/utils/api";

interface MutateCategoryDeleteInput {
  uuid?: string;
}

export function useDeleteCategory() {
  return useMutation({
    mutationFn: async ({ uuid }: MutateCategoryDeleteInput) => {
      if (!uuid) throw new Error("UUID is required to delete category");

      const [res, err] = await safeRawCall(
        goFetcher.raw(`/api/admin/category/${uuid}`, "DELETE"),
      );

      if (err || !res?.data) {
        throw new Error("Failed to delete category. Please try again later.");
      }

      return res.data;
    },
  });
}
