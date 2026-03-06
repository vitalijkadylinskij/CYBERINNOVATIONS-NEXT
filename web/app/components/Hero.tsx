"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  DollarSign,
  Layers,
  Users,
  Brain,
  Link,
  Radio,
  Shield,
  Cpu,
  Cloud,
  Zap,
} from 'lucide-react';
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { CommitteeKey } from './TechnologyDirections';
import { withBasePath } from "@/lib/basePath";

const committeeOrder: CommitteeKey[] = ['ai', 'blockchain', 'iot', 'cybersecurity', 'microelectronics', 'cloud', 'energy', 'human-capital'];

interface CommitteeMeta {
  titleKey: string;
  badgeKey: string;
  icon: React.ElementType;
  accent: string;
  image: string;
}

const committeeMeta: Record<CommitteeKey, CommitteeMeta> = {
  ai: {
    titleKey: "ai.title",
    badgeKey: "ai.badge",
    icon: Brain,
    accent: "#5F68A5",
    image: withBasePath("/materials/media/01.webp"),
  },
  blockchain: {
    titleKey: "blockchain.title",
    badgeKey: "blockchain.badge",
    icon: Link,
    accent: "#5F891D",
    image: withBasePath("/materials/media/02.webp"),
  },
  iot: {
    titleKey: "iot.title",
    badgeKey: "iot.badge",
    icon: Radio,
    accent: "#5F891D",
    image: withBasePath("/materials/media/03.webp"),
  },
  cybersecurity: {
    titleKey: "cybersecurity.title",
    badgeKey: "cybersecurity.badge",
    icon: Shield,
    accent: "#5F68A5",
    image: withBasePath("/materials/media/04.webp"),
  },
  microelectronics: {
    titleKey: "microelectronics.title",
    badgeKey: "microelectronics.badge",
    icon: Cpu,
    accent: "#5F68A5",
    image: withBasePath("/materials/media/05.webp"),
  },
  cloud: {
    titleKey: "cloud.title",
    badgeKey: "cloud.badge",
    icon: Cloud,
    accent: "#5F891D",
    image: withBasePath("/materials/media/06.webp"),
  },
  energy: {
    titleKey: "energy.title",
    badgeKey: "energy.badge",
    icon: Zap,
    accent: "#5F891D",
    image: withBasePath("/materials/media/07.webp"),
  },
  "human-capital": {
    titleKey: "humanCapital.title",
    badgeKey: "humanCapital.badge",
    icon: Users,
    accent: "#5F68A5",
    image: withBasePath("/materials/media/08.webp"),
  },
};

interface HeroProps {
  activeCommittee?: CommitteeKey;
}

const SLIDE_INTERVAL_MS = 5000;

