import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { CategoryListResponse } from "@/types/category-lists";

export function getCategoryListsQueryKey(page: number, search: string) {
  return ["admin-category-list", page, search];
}

export async function fetchCategoryLists(
  page: number,
  search: string,
  limit = 10,
  headers?: Record<string, string>,
): Promise<CategoryListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  });

  const res = await goFetcher.get<CategoryListResponse>(
    `/api/admin/category/lists?${params.toString()}`,
    { headers },
  );

  return res;
}

// For SSR
export function getCategoryListsOptions(
  page: number,
  search: string,
  limit = 10,
  headers?: Record<string, string>,
): UseQueryOptions<CategoryListResponse, Error> {
  return {
    queryKey: getCategoryListsQueryKey(page, search),
    queryFn: () => fetchCategoryLists(page, search, limit, headers),
  };
}

// For client
export function useCategoryLists(
  page = 1,
  search = "",
  limit = 10,
  isMounted = true,
) {
  return useQuery({
    ...getCategoryListsOptions(page, search, limit),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
    enabled: isMounted,
  });
}
