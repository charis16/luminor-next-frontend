"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

import { FormHandle, UserContextType } from "../_type";
import { useUserLists } from "../_hooks/use-user-lists";

import { useIsMounted } from "@/hooks/use-is-mounted";

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const ctx = useContext(UserContext);

  if (!ctx) throw new Error("UserContext must be used within userProvider");

  return ctx;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const formRef = useRef<FormHandle>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const isMounted = useIsMounted();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isPending, refetch } = useUserLists(
    page,
    search,
    10,
  );

  if (!isMounted) return null;

  return (
    <UserContext.Provider
      value={{
        users: data?.data || [],
        search,
        setSearch,
        formRef,
        isSubmitting,
        page,
        setPage,
        onSetIsSubmitting: setIsSubmitting,
        pages: data ? Math.ceil(data.total / data.limit) : 0,
        isLoading: isLoading || isPending,
        onRefetch: refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
