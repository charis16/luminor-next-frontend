import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { CategoryDetail } from "@/types/category-lists";

// Key generator
export function getCategoryByUUIDKey(uuid: string) {
  return ["admin-category", uuid];
}

// Fetch function
export async function fetchCategoryByUUID(
  uuid: string,
  headers?: Record<string, string>,
): Promise<CategoryDetail> {
  const res = await goFetcher.get<{ data: CategoryDetail }>(
    `/api/admin/category/${uuid}`,
    {
      headers,
    },
  );

  return res.data;
}

// SSR-ready query options
export function getCategoryByUUIDOptions(
  uuid: string,
  headers?: Record<string, string>,
): UseQueryOptions<CategoryDetail, Error> {
  return {
    queryKey: getCategoryByUUIDKey(uuid),
    queryFn: () => fetchCategoryByUUID(uuid, headers),
  };
}

// Client-side hook
export function useCategoryByUUID(uuid?: string) {
  return useQuery({
    ...getCategoryByUUIDOptions(uuid || ""),
    staleTime: 1000 * 60 * 5,
    enabled: !!uuid,
    placeholderData: (prev) => prev,
  });
}
