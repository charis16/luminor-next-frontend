import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { UserDetail } from "@/types/user-lists";

// Key generator
export function getUserByUUIDKey(uuid: string) {
  return ["admin-user", uuid];
}

// Fetch function
export async function fetchUserByUUID(
  uuid: string,
  headers?: Record<string, string>,
): Promise<UserDetail> {
  const res = await goFetcher.get<{ data: UserDetail }>(
    `/api/admin/user/${uuid}`,
    {
      headers,
    },
  );

  return res.data;
}

// SSR-ready query options
export function getUserByUUIDOptions(
  uuid: string,
  headers?: Record<string, string>,
): UseQueryOptions<UserDetail, Error> {
  return {
    queryKey: getUserByUUIDKey(uuid),
    queryFn: () => fetchUserByUUID(uuid, headers),
  };
}

// Client-side hook
export function useUserByUUID(uuid?: string) {
  return useQuery({
    ...getUserByUUIDOptions(uuid || ""),
    enabled: !!uuid,
    placeholderData: (prev) => prev,
  });
}
