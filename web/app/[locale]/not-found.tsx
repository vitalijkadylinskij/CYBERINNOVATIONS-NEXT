'use client'

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F4E9] px-6 py-24 text-[#151515]">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#5F68A5]">404</p>
        <h1 className="mb-4 font-bebas text-5xl leading-none md:text-6xl">{t('title')}</h1>
        <p className="mb-8 text-base leading-relaxed text-[#151515]/70">{t('description')}</p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" locale={locale} className="inline-flex items-center justify-center rounded-xl bg-[#151515] px-6 py-3 text-sm font-semibold text-[#F3F4E9] transition-colors hover:bg-[#2a2a2a]">
            {t('home')}
          </Link>
          <a href={`/${locale}#documents`} className="inline-flex items-center justify-center rounded-xl border border-[#151515]/15 px-6 py-3 text-sm font-semibold text-[#151515] transition-colors hover:border-[#5F68A5] hover:text-[#5F68A5]">
            {t('documents')}
          </a>
        </div>
      </div>
    </main>
  );
}
