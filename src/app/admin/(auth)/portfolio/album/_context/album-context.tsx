"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type Album = {
  id: number;
  category: string;
  slug: string;
  description: string;
  thumbnail: string;
  authorName: string;
  authorAvatar: string;
};

const ALBUMS: Album[] = [
  {
    id: 1,
    category: "Vacation",
    slug: "vacation",
    description: "Photos from my vacation",
    thumbnail: "https://heroui.com/images/card-example-5.jpeg",
    authorName: "John Doe",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    category: "Wedding",
    slug: "wedding",
    description: "Wedding ceremony memories",
    thumbnail: "https://heroui.com/images/card-example-3.jpeg",
    authorName: "Jane Smith",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    category: "Nature",
    slug: "nature",
    description: "Beautiful nature shots",
    thumbnail: "https://heroui.com/images/card-example-4.jpeg",
    authorName: "Alex Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

export interface AlbumFormHandle {
  submit: () => void;
}

type AlbumContextType = {
  albums: Album[];
  filteredAlbums: Album[];
  search: string;
  setSearch: (value: string) => void;
  formRef: React.RefObject<AlbumFormHandle>;
};

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
