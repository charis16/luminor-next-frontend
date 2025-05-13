import { useMutation } from "@tanstack/react-query";

import { FaqFormValues } from "../_type";

import { goFetcher, safeRawCall } from "@/utils/api";

interface MutateFaqInput {
  uuid?: string;
  data: FaqFormValues;
}

export function useMutateFaq() {
  return useMutation({
    mutationFn: async ({ uuid, data }: MutateFaqInput) => {
      const url = uuid ? `/api/admin/faq/${uuid}` : "/api/admin/faq/submit";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            question_id: data.questionID,
            question_en: data.questionEN,
            answer_id: data.answerID,
            answer_en: data.answerEN,
            is_published: data.isPublished,
          }),
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to save faq");
      }

      return res.data;
    },
  });
}
