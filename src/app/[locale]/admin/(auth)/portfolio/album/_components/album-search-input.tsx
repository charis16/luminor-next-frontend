"use client";

import { useAlbumContext } from "../_context/album-context";

import InputSearch from "@/app/[locale]/admin/_components/input-search";

export default function AlbumSearchInput() {
  const { search, setSearch } = useAlbumContext();

  return <InputSearch value={search} onChange={setSearch} />;
}
