import { getRequestConfig } from "next-intl/server";

export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];

import ruMessages from "../messages/ru.json";
import enMessages from "../messages/en.json";

const messages = {
  ru: ruMessages,
  en: enMessages
};

export default getRequestConfig(async ({ locale }) => {
  const safeLocale: Locale =
    locale && locales.includes(locale as Locale)
      ? (locale as Locale)
      : "ru"; // fallback

  return {
    locale: safeLocale,
    messages: messages[safeLocale]
  };
});

