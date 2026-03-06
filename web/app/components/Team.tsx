import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { withBasePath } from "@/lib/basePath";

interface TeamMember {
  key: 'chairman' | 'tech' | 'investment' | 'education';
  image: string;
}

// Variables: keep images
const teamMembers: TeamMember[] = [
  { key: 'chairman', image: withBasePath("/materials/media/05.webp") },
  { key: 'tech', image: withBasePath("/materials/media/05.webp") },
  { key: 'investment', image: withBasePath("/materials/media/05.webp") },
  { key: 'education', image: withBasePath("/materials/media/05.webp") },
];

export function Team() {
  const t = useTranslations('team');
  const locale = useLocale();
  const pendingName = locale === "en" ? "Name pending approval" : "ФИО — на утверждении";

  return (
    <section className="py-24 relative overflow-hidden" id="team">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />

      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#5F68A5]/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#5F891D]" />
              <span className="text-[#5F891D] text-sm tracking-[0.2em] uppercase font-medium">{t('sectionTitle')}</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] font-bebas leading-[0.95]">
              {t('title')}
              <br />
              <span className="text-[#5F68A5]">{t('subtitle')}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-end"
          >
            <p className="text-lg text-[#151515]/65 leading-relaxed">
              {t('description')}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[#F3F4E9] border border-[#151515]/10 h-full">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    width={100}
                    height={100}
                    src={member.image}
                    alt={t(`members.${member.key}.role`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/30 to-transparent" />
                  <div className="absolute top-4 left-4 text-6xl font-bebas text-white/10 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs font-medium text-[#5F891D] tracking-wider uppercase">{t(`members.${member.key}.role`)}</span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2 leading-tight">{pendingName}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{t(`members.${member.key}.description`)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
