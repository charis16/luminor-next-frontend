// lib/react-query.ts
import { QueryClient } from "@tanstack/react-query";

// Buat singleton agar tidak bikin instance baru setiap render
let queryClient: QueryClient | null = null;

export default function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient();
  }

  return queryClient;
}
