import { notFound } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getOptions as websiteOptions } from "../_hooks/use-website";
import { getOptions as albumOptions } from "../_hooks/use-album";
import { getOptions as faqOptions } from "../_hooks/use-faq";

import Contact from "./_components/contact";
import Description from "./_components/description";
import HeroVideo from "./_components/hero-video";
import LatestRecent from "./_components/latest-work";
import FaqSection from "./_components/faq";

import getQueryClient from "@/utils/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  const results = await Promise.allSettled([
    queryClient.ensureQueryData(websiteOptions()),
    queryClient.ensureQueryData(albumOptions()),
    queryClient.ensureQueryData(faqOptions()),
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

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HeroVideo />
      <Description />
      <LatestRecent />
      <FaqSection />
      <Contact />
    </HydrationBoundary>
  );
}
