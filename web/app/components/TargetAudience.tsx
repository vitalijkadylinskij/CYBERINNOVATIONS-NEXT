"use client";
import { useMemo, useState } from 'react';
import { motion } from "framer-motion";
import { Building2, GraduationCap, Briefcase, Rocket, Users, Check } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from "next-intl";
import OrbitLabels from './ui/OrbitLabels';
import { withBasePath } from "@/lib/basePath";

interface AudienceGroup {
  icon: React.ElementType;
  shortLabelKey: string;
  titleKey: string;
  subtitleKey: string;
  benefitsKeys: string[];
  color: string;
}

const audiences: AudienceGroup[] = [
  {
    icon: Building2,
    shortLabelKey: 'groups.government.shortLabel',
    titleKey: 'groups.government.title',
    subtitleKey: 'groups.government.subtitle',
    benefitsKeys: ['groups.government.benefits.0', 'groups.government.benefits.1', 'groups.government.benefits.2', 'groups.government.benefits.3'],
    color: '#5F68A5',
  },
  {
    icon: GraduationCap,
    shortLabelKey: 'groups.academy.shortLabel',
    titleKey: 'groups.academy.title',
    subtitleKey: 'groups.academy.subtitle',
    benefitsKeys: ['groups.academy.benefits.0', 'groups.academy.benefits.1', 'groups.academy.benefits.2', 'groups.academy.benefits.3'],
    color: '#5F891D',
  },
  {
    icon: Briefcase,
    shortLabelKey: 'groups.business.shortLabel',
    titleKey: 'groups.business.title',
    subtitleKey: 'groups.business.subtitle',
    benefitsKeys: ['groups.business.benefits.0', 'groups.business.benefits.1', 'groups.business.benefits.2', 'groups.business.benefits.3'],
    color: '#5F68A5',
  },
  {
    icon: Rocket,
    shortLabelKey: 'groups.startups.shortLabel',
    titleKey: 'groups.startups.title',
    subtitleKey: 'groups.startups.subtitle',
    benefitsKeys: ['groups.startups.benefits.0', 'groups.startups.benefits.1', 'groups.startups.benefits.2', 'groups.startups.benefits.3'],
    color: '#5F891D',
  },
  {
    icon: Users,
    shortLabelKey: 'groups.talents.shortLabel',
    titleKey: 'groups.talents.title',
    subtitleKey: 'groups.talents.subtitle',
    benefitsKeys: ['groups.talents.benefits.0', 'groups.talents.benefits.1', 'groups.talents.benefits.2', 'groups.talents.benefits.3'],
    color: '#5F68A5',
  },
];

type Partner = { name: string; logo?: string };

const partners: Partner[] = [
  { name: 'SL-Group', logo: withBasePath('/materials/partners/SL-Group.svg') },
  { name: 'BRICS Pay', logo: withBasePath('/materials/partners/BICS_Pay.svg') },
  { name: 'НЦОД', logo: withBasePath('/materials/partners/ncod_banner_e.svg') },
  { name: 'АУРВА', logo: withBasePath('/materials/partners/АУРВА.svg') },
  { name: 'PG', logo: withBasePath('/materials/partners/pg-logo.svg') },
];

function PartnerChip({ name, logo }: Partner) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="flex-shrink-0 px-6 md:px-7 py-4 rounded-2xl border border-[#151515]/10 bg-white/70 backdrop-blur flex items-center justify-center min-w-[160px] md:min-w-[190px] h-16 md:h-[84px]">
      {logo && !errored ? (
        <Image
          width={100}
          height={100}
          src={logo}
          alt={name}
          className="max-h-10 md:max-h-12 max-w-[120px] md:max-w-[140px] object-cover cover-center opacity-80"
          onError={() => setErrored(true)}
          loading="lazy"
        />
      ) : (
        <span className="text-[#151515]/75 font-semibold whitespace-nowrap">{name}</span>
      )}
    </div>
  );
}

