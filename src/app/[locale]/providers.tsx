"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastProvider } from "@heroui/toast";
import { useState } from "react";

import { useIsMounted } from "@/hooks/use-is-mounted";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      <ToastProvider placement="top-right" toastOffset={60} />

      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      )}
    </QueryClientProvider>
  );
}

export default Providers;
