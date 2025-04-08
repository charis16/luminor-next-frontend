"use client";
import { Tab, Tabs } from "@heroui/tabs";
import { useEffect, useState } from "react";
import { Image } from "@heroui/image";
import { cn } from "@heroui/theme";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  const { name } = useParams();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (!isMobile) return; // Hanya berlaku di mobile

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 300); // Setelah 300ms berhenti, Tabs muncul lagi
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [isMobile]);

  return (
    <div className="mx-auto py-14 flex flex-col-reverse md:flex-col gap-6">
      {showTab && (
        <div
          className={cn(
            isMobile &&
              `fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-lg p-4 z-20 
            transition-opacity duration-300 ${isScrolling ? "opacity-0" : "opacity-100"}`,
          )}
        >
          <Tabs
            aria-label="Tabs category"
            selectedKey={selected}
            size="lg"
            variant="underlined"
            onSelectionChange={(key) => setSelected(key.toString())}
          >
            <Tab key="all" className="text-xl" title="All" />
            <Tab key="weeding" className="text-xl" title="Wedding" />
            <Tab key="pre-weeding" className="text-xl" title="Pre Wedding" />
            <Tab key="family" className="text-xl" title="Family" />
          </Tabs>
        </div>
      )}
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
              <div>
                <Image
                  alt={`album ${index}`}
                  className="w-full object-cover transition duration-300 group-hover:brightness-100"
                  isBlurred={false}
                  radius="none"
                  removeWrapper={true}
                  src={"https://fakeimg.pl/1920x1080"}
                />
                {/* Teks muncul di bawah gambar */}
                <p className="absolute bottom-3 left-3 text-white text-center p-2 z-10 font-semibold text-lg px-3 py-1">
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
