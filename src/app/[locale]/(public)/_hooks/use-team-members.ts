import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";
import { TeamMemberResponse } from "@/types/website";

export function getQueryKey() {
  return ["team-members"];
}

export async function fetchInformation(
  headers?: Record<string, string>,
): Promise<TeamMemberResponse> {
  const res = await goFetcher.get<TeamMemberResponse>(`/api/team-members`, {
    headers,
  });

  return res;
}

// For SSR
export function getOptions(
  headers?: Record<string, string>,
): UseQueryOptions<TeamMemberResponse, Error> {
  return {
    queryKey: getQueryKey(),
    queryFn: () => fetchInformation(headers),
  };
}

// For client
export function useTeamMembers() {
  return useQuery({
    ...getOptions(),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
