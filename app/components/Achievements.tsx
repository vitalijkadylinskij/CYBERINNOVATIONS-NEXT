import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Users, Rocket, Server, Globe, Calendar } from 'lucide-react';
import Image from "next/image";

interface Achievement {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  participants?: string;
  highlight?: string;
}

const achievements: Achievement[] = [
  {
    title: 'Рабочие сессии по запуску BELARUS AI DATA CENTER',
    description:
      'Совместно с государством, бизнесом и экспертами прорабатываем архитектуру, требования и модель доступа к вычислительной инфраструктуре для проектов национального масштаба.',
    date: '2025–2026',
    location: 'Минск, Республика Беларусь',
    image: 'materials/brandbook-media/image26.png',
    participants: 'Профильные рабочие группы',
    highlight: 'Ключевой проект',
  },
  {
    title: 'Меморандумы и партнёрские договорённости',
    description:
      'Развиваем сеть национальных и международных партнёров для совместных проектов, пилотов и отраслевой кооперации.',
    date: 'Регулярно',
    location: 'Беларусь / Международные площадки',
    image: 'materials/brandbook-media/image39.png',
  },
  {
    title: 'Круглые столы по нормативной и инвестиционной повестке',
    description:
      'Согласовываем приоритеты, требования и механики внедрения: государство, наука, инвесторы и технологические компании.',
    date: 'Ежеквартально',
    location: 'Минск, Республика Беларусь',
    image: 'materials/brandbook-media/image40.png',
    participants: 'Эксперты и члены Ассоциации',
  },
];

interface Project {
  title: string;
  status: string;
  description: string;
  icon: React.ElementType;
  deadline: string;
}

const projects: Project[] = [
  {
    title: 'BELARUS AI DATA CENTER',
    status: 'Проектирование инфраструктуры',
    description: 'Создаём национальный контур вычислительных мощностей для ИИ-проектов и прикладных исследований.',
    icon: Server,
    deadline: 'II кв. 2026 (план)',
  },
  {
    title: 'Партнёрское финансирование',
    status: 'Подготовка запуска',
    description: 'Механика отбора и финансирования проектов: экспертиза, критерии, сопровождение до пилота и масштабирования.',
    icon: Users,
    deadline: 'IV кв. 2026 (план)',
  },
  {
    title: 'Международная конференция',
    status: 'Формирование деловой программы',
    description: 'Площадка по конвергентным технологиям: кейсы внедрения, стандарты, инвестиции, экспорт.',
    icon: Globe,
    deadline: 'III кв. 2026 (план)',
  },
  {
    title: 'Общая экосистема участников',
    status: 'MVP-проект',
    description: 'Единая среда для коммуникации и кооперации: рабочие группы, запросы, проекты, календарь активностей.',
    icon: Rocket,
    deadline: 'I кв. 2026 (план)',
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
            <span className="text-[#5F68A5] text-sm tracking-[0.3em] uppercase font-medium">Достижения и проекты</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#151515] font-bebas tracking-tight">
            Реальные шаги в развитии экосистемы
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
                alt={achievements[0].title}
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
                    {achievements[0].highlight}
                  </span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-wrap items-center gap-5 mb-4 text-[#F3F4E9]/60 text-sm">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {achievements[0].location}
                  </span>
                  {achievements[0].participants && (
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {achievements[0].participants}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-[#F3F4E9] mb-3 font-bebas tracking-wide leading-tight">
                  {achievements[0].title}
                </h3>
                <p className="text-[#F3F4E9]/72 text-base max-w-2xl mb-4 leading-relaxed">{achievements[0].description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-[#5F68A5] font-semibold">{achievements[0].date}</span>
                  <span className="flex items-center gap-2 text-[#F3F4E9]">
                    <span className="text-sm font-medium">Ключевая активность</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {[achievements[1], achievements[2]].map((item, idx) => (
            <motion.div
              key={item.title}
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
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60" />

                <div className="relative h-full p-6 flex flex-col justify-end">
                  <span className="text-[#5F68A5] text-xs font-semibold tracking-wider uppercase mb-2">{item.date}</span>
                  <h3 className="text-lg font-bold text-[#151515] mb-2 font-bebas tracking-wide leading-tight">{item.title}</h3>
                  <p className="text-[#151515]/70 text-sm leading-relaxed">{item.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-[#151515]/55 text-xs">
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                    {item.participants && (
                      <span className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {item.participants}
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
            <h3 className="text-3xl md:text-4xl font-bold text-[#151515] font-bebas tracking-wide">Текущие проекты</h3>
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
                        Дедлайн: {project.deadline}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-[#151515] mb-2 font-bebas tracking-wide">{project.title}</h4>
                    <p className="text-sm text-[#151515]/70 leading-relaxed">{project.description}</p>
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
            <span className="text-sm">Документы, регламенты и материалы по проектам</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
