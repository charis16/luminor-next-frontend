"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FaqContextType, FAQS, FormHandle, PAGE_SIZE } from "../_type";

const FaqContext = createContext<FaqContextType | null>(null);

export function useFaqContext() {
  const ctx = useContext(FaqContext);

  if (!ctx) throw new Error("FaqContext must be used within FaqProvider");

  return ctx;
}

export const FaqProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const formRef = useRef<FormHandle>(null);
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
    return FAQS.filter((faq) =>
      faq.question.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  const pages = useMemo(() => {
    return result.length ? Math.ceil(result.length / PAGE_SIZE) : 0;
  }, [result]);

  const filteredFaq = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return result.slice(start, start + PAGE_SIZE);
  }, [result, page]);

  return (
    <FaqContext.Provider
      value={{
        faq: FAQS,
        filteredFaq,
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
    </FaqContext.Provider>
  );
};
