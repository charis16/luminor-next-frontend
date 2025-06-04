"use client";

import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu } from "@heroui/dropdown";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

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
        <Dropdown>
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
