import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { CategoryResponse } from "@/types/website";

export function getQueryKey() {
  return ["categories"];
}

export async function fetchInformation(
  headers?: Record<string, string>,
): Promise<CategoryResponse> {
  const res = await goFetcher.get<CategoryResponse>(`/api/categories`, {
    headers,
  });

  return res;
}

// For SSR
export function getOptions(
  headers?: Record<string, string>,
): UseQueryOptions<CategoryResponse, Error> {
  return {
    queryKey: getQueryKey(),
    queryFn: () => fetchInformation(headers),
  };
}

// For client
export function useCategories() {
  return useQuery({
    ...getOptions(),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
