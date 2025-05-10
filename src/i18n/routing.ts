import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "id",
  localePrefix: "never",
  localeCookie: {
    name: "LUMINOR_LOCALE", // ⬅️ ganti dari NEXT_LOCALE ke custom
  },
});
