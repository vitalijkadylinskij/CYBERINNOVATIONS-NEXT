import { useState } from 'react';
import { motion } from "framer-motion";
import { TrendingUp, Server, Globe, DollarSign, Factory, Users as UsersIcon, Rocket as RocketIcon, ArrowRight } from 'lucide-react';
import { useTranslations } from "next-intl";

interface Priority {
  key: string;
  icon: React.ElementType;
  highlight?: boolean;
  year: '2026' | '2030';
}

// Variables: keep icons, metrics, highlight flags
const priorities: Priority[] = [
  { key: 'capitalization', icon: DollarSign, year: '2026' },
  { key: 'computing', icon: Server, highlight: true, year: '2026' },
  { key: 'global', icon: Globe, year: '2026' },
  { key: 'lift', icon: TrendingUp, year: '2030' },
  { key: 'unicorns', icon: RocketIcon, highlight: true, year: '2030' },
  { key: 'decentralization', icon: UsersIcon, year: '2030' },
  { key: 'scaling', icon: Factory, year: '2030' },
];

export function Priorities() {
  const t = useTranslations('priorities');
  const [activeTab, setActiveTab] = useState<'2026' | '2030'>('2026');
  const filteredPriorities = priorities.filter(p => p.year === activeTab);

  return (
    <section className="py-24 relative overflow-hidden" id="priorities">
      <div className="absolute inset-0 bg-[#F3F4E9]" />

      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#151515" strokeWidth="1" opacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F68A5]" />
            <span className="text-[#5F68A5] text-sm tracking-[0.2em] uppercase font-medium">{t('sectionTitle')}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] font-bebas leading-[0.95]">
            {t('title')}
            <br />
            <span className="text-[#5F891D]">{t('subtitle')}</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredPriorities.map((priority) => {
            const Icon = priority.icon;
            const prefix = priority.year === '2026' ? 'items2026' : 'items2030';

            return (
              <motion.div
                key={priority.key}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="group h-full">
                  <div className={`h-full rounded-2xl border p-6 transition-all duration-300 ${priority.highlight ? 'bg-[#5F891D]/5 border-[#5F891D]/20 hover:bg-[#5F891D]/10' : 'bg-white border-[#151515]/10 hover:border-[#151515]/20'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${priority.highlight ? 'bg-[#5F891D]/20 text-[#5F891D]' : 'bg-[#5F68A5]/10 text-[#5F68A5]'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h4 className="text-xl md:text-2xl font-bold mb-3 font-bebas tracking-wide max-w-[85%] text-[#151515]">
                      {t(`${prefix}.${priority.key}.title`)}
                    </h4>
                    <p className="leading-relaxed text-[#151515]/65">
                      {t(`${prefix}.${priority.key}.description`)}
                    </p>

                    <div className={`mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${priority.highlight ? 'text-[#5F891D]' : 'text-[#5F68A5]'}`}>
                      <span className="text-sm font-medium">{t('focusArea')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-5 sm:gap-8"
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${activeTab === '2026' ? 'bg-[#5F68A5]' : 'bg-[#151515]/20'}`} />
            <span className={`text-sm font-medium ${activeTab === '2026' ? 'text-[#151515]' : 'text-[#151515]/40'}`}>{t('year2026')}</span>
          </div>
          <div className="w-32 h-1 bg-[#151515]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#5F68A5] to-[#5F891D]"
              initial={{ width: '30%' }}
              animate={{ width: activeTab === '2026' ? '30%' : '100%' }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${activeTab === '2030' ? 'text-[#151515]' : 'text-[#151515]/40'}`}>{t('year2030')}</span>
            <div className={`w-3 h-3 rounded-full ${activeTab === '2030' ? 'bg-[#5F891D]' : 'bg-[#151515]/20'}`} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
