"use client";

import { Image } from "@heroui/image";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { UserRoundX } from "lucide-react";

import { useTeamMembers } from "../../_hooks/use-team-members";
import {
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
} from "../../_components/icons";

export default function Team() {
  const t = useTranslations("about");
  const { data } = useTeamMembers();

  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="relative w-full h-[40vh] md:h-[65vh]">
        <Image
          fill
          priority
          alt="Team Group"
          as={NextImage}
          className="object-cover"
          isBlurred={false}
          radius="none"
          removeWrapper={true}
          src="/images/team.webp"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-4xl font-bold text-foreground">
            {t("meetTheTeam")}
          </h2>
          <p className="text-neutral-400">{t("meetTheTeamDesc")}</p>
        </div>
        {data && data?.data && data.data.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.data?.map((member) => (
              <div
                key={member.uuid}
                className="relative group h-[420px] overflow-hidden rounded-md shadow-md"
              >
                <Image
                  alt="Team Member"
                  className="w-full h-full object-cover"
                  isBlurred={false}
                  radius="none"
                  removeWrapper={true}
                  src={member.photo_url || "/images/placeholder-image.webp"}
                />

                <h3 className="absolute bottom-4 left-4 text-white text-xl z-10 font-bold">
                  {member.name}
                </h3>

                {/* Overlay and additional content only appears on hover */}
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60">
                  {/* Role vertical top right */}
                  <div className="text-white tracking-widest rotate-90 absolute top-[20%] -right-8 z-30 font-semibold">
                    {member.role}
                  </div>

                  {/* Social icons bottom right */}
                  <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                    {[
                      {
                        label: "Instagram",
                        icon: <InstagramIcon height={16} width={16} />,
                      },
                      {
                        label: "YouTube",
                        icon: <YoutubeIcon height={16} width={16} />,
                      },
                      {
                        label: "TikTok",
                        icon: <TikTokIcon height={16} width={16} />,
                      },
                    ].map((item, i) => (
                      <button
                        key={i}
                        aria-label={item.label}
                        className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center"
                        type="button"
                      >
                        {item.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center">
              <UserRoundX className="text-muted-foreground size-14" />
            </div>
            <h2 className="text-3xl font-semibold text-white">
              {t("noTeamUser")}
            </h2>
            <p className="text-neutral-400 max-w-md text-xl">
              {t("noTeamUserYet")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
