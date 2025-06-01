"use client";
import { Tab, Tabs } from "@heroui/tabs";
import { useState } from "react";
import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import NextImage from "next/image";

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
  showTab: boolean;
}

export default function GridAlbum({ showTab }: GridAlbumProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState("all");
  const { name } = useParams();

  return (
    <div className="mx-auto flex flex-col gap-6 py-6">
      <div className="sticky top-[70px] z-30 transition-colors duration-300 backdrop-blur-sm py-4 bg-[#16151D]/50">
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Tabs
            aria-label="Tabs category"
            selectedKey={selected}
            size="md"
            variant="underlined"
            onSelectionChange={(key) => setSelected(key.toString())}
          >
            <Tab key="all" className="text-xl" title="All" />
            <Tab key="wedding" className="text-xl" title="Wedding" />
            <Tab key="pre-wedding" className="text-xl" title="Pre Wedding" />
            <Tab key="family" className="text-xl" title="Family" />
            <Tab key="maternity" className="text-xl" title="Maternity" />
            <Tab key="engagement" className="text-xl" title="Engagement" />
            {/* Tambah lebih banyak tab jika perlu */}
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {Array.from({ length: 100 }, (_, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative group overflow-hidden cursor-pointer",
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
            onMouseEnter={() => setHoveredIndex(index)} // **Simpan indeks gambar yang di-hover**
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link passHref href={`/${name}/${selected}/${index + 1}`}>
              <div className="relative w-full aspect-[16/9] group overflow-hidden">
                <Image
                  fill
                  alt={`album ${index}`}
                  as={NextImage}
                  className="object-cover transition duration-300 group-hover:brightness-100"
                  isBlurred={false}
                  radius="none"
                  removeWrapper={true}
                  src="/images/placeholder-image.webp"
                />
                <p className="absolute bottom-3 left-3 text-white text-center z-10 font-semibold text-lg px-3 py-1">
                  Album {index + 1}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
