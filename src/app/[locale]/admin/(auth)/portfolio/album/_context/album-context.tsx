"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AlbumContextType, AlbumFormHandle, ALBUMS } from "../_type";

const AlbumContext = createContext<AlbumContextType | null>(null);

export function useAlbumContext() {
  const ctx = useContext(AlbumContext);

  if (!ctx) throw new Error("AlbumContext must be used within AlbumProvider");

  return ctx;
}

export const AlbumProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const formRef = useRef<AlbumFormHandle>(null); // ← ini ditaruh di dalam provider

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredAlbums = useMemo(() => {
    return ALBUMS.filter(
      (album) =>
        album.description
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        album.category.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        album.authorName.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  return (
    <AlbumContext.Provider
      value={{
        albums: ALBUMS,
        filteredAlbums,
        search,
        setSearch,
        formRef,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};
