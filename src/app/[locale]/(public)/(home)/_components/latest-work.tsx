"use client";

import { motion } from "framer-motion";
import { Image } from "@heroui/image";
import NextImage from "next/image";

export default function LatestRecent() {
  return (
    <div className="w-full min-h-screen flex items-center">
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
        Our Latest Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        {Array.from({ length: 16 }, (_, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col w-full cursor-pointer hover:brightness-100 brightness-75"
            initial="hidden"
            variants={itemVariants}
            viewport={{ once: false, amount: 0.05 }} // **Lebih sensitif, langsung muncul**
            whileInView="visible"
          >
            <div className="relative w-full aspect-[4/3] min-h-[250px] md:min-h-[350px]">
              <Image
                fill
                alt={`Work ${index + 1}`}
                as={NextImage}
                className="absolute inset-0 w-full h-full object-cover"
                radius="none"
                removeWrapper={true}
                src={"https://fakeimg.pl/1200x900"}
              />
            </div>
            <p className="absolute bottom-5 left-5 text-lg font-medium shrink-0 z-10 text-white">
              Work {index + 1}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
