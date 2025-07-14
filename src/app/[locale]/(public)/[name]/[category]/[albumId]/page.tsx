import { Avatar } from "@heroui/avatar";
import { Metadata } from "next";
import { stripHtml } from "string-strip-html";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import TitlePage from "../../../_components/title-page";
import { fetchInformation } from "../../../_hooks/use-album-detail-by-slug";
import { getOptions as albumDetailBySlug } from "../../../_hooks/use-album-detail-by-slug";

import Description from "./_components/description";
import GridAlbum from "./_components/grid-album";

import { capitalize } from "@/utils/capitalize";
import getQueryClient from "@/utils/react-query";
import { AlbumDetailBySlugResponse } from "@/types/website";
import ImageWithSkeleton from "@/app/_components/image-skeleton";

interface PageProps {
  params: Promise<{
    name: string;
    category: string;
    albumId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { albumId: slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const data = await fetchInformation(slug);
    const album = data?.data;

    const title = capitalize(album?.title) || "Our Album";
    const description =
      [
        album?.description && capitalize(stripHtml(album.description).result),
        album?.category_name && `Category: ${capitalize(album.category_name)}`,
        album?.user_name && `By: ${capitalize(album.user_name)}`,
      ]
        .filter(Boolean)
        .join(", ") || "Album description not available";

    const thumbnail =
      album?.thumbnail || `${baseUrl}/images/web-app-manifest-1200x300.png`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: thumbnail, alt: title, width: 1200, height: 630 }],
      },
      twitter: {
        title,
        description,
        images: [thumbnail],
      },
      alternates: {
        canonical: `/${album?.user_slug}/${album?.category_slug}/${album?.slug}`,
      },
      metadataBase: new URL(baseUrl),
      manifest: "/site.webmanifest",
      robots: { index: true, follow: true },
      keywords: [
        album?.title && capitalize(album.title),
        "luminor",
        "blora",
        "photography",
        "photographer",
        "semarang",
        album?.category_name && capitalize(album.category_name),
        album?.user_name && capitalize(album.user_name),
      ]
        .filter(Boolean)
        .join(", "),
      authors: [{ name: "Luminor Team", url: baseUrl }],
      creator: "Luminor Team",
      applicationName: "Luminor",
      formatDetection: { telephone: false, address: false, email: false },
      icons: {
        icon: [
          { url: "/favicon.ico", type: "image/x-icon" },
          { url: "/favicon-16x16.png", sizes: "16x16" },
          { url: "/favicon-32x32.png", sizes: "32x32" },
          { url: "/android-chrome-192x192.png", sizes: "192x192" },
          { url: "/android-chrome-512x512.png", sizes: "512x512" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
      metadataBase: new URL(baseUrl),
      robots: { index: true, follow: true },
      keywords:
        "category,blora, weedings,photography,photographer, not found, 404",
      authors: [{ name: "Luminor Team", url: baseUrl }],
      creator: "Luminor Team",
      applicationName: "Luminor",
      formatDetection: { telephone: false, address: false, email: false },
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

export default async function AlbumDetailPage({ params }: PageProps) {
  const { albumId: slug } = await params;

  const queryClient = getQueryClient();

  try {
    const results = await Promise.allSettled([
      queryClient.ensureQueryData<AlbumDetailBySlugResponse>(
        albumDetailBySlug(slug),
      ),
    ]);

    const result = results[0];

    if (result.status === "rejected") {
      const err = result.reason;

      if (err?.status === 403 || err?.status === 404) return notFound();
      throw err;
    }

    const album = result.value.data;
    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <div className="relative min-h-screen bg-black text-white flex flex-col md:flex-row">
          <TitlePage
            subtitle={album?.title || ""}
            title={album?.category_name || ""}
          />
          <div className="flex-1 md:ml-[120px] md:px-10 px-5 py-10 md:py-32">
            <div className="relative w-full h-[40vh] md:h-[65vh] mb-6">
              <ImageWithSkeleton
                fill
                priority
                alt={album?.title || ""}
                className="!w-full !h-full"
                imageClassName="object-cover object-[center_30%]"
                rounded={false}
                src={album?.thumbnail || "/images/placeholder-image.webp"}
                withShadow={false}
              />
              <Avatar
                isBordered
                className="absolute top-4 right-4 size-14 md:!size-20 shrink-0 rounded-full z-10"
                classNames={{ img: "object-cover object-[center_30%]" }}
                radius="full"
                src={album?.user_avatar || "/images/placeholder-image.webp"}
                style={{ objectPosition: "center 30%" }}
              />
              <Description slug={slug} />
            </div>

            <GridAlbum slug={slug} />
          </div>
        </div>
      </HydrationBoundary>
    );
  } catch (err: any) {
    if (err?.status === 403 || err?.status === 404) {
      return notFound();
    }
    throw err;
  }
}
