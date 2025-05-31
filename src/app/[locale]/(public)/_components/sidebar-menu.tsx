"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "use-intl";
import { useMemo } from "react";

// Data struktur

export default function SidebarMenuItem() {
  const t = useTranslations("navbar");
  const menuGroups = useMemo(
    () => [
      {
        title: t("category"),
        items: [
          { title: "Introduction", href: "/introduction" },
          { title: "Design Principles", href: "/design" },
        ],
      },
      {
        title: t("portfolio"),
        items: [
          { title: "NextUI to HeroUI", href: "/migration" },
          { title: "Figma", href: "/figma" },
        ],
      },
    ],
    [t],
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  useEffect(() => {
    const initialState = Object.fromEntries(
      menuGroups.map((group) => [group.title, true]),
    );

    setOpenGroups(initialState);
  }, []);

  return (
    <div className="space-y-4">
      {menuGroups.map((group) => (
        <div key={group.title}>
          {/* Toggle Header */}
          <button
            className="w-full flex items-center justify-between text-white py-2  gap-2"
            onClick={() => toggleGroup(group.title)}
          >
            <span>{group.title}</span>
            <ChevronDown
              className={`transition-transform ${
                openGroups[group.title] ? "rotate-180" : ""
              }`}
              size={20}
            />
          </button>

          {/* Menu Items */}
          {openGroups[group.title] && (
            <ul className="space-y-1">
              {group.items.map(({ title, href }) => (
                <li key={href} className="pl-2 flex items-center gap-2">
                  <Link className="hover:text-white" href={href}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
