"use client";

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const nextLocale = locale === 'ru' ? 'en' : 'ru';
  const [isPending, setIsPending] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setIsPending(true);

    const { pathname, search, hash } = window.location;
    const localizedPath = pathname.match(/\/(ru|en)(?=\/|$)/)
      ? pathname.replace(/\/(ru|en)(?=\/|$)/, `/${nextLocale}`)
      : `/${nextLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;

    window.location.assign(`${localizedPath}${search}${hash}`);
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
      {nextLocale.toUpperCase()}
    </button>
  );
}
