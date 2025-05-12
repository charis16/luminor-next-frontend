"use client";

import { useCategoryContext } from "../_context/category-context";

import InputSearch from "@/app/[locale]/admin/_components/input-search";

export default function CategorySearchInput() {
  const { search, setSearch } = useCategoryContext();

  return <InputSearch value={search} onChange={setSearch} />;
}
