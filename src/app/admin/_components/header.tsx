"use client";

import { MenuIcon } from "lucide-react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

import { useSidebar } from "../_context/sidebar-context";

import { useIsMobile } from "@/hooks/use-mobile";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export default function Header() {
  const { toggleSidebar, toggleMobile } = useSidebar();
  const isMobile = useIsMobile();
  const breadcrumbs = useBreadcrumb();

  return (
    <header className="h-16 flex items-center px-4">
      <button
        className="text-gray-300 hover:text-white transition"
        onClick={isMobile ? toggleMobile : toggleSidebar}
      >
        <MenuIcon size={20} />
      </button>
      <nav className="ml-4 text-sm text-gray-400">
        <Breadcrumbs>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem
              key={crumb.href}
              isCurrent={index === breadcrumbs.length - 1}
            >
              {crumb.label.charAt(0).toUpperCase() + crumb.label.slice(1)}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </nav>
    </header>
  );
}
