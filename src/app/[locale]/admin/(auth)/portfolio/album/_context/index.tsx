"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

import { AlbumContextType, FormHandle } from "../_type";
import { useAlbumLists } from "../_hooks/use-album-lists";

import { useIsMounted } from "@/hooks/use-is-mounted";

const AlbumContext = createContext<AlbumContextType | null>(null);

export function useAlbumContext() {
  const ctx = useContext(AlbumContext);

  if (!ctx) throw new Error("AlbumContext must be used within AlbumProvider");

  return ctx;
}

export const AlbumProvider = ({
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

  const { data, isLoading, isPending, refetch } = useAlbumLists(
    page,
    search,
    10,
    isMounted && enabled,
  );

  if (!isMounted) return null;

  return (
    <AlbumContext.Provider
      value={{
        albums: data?.data || [],
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
    </AlbumContext.Provider>
  );
};
