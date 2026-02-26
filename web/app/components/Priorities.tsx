import { useState } from 'react';
import { motion } from "framer-motion";
import { TrendingUp, Server, Globe, DollarSign, Factory, Users as UsersIcon, Rocket as RocketIcon, ArrowRight } from 'lucide-react';

interface Priority {
  icon: React.ElementType;
  title: string;
  description: string;
  metric?: string;
  highlight?: boolean;
}

const priorities2026: Priority[] = [
  {
    icon: DollarSign,
    title: 'Капитализация инноваций',
    description:
      'Запускаем партнёрское финансирование и отраслевой фонд с целевым объёмом $200+ млн для поддержки национальных стартапов и технологических проектов.',
    metric: '$200+ млн',
  },
  {
    icon: Server,
    title: 'Вычислительный суверенитет',
    description:
      'Создаём Belarus AI Data Center под эгидой Ассоциации — доступ к мощностям для разработки, пилотов и привлечения международных проектов.',
    highlight: true,
  },
  {
    icon: Globe,
    title: 'Глобальный диалог',
    description:
      'Проводим международную конференцию по конвергентным технологиям как точку сборки экспертов, заказчиков и инвесторов.',
    metric: '2026',
  },
];

const priorities2030: Priority[] = [
  {
    icon: TrendingUp,
    title: 'Устойчивый инвестиционный лифт',
    description: 'Система стабильного притока инвестиций в национальные проекты на уровне $300+ млн ежегодно.',
    metric: '$300+ млн/год',
  },
  {
    icon: RocketIcon,
    title: 'Фабрика «Единорогов»',
    description:
      'Комплекс условий — инфраструктура, капитал, рынки — чтобы выводить на мировой уровень не менее 5 высокотехнологичных компаний в год.',
    metric: '5 компаний/год',
    highlight: true,
  },
  {
    icon: UsersIcon,
    title: 'Интеллектуальная децентрализация',
    description:
      'Непрерывный приток квалифицированных кадров в регионы и развитие областных центров как точек технологического роста.',
  },
  {
    icon: Factory,
    title: 'Цикл сверхбыстрого масштабирования',
    description:
      'Цепочка "идея → пилот → рынок", позволяющая выводить решения на глобальные рынки менее чем за год.',
    metric: '< 1 года',
  },
];

export function Priorities() {
  const [activeTab, setActiveTab] = useState<'2026' | '2030'>('2026');
  const priorities = activeTab === '2026' ? priorities2026 : priorities2030;

  return (
    <section className="py-24 relative overflow-hidden" id="priorities">
      <div className="absolute inset-0 bg-[#F3F4E9]" />

      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#151515" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#5F68A5]" />
              <span className="text-[#5F68A5] text-sm tracking-[0.2em] uppercase font-medium">Стратегические приоритеты</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] font-bebas leading-[0.95]">
              От старта 2026
              <br />
              к лидерству <span className="text-[#5F891D]">2030</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-start lg:justify-end"
          >
            <div className="inline-flex flex-col sm:flex-row bg-white/70 backdrop-blur rounded-2xl sm:rounded-full p-1.5 w-full sm:w-auto border border-[#151515]/10 shadow-sm">
              {(['2026', '2030'] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveTab(year)}
                  className={`
                    relative px-5 sm:px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 w-full sm:w-auto
                    ${activeTab === year ? 'text-[#151515]' : 'text-[#151515]/55 hover:text-[#151515]'}
                  `}
                >
                  {activeTab === year && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#5F891D]/20 rounded-full border border-[#5F891D]/25"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{year === '2026' ? 'Приоритеты 2026' : 'Видение 2030'}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#151515]/85 font-bebas">
            {activeTab === '2026' ? 'Инфраструктурный и финансовый старт' : 'Глобальное технологическое лидерство'}
          </h3>
        </motion.div>

        <motion.div
          key={`grid-${activeTab}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`grid gap-6 ${activeTab === '2026' ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}
        >
          {priorities.map((priority, index) => {
            const Icon = priority.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`
                    relative h-full rounded-2xl p-8 transition-all duration-300 overflow-hidden
                    ${
                      priority.highlight
                        ? 'bg-white border border-[#151515]/10 shadow-lg'
                        : 'bg-white border border-[#151515]/10 hover:border-[#151515]/20 hover:shadow-xl'
                    }
                  `}
                >
                  {priority.highlight && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5F68A5]/10 via-transparent to-[#5F891D]/10" />
                  )}

                  {priority.metric && (
                    <div className={`absolute top-6 right-6 text-right ${priority.highlight ? 'text-[#5F891D]' : 'text-[#5F68A5]'}`}>
                      <span className="text-2xl md:text-3xl font-bold font-bebas">{priority.metric}</span>
                    </div>
                  )}

                  <div className="relative z-10">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                        priority.highlight ? 'bg-[#5F891D]/20 text-[#5F891D]' : 'bg-[#5F68A5]/10 text-[#5F68A5]'
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h4 className="text-xl md:text-2xl font-bold mb-3 font-bebas tracking-wide max-w-[85%] text-[#151515]">
                      {priority.title}
                    </h4>
                    <p className={`leading-relaxed text-[#151515]/65`}>
                      {priority.description}
                    </p>

                    <div
                      className={`mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                        priority.highlight ? 'text-[#5F891D]' : 'text-[#5F68A5]'
                      }`}
                    >
                      <span className="text-sm font-medium">Фокус направления</span>
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
            <span className={`text-sm font-medium ${activeTab === '2026' ? 'text-[#151515]' : 'text-[#151515]/40'}`}>2026</span>
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
            <span className={`text-sm font-medium ${activeTab === '2030' ? 'text-[#151515]' : 'text-[#151515]/40'}`}>2030</span>
            <div className={`w-3 h-3 rounded-full ${activeTab === '2030' ? 'bg-[#5F891D]' : 'bg-[#151515]/20'}`} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
