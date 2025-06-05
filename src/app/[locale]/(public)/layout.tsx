import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { LanguageSwitcher } from "../admin/_components";

import { Navbar } from "./_components/navbar";
import { InstagramIcon, TikTokIcon, WhatsappIcon } from "./_components/icons";
import { getOptions as faqOptions } from "./_hooks/use-faq";
import { getOptions as albumOptions } from "./_hooks/use-album";
import { getOptions as websiteOptions } from "./_hooks/use-website";
import { getOptions as categoryOptions } from "./_hooks/use-categories";
import { getOptions as teamMemberOptions } from "./_hooks/use-team-members";

import getQueryClient from "@/utils/react-query";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const t = await getTranslations("seo");

  try {
    const res = await fetch(`${baseUrl}/api/website`, {
      cache: "no-store",
    });

    const json = await res.json();
    const data = json?.data;

    const metaDesc = data?.meta_desc?.slice(0, 160) || t("description");

    const metaName = data?.meta_title || t("title");

    const ogImage = data?.og_image?.startsWith("http")
      ? data.og_image
      : `${baseUrl}${data?.og_image || "/images/web-app-manifest-512x512.png"}`;

    return {
      title: {
        default: metaName,
        template: `%s - Luminor Photography`,
      },
      description: metaDesc,
      openGraph: {
        title: metaName,
        description: metaDesc,
        images: [ogImage],
        url: `${baseUrl}`,
      },
      twitter: {
        title: metaName,
        description: metaDesc,
        images: [ogImage],
      },
      alternates: {
        canonical: `${baseUrl}`,
      },
    };
  } catch {
    return {
      title: t("title"),
      description: t("description"),
      openGraph: {
        title: "Luminor Photography",
        description: t("description"),
        images: [`${baseUrl}/images/web-app-manifest-512x512.png`],
      },
      twitter: {
        title: "Luminor Photography",
        description: t("description"),
        images: [`${baseUrl}/images/web-app-manifest-512x512.png`],
      },
      alternates: {
        canonical: `${baseUrl}`,
      },
    };
  }
}

export default async function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("navbar");

  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  const results = await Promise.allSettled([
    queryClient.ensureQueryData(websiteOptions()),
    queryClient.ensureQueryData(albumOptions()),
    queryClient.ensureQueryData(faqOptions()),
    queryClient.ensureQueryData(categoryOptions()),
    queryClient.ensureQueryData(teamMemberOptions()),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      const err = result.reason;

      if (err?.status === 403 || err?.status === 404) {
        return notFound();
      }
      throw err;
    }
  }

  const website =
    results[0].status === "fulfilled" ? results[0].value.data : null;

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative">
        <Navbar />
        <div>{children}</div>
        <a
          className="fixed top-1/2 right-4 -translate-y-1/2 z-30 bg-green-600 text-white px-2 py-2 text-sm tracking-tight rotate-90 origin-right md:hidden rounded-b-lg whitespace-nowrap inline-flex gap-2 cursor-pointer items-center"
          href={`https://api.whatsapp.com/send?phone=${website?.phone_number}&text=Halo%20Luminor!`}
          rel="noreferrer"
          target="_blank"
        >
          {t("chatWithUs")}
          <WhatsappIcon />
        </a>
        <footer className="backdrop-blur relative z-10 text-white px-6 py-4">
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row gap-2 justify-end items-center ">
            <div className="flex justify-center items-center">
              <Link
                aria-label="Instagram"
                href={website?.url_instagram || "#"}
                target="_blank"
              >
                <InstagramIcon height={18} width={18} />
              </Link>
              <Link
                aria-label="TikTok"
                className="ml-3"
                href={website?.url_tiktok || "#"}
                target="_blank"
              >
                <TikTokIcon height={18} width={18} />
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
          <div className="mt-2 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-center text-sm text-neutral-500">
            {/* Kiri - Info */}
            <div className="text-center flex flex-col gap-1 md:flex-row">
              © 2025 Luminor,
              <p className="inline-flex items-center text-center gap-1">
                Designed by
                <span className="text-white font-medium ">
                  CV. Selaras Utama Kreasindo
                </span>
              </p>
            </div>

            {/* <div className="flex items-center gap-6 mt-3 md:mt-0">
              <div className="flex gap-6">
                <Link className="hover:underline" href="#">
                  Privacy Policy
                </Link>
                <Link className="hover:underline" href="#">
                  Terms of Service
                </Link>
              </div>
            </div> */}
          </div>
        </footer>
      </div>
    </HydrationBoundary>
  );
}
