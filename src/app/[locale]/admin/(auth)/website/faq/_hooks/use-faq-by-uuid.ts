import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { FaqDetail } from "@/types/faq-lists";

// Key generator
export function getFaqByUUIDKey(uuid: string) {
  return ["admin-faq", uuid];
}

// Fetch function
export async function fetchFaqByUUID(
  uuid: string,
  headers?: Record<string, string>,
): Promise<FaqDetail> {
  const res = await goFetcher.get<{ data: FaqDetail }>(
    `/api/admin/faq/${uuid}`,
    {
      headers,
    },
  );

  return res.data;
}

// SSR-ready query options
export function getFaqByUUIDOptions(
  uuid: string,
  headers?: Record<string, string>,
): UseQueryOptions<FaqDetail, Error> {
  return {
    queryKey: getFaqByUUIDKey(uuid),
    queryFn: () => fetchFaqByUUID(uuid, headers),
  };
}

// Client-side hook
export function useFaqByUUID(uuid?: string) {
  return useQuery({
    staleTime: 1000 * 60 * 5,
    ...getFaqByUUIDOptions(uuid || ""),
    enabled: !!uuid,
    placeholderData: (prev) => prev,
  });
}
