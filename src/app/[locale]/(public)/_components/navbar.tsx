"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@heroui/image";

import { InstagramIcon, TikTokIcon } from "./icons";

import { siteConfigPublic } from "@/config/site";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Menunggu animasi sebelum menghapus dari DOM
  useEffect(() => {
    if (isMenuOpen) {
      setIsAnimating(true);
    } else {
      const timeout = setTimeout(() => setIsAnimating(false), 100);

      return () => clearTimeout(timeout);
    }
  }, [isMenuOpen]);

  return (
    <>
      {isDropdownOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={() => setIsDropdownOpen(false)} // Klik overlay untuk menutup dropdown
        />
      )}

      <HeroUINavbar
        disableAnimation
        shouldHideOnScroll
        className="fixed top-0 left-0 w-full bg-transparent"
        isBlurred={false}
        isMenuOpen={isMenuOpen}
        maxWidth="2xl"
        motionProps={{
          initial: { y: -100 },
          animate: { y: 0 },
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
        position="sticky"
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
          <NavbarBrand as="li" className="gap-3">
            <NextLink
              className="flex justify-start items-center gap-1 "
              href="/"
            >
              <Image
                alt="Luminor"
                height={32}
                isBlurred={false}
                removeWrapper={true}
                src={"/logo.png"}
                width={32}
              />
              <p className="font-bold text-inherit uppercase md:block">
                Luminor
              </p>
            </NextLink>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="center"
        />
        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          {siteConfigPublic.navItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link
                className="text-lg  hover:font-bold focus:font-bold text-white hover:opacity-100 focus:opacity-100"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
          <NavbarItem className="hidden sm:flex gap-2">
            <Link
              isExternal
              aria-label="Instagram"
              href={siteConfigPublic.links.instagram}
            >
              <InstagramIcon />
            </Link>
            <Link
              isExternal
              aria-label="TikTok"
              href={siteConfigPublic.links.tiktok}
            >
              <TikTokIcon />
            </Link>
          </NavbarItem>
        </NavbarContent>

        <AnimatePresence>
          {(isMenuOpen || isAnimating) && (
            <motion.div
              key="menu"
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 flex flex-col items-center justify-center min-h-screen z-10
               bg-black backdrop-blur-lg text-white"
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                className="absolute top-5 right-5 text-white text-3xl"
                onClick={() => setIsMenuOpen(false)}
              >
                ✕
              </button>

              {/* Menu Items */}
              <div className="text-center space-y-4 font-medium">
                {siteConfigPublic.navItems.flatMap((item, index) => (
                  <div key={`${item.label}-${index}`} className="w-full">
                    <Link
                      className="text-white transition-colors hover:text-gray-400"
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="flex gap-6 mt-6">
                <Link
                  isExternal
                  aria-label="Instagram"
                  href={siteConfigPublic.links.instagram}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <InstagramIcon className="text-white w-6 h-6 hover:text-gray-400 transition-colors" />
                </Link>
                <Link
                  isExternal
                  aria-label="TikTok"
                  href={siteConfigPublic.links.tiktok}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TikTokIcon className="text-white w-6 h-6 hover:text-gray-400 transition-colors" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </HeroUINavbar>
    </>
  );
};
