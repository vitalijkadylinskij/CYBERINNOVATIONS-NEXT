import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FileText, Download, Send, CircleCheck, ArrowRight, BookOpen, Award, FileCheck } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface Document {
  title: string;
  description: string;
  icon: React.ElementType;
  size?: string;
  href?: string;
  available: boolean;
}

const documents: Document[] = [
  {
    title: 'Устав Ассоциации',
    description: 'Миссия, структура и принципы работы',
    icon: BookOpen,
    size: 'публикация готовится',
    available: false,
  },
  {
    title: 'Свидетельство о регистрации',
    description: 'Официальное подтверждение государственной регистрации',
    icon: Award,
    size: 'публикация готовится',
    available: false,
  },
  {
    title: 'Положение о членстве',
    description: 'Условия, роли и порядок вступления для юридических лиц',
    icon: FileCheck,
    size: 'публикация готовится',
    available: false,
  },
  {
    title: 'Презентация Ассоциации (PDF)',
    description: 'Цели, направления, приоритеты и форматы взаимодействия',
    icon: FileText,
    size: '2.3 MB',
    href: '/materials/assosiation-3.pdf',
    available: true,
  },
  {
    title: 'Брендбук (PPTX)',
    description: 'Фирменный стиль и правила использования материалов',
    icon: FileText,
    size: '24.9 MB',
    href: '/materials/brandbook.pptx',
    available: true,
  },
];

const membershipSteps = [
  {
    step: '01',
    title: 'Ознакомление с документами',
    description: 'Изучите миссию, направления и формат участия.',
  },
  {
    step: '02',
    title: 'Заполнение заявки',
    description: 'Выберите роль и отправьте информацию по организации или инициативе.',
  },
  {
    step: '03',
    title: 'Экспертное рассмотрение',
    description: 'Профильная группа анализирует запрос и предлагает формат взаимодействия.',
  },
  {
    step: '04',
    title: 'Подключение к экосистеме',
    description: 'Согласуем план работ и подключаем к проектам/подкомитетам.',
  },
];

const roleLabelByValue: Record<string, string> = {
  company: 'Компания (членство/партнерство)',
  government: 'Государственный орган',
  partner: 'Смежная/партнерская организация',
  media: 'СМИ',
  expert: 'Эксперт',
  volunteer: 'Волонтер',
};

const defaultRoleValue = 'company';

function getRoleFromSearchParams() {
  if (typeof window === 'undefined') {
    return defaultRoleValue;
  }

  const roleParam = new URLSearchParams(window.location.search).get('role');
  if (roleParam && roleParam in roleLabelByValue) {
    return roleParam;
  }

  return defaultRoleValue;
}

