"use client";

import { MenuIcon } from "lucide-react";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

import { useSidebar } from "../_context/sidebar-context";

import { LanguageSwitcher } from ".";

import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const { toggleSidebar, toggleMobile } = useSidebar();
  const isMobile = useIsMobile();
  const breadcrumbs = useBreadcrumb();

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-white/10 gap-4 ">
      <div className="flex items-center gap-4">
        <button
          className="text-gray-300 hover:text-white transition"
          onClick={isMobile ? toggleMobile : toggleSidebar}
        >
          <MenuIcon size={20} />
        </button>
        <nav className="text-sm text-gray-400 ">
          <Breadcrumbs>
            {breadcrumbs.slice(1).map((crumb, index, arr) => (
              <BreadcrumbItem
                key={crumb.href}
                isCurrent={index === arr.length - 1}
              >
                {crumb.label.charAt(0).toUpperCase() + crumb.label.slice(1)}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </nav>
      </div>

      {/* Right: Language Selector */}
      <div className="flex items-center gap-2 text-white">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
