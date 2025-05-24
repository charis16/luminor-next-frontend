"use client";

import { createContext, useContext, useRef, useState } from "react";

import { FormHandle, HeroVideoContextType } from "../_type";
import { useHeroVideo } from "../_hooks/use-hero-video";

import { useIsMounted } from "@/hooks/use-is-mounted";

const HeroVideoContext = createContext<HeroVideoContextType | null>(null);

export function useHeroVideoContext() {
  const ctx = useContext(HeroVideoContext);

  if (!ctx)
    throw new Error(
      "useHeroVideoContext must be used within HeroVideoProvider",
    );

  return ctx;
}

export const HeroVideoProvider = ({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) => {
  const formRef = useRef<FormHandle>(null);
  const isMounted = useIsMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isPending, refetch } = useHeroVideo(
    isMounted && enabled,
  );

  if (!isMounted) return;

  return (
    <HeroVideoContext.Provider
      value={{
        formRef,
        data: data?.data || null,
        isLoading: isLoading || isPending,
        onRefetch: refetch,
        onSetIsSubmitting: setIsSubmitting,
        isSubmitting,
      }}
    >
      {children}
    </HeroVideoContext.Provider>
  );
};
