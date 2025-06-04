import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { UserBySlugResponse } from "@/types/website";

export function getQueryKey(slug: string) {
  return ["users-by-slug", slug];
}

export async function fetchInformation(
  slug: string,
  headers?: Record<string, string>,
): Promise<UserBySlugResponse> {
  const res = await goFetcher.get<UserBySlugResponse>(`/api/users/${slug}`, {
    headers,
  });

  return res;
}

// For SSR
export function getOptions(
  slug: string,
  headers?: Record<string, string>,
): UseQueryOptions<UserBySlugResponse, Error> {
  return {
    queryKey: getQueryKey(slug),
    queryFn: () => fetchInformation(slug, headers),
  };
}

// For client
export function useUserBySlug(slug: string) {
  return useQuery({
    ...getOptions(slug),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
    enabled: !!slug, // Ensure the query is only run if slug is defined
  });
}
