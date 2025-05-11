import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeRawCall } from "@/utils/api";
import { UserFormValues } from "@/app/[locale]/admin/(auth)/setting/user/_type";

interface MutateUserInput {
  uuid?: string;
  data: UserFormValues;
}

export function useMutateUser() {
  return useMutation({
    mutationFn: async ({ uuid, data }: MutateUserInput) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("role", data.role);
      formData.append("description", data.description || "");
      formData.append("phone_number", data.phoneNumber || "");
      formData.append("url_instagram", data.urlInstagram || "");
      formData.append("url_tikTok", data.urlTikTok || "");
      formData.append("url_facebook", data.urlFacebook || "");
      formData.append("url_youtube", data.urlYoutube || "");
      formData.append("is_published", data.isPublished ? "true" : "false");
      formData.append("canLogin", data.canLogin ? "true" : "false");
      formData.append("password", data.password || "");

      if (Array.isArray(data.photo) && data.photo[0] instanceof File) {
        formData.append("photo", data.photo[0]);
      }

      const url = uuid ? `/api/user/${uuid}` : "/api/user/submit";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          data: formData,
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to save user");
      }

      return res.data;
    },
  });
}
