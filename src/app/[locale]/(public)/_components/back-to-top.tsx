"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const isMobile = useIsMobile();
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Simpan timeout di ref

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.3; // 30% dari tinggi layar

      setIsVisible(scrollY > threshold); // Tombol muncul setelah scroll 30% layar

      if (isMobile) {
        setIsScrolling(true); // Hanya aktif di mobile

        // Hapus timeout sebelumnya jika ada
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Set timeout baru untuk deteksi berhenti scroll
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 300); // Muncul lagi setelah 300ms tidak scroll
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMobile]);

  // Fungsi untuk kembali ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`z-10 fixed bottom-24 md:bottom-10 right-4 flex flex-col items-center cursor-pointer group transition-opacity duration-500 ${
        isVisible && !isScrolling ? "opacity-100" : "opacity-0"
      }`}
      role="button"
      tabIndex={0}
      onClick={scrollToTop}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          scrollToTop();
        }
      }}
    >
      {isMobile ? (
        <div className="bg-white/15 group-hover:bg-white p-2 rounded-full">
          <ChevronUp className="text-black" />
        </div>
      ) : (
        <>
          <span className="text-gray-500 text-sm font-bold -rotate-90 tracking-widest relative top-16 group-hover:text-white transition-colors duration-300">
            BACK TO
          </span>
          <span className="text-gray-500 text-6xl font-bold -rotate-90 relative left-10 group-hover:text-white transition-colors duration-300">
            TOP
          </span>
        </>
      )}
    </div>
  );
}
