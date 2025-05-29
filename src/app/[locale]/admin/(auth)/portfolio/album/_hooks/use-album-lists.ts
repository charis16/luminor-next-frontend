import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { AlbumListResponse } from "@/types/album-lists";

export function getQueryKey(page: number, search: string) {
  return ["admin-album-list", page, search];
}

export async function fetchLists(
  page: number,
  search: string,
  limit = 10,
  headers?: Record<string, string>,
): Promise<AlbumListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  });

  const res = await goFetcher.get<AlbumListResponse>(
    `/api/admin/album?${params.toString()}`,
    { headers },
  );

  return res;
}

// For SSR
export function getListsOptions(
  page: number,
  search: string,
  limit = 10,
  headers?: Record<string, string>,
): UseQueryOptions<AlbumListResponse, Error> {
  return {
    queryKey: getQueryKey(page, search),
    queryFn: () => fetchLists(page, search, limit, headers),
  };
}

// For client
export function useAlbumLists(
  page = 1,
  search = "",
  limit = 10,
  isMounted = true,
) {
  return useQuery({
    ...getListsOptions(page, search, limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
    enabled: isMounted,
  });
}
