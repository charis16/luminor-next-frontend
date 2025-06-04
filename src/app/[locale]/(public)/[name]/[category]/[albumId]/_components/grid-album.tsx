"use client";
import { useState } from "react";
import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { useAlbumDetailBySlug } from "@/app/[locale]/(public)/_hooks/use-album-detail-by-slug";

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Mulai dalam keadaan tidak terlihat dan turun ke bawah
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.02, ease: "easeOut" }, // Delay bertingkat untuk efek smooth
  }),
  exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeInOut" } }, // Efek keluar viewport
};

interface GridAlbumProps {
  slug: string;
}

export default function GridAlbum({ slug }: GridAlbumProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: selectedData } = useAlbumDetailBySlug(slug);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const images = selectedData?.data?.images || [];

  const handleZoomNext = () => {
    setZoomedIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  };

  const handleZoomPrev = () => {
    setZoomedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0,
    );
  };

  return (
    <>
      <div className="mx-auto flex flex-col gap-2 md:gap-6 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={cn(
                "relative group overflow-hidden cursor-zoom-in",
                hoveredIndex !== null &&
                  hoveredIndex !== index &&
                  "brightness-75",
              )}
              custom={index}
              exit="exit"
              initial="hidden"
              variants={itemVariants}
              viewport={{ once: false, amount: 0.2 }}
              whileInView="visible"
              onClick={() => setZoomedIndex(index)}
              onMouseEnter={() => setHoveredIndex(index)} // **Simpan indeks gambar yang di-hover**
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full aspect-[16/9] group overflow-hidden">
                <Image
                  fill
                  alt={`album ${index}`}
                  as={NextImage}
                  className="object-cover transition duration-300 group-hover:brightness-100"
                  isBlurred={false}
                  radius="none"
                  removeWrapper={true}
                  src={image || "/images/placeholder-image.webp"}
                />
              </div>
            </motion.div>
          ))}
        </div>
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
