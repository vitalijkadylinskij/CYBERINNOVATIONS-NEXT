"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Users, Rocket, Server, Globe, Calendar } from 'lucide-react';
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Achievement {
  titleKey: string;
  descriptionKey: string;
  dateKey: string;
  locationKey: string;
  image: string;
  participantsKey?: string;
  highlight?: boolean;
}

interface Project {
  titleKey: string;
  statusKey: string;
  descriptionKey: string;
  icon: React.ElementType;
  deadlineKey: string;
}

// Keep images from the design
const achievements: Achievement[] = [
  {
    titleKey: 'achievements.dataCenter.title',
    descriptionKey: 'achievements.dataCenter.description',
    dateKey: 'achievements.dataCenter.date',
    locationKey: 'achievements.dataCenter.location',
    image: '/materials/media/05.webp',
    participantsKey: 'achievements.dataCenter.participants',
    highlight: true,
  },
  {
    titleKey: 'achievements.memorandum.title',
    descriptionKey: 'achievements.memorandum.description',
    dateKey: 'achievements.memorandum.date',
    locationKey: 'achievements.memorandum.location',
    image: '/materials/media/05.webp',
  },
  {
    titleKey: 'achievements.roundtable.title',
    descriptionKey: 'achievements.roundtable.description',
    dateKey: 'achievements.roundtable.date',
    locationKey: 'achievements.roundtable.location',
    image: '/materials/media/05.webp',
    participantsKey: 'achievements.roundtable.participants',
  },
];

const projects: Project[] = [
  {
    titleKey: 'projects.dataCenter.title',
    statusKey: 'projects.dataCenter.status',
    descriptionKey: 'projects.dataCenter.description',
    icon: Server,
    deadlineKey: 'projects.dataCenter.deadline',
  },
  {
    titleKey: 'projects.funding.title',
    statusKey: 'projects.funding.status',
    descriptionKey: 'projects.funding.description',
    icon: Users,
    deadlineKey: 'projects.funding.deadline',
  },
  {
    titleKey: 'projects.conference.title',
    statusKey: 'projects.conference.status',
    descriptionKey: 'projects.conference.description',
    icon: Globe,
    deadlineKey: 'projects.conference.deadline',
  },
  {
    titleKey: 'projects.ecosystem.title',
    statusKey: 'projects.ecosystem.status',
    descriptionKey: 'projects.ecosystem.description',
    icon: Rocket,
    deadlineKey: 'projects.ecosystem.deadline',
  },
];

function DotPattern({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="100" height="100" viewBox="0 0 100 100" fill="none">
      {[...Array(10)].map((_, i) =>
        [...Array(10)].map((__, j) => <circle key={`${i}-${j}`} cx={i * 10 + 5} cy={j * 10 + 5} r="1.5" fill="currentColor" opacity="0.3" />),
      )}
    </svg>
  );
}

export function Achievements() {
  const t = useTranslations('achievements');

  return (
    <section className="py-24 relative overflow-hidden" id="projects">
      <div className="absolute inset-0 bg-[#F3F4E9]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />

      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#5F68A5]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#5F891D]/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-16 bg-[#5F68A5]" />
            <span className="text-[#5F68A5] text-sm tracking-[0.3em] uppercase font-medium">{t('sectionTitle')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#151515] font-bebas tracking-tight">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 lg:row-span-2 group"
          >
            <div className="relative h-full min-h-[520px] rounded-2xl overflow-hidden bg-white border border-[#151515]/10 shadow-sm">
              <Image
                width={100}
                height={100}
                src={achievements[0].image}
                alt={t(achievements[0].titleKey)}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/55 to-transparent" />

              <div className="absolute top-6 right-6 text-[#5F891D]/40 hidden sm:block">
                <DotPattern />
              </div>

              {achievements[0].highlight && (
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F3F4E9]/90 border border-white/30 text-[#151515] text-xs font-bold uppercase tracking-wider rounded-full">
                    <span className="w-2 h-2 bg-[#5F891D] rounded-full animate-pulse" />
                    {t('achievements.dataCenter.highlight')}
                  </span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-wrap items-center gap-5 mb-4 text-[#F3F4E9]/60 text-sm">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {t(achievements[0].locationKey)}
                  </span>
                  {achievements[0].participantsKey && (
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t(achievements[0].participantsKey)}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-[#F3F4E9] mb-3 font-bebas tracking-wide leading-tight">
                  {t(achievements[0].titleKey)}
                </h3>
                <p className="text-[#F3F4E9]/72 text-base max-w-2xl mb-4 leading-relaxed">{t(achievements[0].descriptionKey)}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[#5F68A5] font-semibold">{t(achievements[0].dateKey)}</span>
                  <span className="flex items-center gap-2 text-[#F3F4E9]">
                    <span className="text-sm font-medium">{t('keyActivity')}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {[achievements[1], achievements[2]].map((item, idx) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="lg:col-span-4 group"
            >
              <div className="relative h-full min-h-[250px] rounded-2xl overflow-hidden bg-white border border-[#151515]/10 hover:border-[#151515]/20 hover:shadow-md transition-all">
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60" />

                <div className="relative h-full p-6 flex flex-col justify-end">
                  <span className="text-[#5F68A5] text-xs font-semibold tracking-wider uppercase mb-2">{t(item.dateKey)}</span>
                  <h3 className="text-lg font-bold text-[#151515] mb-2 font-bebas tracking-wide leading-tight">{t(item.titleKey)}</h3>
                  <p className="text-[#151515]/70 text-sm leading-relaxed">{t(item.descriptionKey)}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-[#151515]/55 text-xs">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {t(item.locationKey)}
                    </span>
                    {item.participantsKey && (
                      <span className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {t(item.participantsKey)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-[#151515] font-bebas tracking-wide">{t('currentProjects')}</h3>
            <div className="h-px flex-1 bg-[#151515]/10" />
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="group"
                >
                  <div className="relative p-6 rounded-2xl bg-white border border-[#151515]/10 hover:border-[#151515]/20 hover:shadow-md transition-all duration-300 h-full">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#5F68A514', color: '#5F68A5' }}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-[#151515]/70 bg-[#F3F4E9] border border-[#151515]/10 px-3 py-1.5 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        {t('deadline')} {t(project.deadlineKey)}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-[#151515] mb-2 font-bebas tracking-wide">{t(project.titleKey)}</h4>
                    <p className="text-sm text-[#151515]/70 leading-relaxed">{t(project.descriptionKey)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#documents"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#151515]/15 text-[#151515]/70 hover:border-[#5F68A5]/40 hover:text-[#151515] transition-all bg-white/60"
          >
            <span className="text-sm">{t('documentsLink')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

