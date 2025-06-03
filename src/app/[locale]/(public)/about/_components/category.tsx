"use client";

import { Image } from "@heroui/image";
import { useTranslations } from "next-intl";
import { FolderSearch } from "lucide-react";
import NextImage from "next/image";

import { useCategories } from "../../_hooks/use-categories";

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
          data?.data?.map((category) => (
            <div
              key={category.uuid}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
            >
              <div className="flex flex-col">
                <div className="relative w-full h-[320px] overflow-hidden rounded-md shadow-md">
                  <Image
                    fill
                    alt={category.name}
                    as={NextImage}
                    className="object-cover"
                    isBlurred={false}
                    radius="none"
                    removeWrapper={true}
                    src={category.photo_url || "/images/placeholder-image.webp"} // ganti sesuai path image kamu
                  />
                </div>

                {/* Text content bawah */}
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight ">
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </h3>
                  <p className="text-sm text-neutral-400">
                    {category.description || "Lorem ipsum description here."}
                  </p>
                  <a
                    className="inline-flex items-center text-sm text-amber-600 font-medium hover:underline"
                    href={`/category/${category.slug}`}
                  >
                    Learn More <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center">
              <FolderSearch className="text-muted-foreground size-14" />
            </div>
            <h2 className="text-xl md:text-3xl font-semibold text-white">
              {t("noCategory")}
            </h2>
            <p className="text-neutral-400 max-w-md text-lg md:text-xl">
              {t("noCategoryYet")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
