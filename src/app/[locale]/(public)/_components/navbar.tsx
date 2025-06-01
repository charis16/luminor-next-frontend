"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import { Link } from "@heroui/link";
import { useTranslations } from "next-intl";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { ChevronDown } from "lucide-react";

import { useWebsites } from "../_hooks/use-website";
import { LanguageSwitcher } from "../../admin/_components";
import { useCategories } from "../_hooks/use-categories";
import { useTeamMembers } from "../_hooks/use-team-members";

import { InstagramIcon, TikTokIcon, WhatsappIcon } from "./icons";
import SidebarMenuItem from "./sidebar-menu";

import { siteConfigPublic } from "@/config/site";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useWebsites();
  const t = useTranslations("navbar");
  const { data: categoryData } = useCategories();
  const { data: teamData } = useTeamMembers();

  // Menunggu animasi sebelum menghapus dari DOM
  useEffect(() => {
    if (isMenuOpen) {
      setIsAnimating(true);
    } else {
      const timeout = setTimeout(() => setIsAnimating(false), 100);

      return () => clearTimeout(timeout);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        isBlurred={scrolled}
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
                as={NextImage}
                height={32}
                isBlurred={false}
                removeWrapper={true}
                src={"/images/logo.png"}
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
          <NavbarItem>
            <Link
              aria-current="page"
              className="text-white text-base"
              href="/about"
            >
              {t("about")}
            </Link>
          </NavbarItem>

          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base"
                  endContent={<ChevronDown className="text-white size-5" />}
                  radius="sm"
                  variant="light"
                >
                  {t("category")}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="categories"
              itemClasses={{
                base: "gap-4",
              }}
            >
              {(categoryData?.data ?? []).map((category) => (
                <DropdownItem
                  key={category.uuid}
                  as={Link}
                  className="text-base text-white"
                  href={`/category/${category.slug}`}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base"
                  endContent={<ChevronDown className="text-white size-5" />}
                  radius="sm"
                  variant="light"
                >
                  {t("portfolio")}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="portfolio"
              itemClasses={{
                base: "gap-4",
              }}
            >
              {(teamData?.data ?? []).map((teamData) => (
                <DropdownItem
                  key={teamData.uuid}
                  as={Link}
                  className="text-base text-white"
                  href={`/${teamData.slug}`}
                >
                  {teamData.name.charAt(0).toUpperCase() +
                    teamData.name.slice(1)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <NavbarItem className="hidden sm:flex gap-2">
            <Button
              isExternal
              as={Link}
              className="bg-[rgb(42,181,64)]/80 text-white hover:bg-[rgb(42,181,64)] border-none"
              endContent={<WhatsappIcon />}
              href={`https://api.whatsapp.com/send?phone=${data?.data?.phone_number}&text=Halo%20Luminor!`}
              variant="bordered"
            >
              {t("chatWithUs")}
            </Button>
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

              <div>
                <Link
                  className="text-white transition-colors hover:text-gray-400"
                  href="/about"
                  onPress={() => setIsMenuOpen(false)}
                >
                  {t("about")}
                </Link>

                <SidebarMenuItem />
              </div>

              <div className="flex mt-6">
                <Link
                  isExternal
                  aria-label="Instagram"
                  href={
                    data?.data?.url_instagram ||
                    siteConfigPublic.links.instagram
                  }
                >
                  <InstagramIcon height={18} width={18} />
                </Link>
                <Link
                  isExternal
                  aria-label="TikTok"
                  className="ml-3 "
                  href={data?.data?.url_tiktok || siteConfigPublic.links.tiktok}
                >
                  <TikTokIcon height={18} width={18} />
                </Link>
                <LanguageSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </HeroUINavbar>
    </>
  );
};
