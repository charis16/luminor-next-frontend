"use client";

import { MenuIcon } from "lucide-react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Select, SelectItem } from "@heroui/select";

import { useSidebar } from "../_context/sidebar-context";

import { useIsMobile } from "@/hooks/use-mobile";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

function switchLocalePath(path: string, current: string, next: string) {
  if (!path.startsWith(`/${current}`)) return path;

  return `/${next}${path.slice(current.length + 1)}`;
}

export default function Header() {
  const { toggleSidebar, toggleMobile } = useSidebar();
  const isMobile = useIsMobile();
  const breadcrumbs = useBreadcrumb();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-white/10 gap-4">
      {/* Left: menu & breadcrumbs */}
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
        <Select
          aria-label="Select Language"
          className="min-w-14" // atau w-20 agar cukup tampilkan bendera
          classNames={{
            popoverContent: "min-w-24 ml-[-50%]", // dropdown panel
          }}
          selectedKeys={[locale]}
          size="sm"
          variant="flat"
          onSelectionChange={(key) => {
            const newLocale = String(Array.from(key)[0]);

            if (newLocale !== locale && typeof pathname === "string") {
              // Set cookie LUMINOR_LOCALE agar dibaca middleware/server
              document.cookie = `LUMINOR_LOCALE=${newLocale}; path=/`;

              // Ganti path URL sesuai bahasa yang dipilih
              router.replace(switchLocalePath(pathname, locale, newLocale));
            }
          }}
        >
          <SelectItem key="id" className="inline-flex">
            🇮🇩
          </SelectItem>
          <SelectItem key="en">🇺🇸</SelectItem>
        </Select>
      </div>
    </header>
  );
}
