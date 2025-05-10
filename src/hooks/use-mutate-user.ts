import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeRawCall } from "@/utils/api";
import { UserFormValues } from "@/app/[locale]/admin/(auth)/setting/user/_type";

export function useCreateUser() {
  return useMutation({
    mutationFn: async (data: UserFormValues) => {
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

      const [res, err] = await safeRawCall(
        goFetcher.raw("/api/user/create", "POST", {
          data: formData,
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to create user");
      }

      return res.data; // misalnya { data: user }
    },
  });
}
