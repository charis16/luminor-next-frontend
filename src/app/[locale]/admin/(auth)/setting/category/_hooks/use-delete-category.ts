import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeCall, safeRawCall } from "@/utils/api";

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

export function useDeleteImageCategory() {
  return useMutation({
    mutationFn: async ({ uuid }: MutateCategoryDeleteInput) => {
      if (!uuid) throw new Error("UUID is required to delete image category");

      const [res, err] = await safeCall(
        goFetcher.patch(`/api/admin/category/${uuid}`, {}),
      );

      if (err) {
        throw new Error(
          "Failed to delete image category. Please try again later.",
        );
      }

      return res.data;
    },
  });
}
