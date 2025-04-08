"use client";

import { Image } from "@heroui/image";

import { useIsMobile } from "@/hooks/use-mobile";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full h-screen ">
      <Image
        alt="Hero"
        height="100%"
        isBlurred={false}
        radius="none"
        removeWrapper={true}
        src={
          isMobile
            ? "https://fakeimg.pl/800x1200"
            : "https://fakeimg.pl/1920x1080"
        }
        style={{ objectFit: "cover", objectPosition: "center" }}
        width="100%"
      />
    </div>
  );
}
