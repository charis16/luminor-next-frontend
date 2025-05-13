// hooks/use-user-lists.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { UserListResponse } from "@/types/user-lists";

export function getUserListsQueryKey(page: number, search: string) {
  return ["admin-user-list", page, search];
}

export async function fetchUserLists(
  page: number,
  search: string,
  limit = 10,
  headers?: Record<string, string>,
): Promise<UserListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  });

  const res = await goFetcher.get<UserListResponse>(
    `/api/admin/user/lists?${params.toString()}`,
    { headers },
  );

  return res;
}

// For SSR
export function getUserListsOptions(
  page: number,
  search: string,
  limit = 10,
  headers?: Record<string, string>,
): UseQueryOptions<UserListResponse, Error> {
  return {
    queryKey: getUserListsQueryKey(page, search),
    queryFn: () => fetchUserLists(page, search, limit, headers),
  };
}

// For client
export function useUserLists(
  page = 1,
  search = "",
  limit = 10,
  isMounted = true,
) {
  return useQuery({
    ...getUserListsOptions(page, search, limit),
    placeholderData: (prev) => prev,
    enabled: isMounted,
  });
}
