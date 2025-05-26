import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeCall, safeRawCall } from "@/utils/api";

interface MutateUserDeleteInput {
  uuid?: string;
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: async ({ uuid }: MutateUserDeleteInput) => {
      if (!uuid) throw new Error("UUID is required to delete user");

      const [res, err] = await safeRawCall(
        goFetcher.raw(`/api/admin/user/${uuid}`, "DELETE"),
      );

      if (err || !res?.data) {
        throw new Error("Failed to delete user. Please try again later.");
      }

      return res.data;
    },
  });
}

export function useDeleteImageUser() {
  return useMutation({
    mutationFn: async ({ uuid }: MutateUserDeleteInput) => {
      if (!uuid) throw new Error("UUID is required to delete image user");

      const [res, err] = await safeCall(
        goFetcher.patch(`/api/admin/user/${uuid}`, {}),
      );

      if (err) {
        throw new Error("Failed to delete image user. Please try again later.");
      }

      return res.data;
    },
  });
}