export function Hero({ activeCommittee: initialCommittee = 'ai' }: HeroProps) {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [activeCommittee, setActiveCommittee] = useState<CommitteeKey>(initialCommittee);
  const keyPoints = [
    {
      icon: DollarSign,
      value: '200+',
      suffix: locale === 'en' ? 'M USD' : 'млн $',
      textKey: 'investments',
    },
    { icon: Layers, value: '8', suffix: '', textKey: 'directions' },
    { icon: Users, value: '50+', suffix: '', textKey: 'partners' },
  ] as const;

  useEffect(() => {
    const idx = committeeOrder.indexOf(activeCommittee);
    const nextIdx = (idx + 1) % committeeOrder.length;
    const timer = setInterval(() => {
      setActiveCommittee(committeeOrder[nextIdx]);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [activeCommittee]);

  const heroImage = withBasePath("/materials/media/05.webp");
  const currentMeta = committeeMeta[activeCommittee];
  const nextKey = committeeOrder[(committeeOrder.indexOf(activeCommittee) + 1) % committeeOrder.length];
  const nextMeta = committeeMeta[nextKey];
  const CurrentIcon = currentMeta.icon;
  const NextIcon = nextMeta.icon;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="about">
      <div className="absolute inset-0">
        <Image
          width={100}
          height={100}
          src={heroImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0f1115]/85" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#5F68A5]/30 via-transparent to-[#5F891D]/20" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#5F68A5]/25 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#5F891D]/25 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[#5F68A5]/25 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5F68A5]/15 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5F891D]/15 to-transparent" />
      </div>

      <div className="absolute top-24 -left-40 w-[420px] h-[420px] rounded-full bg-[#5F68A5]/20 blur-[128px]" />
      <div className="absolute bottom-12 -right-40 w-[420px] h-[420px] rounded-full bg-[#5F891D]/20 blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          {/* LEFT */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 mb-7">
                <div className="h-px w-12 bg-[#5F891D]" />
                <span className="text-[#5F891D] text-sm tracking-[0.2em] uppercase font-medium">
                  {t('country')}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#F3F4E9] mb-6 font-bebas leading-[0.95] tracking-tight">
                <span className="block">{t('titleLine1')}</span>
                <span className="block text-[#5F68A5]">{t('titleLine2')}</span>
                <span className="block">{t('titleLine3')}</span>
              </h1>

              <p className="text-base md:text-lg text-[#F3F4E9]/78 mb-9 leading-relaxed max-w-xl">
                {t('description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-[#5F891D] text-[#151515] font-bold rounded-full hover:bg-[#5F891D]/90 transition-colors w-full sm:w-auto"
                >
                  <span>{t('becomeMember')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="#goals"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 border border-[#F3F4E9]/30 text-[#F3F4E9] font-medium rounded-full hover:bg-[#F3F4E9]/10 transition-colors w-full sm:w-auto"
                >
                  <span>{t('learnMore')}</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-[#F3F4E9]/70"
            >
              {keyPoints.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-[#F3F4E9]/70" />
                    </div>
                    <div className="leading-tight">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl md:text-2xl font-bold text-[#F3F4E9] font-bebas">{p.value}</span>
                        {p.suffix ? <span className="text-xs md:text-sm text-[#F3F4E9]/65">{p.suffix}</span> : null}
                      </div>
                      <div className="text-xs md:text-sm text-[#F3F4E9]/55">{tCommon(`keyPoints.${p.textKey}`)}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT (dynamic visual) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[16/10]">
                <AnimatePresence>
                  <motion.div
                    key={activeCommittee}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      fill
                      src={currentMeta.image}
                      alt={t(`techDirections.${currentMeta.titleKey}`)}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                {/* fallback tint if assets not yet added */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0f1115]/55 via-transparent to-[#5F891D]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115]/45 via-transparent to-transparent" />

                {/* top-right badge (active committee) */}
                <AnimatePresence>
                  <motion.div
                    key={`current-${activeCommittee}`}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-4 right-4"
                  >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0f1115]/65 border border-white/10 backdrop-blur">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${currentMeta.accent}22`, color: currentMeta.accent }}
                      >
                        <CurrentIcon className="w-4.5 h-4.5" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-[#F3F4E9]">{t(`techDirections.${currentMeta.badgeKey}`)}</div>
                        <div className="text-[11px] text-[#F3F4E9]/60">{t(`techDirections.${currentMeta.titleKey}`)}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* bottom-left badge (next committee hint) */}
                <AnimatePresence>
                  <motion.div
                    key={`next-${nextKey}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute bottom-4 left-4"
                  >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0f1115]/55 border border-white/10 backdrop-blur">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${nextMeta.accent}22`, color: nextMeta.accent }}
                      >
                        <NextIcon className="w-4.5 h-4.5" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-[#F3F4E9]">{t(`techDirections.${nextMeta.badgeKey}`)}</div>
                        <div className="text-[11px] text-[#F3F4E9]/60">{t(`techDirections.${nextMeta.titleKey}`)}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="px-6 py-5 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`footer-${activeCommittee}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm text-[#F3F4E9]/65"
                  >
                    {tCommon('activeCommittee')} <span className="text-[#F3F4E9] font-medium">{t(`techDirections.${currentMeta.titleKey}`)}</span>
                  </motion.div>
                </AnimatePresence>
                <a
                  href="#directions"
                  className="text-sm font-medium text-[#F3F4E9] hover:text-[#F3F4E9]/80 transition-colors inline-flex items-center gap-2"
                >
                  {t('directions')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
