import { useMemo, useState } from 'react';
import { motion } from "framer-motion";
import { Building2, GraduationCap, Briefcase, Rocket, Users, Check } from 'lucide-react';
import Image from 'next/image';

interface AudienceGroup {
  icon: React.ElementType;
  shortLabel: string;
  title: string;
  subtitle: string;
  benefits: string[];
  color: string;
}

const audiences: AudienceGroup[] = [
  {
    icon: Building2,
    shortLabel: 'Госорганы',
    title: 'Государственным органам',
    subtitle: 'Стратегическая экспертиза',
    benefits: [
      'Экспертный контур для нормативных инициатив, стандартов и методик внедрения.',
      'Подбор решений и команд для пилотов в госинфраструктуре и приоритетных отраслях.',
      'Площадка согласования требований: государство ↔ бизнес ↔ наука.',
      'Единое окно отраслевых коммуникаций и международного взаимодействия.',
    ],
    color: '#5F68A5',
  },
  {
    icon: GraduationCap,
    shortLabel: 'Академия',
    title: 'Академической среде',
    subtitle: 'От теории к практике',
    benefits: [
      'Канал внедрения R&D в реальный сектор: проекты, заказчики, партнёры.',
      'Совместные программы с индустрией: прикладные исследования и пилоты.',
      'Поддержка молодых специалистов: наставники, стажировки, индустриальные задачи.',
      'Международные связи: партнёрства и кооперация с научными центрами.',
    ],
    color: '#5F891D',
  },
  {
    icon: Briefcase,
    shortLabel: 'Бизнес',
    title: 'Бизнесу',
    subtitle: 'Масштабирование и влияние',
    benefits: [
      'Влияние на правила рынка и стандарты через рабочие группы и экспертизу.',
      'Доступ к пилотным площадкам и отраслевым заказчикам для апробации решений.',
      'Привлечение ресурсов: партнёрское финансирование и инвест-контакты.',
      'Масштабирование через кооперацию внутри экосистемы.',
    ],
    color: '#5F68A5',
  },
  {
    icon: Rocket,
    shortLabel: 'Стартапы',
    title: 'Стартапам и инвесторам',
    subtitle: 'Акселерация капитала',
    benefits: [
      'Быстрая экспертиза проектов и подготовка к пилоту/сделке.',
      'Доступ к заказчикам и точкам апробации внутри национальной экосистемы.',
      'Подключение к акселераторам и международным контактам.',
      'Smart Money: менторство по стратегии, продажам и масштабированию.',
    ],
    color: '#5F891D',
  },
  {
    icon: Users,
    shortLabel: 'Таланты',
    title: 'Студентам и специалистам',
    subtitle: 'Трамплин в индустрию',
    benefits: [
      'Стажировки и участие в реальных проектах участников Ассоциации.',
      'Наставничество и карьерные консультации от лидеров отрасли.',
      'Портфолио через конкурсы, хакатоны и прикладные задачи.',
      'Профессиональный нетворкинг и доступ к мероприятиям.',
    ],
    color: '#5F68A5',
  },
];

const orbitPositions = [
  'lg:absolute lg:top-3 lg:left-1/2 lg:-translate-x-1/2',
  'lg:absolute lg:top-1/2 lg:right-2 lg:-translate-y-1/2',
  'lg:absolute lg:bottom-5 lg:right-1/4',
  'lg:absolute lg:bottom-5 lg:left-1/4',
  'lg:absolute lg:top-1/2 lg:left-2 lg:-translate-y-1/2',
];

type Partner = { name: string; logo?: string };

