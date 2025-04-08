"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CategoryContextType,
  CategoryFormHandle,
  CATEGORIES,
  PAGE_SIZE,
} from "../_type";

const CategoryContext = createContext<CategoryContextType | null>(null);

export function useCategoryContext() {
  const ctx = useContext(CategoryContext);

  if (!ctx)
    throw new Error("CategoryContext must be used within CategoryProvider");

  return ctx;
}

export const CategoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const formRef = useRef<CategoryFormHandle>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const result = useMemo(() => {
    return CATEGORIES.filter((album) =>
      album.category.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  const pages = useMemo(() => {
    return result.length ? Math.ceil(result.length / PAGE_SIZE) : 0;
  }, [result]);

  const filteredCategories = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return result.slice(start, start + PAGE_SIZE);
  }, [result, page]);

  return (
    <CategoryContext.Provider
      value={{
        categories: CATEGORIES,
        filteredCategories,
        search,
        setSearch,
        formRef,
        page,
        setPage,
        pages,
        isLoading: false,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
