"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition, useState, useEffect } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'ru' ? 'en' : 'ru';
    
    // Strip the locale prefix from pathname to avoid /en/en or /ru/ru
    const cleanPathname = pathname.replace(/^\/(en|ru)/, '') || '/';
    
    startTransition(() => {
      router.replace(cleanPathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
                className={`inline-flex items-center gap-2 px-5 py-2.5 cursor-pointer rounded-full text-sm font-bold transition-all ${
                  scrolled
                    ? "bg-[#5F891D] text-[#151515] hover:bg-[#5F891D]/90 shadow-lg shadow-[#5F891D]/20"
                    : "bg-white text-[#151515] hover:bg-white"
                }`}
      aria-label={locale === 'ru' ? 'Switch to English' : 'Переключить на русский'}
    >
      {locale === 'ru' ? 'RU' : 'EN'}
    </button>
  );
}

