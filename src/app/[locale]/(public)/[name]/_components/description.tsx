"use client";

import DOMPurify from "dompurify";

interface DescriptionProps {
  description: string;
}
export default function Description({ description }: DescriptionProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(description),
      }}
      className="text-center md:text-left"
    />
  );
}
