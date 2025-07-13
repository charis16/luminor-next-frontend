"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@heroui/theme";

import { useIsMobile } from "@/hooks/use-mobile";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.3;
      const reachedThreshold = scrollY > threshold;

      const scrollBottom =
        window.innerHeight + scrollY >= document.body.offsetHeight - 100;

      setIsVisible(reachedThreshold);
      setIsNearFooter(scrollBottom);

      if (isMobile) {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isMobile]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "z-20 fixed right-4 flex flex-col items-center group cursor-pointer transition-all duration-500 ease-in-out",
        isVisible && !isScrolling ? "opacity-100" : "opacity-0",
        isNearFooter ? "bottom-40" : "bottom-10",
      )}
      role="button"
      tabIndex={0}
      onClick={scrollToTop}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") scrollToTop();
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
