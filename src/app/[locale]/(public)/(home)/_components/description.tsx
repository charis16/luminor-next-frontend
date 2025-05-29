"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import DOMPurify from "dompurify";

import { useWebsites } from "../_hooks/use-website";

export default function Description() {
  const { data } = useWebsites();
  const locale = useLocale();
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 90, damping: 20 });

  // **Efek Muncul & Keluar**
  const y = useTransform(smoothScroll, [300, 1000, 1600], [50, 0, 20]); // Naik lebih tinggi saat keluar
  const opacity = useTransform(smoothScroll, [300, 1000, 1600], [0.2, 1, 0]); // Mulai dari buram, tajam, lalu hilang
  const scale = useTransform(smoothScroll, [300, 1000, 1600], [0.9, 1, 0.8]); // Dari kecil → normal → mengecil lebih drastis

  const descriptionId = data?.data?.about_us_brief_home_id;
  const descriptionEn = data?.data?.about_us_brief_home_en;

  const localizedDescription = locale === "en" ? descriptionEn : descriptionId;

  return (
    <motion.section
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{ y, opacity, scale }}
    >
      <div className="w-full p-8">
        <h1 className="text-3xl font-bold md:text-7xl text-white leading-relaxed">
          Welcome to Luminor!
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(localizedDescription || ""),
          }}
          className="mt-4 md:mt-8 text-lg md:text-2xl text-neutral-300"
        />
      </div>
    </motion.section>
  );
}
