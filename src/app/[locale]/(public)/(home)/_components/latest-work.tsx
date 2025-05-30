"use client";

import { motion } from "framer-motion";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { useAlbums } from "../../_hooks/use-album";

export default function LatestRecent() {
  return (
    <div className="w-full flex items-center">
      <motion.div
        animate={{ y: 0 }}
        className="w-full"
        initial={{ y: 30 }} // **Biar lebih cepat terasa**
        transition={{ duration: 0.3, ease: "easeInOut" }} // **Lebih cepat & smooth**
      >
        <LatestWork />
      </motion.div>
    </div>
  );
}

// **Grid Komponen dengan Efek Slide Up Lebih Cepat**
const LatestWork = () => {
  const { data } = useAlbums();
  const t = useTranslations("home");
  // Variants animasi per item grid
  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // **Lebih dekat supaya muncul lebih cepat**
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" }, // **Lebih cepat & smooth**
    },
  };

  return (
    <div className="relative flex flex-col gap-6 w-full">
      <h2 className="sticky top-20 pl-6 text-3xl md:text-4xl font-bold text-white z-20">
        {t("ourLatestWork")}
      </h2>
      {data?.data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          {data.data.map((album) => (
            <motion.div
              key={album.uuid}
              className="relative flex flex-col w-full cursor-pointer hover:brightness-100 brightness-75"
              initial="hidden"
              variants={itemVariants}
              viewport={{ once: false, amount: 0.05 }}
              whileInView="visible"
            >
              <div className="relative w-full aspect-[4/3] min-h-[250px] md:min-h-[350px]">
                <Image
                  fill
                  alt={album.slug}
                  as={NextImage}
                  className="absolute inset-0 w-full h-full object-cover"
                  radius="none"
                  removeWrapper={true}
                  src={album.thumbnail}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60  px-3 py-2 z-10">
                <p className="text-lg font-medium text-white m-0">
                  {album.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center">
            <ImageIcon className="text-muted-foreground size-14" />
          </div>
          <h2 className="text-3xl font-semibold text-white">{t("noAlbums")}</h2>
          <p className="text-neutral-400 max-w-md text-xl">
            {t("noAlbumsYet")}
          </p>
        </div>
      )}
    </div>
  );
};
