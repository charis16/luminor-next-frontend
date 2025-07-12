import { getTranslations } from "next-intl/server";

import TitlePage from "../_components/title-page";

import Team from "./_components/team";
import Description from "./_components/description";
import Category from "./_components/category";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
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
  );
}
