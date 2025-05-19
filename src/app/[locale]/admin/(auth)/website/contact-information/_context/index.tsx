"use client";

import { createContext, useContext, useRef, useState } from "react";

import { ContactInformationContextType, FormHandle } from "../_type";
import { useContactInformationLists } from "../_hooks/use-contact-information";

import { useIsMounted } from "@/hooks/use-is-mounted";

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
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) => {
  const formRef = useRef<FormHandle>(null);
  const isMounted = useIsMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isPending, refetch } = useContactInformationLists(
    isMounted && enabled,
  );

  return (
    <ContactInformationContext.Provider
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
    </ContactInformationContext.Provider>
  );
};
