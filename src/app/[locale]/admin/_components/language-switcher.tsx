"use client";

import { Select, SelectItem } from "@heroui/select";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

function switchLocalePath(path: string, current: string, next: string) {
  if (!path.startsWith(`/${current}`)) return path;

  return `/${next}${path.slice(current.length + 1)}`;
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      aria-label="Select Language"
      className="min-w-14"
      classNames={{
        popoverContent: "min-w-24 ml-[-50%]",
      }}
      selectedKeys={[locale]}
      size="sm"
      variant="flat"
      onSelectionChange={(key) => {
        const newLocale = String(Array.from(key)[0]);

        if (newLocale !== locale && typeof pathname === "string") {
          document.cookie = `LUMINOR_LOCALE=${newLocale}; path=/`;
          router.replace(switchLocalePath(pathname, locale, newLocale));
        }
      }}
    >
      <SelectItem key="id" className="inline-flex">
        🇮🇩
      </SelectItem>
      <SelectItem key="en">🇺🇸</SelectItem>
    </Select>
  );
}
