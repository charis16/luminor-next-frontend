// src/hooks/use-user-lists.ts
import { useQuery } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { User } from "@/types/user-lists";

type Response = {
  data: User[];
  total: number;
  page: number;
  limit: number;
};

export function useUserLists(page = 1, search = "", limit = 10) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  });

  return useQuery<Response>({
    queryKey: ["user-list", page, search],
    queryFn: () => goFetcher.get(`/api/user/lists?${params}`),
  });
}
