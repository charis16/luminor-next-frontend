import { getTranslations } from "next-intl/server";

import BackToTop from "../_components/back-to-top";
import TitlePage from "../_components/title-page";

import GridAlbum from "./_components/grid-album";

export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await props.params;

  return {
    title: `Our Work - ${name || "Our Work"}`,
  };
}

export default async function ServicePage(props: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await props.params;
  const t = await getTranslations("category");

  return (
    <div className="relative min-h-screen text-white flex flex-col md:flex-row">
      <TitlePage subtitle={name} title="Our Work" />
      <div className="flex-1 md:ml-[120px] md:px-10 px-5 py-10 md:py-32">
        <p className="text-white mt-4 text-2xl md:text-4xl">{t("heading")}</p>
        <GridAlbum showTab />
        <BackToTop />
      </div>
    </div>
  );
}
