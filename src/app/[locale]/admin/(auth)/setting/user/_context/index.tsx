"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FormHandle, PAGE_SIZE, TEAMS, UserContextType } from "../_type";

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
    return TEAMS.filter((data) =>
      data.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  const pages = useMemo(() => {
    return result.length ? Math.ceil(result.length / PAGE_SIZE) : 0;
  }, [result]);

  const filteredUser = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return result.slice(start, start + PAGE_SIZE);
  }, [result, page]);

  return (
    <UserContext.Provider
      value={{
        users: TEAMS,
        filteredUser,
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
    </UserContext.Provider>
  );
};