export function TargetAudience() {
  const t = useTranslations('audience');
  const [activeIndex, setActiveIndex] = useState(0);

  const active = useMemo(() => audiences[activeIndex], [activeIndex]);
  const ActiveIcon = active.icon;

  const labelItems = useMemo(() => 
    audiences.map((item) => (
      <button
        key={item.titleKey}
        type="button"
        onClick={() => setActiveIndex(audiences.indexOf(item))}
        onMouseEnter={() => setActiveIndex(audiences.indexOf(item))}
        className={`relative group w-full rounded-2xl bg-white/90 border px-4 py-3 shadow-sm transition-all pointer-events-auto ${
          activeIndex === audiences.indexOf(item) ? 'border-[#5F891D]/35 shadow-md' : 'border-[#151515]/10 hover:shadow-md'
        }`}
      >
        <p className="text-sm font-semibold text-[#151515] text-center">{t(item.shortLabelKey)}</p>
        <p className="text-[11px] text-center mt-1" style={{ color: item.color }}>
          {t(item.subtitleKey)}
        </p>
      </button>
    )), 
    [activeIndex, t]
  );

  return (
    <section className="py-24 relative overflow-hidden" id="audience">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />

      <div className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-[#5F68A5]/5 blur-3xl" />
      <div className="absolute bottom-40 -left-40 w-80 h-80 rounded-full bg-[#5F891D]/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-5xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F891D]" />
            <span className="text-[#5F891D] text-sm tracking-[0.2em] uppercase font-medium">{t('sectionTitle')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] mb-6 font-bebas leading-[0.95]">
            {t('title')}
            <br />
            <span className="text-[#5F68A5]">{t('subtitle')}</span>
          </h2>

          <p className="text-lg text-[#151515]/70 leading-relaxed max-w-3xl">
            {t('description')}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-[#151515]/10 bg-[#F3F4E9]/65 p-6 md:p-10 mb-14">
          <div className="relative min-h-[420px] lg:min-h-[540px]">
            <div className="grid gap-3 lg:hidden mb-8">
              {audiences.map((item, idx) => (
                <button key={item.titleKey} type="button" onClick={() => setActiveIndex(idx)} className={`rounded-2xl bg-white border px-4 py-3 text-left transition-colors ${idx === activeIndex ? 'border-[#5F891D]/35' : 'border-[#151515]/10'}`}>
                  <p className="text-sm font-semibold text-[#151515]">{t(item.shortLabelKey)}</p>
                  <p className="text-xs text-[#151515]/55">{t(item.subtitleKey)}</p>
                </button>
              ))}
            </div>

            <div className="hidden min-[1024px]:flex absolute inset-0 items-center justify-center pointer-events-none">
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#5F68A530" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#5F891D25" strokeDasharray="1.6 2.8" />
                </svg>
              </div>

              <div className="w-full hidden min-[1536px]:block absolute left-[30%] z-40 pointer-events-none">
                <OrbitLabels
                  items={labelItems}
                  baseWidth={540}
                  radiusX={110}
                  radiusY={45}
                  duration={58}
                  itemWidth={160}
                  itemHeight={80}
                />
              </div>
              <div className="w-full hidden min-[1280px]:block 2xl:hidden absolute left-[30%] z-40 pointer-events-none">
                <OrbitLabels
                  items={labelItems}
                  baseWidth={480}
                  radiusX={105}
                  radiusY={52}
                  duration={58}
                  itemWidth={160}
                  itemHeight={80}
                />
              </div>
              <div className="w-full hidden lg:block xl:hidden absolute left-[27%] z-40 pointer-events-none">
                <OrbitLabels
                  items={labelItems}
                  baseWidth={400}
                  radiusX={100}
                  radiusY={65}
                  duration={58}
                  itemWidth={130}
                  itemHeight={70}
                />
              </div>
            </div>

            <div className="relative mt-4 lg:mt-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-[360px] z-0">
              <div className="relative rounded-3xl bg-white border border-[#151515]/10 p-6 md:p-8 text-center overflow-hidden shadow-sm">
                <motion.div aria-hidden className="absolute -inset-24 rounded-full bg-gradient-to-r from-[#5F68A5]/12 via-[#5F891D]/10 to-transparent" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
                <motion.div aria-hidden className="absolute inset-0" animate={{ opacity: [0.35, 0.6, 0.35] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
                  <div className="absolute inset-6 rounded-3xl border border-[#151515]/10" />
                  <div className="absolute inset-10 rounded-3xl border border-[#151515]/10" />
                </motion.div>

                <div className="relative">
                  <motion.div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${active.color}14`, color: active.color }} animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
                    <ActiveIcon className="w-7 h-7" />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bebas text-[#151515] leading-tight mb-3">
                    {t('associationTitle')}
                    <br />
                    {t('associationSubtitle')}
                  </h3>
                  <p className="text-sm text-[#151515]/70 leading-relaxed">
                    {t('associationDescription')}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#151515]/10 bg-white/70">
                    <span className="text-xs font-semibold" style={{ color: active.color }}>
                      {t('activeSector')}
                    </span>
                    <span className="text-xs text-[#151515]/70">{t(active.shortLabelKey)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl bg-white border border-[#151515]/10 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${active.color}18`, color: active.color }}>
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium tracking-[0.16em] uppercase" style={{ color: active.color }}>
                  {t(active.subtitleKey)}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#151515] font-bebas tracking-wide mb-2">{t(active.titleKey)}</h3>
              <p className="text-sm text-[#151515]/70 leading-relaxed">
                {t('connectText')}
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#151515]/10 p-6">
              <ul className="space-y-3">
                {active.benefitsKeys.map((benefitKey: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#151515]/75 leading-relaxed">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${active.color}15` }}>
                      <Check className="w-3 h-3" style={{ color: active.color }} />
                    </div>
                    <span>{t(benefitKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="text-center my-8">
              <span className="text-sm text-[#151515]/40 tracking-[0.2em] uppercase">{t('partnersTitle')}</span>
            </div>

            <div className="relative overflow-hidden py-4">
              <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

              <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }} className="flex gap-4 md:gap-7 items-center">
                {[...partners, ...partners].map((partner, index) => (
                  <PartnerChip key={`${partner.name}-${index}`} {...partner} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
