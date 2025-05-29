import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { CategoryDetail } from "@/types/category-lists";

// Key generator
export function getCategoryOptionsKey() {
  return ["admin-category-options"];
}

// Fetch function
export async function fetchCategoryOptions(
  headers?: Record<string, string>,
): Promise<CategoryDetail[]> {
  const res = await goFetcher.get<{ data: CategoryDetail[] }>(
    `/api/admin/category/options`,
    {
      headers,
    },
  );

  return res.data;
}

// SSR-ready query options
export function getCategoryOptions(
  headers?: Record<string, string>,
): UseQueryOptions<CategoryDetail[], Error> {
  return {
    queryKey: getCategoryOptionsKey(),
    queryFn: () => fetchCategoryOptions(headers),
  };
}

// Client-side hook
export function useCategoryOption() {
  return useQuery({
    ...getCategoryOptions(),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
