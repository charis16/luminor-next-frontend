"use client";

import { useLocale } from "next-intl";
import DOMPurify from "dompurify";

import { useWebsites } from "../../_hooks/use-website";

export default function Description() {
  const { data } = useWebsites();
  const locale = useLocale();

  const descriptionId = data?.data?.about_us_id;
  const descriptionEn = data?.data?.about_us_en;

  const localizedDescription = locale === "en" ? descriptionEn : descriptionId;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(
          localizedDescription ||
            "This is a placeholder paragraph intended to represent where real content will eventually go. It demonstrates how text will appear on the layout, helping visualize structure, spacing, and flow before final copy is added. Feel free to replace this with actual content when available",
        ),
      }}
      className=" text-neutral-400"
    />
  );
}
