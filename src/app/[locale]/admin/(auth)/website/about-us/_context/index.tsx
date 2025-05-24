"use client";

import { createContext, useContext, useRef, useState } from "react";

import { AboutUsContextType, FormHandle } from "../_type";
import { useAboutUse } from "../_hooks/use-about-us";

import { useIsMounted } from "@/hooks/use-is-mounted";

const AboutUsContext = createContext<AboutUsContextType | null>(null);

export function useAboutUsContext() {
  const ctx = useContext(AboutUsContext);

  if (!ctx)
    throw new Error("AboutUsContext must be used within AboutUsProvider");

  return ctx;
}

export const AboutUsProvider = ({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) => {
  const formRef = useRef<FormHandle>(null);
  const isMounted = useIsMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isPending, refetch } = useAboutUse(
    isMounted && enabled,
  );

  if (!isMounted) return;

  return (
    <AboutUsContext.Provider
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
    </AboutUsContext.Provider>
  );
};
