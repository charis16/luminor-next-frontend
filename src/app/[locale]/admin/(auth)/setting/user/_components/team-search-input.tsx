"use client";

import { useUserContext } from "../_context";

import InputSearch from "@/app/[locale]/admin/_components/input-search";

export default function TeamSearchInput() {
  const { search, setSearch } = useUserContext();

  return <InputSearch value={search} onChange={setSearch} />;
}
