import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { FaqListResponse } from "@/types/faq-lists";

export function getFaqListsQueryKey(page: number, search: string) {
  return ["admin-faq-list", page, search];
}

export async function fetchFaqLists(
  page: number,
  search: string,
  limit = 10,
  headers?: Record<string, string>,
): Promise<FaqListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  });

  const res = await goFetcher.get<FaqListResponse>(
    `/api/admin/faq/lists?${params.toString()}`,
    { headers },
  );

  return res;
}

// For SSR
export function getFaqListsOptions(
  page: number,
  search: string,
  limit = 10,
  headers?: Record<string, string>,
): UseQueryOptions<FaqListResponse, Error> {
  return {
    queryKey: getFaqListsQueryKey(page, search),
    queryFn: () => fetchFaqLists(page, search, limit, headers),
  };
}

// For client
export function useFaqLists(
  page = 1,
  search = "",
  limit = 10,
  isMounted = true,
) {
  return useQuery({
    staleTime: 1000 * 60 * 5,
    ...getFaqListsOptions(page, search, limit),
    placeholderData: (prev) => prev,
    enabled: isMounted,
  });
}
