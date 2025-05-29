import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { VideoResponse } from "@/types/video";

export function getQueryKey() {
  return ["hero-video"];
}

export async function fetchInformation(
  headers?: Record<string, string>,
): Promise<VideoResponse> {
  const res = await goFetcher.get<VideoResponse>(`/api/admin/hero-video`, {
    headers,
  });

  return res;
}

// For SSR
export function getOptions(
  headers?: Record<string, string>,
): UseQueryOptions<VideoResponse, Error> {
  return {
    queryKey: getQueryKey(),
    queryFn: () => fetchInformation(headers),
  };
}

// For client
export function useHeroVideo(isMounted = true) {
  return useQuery({
    staleTime: 1000 * 60 * 5,
    ...getOptions(),
    placeholderData: (prev) => prev,
    enabled: isMounted,
  });
}
