import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Link, Radio, Shield, Cpu, Cloud, Zap, X, Users } from 'lucide-react';

export type CommitteeKey =
  | 'ai'
  | 'blockchain'
  | 'iot'
  | 'cybersecurity'
  | 'microelectronics'
  | 'cloud'
  | 'energy'
  | 'human-capital';

interface Direction {
  key: CommitteeKey;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

const directions: Direction[] = [
  {
    key: 'ai',
    icon: Brain,
    title: 'Нейронные сети',
    subtitle: 'AI',
    description:
      'Ассоциация содействует внедрению ИИ в реальный сектор, обеспечивая бизнесу доступ к государственным наборам данных (Datasets) для обучения моделей. Мы выступаем экспертным центром для госорганов в разработке этических и правовых стандартов использования ИИ, а для академической среды создаем площадки для коммерциализации наукоемких алгоритмов через пилотные проекты.',
    color: '#5F68A5',
  },
  {
    key: 'blockchain',
    icon: Link,
    title: 'Распределенные реестры',
    subtitle: 'Blockchain',
    description:
      'Мы формируем прозрачную правовую среду для блокчейн-проектов, обеспечивая бизнесу защиту интересов при работе с цифровыми активами. Ассоциация помогает инвесторам находить надежные финтех-стартапы, а государству — внедрять защищенные реестры в систему управления, укрепляя технологический суверенитет и доверие к цифровым операциям.',
    color: '#5F891D',
  },
  {
    key: 'iot',
    icon: Radio,
    title: 'Интернет вещей',
    subtitle: 'IoT',
    description:
      'Создаем «зеленый коридор» для тестирования IoT-решений, предоставляя стартапам и компаниям доступ к промышленной и городской инфраструктуре. Комитет координирует внедрение систем «умного города» в рамках госпрограмм, а для студентов и инженеров организует хакатоны по разработке прикладных датчиков и систем мониторинга.',
    color: '#5F68A5',
  },
  {
    key: 'cybersecurity',
    icon: Shield,
    title: 'Кибербезопасность',
    subtitle: 'Cybersecurity',
    description:
      'Разрабатываем единые стандарты защиты критической инфраструктуры, обеспечивая государству высокий уровень национальной безопасности. Мы помогаем ИТ-компаниям сертифицировать свои продукты и выходить на международные рынки как надежные поставщики, а для специалистов организуем доступ к глобальной экспертизе и форумам по отражению киберугроз.',
    color: '#5F891D',
  },
  {
    key: 'microelectronics',
    icon: Cpu,
    title: 'Микроэлектроника и робототехника',
    subtitle: 'Microelectronics & Robotics',
    description:
      'Связываем фундаментальную науку с реальным производством для создания отечественной компонентной базы. Комитет лоббирует налоговые льготы и меры поддержки для производителей «железа», помогая предприятиям проводить глубокую автоматизацию и внедрять робототехнические комплексы в рамках импортозамещения.',
    color: '#5F68A5',
  },
  {
    key: 'cloud',
    icon: Cloud,
    title: 'Инфраструктура для вычислений',
    subtitle: 'Cloud Computing',
    description:
      'Обеспечиваем коллективный доступ членов Ассоциации к мощным вычислительным ресурсам, снижая затраты бизнеса на хранение и обработку данных. Мы помогаем госорганам в создании устойчивых национальных облачных платформ, а академической среде — в получении мощностей для проведения масштабных цифровых экспериментов.',
    color: '#5F891D',
  },
  {
    key: 'energy',
    icon: Zap,
    title: 'Энергетическая инфраструктура',
    subtitle: 'Energy',
    description:
      'Фокусируемся на энергетической безопасности IT-сектора, внедряя технологии Smart Grid и возобновляемых источников. Ассоциация помогает энергетическим компаниям интегрировать инновационные разработки в энергосистему страны, обеспечивая инвесторам возвратность вложений через повышение энергоэффективности крупных ЦОДов и производств.',
    color: '#5F68A5',
  },
  {
    key: 'human-capital',
    icon: Users,
    title: 'Подготовка кадров',
    subtitle: 'Human Capital',
    description:
      'Готовим специалистов под реальные задачи отраслей и госзаказчиков: совместные программы с вузами, стажировки у участников Ассоциации и проектные треки с «витриной задач». Формируем требования к ролям и компетенциям для проектов национального масштаба.',
    color: '#5F891D',
  },
];

interface TechnologyDirectionsProps {
  activeKey?: CommitteeKey;
  onActiveKeyChange?: (key: CommitteeKey) => void;
}

function isLgDown() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 1023px)').matches;
}

