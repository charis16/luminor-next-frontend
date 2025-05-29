"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/system";
import { useState } from "react";
import { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ToastProvider
            placement="top-right"
            toastOffset={60}
            toastProps={{
              timeout: 1000,
              hideIcon: true,
              classNames: {
                closeButton:
                  "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
              },
              shouldShowTimeoutProgress: true,
            }}
          />

          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} position="right" />
          )}
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export default Providers;
