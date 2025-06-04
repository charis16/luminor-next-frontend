import NextImage from "next/image";
import { Image } from "@heroui/image";
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

export async function generateMetadata(props: {
  params: Promise<{ name: string; category: string; albumId: string }>;
}): Promise<Metadata> {
  const { albumId: slug } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const data = await fetchInformation(slug);

    const descriptionParts = [
      data?.data?.description
        ? stripHtml(data.data.description).result &&
          capitalize(stripHtml(data.data.description).result)
        : undefined,
      data?.data?.category_name
        ? `Category: ${capitalize(data.data.category_name)}`
        : undefined,
      data?.data?.title ? `Album: ${capitalize(data.data.title)}` : undefined,
      data?.data?.user_name
        ? `By: ${capitalize(data.data.user_name)}`
        : undefined,
    ].filter(Boolean);

    const fullDescription =
      descriptionParts.length > 0
        ? descriptionParts.join(" , ")
        : "Album description not available";

    return {
      title: capitalize(data?.data?.title) || "Our Album",
      description: fullDescription,
      openGraph: {
        title: capitalize(data?.data?.title) || "Our Album",
        description: fullDescription,
        images: [
          {
            url: data?.data?.thumbnail || "/default-thumbnail.jpg",
            alt: capitalize(data?.data?.title) || "Our album",
          },
        ],
      },
      twitter: {
        title: capitalize(data?.data?.title) || "Our album",
        description: fullDescription,
        images: [data?.data?.thumbnail || "/default-thumbnail.jpg"],
      },
      alternates: {
        canonical: `/${data?.data?.user_slug}/${data?.data?.category_slug}/${data?.data?.title}`,
      },
      robots: {
        index: true,
        follow: true,
      },
      keywords: [
        data?.data?.title && capitalize(data.data.title),
        "luminor",
        "blora",
        "photography",
        "photographer",
        "semarang",
        data?.data?.category_name && capitalize(data.data.category_name),
        data?.data?.user_name && capitalize(data.data.user_name),
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
            <Image
              fill
              priority
              alt="Team Group"
              as={NextImage}
              className="object-cover"
              isBlurred={false}
              radius="none"
              removeWrapper={true}
              src={
                selectedData?.data?.thumbnail ||
                "/images/placeholder-image.webp"
              }
            />
            <Avatar
              isBordered
              className="absolute top-4 right-4 z-10"
              size="md"
              src={
                selectedData?.data?.user_avatar ||
                "/images/placeholder-image.webp"
              }
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
