import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Server, Users, Lightbulb, DollarSign, Layers, Quote } from 'lucide-react';

interface Challenge {
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ElementType;
  accent: string;
}

const challenges: Challenge[] = [
  {
    title: 'Вычислительный суверенитет и инфраструктурная независимость',
    shortDesc:
      'Создаём доступ к вычислительным мощностям и инфраструктуре, чтобы национальные проекты масштабировались внутри страны.',
    fullDesc:
      'Геополитическая нестабильность диктует новые правила: доступ к вычислительным мощностям сегодня определяет лидерство завтра. Чтобы избежать технологического отставания, мы инициируем создание доступной ИТ-инфраструктуры, необходимой для масштабирования ИИ-проектов в Беларуси. Ассоциация выступает мостом между государством, бизнесом и обществом, обеспечивая прозрачность внедрения инноваций. Мы трансформируем текущие риски в возможности для реального сектора, закладывая базу для технологического прорыва через механизмы открытого партнерства и этичного управления данными.',
    icon: Server,
    accent: '#5F68A5',
  },
  {
    title: 'Интеллектуальный суверенитет и зрелость процессов',
    shortDesc:
      'Закрываем дефицит компетенций и управленческих практик: методики, стандарты, проектная дисциплина для инициатив национального масштаба.',
    fullDesc:
      'Технологии — это лишь инструменты, эффективность которых на 100% зависит от компетенций тех, кто ими управляет. Сегодня дефицит квалифицированных кадров и отсутствие отлаженных процессов управления проектами национального масштаба становятся главными барьерами для развития. Для Ассоциации инвестиции в человеческий капитал и методологическую базу являются приоритетом №1. Мы понимаем: игнорирование кадрового голода сегодня ведет к стратегическому отставанию завтра. Наша цель — создать среду, где развитие талантов и внедрение управленческих стандартов опережают технологические запросы рынка.',
    icon: Users,
    accent: '#5F891D',
  },
  {
    title: 'Продуктовый суверенитет и капитализация национальной экспертизы',
    shortDesc:
      'Помогаем превращать разработки в продукты: пилоты с заказчиком, апробация в отрасли, подготовка к масштабированию и экспорту.',
    fullDesc:
      'Будущее цифровой экономики Беларуси зависит от нашей способности трансформировать сервисную модель в продуктовую, сохраняя интеллектуальный капитал внутри страны. Ассоциация выступает консолидатором перспективных разработок и стартапов, создавая уникальную экосистему для их ускоренной апробации. Мы обеспечиваем прямой диалог между разработчиками, государственным сектором и реальным производством. Получая полигон для испытаний и первичную экспертизу внутри страны, наши команды выходят на международный рынок не как новички, а как зрелые игроки с проверенными решениями, предотвращая «утечку мозгов» и укрепляя технологический имидж республики.',
    icon: Lightbulb,
    accent: '#5F68A5',
  },
  {
    title: 'Инвестиционная экосистема и консолидация капитала',
    shortDesc:
      'Настраиваем прозрачные механизмы отбора и финансирования приоритетных проектов и общей технологической инфраструктуры.',
    fullDesc:
      'Для выхода на международные рынки белорусским инновациям необходим мощный финансовый рывок. Ассоциация становится точкой для привлечения частных и государственных инвестиций, обеспечивая их эффективное направление в наиболее перспективные проекты. Мы фокусируемся на комплексном развитии: от поддержки pre-seed этапов до финансирования коллективной инфраструктуры и регуляторных инициатив. Выступая гарантом экспертизы, Ассоциация помогает государству привлекать ресурсы туда, где они дадут максимальный синергетический эффект для науки, образования и реального бизнеса, обеспечивая возвратность в виде технологического превосходства.',
    icon: DollarSign,
    accent: '#5F891D',
  },
  {
    title: 'Мультидисциплинарный синтез: архитектура цифрового суверенитета',
    shortDesc:
      'Соединяем отрасли и технологии в единый контур: совместимость, безопасность, стандарты и кооперация без лишней бюрократии.',
    fullDesc:
      'Создание современной экономики невозможно без бесшовной интеграции целого спектра доменов: от микроэлектроники, робототехники и энергетической инфраструктуры до нейронных сетей, облачных вычислений и блокчейна. Обеспечение их связности и кибербезопасности — это сложнейший вызов, выходящий за рамки одной отрасли. Ассоциация выступает интегратором этих направлений, устраняя барьеры между наукой, инженерией и бизнесом. Мы предлагаем гибкую модель взаимодействия без бюрократии, которая при этом полностью синхронизирована с государственными приоритетами развития, превращая разрозненные технологии в единый национальный продукт.',
    icon: Layers,
    accent: '#5F68A5',
  },
];

export function Challenges() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#F3F4E9] relative overflow-hidden" id="challenges">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#5F68A5]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#5F891D]/5 blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F68A5]" />
            <span className="text-[#5F68A5] text-sm tracking-[0.2em] uppercase font-medium">Ключевые вызовы</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] font-bebas leading-[0.95]">
              Технологический суверенитет
              <br />
              <span className="text-[#5F891D]">как национальная задача</span>
            </h2>
            <div className="rounded-2xl border border-[#151515]/10 border-l-4 border-l-[#5F68A5] bg-white/80 backdrop-blur p-5 md:p-6 relative overflow-hidden">
              <p className="text-xs tracking-[0.24em] uppercase text-[#151515]/45 font-medium mb-2">Ключевой тезис</p>
              <Quote className="absolute -top-6 -right-6 w-24 h-24 text-[#5F68A5]/10 rotate-12" />
              <p className="text-base lg:text-lg text-[#151515]/75 leading-relaxed">
                <span className="font-semibold text-[#151515]">5 контуров работы Ассоциации:</span> от перевода Стратегии в
                конкретные проекты до стандартных механик внедрения.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="hidden lg:flex items-center gap-2 lg:col-span-2 mb-4">
            {challenges.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  expandedIndex === index ? 'w-8 bg-[#5F68A5]' : 'w-2 bg-[#151515]/20'
                }`}
              />
            ))}
          </div>

          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={
                  isExpanded
                    ? 'lg:col-span-2'
                    : index === challenges.length - 1
                      ? 'lg:col-span-2 lg:max-w-[860px] lg:mx-auto'
                      : ''
                }
              >
                <div
                  className={`
                    relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer h-full
                    ${
                      isExpanded
                        ? 'bg-white border border-[#151515]/10 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]'
                        : 'bg-white hover:bg-[#151515]/5 border border-[#151515]/10 hover:shadow-lg'
                    }
                  `}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                >
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 flex items-start justify-end p-3 font-bebas text-5xl leading-none transition-colors duration-500 pointer-events-none z-0 ${
                      isExpanded ? 'text-[#151515]/6' : 'text-[#151515]/5'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="p-5 md:p-6 pr-20 md:pr-24 relative z-10">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500"
                        style={{
                          backgroundColor: isExpanded ? `${challenge.accent}18` : `${challenge.accent}12`,
                          color: challenge.accent,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="text-lg md:text-xl font-bold font-bebas tracking-wide leading-tight text-[#151515]">
                            {challenge.title}
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

                        <p
                          className="text-sm leading-relaxed text-[#151515]/65"
                        >
                          {challenge.shortDesc}
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
                                <p className="text-[#151515]/72 leading-relaxed text-sm">{challenge.fullDesc}</p>
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
