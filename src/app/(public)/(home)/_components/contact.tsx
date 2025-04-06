"use client";

import { House, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Contact() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("contact-section");

      if (section) {
        const rect = section.getBoundingClientRect();

        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex justify-center items-center">
      <motion.div
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 50, scale: 0.8 }
        }
        className="flex flex-col gap-4 md:gap-8 z-10"
        id="contact-section"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        transition={{ duration: 2, type: "tween" }} // Slower duration and tween type for smooth fade
      >
        <h1 className="text-3xl md:text-7xl font-bold leading-loose tracking-wide text-start z-50">
          CONTACT
        </h1>
        <div className="flex flex-col gap-6 w-full z-50">
          <p className="text-lg inline-flex gap-3 items-center">
            <House /> <span>Jl. Perkutut </span>
          </p>
          <p className="text-lg inline-flex gap-3 items-center">
            <Mail /> <span>email@gmail.com </span>
          </p>
          <p className="text-lg inline-flex gap-3 items-center">
            <Phone /> <span>+62 812 3456 7890 </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
