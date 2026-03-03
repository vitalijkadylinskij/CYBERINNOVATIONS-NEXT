// app/[locale]/layout.tsx
import { Bebas_Neue } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { locales } from "@/lib/i18n";

import ruMessages from '../../messages/ru.json';
import enMessages from '../../messages/en.json';

const messages: Record<string, any> = {
  ru: ruMessages,
  en: enMessages
};

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  const localeMessages = messages[locale] || messages.ru;

  return (
    <html lang={locale}>
      <body className={`${bebas.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={localeMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
