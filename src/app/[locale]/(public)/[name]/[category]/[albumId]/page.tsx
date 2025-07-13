import { Avatar } from "@heroui/avatar";
import { Metadata } from "next";
import { stripHtml } from "string-strip-html";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import BackToTop from "../../../_components/back-to-top";
import TitlePage from "../../../_components/title-page";
import { fetchInformation } from "../../../_hooks/use-album-detail-by-slug";
import { getOptions as albumDetailBySlug } from "../../../_hooks/use-album-detail-by-slug";

import Description from "./_components/description";
import GridAlbum from "./_components/grid-album";

import { capitalize } from "@/utils/capitalize";
import getQueryClient from "@/utils/react-query";
import { AlbumDetailBySlugResponse } from "@/types/website";
import ImageWithSkeleton from "@/app/_components/image-skeleton";

export async function generateMetadata(props: {
  params: Promise<{ name: string; category: string; albumId: string }>;
}): Promise<Metadata> {
  const { albumId: slug } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const data = await fetchInformation(slug);
    const albumData = data?.data;

    const description =
      [
        albumData?.description &&
          capitalize(stripHtml(albumData.description).result),
        albumData?.category_name &&
          `Category: ${capitalize(albumData.category_name)}`,
        albumData?.title && `Album: ${capitalize(albumData.title)}`,
        albumData?.user_name && `By: ${capitalize(albumData.user_name)}`,
      ]
        .filter(Boolean)
        .join(", ") || "Album description not available";

    const title = capitalize(albumData?.title) || "Our Album";
    const thumbnail =
      albumData?.thumbnail || `${baseUrl}/images/web-app-manifest-1200x300.png`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: thumbnail, alt: title }],
      },
      twitter: {
        title,
        description,
        images: [thumbnail],
      },
      alternates: {
        canonical: `/${albumData?.user_slug}/${albumData?.category_slug}/${albumData?.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      },
      manifest: "/site.webmanifest",
      keywords: [
        albumData?.title && capitalize(albumData.title),
        "luminor",
        "blora",
        "photography",
        "photographer",
        "semarang",
        albumData?.category_name && capitalize(albumData.category_name),
        albumData?.user_name && capitalize(albumData.user_name),
      ]
        .filter(Boolean)
        .join(", "),
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
        icon: [
          { url: "/favicon.ico", type: "image/x-icon" },
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
          {
            url: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          {
            url: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        apple: [
          { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
            url: `${baseUrl}/images/web-app-manifest-1200x300.png`,
            alt: "Category Not Found",
          },
        ],
      },
      twitter: {
        title: "Our Work - Not Found",
        description: "Category not found",
        images: [`${baseUrl}/images/web-app-manifest-1200x300.png`],
      },
      alternates: {
        canonical: `/category/${slug}`,
      },
      robots: {
        index: false,
        follow: false,
      },
      keywords:
        "category,blora, weedings,photography,photographer, not found, 404",
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
          { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
          { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
          { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
        ],
      },
    };
  }
}

export default async function AlbumDetailPage(props: {
  params: Promise<{ name: string; category: string; albumId: string }>;
}) {
  const { albumId: slug } = await props.params;

  const queryClient = getQueryClient();

  let results: [PromiseSettledResult<AlbumDetailBySlugResponse>] = [
    { status: "rejected", reason: null } as any,
  ];

  try {
    results = (await Promise.allSettled([
      queryClient.ensureQueryData<AlbumDetailBySlugResponse>(
        albumDetailBySlug(slug),
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
      <div className="relative min-h-screen bg-black text-white flex flex-col md:flex-row">
        <TitlePage
          subtitle={selectedData?.data?.title || ""}
          title={selectedData?.data?.category_name || ""}
        />
        <div className="flex-1 md:ml-[120px] md:px-10 px-5 py-10 md:py-32">
          <div className="relative w-full h-[40vh] md:h-[65vh] mb-6">
            <ImageWithSkeleton
              fill
              priority
              alt={selectedData?.data?.title || ""}
              className="!w-full !h-full"
              imageClassName="object-cover object-[center_30%]"
              rounded={false}
              src={
                selectedData?.data?.thumbnail ||
                "/images/placeholder-image.webp"
              }
              withShadow={false}
            />
            <Avatar
              isBordered
              className="absolute top-4 right-4 size-14 md:!size-20 shrink-0 rounded-full z-10"
              classNames={{
                img: "object-cover object-[center_30%]",
              }}
              radius="full"
              src={
                selectedData?.data?.user_avatar ||
                "/images/placeholder-image.webp"
              }
              style={{
                objectPosition: "center 30%",
              }}
            />

            <Description slug={slug} />
          </div>

          <GridAlbum slug={slug} />
          <BackToTop />
        </div>
      </div>
    </HydrationBoundary>
  );
}
