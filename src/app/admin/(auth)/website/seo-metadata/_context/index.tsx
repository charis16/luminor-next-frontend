"use client";

import { createContext, useContext, useRef } from "react";

import { FormHandle, SeoMetaDataContextType } from "../_type";

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
}: {
  children: React.ReactNode;
}) => {
  const formRef = useRef<FormHandle>(null);

  return (
    <SeoMetadataContext.Provider
      value={{
        formRef,
      }}
    >
      {children}
    </SeoMetadataContext.Provider>
  );
};
