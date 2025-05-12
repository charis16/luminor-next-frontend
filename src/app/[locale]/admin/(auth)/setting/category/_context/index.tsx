"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

import { CategoryContextType, CategoryFormHandle } from "../_type";
import { useCategoryLists } from "../_hooks/use-category-lists";

import { useIsMounted } from "@/hooks/use-is-mounted";

const CategoryContext = createContext<CategoryContextType | null>(null);

export function useCategoryContext() {
  const ctx = useContext(CategoryContext);

  if (!ctx)
    throw new Error("CategoryContext must be used within CategoryProvider");

  return ctx;
}

export const CategoryProvider = ({
  children,
  enabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const formRef = useRef<CategoryFormHandle>(null);
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

  const { data, isLoading, isPending, refetch } = useCategoryLists(
    page,
    search,
    10,
    isMounted && enabled,
  );

  return (
    <CategoryContext.Provider
      value={{
        categories: data?.data || [],
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
    </CategoryContext.Provider>
  );
};
