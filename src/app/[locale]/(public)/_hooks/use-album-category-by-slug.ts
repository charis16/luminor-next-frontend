import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { AlbumCategoryBySlugResponse } from "@/types/website";

export function getQueryKey(
  slug: string,
  filter: string = "all",
  page: number = 0,
) {
  return ["album-categories-by-slug", slug, filter, page];
}

export async function fetchInformation(
  slug: string,
  page: number = 0,
  filter: string = "all",
  headers?: Record<string, string>,
): Promise<AlbumCategoryBySlugResponse> {
  try {
    const res = await goFetcher.get<AlbumCategoryBySlugResponse>(
      `/api/album/category/${slug}?next=${page}&filter=${filter}`,
      {
        headers,
      },
    );

    return res;
  } catch (error) {
    throw error;
  }
}

// For SSR
export function getOptions(
  slug: string,
  filter: string = "all",
  page: number = 0,
  headers?: Record<string, string>,
): UseQueryOptions<AlbumCategoryBySlugResponse, Error> {
  return {
    queryKey: getQueryKey(slug, filter, page),
    queryFn: () => fetchInformation(slug, page, filter, headers),
  };
}

// For client
export function useAlbumCategoryBySlug(
  slug: string,
  filter: string = "all",
  page: number = 0,
) {
  return useQuery({
    ...getOptions(slug, filter, page),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
