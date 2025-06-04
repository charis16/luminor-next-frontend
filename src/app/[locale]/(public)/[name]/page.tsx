import { getTranslations } from "next-intl/server";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";

import BackToTop from "../_components/back-to-top";
import TitlePage from "../_components/title-page";
import { InstagramIcon, TikTokIcon } from "../_components/icons";

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
  const t = await getTranslations();

  return (
    <div className="relative min-h-screen text-white flex flex-col md:flex-row gap-2 md:gap-6">
      <TitlePage subtitle={name} title={t("portfolio.ourWork")} />
      <div className="md:ml-[120px] md:px-10 px-5 md:py-32 gap-6 grow">
        <div className="flex-col md:flex-row flex my-6 gap-3 justify-center items-center md:items-start md:justify-start">
          <Avatar
            isBordered
            className="size-24 shrink-0"
            size="lg"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
          <div className="inline-flex gap-2 my-2 md:hidden">
            <Link aria-label="Instagram" href={"#"} target="_blank">
              <InstagramIcon height={24} width={24} />
            </Link>
            <Link aria-label="TikTok" href={"#"} target="_blank">
              <TikTokIcon height={24} width={24} />
            </Link>
          </div>
          <div className="flex md:flex-col gap-2">
            <p className="text-center md:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatibus ab blanditiis deserunt aut ut, temporibus reiciendis
              sequi voluptatum quo, vel dignissimos voluptate aliquam assumenda
              culpa eligendi repellendus? Ex nostrum harum numquam asperiores
              illum iure sit, dignissimos aliquid eum deleniti odit?
            </p>
            <div className="hidden md:inline-flex gap-2">
              <Link aria-label="Instagram" href={"#"} target="_blank">
                <InstagramIcon height={24} width={24} />
              </Link>
              <Link aria-label="TikTok" href={"#"} target="_blank">
                <TikTokIcon height={24} width={24} />
              </Link>
            </div>
          </div>
        </div>
        <GridAlbum showTab />
        <BackToTop />
      </div>
    </div>
  );
}
