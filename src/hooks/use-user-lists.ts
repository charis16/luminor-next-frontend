import { queryOptions, useQuery } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";

export function getUserListsOptions(
  page = 1,
  search = "",
  limit = 10,
  headers?: Record<string, string>,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  });

  return queryOptions({
    queryKey: ["user-list", page, search],
    queryFn: () =>
      goFetcher.get(`/api/user/lists?${params.toString()}`, {
        headers,
      }),
    placeholderData: (prev) => prev,
  });
}

export function useUserLists(page = 1, search = "", limit = 10) {
  return useQuery(getUserListsOptions(page, search, limit));
}

// expose getOptions
useUserLists.getOptions = getUserListsOptions;
