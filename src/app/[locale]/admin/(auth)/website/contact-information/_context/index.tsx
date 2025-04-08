"use client";

import { createContext, useContext, useRef } from "react";

import { ContactInformationContextType, FormHandle } from "../_type";

const ContactInformationContext =
  createContext<ContactInformationContextType | null>(null);

export function useContactInformationContext() {
  const ctx = useContext(ContactInformationContext);

  if (!ctx)
    throw new Error(
      "SeoMetadataContext must be used within SeoMetadataProvider",
    );

  return ctx;
}

export const ContactInformationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const formRef = useRef<FormHandle>(null);

  return (
    <ContactInformationContext.Provider
      value={{
        formRef,
      }}
    >
      {children}
    </ContactInformationContext.Provider>
  );
};
