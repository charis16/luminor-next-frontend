"use client";

import DOMPurify from "dompurify";

import { useAlbumDetailBySlug } from "@/app/[locale]/(public)/_hooks/use-album-detail-by-slug";

interface DescriptionProps {
  slug: string;
}
export default function Description({ slug }: DescriptionProps) {
  const { data: selectedData } = useAlbumDetailBySlug(slug);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(
          selectedData?.data?.description ||
            "This is a placeholder paragraph intended to represent where real content will eventually go. It demonstrates how text will appear on the layout, helping visualize structure, spacing, and flow before final copy is added. Feel free to replace this with actual content when available",
        ),
      }}
      className="absolute bottom-0 z-10 text-white mt-4 text-lg md:text-4xl p-3"
    />
  );
}
