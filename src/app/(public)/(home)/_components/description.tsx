"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Description() {
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 90, damping: 20 });

  // **Efek Muncul & Keluar**
  const y = useTransform(smoothScroll, [300, 1000, 1600], [50, 0, 20]); // Naik lebih tinggi saat keluar
  const opacity = useTransform(smoothScroll, [300, 1000, 1600], [0.2, 1, 0]); // Mulai dari buram, tajam, lalu hilang
  const scale = useTransform(smoothScroll, [300, 1000, 1600], [0.9, 1, 0.8]); // Dari kecil → normal → mengecil lebih drastis

  return (
    <motion.section
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{ y, opacity, scale }}
    >
      <div className="max-w-7xl mx-auto md:py-32 p-6">
        <div className="text-white leading-relaxed">
          <h1 className="text-3xl font-bold md:text-7xl">
            Welcome to Luminor!
          </h1>
          <p className="mt-4 md:mt-8 text-lg md:text-2xl text-gray-400">
            Every love story begins with a spark—an unspoken promise, a stolen
            glance, a moment that changes everything. At{" "}
            <span className="font-bold">Luminor</span>, we don’t just take
            pictures; we capture the soul of these moments, the whispers of
            love, the laughter of families, and the silent vows that bind two
            hearts together.
            <br />
            <br />
            Whether it’s the magic of a{" "}
            <span className="font-bold">Wedding</span>, the romance of a{" "}
            <span className="font-bold">Prewedding</span>, or the warmth of a{" "}
            <span className="font-bold">Family Gathering</span>, every frame
            tells a story—your story. A story of love, of beginnings, of
            cherished connections that last a lifetime.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