export function Documents() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    role: getRoleFromSearchParams(),
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const syncRoleFromUrl = () => {
      const roleFromUrl = getRoleFromSearchParams();
      setFormData((prev) => (prev.role === roleFromUrl ? prev : { ...prev, role: roleFromUrl }));
    };

    syncRoleFromUrl();
    window.addEventListener('popstate', syncRoleFromUrl);
    return () => window.removeEventListener('popstate', syncRoleFromUrl);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="documents">
      <div id="membership" className="relative -top-24" />
      <div className="absolute inset-0 bg-[#F3F4E9]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />

      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#5F68A5]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F68A5]" />
            <span className="text-[#5F68A5] text-sm tracking-[0.2em] uppercase font-medium">Документы и вступление</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] mb-6 font-bebas leading-[0.95]">
            Пакет материалов
            <br />
            <span className="text-[#5F891D]">и порядок взаимодействия</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#151515] font-bebas tracking-wide mb-6">Документация</h3>

            <div className="space-y-4">
              {documents.map((doc, index) => {
                const Icon = doc.icon;
                const content = (
                  <div
                    className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${
                      doc.available
                        ? 'bg-white border-[#151515]/10 hover:border-[#5F68A5]/30 hover:shadow-lg cursor-pointer'
                        : 'bg-white/70 border-[#151515]/10 opacity-80 cursor-not-allowed'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        doc.available
                          ? 'bg-[#5F68A5]/10 text-[#5F68A5]'
                          : 'bg-[#151515]/8 text-[#151515]/45'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#151515] mb-0.5">{doc.title}</h4>
                      <p className="text-sm text-[#151515]/55">{doc.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#151515]/45 hidden sm:block">{doc.size}</span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          doc.available ? 'bg-[#F3F4E9] text-[#5F68A5]' : 'bg-[#F3F4E9] text-[#151515]/35'
                        }`}
                      >
                        {doc.available ? <Download className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                  >
                    {doc.available && doc.href ? (
                      <a href={doc.href} target="_blank" rel="noopener noreferrer" className="block group">
                        {content}
                      </a>
                    ) : (
                      <div>{content}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#151515] font-bebas tracking-wide mb-6">Порядок вступления</h3>

            <div className="space-y-6">
              {membershipSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative"
                >
                  <div className="flex items-start gap-5">
                    <div className="relative flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#151515] flex items-center justify-center text-[#F3F4E9] font-bebas text-lg">
                        {item.step}
                      </div>
                      {index < membershipSteps.length - 1 && <div className="w-px h-12 bg-[#151515]/20 mt-2" />}
                    </div>

                    <div className="pt-2">
                      <h4 className="font-bold text-[#151515] mb-1">{item.title}</h4>
                      <p className="text-sm text-[#151515]/62 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
          id="contact"
        >
          <div className="absolute inset-0 bg-[#151515]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#5F68A5]/10 via-transparent to-[#5F891D]/10" />

          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="formGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#formGrid)" />
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#F3F4E9] font-bebas tracking-wide mb-4">
                  Заявка на сотрудничество
                </h3>
                <p className="text-[#F3F4E9]/62 leading-relaxed mb-8">
                  Оставьте контакты и кратко опишите запрос — мы предложим формат: членство, партнёрство, экспертная проработка или участие в проекте.
                </p>

                <div className="space-y-4">
                  {[
                    'Членство и партнёрство для технологических компаний',
                    'Экспертные запросы от госорганов и партнёров',
                    'Подключение к проектам и мероприятиям Ассоциации',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[#F3F4E9]/82">
                      <div className="w-6 h-6 rounded-full bg-[#5F891D]/20 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-[#5F891D]" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-[#5F891D]/20 rounded-full flex items-center justify-center mb-6">
                      <CircleCheck className="w-10 h-10 text-[#5F891D]" />
                    </div>
                    <h4 className="text-2xl font-bold text-[#F3F4E9] mb-2 font-bebas">Запрос отправлен</h4>
                    <p className="text-[#F3F4E9]/60 max-w-sm">
                      Роль: {roleLabelByValue[formData.role]}. Мы свяжемся с вами с предложением по формату взаимодействия.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        required
                        placeholder="Организация / компания *"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]"
                      />
                      <Input
                        required
                        placeholder="Контактное лицо *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        required
                        type="email"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]"
                      />
                      <Input
                        required
                        type="tel"
                        placeholder="Телефон *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]"
                      />
                    </div>

                    <div>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full h-10 rounded-md border border-white/10 bg-white/10 px-3 text-sm text-[#F3F4E9] focus:outline-none focus:border-[#5F891D]"
                      >
                        <option value="company">Компания (членство/партнерство)</option>
                        <option value="government">Государственный орган</option>
                        <option value="partner">Смежная/партнерская организация</option>
                        <option value="media">СМИ</option>
                        <option value="expert">Эксперт</option>
                        <option value="volunteer">Волонтер</option>
                      </select>
                    </div>

                    <Textarea
                      placeholder="Кратко опишите задачу или формат интереса..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D] resize-none"
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#5F891D] text-[#151515] font-bold rounded-full hover:bg-[#5F891D]/90 transition-colors"
                    >
                      <span>Отправить заявку</span>
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
