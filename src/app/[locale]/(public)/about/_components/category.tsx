"use client";

import { Image } from "@heroui/image";
import { useTranslations } from "next-intl";
import { FolderSearch } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";

import { useCategories } from "../../_hooks/use-categories";
import EmptyState from "../../_components/empty-state";

export default function Category() {
  const t = useTranslations("about");
  const { data } = useCategories();

  return (
    <div className="flex flex-col gap-6 my-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-4xl font-bold text-foreground">
            {t("ourCategory")}
          </h2>
          <p className="text-neutral-400">{t("ourCategoryDesc")}</p>
        </div>
        {data && data?.data && data.data.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data?.map((item) => (
              <div key={item.uuid} className="flex flex-col">
                <div className="relative w-full h-[320px] overflow-hidden rounded-md shadow-md">
                  <Image
                    fill
                    alt={item.name}
                    as={NextImage}
                    className="object-cover"
                    isBlurred={false}
                    radius="none"
                    removeWrapper={true}
                    src={item.photo_url || "/images/placeholder-image.webp"} // ganti sesuai path image kamu
                  />
                </div>

                {/* Text content bawah */}
                <div className="mt-4 space-y-2">
                  <Link
                    className="hover:underline text-md my-2"
                    href={`/category/${item.slug}`}
                  >
                    <h3 className="text-lg font-semibold tracking-tight ">
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                    </h3>
                  </Link>
                  <p className="text-neutral-400">
                    {item.description || "Lorem ipsum description here."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FolderSearch className="text-muted-foreground size-14" />}
            subtitle={t("noCategory")}
            title={t("noCategoryYet")}
          />
        )}
      </div>
    </div>
  );
}
