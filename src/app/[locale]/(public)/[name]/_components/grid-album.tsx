"use client";

import { useState } from "react";

import GridAlbum from "../../_components/grid-album";
import { useAlbumCategoryBySlug } from "../../_hooks/use-album-category-by-slug";
import { useUserBySlug } from "../../_hooks/use-user-by-slug";

interface GridAlbumByUserProps {
  slug: string;
}

export default function GridAlbumByUser({ slug }: GridAlbumByUserProps) {
  const [selected, setSelected] = useState("all");

  const { data: userCategoryData } = useUserBySlug(slug);
  const { data: albumData } = useAlbumCategoryBySlug(selected, slug);

  const tabs =
    userCategoryData?.data?.categories?.map((cat) => ({
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
