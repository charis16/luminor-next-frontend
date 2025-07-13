"use client";

import { useState } from "react";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import { cn } from "@heroui/theme";

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  rounded?: boolean;
  withShadow?: boolean;
  aspectRatio?: string;
  imageClassName?: string;
  priority?: boolean;
};

export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  fill = false,
  rounded = true,
  priority = false,
  withShadow = true,
  aspectRatio = "aspect-[3/4]",
  imageClassName = "",
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full",
        aspectRatio,
        rounded && "rounded-md overflow-hidden",
        withShadow && "shadow-md",
        className,
      )}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-700 animate-pulse z-0" />
      )}

      <Image
        removeWrapper
        alt={alt}
        as={NextImage}
        className={cn(
          "absolute inset-0  transition-opacity duration-300 ",
          imageClassName,
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        fill={fill}
        isBlurred={false}
        priority={priority}
        radius="none"
        sizes={
          fill
            ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            : undefined
        }
        src={src}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
