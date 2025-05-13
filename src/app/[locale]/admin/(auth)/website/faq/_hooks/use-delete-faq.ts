import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeRawCall } from "@/utils/api";

interface MutateFaqDeleteInput {
  uuid?: string;
}

export function useDeleteFaq() {
  return useMutation({
    mutationFn: async ({ uuid }: MutateFaqDeleteInput) => {
      if (!uuid) throw new Error("UUID is required to delete faq");

      const [res, err] = await safeRawCall(
        goFetcher.raw(`/api/admin/faq/${uuid}`, "DELETE"),
      );

      if (err || !res?.data) {
        throw new Error("Failed to delete faq. Please try again later.");
      }

      return res.data;
    },
  });
}
