import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { AlbumDetail } from "@/types/album-lists";

// Key generator
export function getFaqByUUIDKey(uuid: string) {
  return ["album-faq", uuid];
}

// Fetch function
export async function fetchAlbumByUUID(
  uuid: string,
  headers?: Record<string, string>,
): Promise<AlbumDetail> {
  const res = await goFetcher.get<{ data: AlbumDetail }>(
    `/api/admin/album/${uuid}`,
    {
      headers,
    },
  );

  return res.data;
}

// SSR-ready query options
export function getAlbumByUUIDOptions(
  uuid: string,
  headers?: Record<string, string>,
): UseQueryOptions<AlbumDetail, Error> {
  return {
    queryKey: getFaqByUUIDKey(uuid),
    queryFn: () => fetchAlbumByUUID(uuid, headers),
  };
}

// Client-side hook
export function useAlbumByUUID(uuid?: string) {
  return useQuery({
    ...getAlbumByUUIDOptions(uuid || ""),
    enabled: !!uuid,
    placeholderData: (prev) => prev,
  });
}
