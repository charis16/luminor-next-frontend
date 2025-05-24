import { useMutation } from "@tanstack/react-query";

import { HeroVideoSchemaFormValue } from "../_type";

import { goFetcher, safeCall, safeRawCall } from "@/utils/api";

interface MutateInput {
  uuid?: string;
  data: HeroVideoSchemaFormValue;
}

export function useMutateHeroVideo() {
  return useMutation({
    mutationFn: async ({ uuid, data }: MutateInput) => {
      const formData = new FormData();

      if (Array.isArray(data.videoWeb) && data.videoWeb[0] instanceof File) {
        formData.append("video_web", data.videoWeb[0]);
      }

      if (
        Array.isArray(data.videoMobile) &&
        data.videoMobile[0] instanceof File
      ) {
        formData.append("video_mobile", data.videoMobile[0]);
      }

      const url = uuid
        ? `/api/admin/hero-video/${uuid}`
        : "/api/admin/hero-video";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          data: formData,
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to save hero-video");
      }

      return res.data;
    },
  });
}

export function useDeleteVideo() {
  return useMutation({
    mutationFn: async ({
      uuid,
      status,
    }: {
      uuid?: MutateInput["uuid"];
      status: string;
    }) => {
      if (!uuid) throw new Error("UUID is required to delete image website");

      const [res, err] = await safeCall(
        goFetcher.patch(`/api/admin/hero-video/${uuid}`, {
          status,
        }),
      );

      if (err) {
        throw new Error(
          "Failed to delete video website. Please try again later.",
        );
      }

      return res.data;
    },
  });
}
