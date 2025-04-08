"use client";

import { useFaqContext } from "../_context";

import InputSearch from "@/app/[locale]/admin/_components/input-search";

export default function CategorySearchInput() {
  const { search, setSearch } = useFaqContext();

  return <InputSearch value={search} onChange={setSearch} />;
}
