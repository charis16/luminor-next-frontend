"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileImage } from "lucide-react";
import { useTranslations } from "next-intl";

import EmptyState from "./empty-state";

import { AlbumDetail } from "@/types/album-lists";
import ImageWithSkeleton from "@/app/_components/image-skeleton";

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.02, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeInOut" } },
};

interface GridAlbumProps {
  showTab?: boolean;
  tabs: { key: string; label: string }[];
  selected: string;
  onSelectedChange: (key: string) => void;
  albumData?: { data: (AlbumDetail | null)[] };
  isLoading?: boolean;
}

export default function GridAlbum({
  showTab = false,
  tabs,
  selected,
  onSelectedChange,
  albumData,
  isLoading,
}: GridAlbumProps) {
  const t = useTranslations("portfolio");
  const [records, setRecords] = useState<AlbumDetail[]>([]);

  const removeDuplicates = (data: AlbumDetail[]) => {
    const uniqueMap = new Map<string, AlbumDetail>();

    data.forEach((item) => uniqueMap.set(item.uuid, item));

    return Array.from(uniqueMap.values());
  };

  useEffect(() => {
    setRecords([]); // reset when selected tab changes
  }, [selected]);

  useEffect(() => {
    if (albumData) {
      const newItems = albumData.data.filter(
        (item): item is AlbumDetail => item !== null,
      );

      setRecords((prev) => removeDuplicates([...prev, ...newItems]));
    }
  }, [albumData]);

  return (
    <div className="mx-auto flex flex-col gap-2 md:gap-6 md:py-6">
      {showTab && (
        <div className="sticky top-[60px] z-30 transition-colors duration-300 backdrop-blur-sm py-2 md:py-4 bg-[#16151D]">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Tabs
              aria-label="Tabs"
              classNames={{
                tab: "pb-2",
                tabContent: "text-md md:text-lg",
                cursor: "w-full",
              }}
              selectedKey={selected}
              size="md"
              variant="underlined"
              onSelectionChange={(key) => onSelectedChange(key.toString())}
            >
              <Tab key="all" title="All" />
              {tabs.map((tab) => (
                <Tab key={tab.key} title={tab.label} />
              ))}
            </Tabs>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md h-[300px]"
            />
          ))}
        </div>
      ) : records.length === 0 ? (
        <EmptyState
          icon={<FileImage className="size-16 md:size-24" />}
          subtitle={t("noAlbumsYet")}
          title={t("noAlbums")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {records.map((album, index) => (
            <motion.div
              key={album.uuid}
              className="relative flex flex-col w-full cursor-pointer hover:brightness-100 brightness-75"
              custom={index}
              exit="exit"
              initial="hidden"
              variants={itemVariants}
              viewport={{ once: false, amount: 0.2 }}
              whileInView="visible"
            >
              <Link
                href={`/${album.user_slug.replace(/\s+/g, "-")}/${album.category_slug.replace(
                  /\s+/g,
                  "-",
                )}/${album.slug.replace(/\s+/g, "-")}`}
              >
                <div className="relative w-full aspect-[16/9] group overflow-hidden">
                  <ImageWithSkeleton
                    fill
                    alt={album.slug}
                    aspectRatio="" // Kosongin biar nggak double
                    className="!w-full !h-full"
                    imageClassName="object-cover"
                    rounded={false} // Biar gak dobel corner
                    src={album.thumbnail || "/images/placeholder-image.webp"}
                    withShadow={false} // Shadow cukup di parent
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 z-10">
                    <h3 className="text-lg md:text-3xl font-medium text-white m-0">
                      {album.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
