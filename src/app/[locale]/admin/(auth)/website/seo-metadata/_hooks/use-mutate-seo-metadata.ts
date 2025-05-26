import { useMutation } from "@tanstack/react-query";

import { SeoMetaDataFormValues } from "../_type";

import { goFetcher, safeCall, safeRawCall } from "@/utils/api";

interface MutateInput {
  uuid?: string;
  data: SeoMetaDataFormValues;
}

export function useMutateSeoMetaData() {
  return useMutation({
    mutationFn: async ({ uuid, data }: MutateInput) => {
      const formData = new FormData();

      formData.append("meta_description", data.metaDescription);
      formData.append("meta_keywords", data.metaKeywords?.join(",") ?? "");
      formData.append("meta_title", data.metaTitle);

      if (Array.isArray(data.ogImage) && data.ogImage[0] instanceof File) {
        formData.append("ogImage", data.ogImage[0]);
      }

      const url = uuid
        ? `/api/admin/seo-metadata/${uuid}`
        : "/api/admin/seo-metadata";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          data: formData,
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to save seo-metadata");
      }

      return res.data;
    },
  });
}

export function useDeleteOgImageMetaData() {
  return useMutation({
    mutationFn: async (uuid: MutateInput["uuid"]) => {
      if (!uuid) throw new Error("UUID is required to delete image website");

      const [res, err] = await safeCall(
        goFetcher.patch(`/api/admin/seo-metadata/${uuid}`, {
          status: "og_image",
        }),
      );

      if (err) {
        throw new Error(
          "Failed to delete og image website. Please try again later.",
        );
      }

      return res.data;
    },
  });
}
