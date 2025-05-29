import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { UserDetail } from "@/types/user-lists";

// Key generator
export function getUserOptionsKey() {
  return ["admin-user-options"];
}

// Fetch function
export async function fetchUserOptions(
  headers?: Record<string, string>,
): Promise<UserDetail[]> {
  const res = await goFetcher.get<{ data: UserDetail[] }>(
    `/api/admin/user/options`,
    {
      headers,
    },
  );

  return res.data;
}

// SSR-ready query options
export function getUserOptions(
  headers?: Record<string, string>,
): UseQueryOptions<UserDetail[], Error> {
  return {
    queryKey: getUserOptionsKey(),
    queryFn: () => fetchUserOptions(headers),
  };
}

// Client-side hook
export function useUserOption() {
  return useQuery({
    staleTime: 1000 * 60 * 5,
    ...getUserOptions(),
    placeholderData: (prev) => prev,
  });
}
