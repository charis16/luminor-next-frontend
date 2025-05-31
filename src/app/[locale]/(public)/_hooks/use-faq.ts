import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { FaqPublishedResponse } from "@/types/website";

export function getQueryKey() {
  return ["faqs"];
}

export async function fetchInformation(
  headers?: Record<string, string>,
): Promise<FaqPublishedResponse> {
  const res = await goFetcher.get<FaqPublishedResponse>(`/api/faq`, {
    headers,
  });

  return res;
}

// For SSR
export function getOptions(
  headers?: Record<string, string>,
): UseQueryOptions<FaqPublishedResponse, Error> {
  return {
    queryKey: getQueryKey(),
    queryFn: () => fetchInformation(headers),
  };
}

// For client
export function useFaq() {
  return useQuery({
    ...getOptions(),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
