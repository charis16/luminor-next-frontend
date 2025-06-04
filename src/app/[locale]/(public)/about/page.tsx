import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import TitlePage from "../_components/title-page";
import { getOptions as websiteOptions } from "../_hooks/use-website";
import { getOptions as teamMemberOptions } from "../_hooks/use-team-members";
import { getOptions as categoryOptions } from "../_hooks/use-categories";

import Team from "./_components/team";
import Description from "./_components/description";
import Category from "./_components/category";

import getQueryClient from "@/utils/react-query";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const queryClient = getQueryClient();

  try {
    const results = await Promise.allSettled([
      queryClient.ensureQueryData(websiteOptions()),
      queryClient.ensureQueryData(teamMemberOptions()),
      queryClient.ensureQueryData(categoryOptions()),
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
  } catch (err: any) {
    if (err?.status === 403 || err?.status === 404) {
      return notFound();
    }
    throw err;
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative min-h-screen text-white flex flex-col md:flex-row">
        <TitlePage subtitle={t("aboutLuminor")} title={t("whoWeAre")} />

        <div className="flex-1 md:ml-[120px] md:px-10 px-5 py-10 md:py-28">
          <h1 className="text-xs md:text-2xl font-bold uppercase text-gray-200">
            {t("heading1")}
          </h1>
          <h2 className="text-xl md:text-5xl md:max-w-4xl font-extrabold uppercase text-white my-2">
            {t("heading2")}
          </h2>
          <Description />
          <Team />
          <Category />
        </div>
      </div>
    </HydrationBoundary>
  );
}
