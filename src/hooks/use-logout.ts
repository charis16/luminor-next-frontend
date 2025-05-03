// hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await goFetcher.post("/api/auth/logout", {});
    },
  });
}
