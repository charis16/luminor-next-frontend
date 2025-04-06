"use client";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";

import { useAlbumContext } from "../_context/album-context";

export default function InputSearch() {
  const { search, setSearch } = useAlbumContext();

  return (
    <Input
      isClearable
      classNames={{
        innerWrapper: "bg-transparent",
      }}
      placeholder="Type to search..."
      radius="lg"
      startContent={<Search className="size-4" />}
      value={search}
      onValueChange={setSearch}
    />
  );
}
