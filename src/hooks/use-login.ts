// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";

import { goFetcher } from "@/utils/api";

interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginInput): Promise<LoginResponse> => {
      return await goFetcher.post<LoginResponse, LoginInput>(
        "/api/auth/login",
        data,
      );
    },
  });
}
