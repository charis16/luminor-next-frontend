"use client";

import { createContext, useContext, useRef, useState } from "react";

import { FormHandle, SeoMetaDataContextType } from "../_type";
import { useSeoMetaDataLists } from "../_hooks/use-seo-metadata";

import { useIsMounted } from "@/hooks/use-is-mounted";

const SeoMetadataContext = createContext<SeoMetaDataContextType | null>(null);

export function useSeoMetadataContext() {
  const ctx = useContext(SeoMetadataContext);

  if (!ctx)
    throw new Error(
      "SeoMetadataContext must be used within SeoMetadataProvider",
    );

  return ctx;
}

export const SeoMetadataProvider = ({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) => {
  const formRef = useRef<FormHandle>(null);
  const isMounted = useIsMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isPending, refetch } = useSeoMetaDataLists(
    isMounted && enabled,
  );

  if (!isMounted) return;

  return (
    <SeoMetadataContext.Provider
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
    </SeoMetadataContext.Provider>
  );
};
