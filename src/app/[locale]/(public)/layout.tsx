import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { LanguageSwitcher } from "../admin/_components";

import { Navbar } from "./_components/navbar";
import { InstagramIcon, TikTokIcon, WhatsappIcon } from "./_components/icons";

export default async function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("navbar");

  return (
    <div className="relative">
      <Navbar />
      <div>{children}</div>
      <a
        className="fixed top-1/2 right-4 -translate-y-1/2 z-50 bg-green-600 text-white px-2 py-2 text-sm tracking-tight rotate-90 origin-right md:hidden rounded-b-lg whitespace-nowrap inline-flex gap-2 cursor-pointer"
        href="https://api.whatsapp.com/send?phone=6281234567890&text=Halo%20Luminor!"
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
              href="https://instagram.com"
              target="_blank"
            >
              <InstagramIcon height={14} width={14} />
            </Link>
            <Link
              aria-label="TikTok"
              className="ml-3"
              href="https://tiktok.com"
              target="_blank"
            >
              <TikTokIcon height={14} width={14} />
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
        <div className="mt-2 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-500">
          {/* Kiri - Info */}
          <p className="text-center md:text-left">
            © 2025 Luminor, Designed by{" "}
            <span className="text-white font-medium">
              CV. Selaras Utama Kreasindo
            </span>
          </p>

          {/* Kanan - Link navigasi dan social */}
          <div className="flex items-center gap-6 mt-3 md:mt-0">
            {/* Link Policy */}
            <div className="flex gap-6">
              <Link className="hover:underline" href="#">
                Privacy Policy
              </Link>
              <Link className="hover:underline" href="#">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
