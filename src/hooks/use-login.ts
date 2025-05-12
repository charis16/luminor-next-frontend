// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";

import { goFetcher, safeCall } from "@/utils/api";

interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginInput): Promise<LoginResponse> => {
      const [res, err] = await safeCall(
        goFetcher.post("/api/auth/admin/login", data),
      );

      if (err) {
        // Biar bisa ditangani di onError React Query
        throw new Error(err.message || "Login failed");
      }

      return res.data;
    },
  });
}
