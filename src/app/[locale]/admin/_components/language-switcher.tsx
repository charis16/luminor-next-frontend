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

function switchLocalePath(path: string, current: string, next: string) {
  if (!path.startsWith(`/${current}`)) return path;

  return `/${next}${path.slice(current.length + 1)}`;
}

const items = [
  {
    key: "id",
    label: "🇮🇩",
  },
  {
    key: "en",
    label: "🇺🇸",
  },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Dropdown>
      <DropdownTrigger className="!p-">
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
        aria-label="Dynamic Actions"
        items={items}
        onAction={(key) => {
          const newLocale = String(key);

          if (newLocale !== locale && typeof pathname === "string") {
            document.cookie = `LUMINOR_LOCALE=${newLocale}; path=/`;
            router.replace(switchLocalePath(pathname, locale, newLocale));
          }
        }}
      >
        {(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
}
