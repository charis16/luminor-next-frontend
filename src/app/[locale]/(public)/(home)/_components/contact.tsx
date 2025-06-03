"use client";

import { MapPin, Phone } from "lucide-react";
import { useTranslations } from "use-intl";

import { useWebsites } from "../../_hooks/use-website";

export default function Contact() {
  const { data } = useWebsites();
  const t = useTranslations("home");

  return (
    <div className="flex justify-center items-center">
      <div
        className="flex flex-col gap-4 md:gap-8 z-10 w-full"
        id="contact-section"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-10 w-full items-start py-10 px-6">
          {/* Column 1: Intro */}
          <div className="space-y-4 text-start">
            <h2 className="text-xl md:text-4xl font-bold text-foreground">
              {t("getInTouch")}
            </h2>
            <h4 className="text-neutral-400 text-lg md:max-w-3xl">
              {t("getInTouchDesc")}
            </h4>
          </div>

          {/* Column 2: Address */}
          <div className="space-y-2 text-start">
            <div className="w-12 h-12 rounded-xl bg-white/85 flex items-center justify-center">
              <MapPin className="text-black size-6" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              {t("ourAddress")}
            </p>
            <p className="text-neutral-400">
              {data?.data?.address && data.data.address.trim() !== ""
                ? data.data.address
                : "Jl. Perkutut No.6, Nglawian Satu, Karangjati, Blora, Jawa Tengah 58219"}
            </p>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-2 text-start">
            <div className="w-12 h-12 rounded-xl bg-white/85 flex items-center justify-center">
              <Phone className="text-black size-6" />
            </div>
            <p className="text-lg font-semibold text-foreground">
              {t("ourContactInfo")}
            </p>
            <p className="text-neutral-400">
              {data?.data?.phone_number && data.data.phone_number.trim() !== ""
                ? data.data.phone_number
                : "+62 812-3456-7890"}
            </p>
            <p className="text-neutral-400">
              {data?.data?.email && data.data.email.trim() !== ""
                ? data.data.email
                : "luminorphoto@gmail.com"}
            </p>
          </div>
        </div>

        <div className="relative w-full h-[450px]">
          {/* Google Maps Embed */}
          <iframe
            allowFullScreen={false}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2128.2896831484068!2d111.42663309817934!3d-6.962842942591886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7740565f229c4f%3A0x6596b9e1e1566c3b!2sJl.%20Perkutut%20No.6%2C%20Nglawian%20Satu%2C%20Karangjati%2C%20Kec.%20Blora%2C%20Kabupaten%20Blora%2C%20Jawa%20Tengah%2058219!5e0!3m2!1sid!2sid!4v1748491835429!5m2!1sid!2sid"
            title="Luminor Photography Location"
          />
        </div>
      </div>
    </div>
  );
}
