import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { CategoryBySlugResponse } from "@/types/website";

export function getQueryKey(slug: string) {
  return ["categories-by-slug", slug];
}

export async function fetchInformation(
  slug: string,
  headers?: Record<string, string>,
): Promise<CategoryBySlugResponse> {
  const res = await goFetcher.get<CategoryBySlugResponse>(
    `/api/categories/${slug}`,
    {
      headers,
    },
  );

  return res;
}

// For SSR
export function getOptions(
  slug: string,
  headers?: Record<string, string>,
): UseQueryOptions<CategoryBySlugResponse, Error> {
  return {
    queryKey: getQueryKey(slug),
    queryFn: () => fetchInformation(slug, headers),
  };
}

// For client
export function useCategoryBySlug(slug: string) {
  return useQuery({
    ...getOptions(slug),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
    enabled: !!slug, // Ensure the query is only run if slug is defined
  });
}
