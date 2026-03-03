import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from "next-intl";

interface RoleAccent {
  roleKey: string;
  actionKey: string;
  roleValue: string;
}

// Variables: keep roleValue
const roleAccents: RoleAccent[] = [
  { roleKey: 'roles.company.role', actionKey: 'roles.company.action', roleValue: 'company' },
  { roleKey: 'roles.government.role', actionKey: 'roles.government.action', roleValue: 'government' },
  { roleKey: 'roles.partner.role', actionKey: 'roles.partner.action', roleValue: 'partner' },
  { roleKey: 'roles.media.role', actionKey: 'roles.media.action', roleValue: 'media' },
  { roleKey: 'roles.expert.role', actionKey: 'roles.expert.action', roleValue: 'expert' },
  { roleKey: 'roles.volunteer.role', actionKey: 'roles.volunteer.action', roleValue: 'volunteer' },
];

export function GoalsAndAccents() {
  const t = useTranslations('goals');

  const goals = [
    t('keyGoals'),
    t('howWeWork'),
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="goals">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#5F68A5]/6 blur-3xl" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 rounded-full bg-[#5F891D]/7 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F68A5]" />
            <span className="text-[#5F68A5] text-sm tracking-[0.2em] uppercase font-medium">{t('sectionTitle')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] mb-6 font-bebas leading-[0.95]">
            {t('title')}
            <br />
            <span className="text-[#5F891D]">{t('subtitle')}</span>
          </h2>
          <p className="text-lg text-[#151515]/70 leading-relaxed max-w-4xl">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#151515]/10 bg-[#F3F4E9] p-7"
          >
            <h3 className="text-2xl font-bebas text-[#151515] tracking-wide mb-5">{t('keyGoals')}</h3>
            <ul className="space-y-4">
              {[0, 1, 2, 3].map((index) => (
                <li key={index} className="flex items-start gap-3 text-[#151515]/75 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-[#5F68A5] mt-0.5 flex-shrink-0" />
                  <span>{t(`goalsList.${index}`)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[#151515]/10 bg-white p-7"
          >
            <h3 className="text-2xl font-bebas text-[#151515] tracking-wide mb-5">{t('howWeWork')}</h3>
            <ul className="space-y-4 mb-6">
              {[0, 1].map((index) => (
                <li key={index} className="flex items-start gap-3 text-[#151515]/75 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-[#5F891D] mt-0.5 flex-shrink-0" />
                  <span>{t(`accentsList.${index}`)}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-[#F3F4E9] border border-[#151515]/10 p-4">
              <p className="text-sm text-[#151515]/70">
                {t('howWeWorkNote')}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {roleAccents.map((item, index) => (
            <motion.div
              key={item.roleValue}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="h-full rounded-2xl border border-[#151515]/10 bg-white p-5 flex flex-col">
                <h4 className="text-lg font-bold text-[#151515] mb-3 font-bebas tracking-wide">{t(item.roleKey)}</h4>
                <p className="text-sm text-[#151515]/70 leading-relaxed flex-1">{t(item.actionKey)}</p>
                <a
                  href={`?role=${item.roleValue}#contact`}
                  className="mt-5 inline-flex items-center gap-2 text-[#5F68A5] hover:text-[#5F891D] transition-colors"
                >
                  <span className="text-sm font-semibold">{t('goToApplication')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
