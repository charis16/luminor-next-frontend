import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { WebsiteMetadataResponse } from "@/types/website";

export function getQueryKey() {
  return ["websites"];
}

export async function fetchInformation(
  headers?: Record<string, string>,
): Promise<WebsiteMetadataResponse> {
  const res = await goFetcher.get<WebsiteMetadataResponse>(`/api/website`, {
    headers,
  });

  return res;
}

// For SSR
export function getOptions(
  headers?: Record<string, string>,
): UseQueryOptions<WebsiteMetadataResponse, Error> {
  return {
    queryKey: getQueryKey(),
    queryFn: () => fetchInformation(headers),
  };
}

// For client
export function useWebsites() {
  return useQuery({
    ...getOptions(),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
