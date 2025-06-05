import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import BackToTop from "../../_components/back-to-top";
import TitlePage from "../../_components/title-page";
import { fetchInformation } from "../../_hooks/use-category-by-slug";
import { getOptions as categoryBySlugOption } from "../../_hooks/use-category-by-slug";
import { getOptions as albumBySlugOption } from "../../_hooks/use-album-category-by-slug";

import GridAlbum from "./_components/grid-album";

import getQueryClient from "@/utils/react-query";
import {
  AlbumCategoryBySlugResponse,
  CategoryBySlugResponse,
} from "@/types/website";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const data = await fetchInformation(slug);

    // Capitalize the first letter of name and description if available
    const capitalize = (str?: string) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1) : undefined;

    return {
      title: capitalize(data?.data?.name) || "Our Category",
      description:
        capitalize(data?.data?.description) ||
        "Category description not available",
      openGraph: {
        title: capitalize(data?.data?.name) || "Our Category",
        description:
          capitalize(data?.data?.description) ||
          "Category description not available",
        images: [
          {
            url: data?.data?.photo_url || "/default-thumbnail.jpg",
            alt: capitalize(data?.data?.name) || "Our Category",
          },
        ],
      },
      twitter: {
        title: capitalize(data?.data?.name) || "Our Category",
        description:
          capitalize(data?.data?.description) ||
          "Category description not available",
        images: [data?.data?.photo_url || "/default-thumbnail.jpg"],
      },
      alternates: {
        canonical: `/category/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
      keywords: data?.data?.name
        ? `${capitalize(data.data.name)}, category, luminor`
        : "category, luminor",
      authors: [{ name: "Luminor Team", url: baseUrl }],
      creator: "Luminor Team",
      applicationName: "Luminor",
      formatDetection: {
        telephone: false,
        address: false,
        email: false,
      },
      metadataBase: new URL(baseUrl),
      icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        other: [
          {
            rel: "icon",
            url: "/favicon-32x32.png",
            sizes: "32x32",
          },
          {
            rel: "icon",
            url: "/favicon-16x16.png",
            sizes: "16x16",
          },
          {
            rel: "mask-icon",
            url: "/safari-pinned-tab.svg",
            color: "#5bbad5",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Our Work - Not Found",
      description: "Category not found",
      openGraph: {
        title: "Our Work - Not Found",
        description: "Category not found",
        images: [
          {
            url: "/default-thumbnail.jpg",
            alt: "Category Not Found",
          },
        ],
      },
      twitter: {
        title: "Our Work - Not Found",
        description: "Category not found",
        images: ["/default-thumbnail.jpg"],
      },
      alternates: {
        canonical: `/category/${slug}`,
      },
      robots: {
        index: false,
        follow: false,
      },
      keywords: "category, not found, 404",
      authors: [{ name: "Luminor Team", url: baseUrl }],
      creator: "Luminor Team",
      applicationName: "Luminor",
      formatDetection: {
        telephone: false,
        address: false,
        email: false,
      },
      metadataBase: new URL(baseUrl),
      icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        other: [
          {
            rel: "icon",
            url: "/favicon-32x32.png",
            sizes: "32x32",
          },
          {
            rel: "icon",
            url: "/favicon-16x16.png",
            sizes: "16x16",
          },
          {
            rel: "mask-icon",
            url: "/safari-pinned-tab.svg",
            color: "#5bbad5",
          },
        ],
      },
    };
  }
}

export default async function CategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const t = await getTranslations();
  const queryClient = getQueryClient();

  let results: [
    PromiseSettledResult<CategoryBySlugResponse>,
    PromiseSettledResult<AlbumCategoryBySlugResponse>,
  ] = [
    { status: "rejected", reason: null } as any,
    { status: "rejected", reason: null } as any,
  ];

  try {
    results = (await Promise.allSettled([
      queryClient.ensureQueryData<CategoryBySlugResponse>(
        categoryBySlugOption(slug),
      ),
      queryClient.ensureQueryData<AlbumCategoryBySlugResponse>(
        albumBySlugOption(slug),
      ),
    ])) as typeof results;

    for (const result of results) {
      if (result.status === "rejected") {
        const err = result.reason;

        if (err?.status === 403 || err?.status === 404) return notFound();
        throw err;
      }
    }
  } catch (err: any) {
    if (err?.status === 403 || err?.status === 404) {
      return notFound();
    }
    throw err;
  }

  const dehydratedState = dehydrate(queryClient);

  // ✅ results[0] sekarang sudah bisa diakses
  const selectedData =
    results[0].status === "fulfilled" ? results[0].value : null;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative min-h-screen text-white flex flex-col md:flex-row gap-2 md:gap-6">
        <TitlePage
          subtitle={selectedData?.data?.name ?? slug}
          title={t("about.ourCategory")}
        />
        <div className="md:ml-[120px] md:px-10 px-5 md:py-32 gap-6 grow">
          <p className="text-white md:mt-4 text-lg md:text-4xl">
            {selectedData?.data?.description || t("category.description")}
          </p>
          <GridAlbum slug={slug} />
          <BackToTop />
        </div>
      </div>
    </HydrationBoundary>
  );
}
