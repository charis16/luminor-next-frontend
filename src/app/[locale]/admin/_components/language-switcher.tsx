"use client";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

function switchLocalePath(path: string, current: string, next: string) {
  if (!path.startsWith(`/${current}`)) return path;

  return `/${next}${path.slice(current.length + 1)}`;
}

const items = [
  {
    key: "id",
    label: "🇮🇩 Indonesia",
  },
  {
    key: "en",
    label: "🇺🇸 English",
  },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (isMobile) {
    return (
      <>
        <Button
          disableRipple
          isIconOnly
          className="!p-0 !bg-transparent text-lg"
          size="sm"
          variant="light"
          onPress={() => setIsOpen(true)}
        >
          {locale === "id" ? "🇮🇩" : "🇺🇸"}
        </Button>
        {isOpen && (
          <Dropdown ref={dropdownRef}>
            {[
              <DropdownMenu
                key="dropdown-menu"
                aria-label="Dynamic Actions"
                items={items}
                onAction={(key) => {
                  try {
                    const newLocale = String(key);

                    if (newLocale !== locale && typeof pathname === "string") {
                      document.cookie = `LUMINOR_LOCALE=${newLocale}; path=/`;
                      router.replace(
                        switchLocalePath(pathname, locale, newLocale),
                      );
                    }
                  } catch {}
                  setIsOpen(false);
                }}
              >
                {(item) => (
                  <DropdownItem key={item.key}>{item.label}</DropdownItem>
                )}
              </DropdownMenu>,
            ]}
          </Dropdown>
        )}
      </>
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger className="!p-0">
        <Button
          disableRipple
          isIconOnly
          className="!p-0 !bg-transparent text-lg"
          size="sm"
          variant="light"
        >
          {locale === "id" ? "🇮🇩" : "🇺🇸"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="lang switcher"
        items={items}
        onAction={(key) => {
          try {
            const newLocale = String(key);

            if (newLocale !== locale && typeof pathname === "string") {
              document.cookie = `LUMINOR_LOCALE=${newLocale}; path=/`;
              router.replace(switchLocalePath(pathname, locale, newLocale));
            }
          } catch {}
        }}
      >
        {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
}
