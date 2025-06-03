"use client";
import { Tab, Tabs } from "@heroui/tabs";
import { useEffect, useState } from "react";
import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";
import { motion } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";

import { useCategoryBySlug } from "../../../_hooks/use-category-by-slug";
import { useAlbumCategoryBySlug } from "../../../_hooks/use-album-category-by-slug";

import { AlbumDetail } from "@/types/album-lists";

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
  slug: string; // Tambahkan slug jika diperlukan untuk query
}

export default function GridAlbum({ showTab, slug }: GridAlbumProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState("all");
  const { data: categoryUserData } = useCategoryBySlug(slug);

  const { data: albumData } = useAlbumCategoryBySlug(slug, selected);
  const [records, setRecords] = useState<AlbumDetail[]>([]);

  const removeDuplicates = (data: AlbumDetail[]) => {
    const uniqueMap = new Map();

    data.forEach((item) => {
      uniqueMap.set(item.uuid, item); // Jika id sudah ada, update dengan item terbaru
    });

    return Array.from(uniqueMap.values());
  };

  useEffect(() => {
    setRecords([]); // kosongkan records
  }, [selected]);

  useEffect(() => {
    if (albumData) {
      const newLists = albumData.data.filter(
        (item): item is AlbumDetail => item !== null,
      );

      setRecords((prevRecords) => {
        // Gabungkan data lama dan baru, lalu hapus duplikat
        const combined = [...prevRecords, ...newLists];

        return removeDuplicates(combined);
      });
    }
  }, [albumData]);

  return (
    <div className="mx-auto flex flex-col gap-2 md:gap-6 md:py-6">
      {showTab && (
        <div className="sticky top-[60px] z-30 transition-colors duration-300 backdrop-blur-sm py-2 md:py-4 bg-[#16151D]">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Tabs
              aria-label="Tabs category"
              classNames={{
                tab: "pb-2",
                tabContent: "text-md md:text-lg",
                cursor: "w-full",
              }}
              selectedKey={selected}
              size="md"
              variant="underlined"
              onSelectionChange={(key) => setSelected(key.toString())}
            >
              <Tab key="all" title="All" />
              {categoryUserData?.data?.users?.map((user) => (
                <Tab
                  key={user.slug}
                  title={user.name.replace(/\b\w/g, (char) =>
                    char.toUpperCase(),
                  )}
                  onClick={() => setSelected(user.slug)}
                />
              ))}
            </Tabs>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {records?.map((album, index) => {
          return (
            <motion.div
              key={album.uuid}
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
              <Link
                href={`/${album.user_slug.replace(/\s+/g, "-")}/${album.category_slug.replace(/\s+/g, "-")}/${album.slug.replace(/\s+/g, "-")}`}
              >
                <div className="relative w-full aspect-[16/9] group overflow-hidden">
                  <Image
                    fill
                    alt={album.title}
                    as={NextImage}
                    className="object-cover transition duration-300 group-hover:brightness-100"
                    isBlurred={false}
                    radius="none"
                    removeWrapper={true}
                    src={album.thumbnail || "/images/placeholder-image.webp"}
                  />
                  <h3 className="absolute bottom-0 left-0 right-0 text-white text-start z-10 font-semibold text-lg px-3 py-1 backdrop-blur-sm cursor-pointer">
                    {album.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
