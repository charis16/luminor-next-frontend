import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { AboutUsDetailResponse } from "@/types/about-us";

export function getQueryKey() {
  return ["about-us-metadata"];
}

export async function fetchInformation(
  headers?: Record<string, string>,
): Promise<AboutUsDetailResponse> {
  const res = await goFetcher.get<AboutUsDetailResponse>(
    `/api/admin/about-us`,
    {
      headers,
    },
  );

  return res;
}

// For SSR
export function getOptions(
  headers?: Record<string, string>,
): UseQueryOptions<AboutUsDetailResponse, Error> {
  return {
    queryKey: getQueryKey(),
    queryFn: () => fetchInformation(headers),
  };
}

// For client
export function useAboutUse(isMounted = true) {
  return useQuery({
    ...getOptions(),
    placeholderData: (prev) => prev,
    enabled: isMounted,
  });
}
