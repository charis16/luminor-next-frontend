"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "use-intl";
import { useMemo } from "react";

import { useCategories } from "../_hooks/use-categories";
import { useTeamMembers } from "../_hooks/use-team-members";

interface SidebarMenuProps {
  onSetMenuOpen: () => void;
}

export default function SidebarMenuItem({ onSetMenuOpen }: SidebarMenuProps) {
  const t = useTranslations("navbar");
  const { data: categoryData } = useCategories();
  const { data: teamData } = useTeamMembers();

  const menuGroups = useMemo(() => {
    return [
      {
        title: t("category"),
        items: (categoryData?.data ?? []).map(
          (cat: { name: string; slug: string }) => ({
            title: cat.name,
            href: `/category/${cat.slug}`,
          }),
        ),
      },
      {
        title: t("portfolio"),
        items: (teamData?.data ?? []).map(
          (cat: { name: string; slug: string }) => ({
            title: cat.name,
            href: `/${cat.slug}`,
          }),
        ),
      },
    ];
  }, [t, categoryData, teamData]);

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
                  <Link
                    className="hover:text-white"
                    href={href}
                    onClick={onSetMenuOpen}
                  >
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
