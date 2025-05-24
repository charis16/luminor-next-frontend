import { useMutation } from "@tanstack/react-query";

import { AboutUsFormValues } from "../_type";

import { goFetcher, safeRawCall } from "@/utils/api";

interface MutateInput {
  uuid?: string;
  data: AboutUsFormValues; // Assuming this is imported from the correct path
}

export function useMutateAboutUs() {
  return useMutation({
    mutationFn: async ({ uuid, data }: MutateInput) => {
      const url = uuid
        ? `/api/admin/about-us/${uuid}`
        : "/api/admin/about-us/submit";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            about_us_id: data.aboutUsId,
            about_us_en: data.aboutUsEn,
            about_us_brief_home_id: data.aboutUsBriefHomeId,
            about_us_brief_home_en: data.aboutUsBriefHomeEn,
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
