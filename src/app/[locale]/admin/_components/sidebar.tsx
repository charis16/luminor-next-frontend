"use client";

import {
  LayoutDashboard,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
  Globe,
  GalleryVertical,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@heroui/theme";

import { useSidebar } from "../_context/sidebar-context";

import { UserDropdown } from ".";

import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Portfolio",
    icon: GalleryVertical,
    children: [
      { label: "Album", href: "/admin/portfolio/album" },
      { label: "Category", href: "/admin/portfolio/category" },
    ],
  },

  {
    label: "Website",
    icon: Globe,
    children: [
      { label: "About us", href: "/admin/website/about-us" },
      { label: "SEO & Metadata", href: "/admin/website/seo-metadata" },
      {
        label: "Contact Information",
        href: "/admin/website/contact-information",
      },
      { label: "FAQ", href: "/admin/website/faq" },
    ],
  },
  {
    label: "Setting",
    icon: Settings,
    children: [{ label: "User", href: "/admin/setting/user" }],
  },
];

export default function Sidebar() {
  const isMobile = useIsMobile();
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebar();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};

    navItems.forEach((item) => {
      if (item.children) {
        initialState[item.label] = true;
      }
    });

    return initialState;
  });

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const SidebarContent = (
    <div
      className={cn(
        "flex flex-col h-screen bg-black text-white transition-all duration-300 ease-in-out",
        isCollapsed && !isMobileOpen ? "w-16" : "w-64",
        isMobileOpen && "w-full",
      )}
    >
      {/* Logo */}
      <Link
        className="flex items-center px-4 py-4 w-full justify-between"
        href="/admin/dashboard"
      >
        <div className="inline-flex gap-2 items-center">
          <Image
            alt="Luminor Logo"
            className={cn(
              "transition-all duration-300",
              isCollapsed ? "w-8 h-8" : "w-10 h-10",
            )}
            height={40}
            src="/logo.png"
            width={40}
          />
          {!isCollapsed && (
            <span className="ml-3 text-lg font-semibold">Luminor</span>
          )}
        </div>
        {isMobileOpen && isMobile && (
          <div className="flex justify-end p-4">
            <button
              aria-label="Close Sidebar"
              className="text-gray-400 hover:text-white transition"
              onClick={closeMobile}
            >
              <X size={24} />
            </button>
          </div>
        )}
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1 mt-4 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, children }) => {
          const isActive =
            href && pathname.replace(/^\/(id|en)/, "").startsWith(href);
          const isOpen = openMenus[label];

          return (
            <div key={label}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition",
                  isActive
                    ? "bg-foreground-200 text-white font-medium"
                    : "text-white hover:bg-foreground-200",
                )}
                onClick={() => (children ? toggleMenu(label) : closeMobile())}
              >
                <Icon size={20} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{label}</span>
                    {children &&
                      (isOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      ))}
                  </>
                )}
              </button>

              {/* Submenu */}
              <AnimatePresence initial={false}>
                {children && isOpen && !isCollapsed && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="pl-4 ml-[1.40rem] space-y-1 mt-1 border-l border-gray-600 overflow-hidden"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {children.map((sub) => (
                      <Link
                        key={sub.href}
                        className={cn(
                          "block text-sm px-3 py-1 rounded-md",
                          pathname
                            .replace(/^\/(id|en)/, "")
                            .startsWith(sub.href)
                            ? "bg-foreground-200 text-white font-medium"
                            : "text-white hover:bg-foreground-200",
                        )}
                        href={sub.href}
                        onClick={closeMobile}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Bottom profile */}
      <UserDropdown />
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        layout
        className="hidden md:flex h-screen"
        transition={{ type: "tween", duration: 0.3 }}
      >
        {SidebarContent}
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            {/* Overlay */}
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/70"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={closeMobile}
            />

            {/* Slide-in Sidebar */}
            <motion.div
              animate={{ x: 0 }}
              className="relative z-10 w-full h-screen bg-black flex flex-col"
              exit={{ x: "-100%" }}
              initial={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Sidebar Content */}
              {SidebarContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
