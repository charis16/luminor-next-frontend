import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { ContactInformationResponse } from "@/types/contact-information";

export function getContactInformationQueryKey() {
  return ["contact-information"];
}

export async function fetchContactInformation(
  headers?: Record<string, string>,
): Promise<ContactInformationResponse> {
  const res = await goFetcher.get<ContactInformationResponse>(
    `/api/admin/contact-information`,
    {
      headers,
    },
  );

  return res;
}

// For SSR
export function getContactInformationOptions(
  headers?: Record<string, string>,
): UseQueryOptions<ContactInformationResponse, Error> {
  return {
    queryKey: getContactInformationQueryKey(),
    queryFn: () => fetchContactInformation(headers),
  };
}

// For client
export function useContactInformationLists(isMounted = true) {
  return useQuery({
    staleTime: 1000 * 60 * 5,
    ...getContactInformationOptions(),
    placeholderData: (prev) => prev,
    enabled: isMounted,
  });
}
