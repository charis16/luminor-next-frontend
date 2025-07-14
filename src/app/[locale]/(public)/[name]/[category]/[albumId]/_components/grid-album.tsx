"use client";

import { useEffect, useState } from "react";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Masonry from "react-masonry-css";

import { useAlbumDetailBySlug } from "@/app/[locale]/(public)/_hooks/use-album-detail-by-slug";
import ImageWithSkeleton from "@/app/_components/image-skeleton";

interface GridAlbumProps {
  slug: string;
}

export default function GridAlbum({ slug }: GridAlbumProps) {
  const {
    data: selectedData,
    isPending,
    isLoading,
  } = useAlbumDetailBySlug(slug);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const images = selectedData?.data?.images || [];
  const thumbnail = selectedData?.data?.thumbnail;
  const youtubeUrl = selectedData?.data?.youtube_url?.split(",") || [];

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    500: 1,
  };

  const [isClientLoading, setIsClientLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isPending) {
      const timeout = setTimeout(() => {
        setIsClientLoading(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, isPending]);

  const handleZoomNext = () => {
    setZoomedIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  };

  const handleZoomPrev = () => {
    setZoomedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0,
    );
  };

  // Combine images and YouTube URLs into a single array with type info
  const combinedMedia = [
    ...images.map((img) => ({ type: "image", url: img })),
    ...youtubeUrl
      .filter((url) => url?.trim())
      .map((url) => ({ type: "youtube", url: url.trim() })),
  ];

  const getYoutubeEmbedUrl = (url: string) => {
    try {
      // Handle different YouTube URL formats
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11
        ? `https://www.youtube.com/embed/${match[2]}`
        : null;
    } catch {
      return null;
    }
  };

  const renderMediaItem = (
    item: { type: string; url: string },
    index: number,
  ) => {
    if (item.type === "youtube") {
      const embedUrl = getYoutubeEmbedUrl(item.url);

      if (!embedUrl) return null;

      return (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <iframe
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 w-full h-full rounded-md"
            src={embedUrl}
            title={`YouTube video ${index}`}
          />
        </div>
      );
    }

    return (
      <div className="relative w-full min-h-full overflow-hidden">
        <ImageWithSkeleton
          fill
          alt={`album ${index}`}
          aspectRatio={undefined}
          className="!w-full !h-full"
          imageClassName="object-contain bg-black"
          rounded={false}
          src={item.url || "/images/placeholder-image.webp"}
          withShadow={false}
        />
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto flex flex-col gap-2 md:gap-6 md:py-6">
        <motion.div
          key={
            isLoading || isPending || isClientLoading ? "skeleton" : "content"
          }
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isLoading || isPending || isClientLoading ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  animate={{ opacity: 1 }}
                  className={`w-full bg-neutral-700 animate-pulse rounded-md ${
                    index % 3 === 0
                      ? "aspect-[3/4]"
                      : index % 3 === 1
                        ? "aspect-[4/3]"
                        : "aspect-[1/1]"
                  }`}
                  initial={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                />
              ))}
            </Masonry>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {combinedMedia
                .filter((item) => item.url !== thumbnail)
                .map((item, index) => (
                  <motion.div
                    key={index}
                    animate={{ opacity: 1 }}
                    className="overflow-hidden cursor-zoom-in brightness-90 hover:brightness-100 transition-all duration-300"
                    custom={index}
                    exit="exit"
                    initial={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setZoomedIndex(index)}
                  >
                    {renderMediaItem(item, index)}
                  </motion.div>
                ))}
            </Masonry>
          )}
        </motion.div>
      </div>
      <Modal
        hideCloseButton
        backdrop="blur"
        className="z-50 relative"
        isOpen={zoomedIndex !== null}
        placement="center"
        size="full"
        onClick={() => {
          // Blur input aktif (tutup keyboard)
          if (
            typeof document !== "undefined" &&
            document.activeElement instanceof HTMLElement
          ) {
            document.activeElement.blur();
          }
        }}
      >
        <ModalContent>
          {() => (
            <ModalBody className="relative flex items-center justify-center ">
              <Button
                isIconOnly
                className="absolute top-4 right-0 z-[999] bg-transparent cursor-pointer"
                size="sm"
                onPress={() => setZoomedIndex(null)}
              >
                <X className="text-white w-4 h-4" />
              </Button>
              <Button
                isIconOnly
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 p-1"
                size="sm"
                onPress={handleZoomPrev}
              >
                <ChevronLeft className="text-white w-4 h-4" />
              </Button>

              {/* Gambar */}
              {zoomedIndex !== null && (
                <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
                  <Image
                    fill
                    alt="Zoomed"
                    as={NextImage}
                    className="object-contain rounded-md shadow-lg"
                    radius="none"
                    removeWrapper={true}
                    src={
                      images[zoomedIndex] || "/images/placeholder-image.webp"
                    }
                  />
                </div>
              )}

              {/* Tombol next */}
              <Button
                isIconOnly
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 p-1"
                size="sm"
                onPress={handleZoomNext}
              >
                <ChevronRight className="text-white w-4 h-4" />
              </Button>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
