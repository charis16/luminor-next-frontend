"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronRight, MapPin, Phone } from "lucide-react";

import { useWebsites } from "../_hooks/use-website";

export default function Faq() {
  const { data } = useWebsites();
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
    <div className="min-h-dvh flex justify-center items-center ">
      <motion.div
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 50, scale: 0.8 }
        }
        className="flex flex-col gap-4 md:gap-8 z-10 w-full"
        id="contact-section"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        transition={{ duration: 2, type: "tween" }} // Slower duration and tween type for smooth fade
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-10 w-full items-start max-w-7xl mx-auto ">
          {/* Column 1: Intro */}
          <div className="space-y-4 text-start">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
              Get In Touch
            </h1>
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
              Have a question or want to book a session? Reach out and let’s
              connect!
            </p>
          </div>

          {/* Column 2: Address */}
          <div className="space-y-2 text-start">
            <div className="w-12 h-12 rounded-xl bg-white/85 flex items-center justify-center">
              <MapPin className="text-black size-6" />
            </div>
            <p className="text-lg font-semibold text-foreground">Our Address</p>
            <p className="text-neutral-300">{data?.data.address}</p>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-2 text-start">
            <div className="w-12 h-12 rounded-xl bg-white/85 flex items-center justify-center">
              <Phone className="text-black size-6" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              Our Contact Info
            </p>
            <p className="text-neutral-300">{data?.data.phone_number}</p>
            <p className="text-neutral-300">{data?.data.email}</p>
          </div>
        </div>

        <div className="relative w-full h-[450px]">
          {/* Google Maps Embed */}
          <iframe
            allowFullScreen={false}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2128.2896831484068!2d111.42663309817934!3d-6.962842942591886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7740565f229c4f%3A0x6596b9e1e1566c3b!2sJl.%20Perkutut%20No.6%2C%20Nglawian%20Satu%2C%20Karangjati%2C%20Kec.%20Blora%2C%20Kabupaten%20Blora%2C%20Jawa%20Tengah%2058219!5e0!3m2!1sid!2sid!4v1748491835429!5m2!1sid!2sid"
            title="Luminor Photography Location"
          />

          {/* Get Directions Button (floating on bottom-left of the map) */}
          <a
            className="absolute bottom-4 left-4 px-4 py-2 rounded-md bg-white text-black font-medium shadow-md inline-flex items-center gap-2 transition-colors duration-200 hover:bg-neutral-100 hover:text-black"
            href="https://www.google.com/maps/dir/?api=1&destination=Jl.+Perkutut+No.6,+Nglawian+Satu,+Karangjati,+Blora,+Jawa+Tengah+58219"
            rel="noopener noreferrer"
            target="_blank"
          >
            Get Directions
            <ChevronRight />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
