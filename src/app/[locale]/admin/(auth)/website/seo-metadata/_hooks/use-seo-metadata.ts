import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { SeoMetaDataResponse } from "@/types/seo-metadata";

export function getQueryKey() {
  return ["seo-metadata"];
}

export async function fetchInformation(
  headers?: Record<string, string>,
): Promise<SeoMetaDataResponse> {
  const res = await goFetcher.get<SeoMetaDataResponse>(
    `/api/admin/seo-metadata`,
    {
      headers,
    },
  );

  return res;
}

// For SSR
export function getOptions(
  headers?: Record<string, string>,
): UseQueryOptions<SeoMetaDataResponse, Error> {
  return {
    queryKey: getQueryKey(),
    queryFn: () => fetchInformation(headers),
  };
}

// For client
export function useSeoMetaDataLists(isMounted = true) {
  return useQuery({
    ...getOptions(),
    placeholderData: (prev) => prev,
    enabled: isMounted,
  });
}
