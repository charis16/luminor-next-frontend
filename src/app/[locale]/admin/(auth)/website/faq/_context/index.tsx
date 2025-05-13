"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

import { FaqContextType, FormHandle } from "../_type";
import { useFaqLists } from "../_hooks/use-faq-lists";

import { useIsMounted } from "@/hooks/use-is-mounted";

const FaqContext = createContext<FaqContextType | null>(null);

export function useFaqContext() {
  const ctx = useContext(FaqContext);

  if (!ctx) throw new Error("FaqContext must be used within FaqProvider");

  return ctx;
}

export const FaqProvider = ({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const formRef = useRef<FormHandle>(null);
  const [page, setPage] = useState(1);
  const isMounted = useIsMounted();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isPending, refetch } = useFaqLists(
    page,
    search,
    10,
    isMounted && enabled,
  );

  return (
    <FaqContext.Provider
      value={{
        faq: data?.data || [],
        search,
        isSubmitting,
        setSearch,
        formRef,
        page,
        setPage,
        onSetIsSubmitting: setIsSubmitting,
        pages: data ? Math.ceil(data.total / data.limit) : 0,
        isLoading: isLoading || isPending,
        onRefetch: refetch,
      }}
    >
      {children}
    </FaqContext.Provider>
  );
};
