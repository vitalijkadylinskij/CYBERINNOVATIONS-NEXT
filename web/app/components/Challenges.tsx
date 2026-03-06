import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Server, Users, Lightbulb, DollarSign, Layers, Quote } from 'lucide-react';
import { useTranslations } from "next-intl";

interface Challenge {
  key: 'computing' | 'intellectual' | 'product' | 'investment' | 'multidisciplinary';
  icon: React.ElementType;
  accent: string;
}

// Variables: keep icons, accent colors
const challenges: Challenge[] = [
  { key: 'computing', icon: Server, accent: '#5F68A5' },
  { key: 'intellectual', icon: Users, accent: '#5F891D' },
  { key: 'product', icon: Lightbulb, accent: '#5F68A5' },
  { key: 'investment', icon: DollarSign, accent: '#5F891D' },
  { key: 'multidisciplinary', icon: Layers, accent: '#5F68A5' },
];

export function Challenges() {
  const t = useTranslations('challenges');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden" id="challenges">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />
      <div className="absolute top-20 -left-20 w-[420px] h-[420px] rounded-full bg-[#5F68A5]/6 blur-[128px]" />
      <div className="absolute bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#5F891D]/6 blur-[128px]" />

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

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] mb-4 font-bebas leading-[0.95]">
            {t('title')}
            <br />
            <span className="text-[#5F891D]">{t('subtitle')}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#F3F4E9] rounded-full border border-[#151515]/10">
            <Quote className="w-4 h-4 text-[#5F68A5]" />
            <span className="text-sm font-medium text-[#151515]">{t('keyThesis')}</span>
          </div>
          <p className="mt-4 text-lg text-[#151515]/65 max-w-2xl leading-relaxed">
            {t('thesisText')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={challenge.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="relative">
                  <div
                    className={`relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer ${
                      isExpanded
                        ? 'bg-white border-[#151515]/20 shadow-xl'
                        : 'bg-white/60 border-[#151515]/10 hover:border-[#151515]/20'
                    }`}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#151515]/3 to-transparent opacity-0 transition-opacity duration-500" style={{ opacity: isExpanded ? 1 : 0 }} />

                    <div className="relative p-5 md:p-6 flex gap-4 md:gap-6">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isExpanded ? `${challenge.accent}18` : `${challenge.accent}12`,
                          color: challenge.accent,
                        }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-lg md:text-xl font-bold font-bebas tracking-wide leading-tight text-[#151515]">
                            {t(`challenges.${challenge.key}.title`)}
                          </h3>
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0 mt-1"
                          >
                            <ChevronRight
                              className="w-5 h-5 text-[#151515]/35 transition-colors duration-500"
                              style={{ color: isExpanded ? challenge.accent : undefined }}
                            />
                          </motion.div>
                        </div>

                        <p className="text-sm leading-relaxed text-[#151515]/65">
                          {t(`challenges.${challenge.key}.shortDesc`)}
                        </p>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 mt-4 border-t border-[#151515]/10">
                                <p className="text-[#151515]/72 leading-relaxed text-sm">{t(`challenges.${challenge.key}.fullDesc`)}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
