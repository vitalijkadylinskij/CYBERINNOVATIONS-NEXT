import { motion } from "framer-motion";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'ФИО — на утверждении',
    role: 'Председатель Ассоциации',
    description: 'Координация взаимодействия с государственными органами и развитие межотраслевого партнерства.',
    image: '/materials/placeholders/expert-01.png',
  },
  {
    name: 'ФИО — на утверждении',
    role: 'Руководитель технологических подкомитетов',
    description:
      'Координация технологических подкомитетов: ИИ, блокчейн, IoT, кибербезопасность, микроэлектроника и робототехника, вычислительная инфраструктура, энергетика, подготовка кадров.',
    image: '/materials/placeholders/expert-02.png',
  },
  {
    name: 'ФИО — на утверждении',
    role: 'Руководитель инвестиционного трека',
    description: 'Развитие программы партнерского финансирования и сопровождение инвестиционных инициатив.',
    image: '/materials/placeholders/expert-03.png',
  },
  {
    name: 'ФИО — на утверждении',
    role: 'Руководитель образовательных и международных программ',
    description: 'Развитие кадрового резерва и международной повестки Ассоциации.',
    image: '/materials/placeholders/expert-04.png',
  },
];

export function Team() {
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
              <span className="text-[#5F891D] text-sm tracking-[0.2em] uppercase font-medium">Эксперты ассоциации</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] font-bebas leading-[0.95]">
              Люди, которые отвечают
              <br />
              <span className="text-[#5F68A5]">за результат</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-end"
          >
            <p className="text-lg text-[#151515]/65 leading-relaxed">
              Руководящий состав и ответственные по ключевым трекам публикуются здесь — чтобы партнёрам было понятно, кто
              принимает решения, ведёт проекты и куда обращаться по вопросам экспертизы, пилотов и участия.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[#F3F4E9] border border-[#151515]/10 h-full">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.role}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/30 to-transparent" />
                  <div className="absolute top-4 left-4 text-6xl font-bebas text-white/10 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-xs font-medium text-[#5F891D] tracking-wider uppercase">{member.role}</span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2 leading-tight">{member.name}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{member.description}</p>
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
