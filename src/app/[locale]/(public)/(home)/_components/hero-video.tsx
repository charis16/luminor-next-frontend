"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { VideoOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";

import { useWebsites } from "../../_hooks/use-website";
import EmptyState from "../../_components/empty-state";

import { useIsMobile } from "@/hooks/use-mobile";

export default function HeroVideo() {
  const t = useTranslations("home");
  const { data } = useWebsites();
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 80, damping: 20 });
  const isMobile = useIsMobile();
  const opacity = useTransform(smoothScroll, [0, 800], [1, 0]);

  const videoUrl = isMobile ? data?.data?.video_mobile : data?.data?.video_web;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playPromise = videoRef.current?.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <motion.section className="relative w-full min-h-dvh" style={{ opacity }}>
      {videoUrl ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          preload="auto"
          src={videoUrl}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2  text-white">
          <EmptyState
            icon={<VideoOff className="text-muted-foreground size-14" />}
            title={t("noVideos")}
          />
        </div>
      )}
    </motion.section>
  );
}
