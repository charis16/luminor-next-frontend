"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ParallaxSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollY } = useScroll();

  // Gunakan useSpring agar lebih smooth
  const smoothScroll = useSpring(scrollY, {
    stiffness: 70, // Lebih responsif, tapi tetap smooth
    damping: 20,
    mass: 0.3,
  });

  // Parallax lebih lembut
  const y = useTransform(smoothScroll, [200, 1000], [20, -100]); // Kurangi naiknya
  const opacity = useTransform(smoothScroll, [300, 800], [0.6, 1]); // Biarkan opacity lebih stabil
  const scale = useTransform(smoothScroll, [300, 1000], [1, 1.02]); // Tambahkan efek zoom minimal

  return (
    <motion.section
      className="transition-all ease-out will-change-transform"
      style={{ y, scale, opacity }}
    >
      {children}
    </motion.section>
  );
}
