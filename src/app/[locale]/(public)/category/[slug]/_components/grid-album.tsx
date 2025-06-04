"use client";

import { useState } from "react";

import { useCategoryBySlug } from "../../../_hooks/use-category-by-slug";
import { useAlbumCategoryBySlug } from "../../../_hooks/use-album-category-by-slug";
import GridAlbum from "../../../_components/grid-album";

interface GridAlbumByUserProps {
  slug: string;
}

export default function GridAlbumByUser({ slug }: GridAlbumByUserProps) {
  const [selected, setSelected] = useState("all");

  const { data: categoryUserData } = useCategoryBySlug(slug);
  const { data: albumData } = useAlbumCategoryBySlug(slug, selected);

  const tabs =
    categoryUserData?.data?.users?.map((cat) => ({
      key: cat.slug,
      label: cat.name,
    })) ?? [];

  return (
    <GridAlbum
      albumData={albumData}
      selected={selected}
      showTab={true}
      slug={slug}
      tabs={tabs}
      onSelectedChange={setSelected}
    />
  );
}