const partners: Partner[] = [
  { name: 'BRICS Pay', logo: 'materials/partners/brics-pay.svg' },
  { name: 'НЦОД', logo: 'materials/partners/ncod.svg' },
  { name: 'СБХ', logo: 'materials/partners/sbh.svg' },
  { name: 'АУРВА', logo: 'materials/partners/aurva.svg' },
  { name: 'Бел. ТПП', logo: 'materials/partners/bel-tpp.svg' },
  { name: 'ПЛАС', logo: 'materials/partners/plas.svg' },
  { name: 'БелВЭБ', logo: 'materials/partners/belveb.svg' },
  { name: 'ПВТ', logo: 'materials/partners/pvt.svg' },
  { name: 'BYCLOUD', logo: 'materials/partners/bycloud.svg' },
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
          className="max-h-10 md:max-h-12 max-w-[120px] md:max-w-[140px] object-contain opacity-80"
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
  const [activeIndex, setActiveIndex] = useState(0);

  const active = useMemo(() => audiences[activeIndex], [activeIndex]);
  const ActiveIcon = active.icon;
  return (
    <section className="py-24 relative overflow-hidden" id="audience">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />

      <div className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-[#5F68A5]/5 blur-3xl" />
      <div className="absolute bottom-40 -left-40 w-80 h-80 rounded-full bg-[#5F891D]/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F891D]" />
            <span className="text-[#5F891D] text-sm tracking-[0.2em] uppercase font-medium">Доверительное партнерство</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] mb-6 font-bebas leading-[0.95]">
            Государственные органы, бизнес и наука
            <br />
            <span className="text-[#5F68A5]">единая координация</span>
          </h2>

          <p className="text-lg text-[#151515]/70 leading-relaxed max-w-3xl">
            Единая координация: запросы государства, решения бизнеса и экспертиза академической среды — в рабочих группах и проектах.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-[#151515]/10 bg-[#F3F4E9]/65 p-6 md:p-10 mb-14"
        >
          <div className="relative min-h-[420px] lg:min-h-[540px]">
            {/* Mobile quick labels */}
            <div className="grid gap-3 lg:hidden mb-8">
              {audiences.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-2xl bg-white border px-4 py-3 text-left transition-colors ${idx === activeIndex ? 'border-[#5F891D]/35' : 'border-[#151515]/10'
                    }`}
                >
                  <p className="text-sm font-semibold text-[#151515]">{item.shortLabel}</p>
                  <p className="text-xs text-[#151515]/55">{item.subtitle}</p>
                </button>
              ))}
            </div>

            <div className="hidden lg:block absolute inset-0">
              {audiences.map((item, index) => (
                <div key={item.title} className={`${orbitPositions[index]} w-32 xl:w-40`}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`relative group w-full rounded-2xl bg-white/90 border px-4 py-3 shadow-sm transition-all ${activeIndex === index ? 'border-[#5F891D]/35 shadow-md' : 'border-[#151515]/10 hover:shadow-md'
                      }`}
                  >
                    <p className="text-sm font-semibold text-[#151515] text-center">{item.shortLabel}</p>
                    <p className="text-[11px] text-center mt-1" style={{ color: item.color }}>
                      {item.subtitle}
                    </p>

                    <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 w-72 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
                      <div className="rounded-2xl border border-[#151515]/10 bg-white px-4 py-3 shadow-lg">
                        <p className="text-xs font-semibold text-[#151515] mb-1">{item.title}</p>
                        <p className="text-[12px] text-[#151515]/70 leading-relaxed">{item.benefits[0]}</p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}

              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#5F68A530" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#5F891D25" strokeDasharray="1.6 2.8" />
                </svg>
              </div>
            </div>

            {/* Center */}
            <div className="relative mt-4 lg:mt-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-[360px]">
              <div className="relative rounded-3xl bg-white border border-[#151515]/10 p-6 md:p-8 text-center overflow-hidden shadow-sm">
                <motion.div
                  aria-hidden
                  className="absolute -inset-24 rounded-full bg-gradient-to-r from-[#5F68A5]/12 via-[#5F891D]/10 to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  animate={{ opacity: [0.35, 0.6, 0.35] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-6 rounded-3xl border border-[#151515]/10" />
                  <div className="absolute inset-10 rounded-3xl border border-[#151515]/10" />
                </motion.div>

                <div className="relative">
                  <motion.div
                    className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${active.color}14`, color: active.color }}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ActiveIcon className="w-7 h-7" />
                  </motion.div>

                  <h3 className="text-2xl md:text-3xl font-bebas text-[#151515] leading-tight mb-3">
                    Ассоциация
                    <br />
                    «Кибер Инновации»
                  </h3>
                  <p className="text-sm text-[#151515]/70 leading-relaxed">
                    Координационная платформа: экспертиза, рабочие группы, пилоты, стандарты и развитие кадров.
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#151515]/10 bg-white/70">
                    <span className="text-xs font-semibold" style={{ color: active.color }}>
                      Активный сектор:
                    </span>
                    <span className="text-xs text-[#151515]/70">{active.shortLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hover/selection details (single source of truth, no duplication) */}
          <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl bg-white border border-[#151515]/10 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${active.color}18`, color: active.color }}
                >
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium tracking-[0.16em] uppercase" style={{ color: active.color }}>
                  {active.subtitle}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#151515] font-bebas tracking-wide mb-2">{active.title}</h3>
              <p className="text-sm text-[#151515]/70 leading-relaxed">
                Подключаем к рабочим группам и проектам через единый контур взаимодействия.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-[#151515]/10 p-6">
              <ul className="space-y-3">
                {active.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#151515]/75 leading-relaxed">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${active.color}15` }}>
                      <Check className="w-3 h-3" style={{ color: active.color }} />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <span className="text-sm text-[#151515]/40 tracking-[0.2em] uppercase">Партнёры и соглашения</span>
          </div>

          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              className="flex gap-4 md:gap-7 items-center"
            >
              {[...partners, ...partners].map((partner, index) => (
                <PartnerChip key={`${partner.name}-${index}`} {...partner} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
