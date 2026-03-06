"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Folder, Award } from 'lucide-react';
import { useTranslations } from "next-intl";

interface Achievement {
  titleKey: string;
  descriptionKey: string;
  dateKey: string;
  locationKey: string;
  participantsKey?: string;
  highlight?: boolean;
}

interface Project {
  titleKey: string;
  statusKey: string;
  descriptionKey: string;
  deadlineKey: string;
}

// Variables: keep images
const achievements: Achievement[] = [
  {
    titleKey: 'achievements.dataCenter.title',
    descriptionKey: 'achievements.dataCenter.description',
    dateKey: 'achievements.dataCenter.date',
    locationKey: 'achievements.dataCenter.location',
    participantsKey: 'achievements.dataCenter.participants',
    highlight: true,
  },
  {
    titleKey: 'achievements.memorandum.title',
    descriptionKey: 'achievements.memorandum.description',
    dateKey: 'achievements.memorandum.date',
    locationKey: 'achievements.memorandum.location',
  },
  {
    titleKey: 'achievements.roundtable.title',
    descriptionKey: 'achievements.roundtable.description',
    dateKey: 'achievements.roundtable.date',
    locationKey: 'achievements.roundtable.location',
    participantsKey: 'achievements.roundtable.participants',
  },
];

const projects: Project[] = [
  {
    titleKey: 'projects.dataCenter.title',
    statusKey: 'projects.dataCenter.status',
    descriptionKey: 'projects.dataCenter.description',
    deadlineKey: 'projects.dataCenter.deadline',
  },
  {
    titleKey: 'projects.funding.title',
    statusKey: 'projects.funding.status',
    descriptionKey: 'projects.funding.description',
    deadlineKey: 'projects.funding.deadline',
  },
  {
    titleKey: 'projects.conference.title',
    statusKey: 'projects.conference.status',
    descriptionKey: 'projects.conference.description',
    deadlineKey: 'projects.conference.deadline',
  },
  {
    titleKey: 'projects.ecosystem.title',
    statusKey: 'projects.ecosystem.status',
    descriptionKey: 'projects.ecosystem.description',
    deadlineKey: 'projects.ecosystem.deadline',
  },
];

export function Achievements() {
  const t = useTranslations('achievements');
  const [activeTab, setActiveTab] = useState<'achievements' | 'projects'>('achievements');

  return (
    <section className="py-24 relative overflow-hidden" id="achievements">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />

      <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-[#5F68A5]/5 blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-[#5F891D]/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F68A5]" />
            <span className="text-[#5F68A5] text-sm tracking-[0.2em] uppercase font-medium">{t('sectionTitle')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] font-bebas leading-[0.95]">
            {t('title')}
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'achievements'
                ? 'bg-[#5F68A5] text-white'
                : 'bg-[#F3F4E9] text-[#151515]/60 hover:bg-[#F3F4E9]/80'
            }`}
          >
            {t('keyActivity')}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'projects'
                ? 'bg-[#5F68A5] text-white'
                : 'bg-[#F3F4E9] text-[#151515]/60 hover:bg-[#F3F4E9]/80'
            }`}
          >
            {t('currentProjects')}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'achievements' ? (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden ${
                    item.highlight ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-[#F3F4E9]" />
                  <div className="relative p-6 md:p-8">
                    {item.highlight && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F891D]/15 text-[#5F891D] text-xs font-semibold mb-4">
                        <Award className="w-3.5 h-3.5" />
                        {t('achievements.dataCenter.highlight')}
                      </div>
                    )}

                    <h3 className="text-xl md:text-2xl font-bold text-[#151515] font-bebas mb-3">
                      {t(item.titleKey)}
                    </h3>

                    <p className="text-[#151515]/70 leading-relaxed mb-5">
                      {t(item.descriptionKey)}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-[#151515]/50">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {t(item.dateKey)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {t(item.locationKey)}
                      </div>
                      {item.participantsKey && (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {t(item.participantsKey)}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden bg-[#F3F4E9]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5F68A5]/5 to-[#5F891D]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F68A5]/10 text-[#5F68A5] text-xs font-semibold">
                        <Folder className="w-3.5 h-3.5" />
                        {t(project.statusKey)}
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#151515]/30 group-hover:text-[#5F68A5] group-hover:translate-x-1 transition-all" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-[#151515] font-bebas mb-3">
                      {t(project.titleKey)}
                    </h3>

                    <p className="text-[#151515]/70 leading-relaxed mb-4">
                      {t(project.descriptionKey)}
                    </p>

                    <div className="text-xs text-[#151515]/50">
                      <span className="font-medium">{t('deadline')}</span> {t(project.deadlineKey)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#documents"
            className="inline-flex items-center gap-2 text-[#5F68A5] font-medium hover:underline"
          >
            {t('documentsLink')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
