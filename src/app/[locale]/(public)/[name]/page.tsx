import { getTranslations } from "next-intl/server";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import BackToTop from "../_components/back-to-top";
import TitlePage from "../_components/title-page";
import { InstagramIcon, TikTokIcon } from "../_components/icons";
import { fetchInformation } from "../_hooks/use-user-by-slug";
import { getOptions as userOption } from "../_hooks/use-user-by-slug";
import { getOptions as albumBySlugOption } from "../_hooks/use-album-category-by-slug";

import GridAlbum from "./_components/grid-album";
import Description from "./_components/description";

import getQueryClient from "@/utils/react-query";
import {
  AlbumCategoryBySlugResponse,
  UserBySlugResponse,
} from "@/types/website";

export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name: slug } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const data = await fetchInformation(slug);

    // Capitalize the first letter of name and description if available
    const capitalize = (str?: string) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1) : undefined;

    // Generate relevant keywords based on user data
    const userName = capitalize(data?.data?.user?.name);
    const userCategory = data?.data?.user?.role || "";

    const keywordsArr = [
      userName,
      userCategory,
      "our work",
      "our talent",
      "our team",
      "our portfolio",
      "our team talent",
      "our team portfolio",
      "our talent portfolio",
      "our work talent",
      "our work portfolio",
      "our work team",
      "our work category",
      "talent",
      "portfolio",
      "luminor",
    ]
      .filter(Boolean)
      .map((kw) => kw?.toLowerCase())
      .join(", ");

    return {
      title: userName || "Our Talent",
      description:
        capitalize(data?.data?.user?.description) ||
        "user description not available",
      openGraph: {
        title: userName || "Our Talent",
        description:
          capitalize(data?.data?.user?.description) ||
          "user description not user",
        images: [
          {
            url: data?.data?.user?.photo_url || "/default-thumbnail.jpg",
            alt: userName || "Our Category",
          },
        ],
      },
      twitter: {
        title: userName || "Our Talent",
        description:
          capitalize(data?.data?.user?.description) ||
          "user description not available",
        images: [data?.data?.user?.photo_url || "/default-thumbnail.jpg"],
      },
      alternates: {
        canonical: `/${data?.data?.user?.slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
      keywords: keywordsArr,
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
      title: "Our Portfolio - Not Found",
      description: "Our Portfolio not found",
      openGraph: {
        title: "Our Portfolio - Not Found",
        description: "Our Portfolio not found",
        images: [
          {
            url: "/default-thumbnail.jpg",
            alt: "Our Portfolio Not Found",
          },
        ],
      },
      twitter: {
        title: "Our Portfolio - Not Found",
        description: "Our Portfolio not found",
        images: ["/default-thumbnail.jpg"],
      },
      alternates: {
        canonical: `/${slug}`,
      },
      robots: {
        index: false,
        follow: false,
      },
      keywords: "Our Portfolio, not found, 404",
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

export default async function ServicePage(props: {
  params: Promise<{ name: string }>;
}) {
  const { name: slug } = await props.params;
  const t = await getTranslations();
  const queryClient = getQueryClient();

  let results: [
    PromiseSettledResult<UserBySlugResponse>,
    PromiseSettledResult<AlbumCategoryBySlugResponse>,
  ] = [
    { status: "rejected", reason: null } as any,
    { status: "rejected", reason: null } as any,
  ];

  try {
    results = (await Promise.allSettled([
      queryClient.ensureQueryData<UserBySlugResponse>(userOption(slug)),
      queryClient.ensureQueryData<AlbumCategoryBySlugResponse>(
        albumBySlugOption("all", slug, 0),
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
          subtitle={selectedData?.data.user?.name || ""}
          title={t("portfolio.ourWork")}
        />
        <div className="md:ml-[120px] md:px-10 px-5 md:py-32 gap-6 grow">
          <div className="flex-col md:flex-row flex my-6 gap-3 justify-center items-center md:items-start md:justify-start">
            <Avatar
              isBordered
              className="size-24 shrink-0"
              size="lg"
              src={
                selectedData?.data.user?.photo_url ||
                "/images/placeholder-image.webp"
              }
            />
            <div className="inline-flex gap-2 my-2 md:hidden">
              <Link
                aria-label="Instagram"
                href={selectedData?.data?.user?.url_instagram || "#"}
                target="_blank"
              >
                <InstagramIcon height={24} width={24} />
              </Link>
              <Link
                aria-label="TikTok"
                href={selectedData?.data?.user?.url_tiktok || "#"}
                target="_blank"
              >
                <TikTokIcon height={24} width={24} />
              </Link>
            </div>
            <div className="flex md:flex-col gap-2">
              <Description
                description={selectedData?.data?.user?.description || ""}
              />
              <div className="hidden md:inline-flex gap-2">
                <Link
                  aria-label="Instagram"
                  href={selectedData?.data?.user?.url_instagram || "#"}
                  target="_blank"
                >
                  <InstagramIcon height={24} width={24} />
                </Link>
                <Link
                  aria-label="TikTok"
                  href={selectedData?.data?.user?.url_tiktok || "#"}
                  target="_blank"
                >
                  <TikTokIcon height={24} width={24} />
                </Link>
              </div>
            </div>
          </div>
          <GridAlbum slug={slug} />
          <BackToTop />
        </div>
      </div>
    </HydrationBoundary>
  );
}
