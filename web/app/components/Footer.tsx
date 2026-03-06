"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLocale } from "next-intl";
import { withBasePath } from "@/lib/basePath";

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const navLinks = [
    { label: t('navLinks.about'), href: '#about' },
    { label: t('navLinks.goals'), href: '#goals' },
    { label: t('navLinks.challenges'), href: '#challenges' },
    { label: t('navLinks.audience'), href: '#audience' },
    { label: t('navLinks.subcommittees'), href: '#directions' },
    { label: t('navLinks.priorities'), href: '#priorities' },
    { label: t('navLinks.projects'), href: '#achievements' },
    { label: t('navLinks.documents'), href: '#documents' },
    { label: t('navLinks.application'), href: '#contact' },
  ];

  const techLinks = [
    { label: t('techLinks.ai'), href: '#directions' },
    { label: t('techLinks.blockchain'), href: '#directions' },
    { label: t('techLinks.iot'), href: '#directions' },
    { label: t('techLinks.cybersecurity'), href: '#directions' },
    { label: t('techLinks.microelectronics'), href: '#directions' },
    { label: t('techLinks.cloud'), href: '#directions' },
    { label: t('techLinks.energy'), href: '#directions' },
  ];

  const logoSrc = locale === 'en' 
    ? withBasePath("/logos/Logo-ACI-ENG.ver1.svg")
    : withBasePath("/logos/Logo-ACI-RUS.ver1.svg");
  const email = t('email');
  const phoneDisplay = t('phone');
  const phoneHref = phoneDisplay.replace(/[^\d+]/g, '') || phoneDisplay;

  return (
    <footer className="bg-[#0f1115] text-[#F3F4E9]">
      {/* CTA Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#5F68A5]/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#5F891D]/10 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-bebas mb-6 leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-[#F3F4E9]/60 text-lg mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#5F891D] text-[#151515] font-bold rounded-full hover:bg-[#5F891D]/90 transition-colors"
            >
              {t('apply')}
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand & Language */}
            <div className="lg:col-span-1">
              <Link href="#about" className="inline-block mb-6">
                <Image
                  src={logoSrc}
                  width={200}
                  height={100}
                  alt={locale === 'en' ? "Cyber Innovations Association" : "Ассоциация Цифровых Технологий"}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-[#F3F4E9]/50 text-sm mb-6">
                {t('cta.description')}
              </p>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3F4E9]/40 mb-4">
                {t('navigation')}
              </h3>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[#F3F4E9]/70 hover:text-[#5F891D] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Tech Directions */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3F4E9]/40 mb-4">
                {t('techDirections')}
              </h3>
              <nav className="flex flex-col gap-3">
                {techLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[#F3F4E9]/70 hover:text-[#5F891D] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3F4E9]/40 mb-4">
                {t('contacts')}
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-[#F3F4E9]/70 hover:text-[#5F891D] transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  {email}
                </a>
                <a
                  href={`tel:${phoneHref}`}
                  className="flex items-center gap-3 text-[#F3F4E9]/70 hover:text-[#5F891D] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  {phoneDisplay}
                </a>
                <div className="flex items-center gap-3 text-[#F3F4E9]/70 text-sm">
                  <MapPin className="w-8 h-8" />
                  {t('address')}
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#documents"
                  className="inline-flex items-center gap-2 text-[#5F891D] hover:text-[#5F891D]/80 text-sm font-medium"
                >
                  {t('presentation')}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#F3F4E9]/40 text-sm">
              © {new Date().getFullYear()} {t('copyright')}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-[#F3F4E9]/40 hover:text-[#F3F4E9]/60 text-sm transition-colors"
              >
                {t('privacyPolicy')}
              </a>
              <a
                href="#"
                className="text-[#F3F4E9]/40 hover:text-[#F3F4E9]/60 text-sm transition-colors"
              >
                {t('termsOfUse')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
