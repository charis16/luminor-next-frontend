import { useMutation } from "@tanstack/react-query";

import { ContactInformationSchemaFormValue } from "../_type";

import { goFetcher, safeRawCall } from "@/utils/api";

interface MutateContactInformationInput {
  uuid?: string;
  data: ContactInformationSchemaFormValue;
}

export function useMutateContactInformation() {
  return useMutation({
    mutationFn: async ({ uuid, data }: MutateContactInformationInput) => {
      const url = uuid
        ? `/api/admin/contact-information/${uuid}`
        : "/api/admin/contact-information";
      const method = uuid ? "PUT" : "POST";

      const [res, err] = await safeRawCall(
        goFetcher.raw(url, method, {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            address: data.address,
            phone_number: data.phoneNumber,
            latitude: data.latitude.toString(),
            longitude: data.longitude.toString(),
            url_instagram: data.urlInstagram,
            url_tiktok: data.urlTikTok,
            email: data.email,
          }),
        }),
      );

      if (err || !res?.data) {
        throw new Error(err?.message || "Failed to save contact information");
      }

      return res.data;
    },
  });
}
