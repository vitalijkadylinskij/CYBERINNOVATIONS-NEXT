import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteUrl, withBasePath } from "@/lib/basePath";
import ruMessages from "@/messages/ru.json";
import enMessages from "@/messages/en.json";

const messages = {
  ru: ruMessages,
  en: enMessages,
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const localeMessages = messages[locale];
  const metadataMessages = localeMessages.metadata;
  const metadataBase = new URL(siteUrl);
  const canonicalPath = withBasePath(`/${locale}`);
  const ogImagePath = withBasePath("/materials/media/05.webp");

  return {
    metadataBase,
    title: {
      default: metadataMessages.title,
      template: metadataMessages.titleTemplate,
    },
    description: metadataMessages.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ru: withBasePath("/ru"),
        en: withBasePath("/en"),
      },
    },
    openGraph: {
      title: metadataMessages.ogTitle,
      description: metadataMessages.ogDescription,
      siteName: "Cyber Innovation",
      locale: locale === "en" ? "en_US" : "ru_RU",
      type: "website",
      url: canonicalPath,
      images: [
        {
          url: new URL(ogImagePath, metadataBase).toString(),
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataMessages.ogTitle,
      description: metadataMessages.ogDescription,
      images: [new URL(ogImagePath, metadataBase).toString()],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const localeMessages = messages[locale];

  return (
    <NextIntlClientProvider locale={locale} messages={localeMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