export function TechnologyDirections({ activeKey, onActiveKeyChange }: TechnologyDirectionsProps) {
  const [localKey, setLocalKey] = useState<CommitteeKey>('ai');
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const resolvedKey = activeKey ?? localKey;

  const setActive = (key: CommitteeKey, options?: { openMobileSheet?: boolean }) => {
    onActiveKeyChange?.(key);
    if (activeKey === undefined) setLocalKey(key);
    if (options?.openMobileSheet) setMobileSheetOpen(true);
  };

  const active = useMemo(
    () => directions.find((d) => d.key === resolvedKey) ?? directions[0],
    [resolvedKey],
  );

  return (
    <section className="py-24 relative overflow-hidden" id="directions">
      <div className="absolute inset-0 bg-[#F3F4E9]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />

      <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-[#5F68A5]/6 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-[#5F891D]/6 blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F68A5]" />
            <span className="text-[#5F68A5] text-sm tracking-[0.2em] uppercase font-medium">Подкомитеты Ассоциации</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] font-bebas leading-[0.95]">
              8 направлений
              <br />
              <span className="text-[#5F891D]">конвергентных технологий</span>
            </h2>
            <p className="text-lg text-[#151515]/70 leading-relaxed max-w-lg">
              Выберите направление — описание и способы подключения всегда остаются в зоне видимости. На мобильных подробности
              открываются поверх контента.
            </p>
          </div>
        </motion.div>

        {/* Desktop: grid + sticky details */}
        <div className="lg:grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {directions.map((direction, index) => {
                const Icon = direction.icon;
                const isActive = direction.key === resolvedKey;

                return (
                  <motion.button
                    key={direction.key}
                    type="button"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ scale: 1.01 }}
                    onMouseEnter={() => setActive(direction.key)}
                    onFocus={() => setActive(direction.key)}
                    onClick={() => setActive(direction.key, { openMobileSheet: isLgDown() })}
                    className={`
                      relative p-6 rounded-2xl text-left transition-all duration-300 h-full min-h-[210px]
                      bg-white border shadow-sm hover:shadow-md
                      ${isActive ? 'border-[#5F891D]/30' : 'border-[#151515]/10'}
                    `}
                  >
                    <div className={`absolute top-4 right-4 text-5xl font-bebas leading-none ${isActive ? 'text-[#151515]/10' : 'text-[#151515]/5'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${direction.color}14`, color: direction.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold font-bebas tracking-wide mb-2 leading-tight text-[#151515] pr-10">
                      {direction.title}
                    </h3>
                    <p className="text-xs font-medium" style={{ color: direction.color }}>
                      {direction.subtitle}
                    </p>

                    <div className={`mt-4 text-sm leading-relaxed ${isActive ? 'text-[#151515]/70' : 'text-[#151515]/55'}`}>
                      {direction.description.slice(0, 120)}…
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl bg-white border border-[#151515]/10 shadow-sm p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {active ? (
                    <motion.div
                      key={active.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${active.color}18`, color: active.color }}
                      >
                        {(() => {
                          const Icon = active.icon;
                          return <Icon className="w-7 h-7" />;
                        })()}
                      </div>

                      <h3 className="text-3xl font-bold text-[#151515] font-bebas tracking-wide mb-2">{active.title}</h3>
                      <p className="text-sm font-medium mb-5" style={{ color: active.color }}>
                        {active.subtitle}
                      </p>

                      <p className="text-[#151515]/75 leading-relaxed text-base">{active.description}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-[#151515]/65 leading-relaxed">
                        Выберите направление слева — здесь появится подробное описание.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: bottom-sheet details (keeps context, no deep scroll) */}
        <AnimatePresence>
          {mobileSheetOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSheetOpen(false)} />
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 right-0 bottom-0 rounded-t-3xl bg-white border-t border-[#151515]/10 p-6"
              >
                <button
                  onClick={() => setMobileSheetOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#151515]/5 hover:bg-[#151515]/10 flex items-center justify-center transition-colors"
                  aria-label="Закрыть подробности"
                >
                  <X className="w-5 h-5 text-[#151515]/60" />
                </button>

                <div className="pt-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${active.color}18`, color: active.color }}
                  >
                    {(() => {
                      const Icon = active.icon;
                      return <Icon className="w-7 h-7" />;
                    })()}
                  </div>

                  <h3 className="text-2xl font-bold text-[#151515] font-bebas tracking-wide mb-2">{active.title}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: active.color }}>
                    {active.subtitle}
                  </p>
                  <p className="text-[#151515]/75 leading-relaxed text-sm mb-6">{active.description}</p>
                  
                  <p className="text-xs tracking-[0.2em] uppercase text-[#151515]/45 font-medium mb-3">Как подключиться</p>
                  <ul className="space-y-2 text-sm text-[#151515]/70 leading-relaxed">
                    <li className="flex gap-3">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                      <span>Подать запрос в профильный подкомитет и определить формат участия.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                      <span>Подключиться к пилоту/проекту с отраслевым заказчиком или госорганом.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                      <span>Оформить партнёрство/членство для доступа к ресурсам и кооперации.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
