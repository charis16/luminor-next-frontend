"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function HeroVideo() {
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 80, damping: 20 });

  const opacity = useTransform(smoothScroll, [0, 800], [1, 0]); // **Baru hilang di 800px scroll**

  return (
    <motion.section className="relative w-full min-h-dvh" style={{ opacity }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.m4v" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </motion.section>
  );
}
