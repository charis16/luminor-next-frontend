"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { VideoOff } from "lucide-react";

import { useWebsites } from "../_hooks/use-website";

import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroVideo() {
  const { data } = useWebsites();
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 80, damping: 20 });
  const isMobile = useIsMobile();
  const opacity = useTransform(smoothScroll, [0, 800], [1, 0]);

  const videoUrl = isMobile ? data?.data?.video_mobile : data?.data?.video_web;

  return (
    <motion.section className="relative w-full min-h-dvh" style={{ opacity }}>
      {videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2  text-white">
          <VideoOff className="size-20 text-muted" />
          <p className="text-xl font-medium">No video found</p>
        </div>
      )}
    </motion.section>
  );
}
