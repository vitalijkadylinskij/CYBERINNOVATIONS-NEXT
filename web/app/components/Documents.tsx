'use client'

import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { FileText, Download, Send, CircleCheck, ArrowRight, BookOpen, Award, FileCheck } from 'lucide-react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useTranslations } from "next-intl"
import { withBasePath } from "@/lib/basePath"

declare global {
  interface Window {
    grecaptcha?: {
      reset?: () => void
    }
    onCaptchaSuccess?: (token: string) => void
  }
}

type DocKey = 'charter' | 'registration' | 'membership' | 'application' | 'questionnaire';
type MouKey = 'bricsPay' | 'ncod' | 'plus' | 'vamp';

interface Document {
  key: DocKey;
  icon: React.ElementType;
  href?: string;
  available: boolean;
}

interface MouDocument {
  key: MouKey;
  icon: React.ElementType;
  href: string;
}

const documents: Document[] = [
  { key: 'charter', icon: BookOpen, href: withBasePath('/materials/Устав.pdf'), available: true },
  { key: 'registration', icon: Award, href: withBasePath('/materials/Свидетельство.pdf'), available: true },
  { key: 'membership', icon: FileCheck, href: withBasePath('/materials/Положение_о_членстве .pdf'), available: true },
  { key: 'application', icon: FileText, href: withBasePath('/materials/obrazec_zayavleniya_2026.docx'), available: true },
  { key: 'questionnaire', icon: FileText, href: withBasePath('/materials/anketa_forma.doc'), available: true },
]

const mouDocuments: MouDocument[] = [
  { key: 'bricsPay', icon: FileText, href: withBasePath('/materials/BRICS_pay.pdf') },
  { key: 'ncod', icon: FileText, href: withBasePath('/materials/NCOD.pdf') },
  { key: 'plus', icon: FileText, href: withBasePath('/materials/PLUS.pdf') },
  { key: 'vamp', icon: FileText, href: withBasePath('/materials/VAMP.pdf') },
]

const membershipSteps = [
  { step: '01', titleKey: 'steps.step1.title', descriptionKey: 'steps.step1.description' },
  { step: '02', titleKey: 'steps.step2.title', descriptionKey: 'steps.step2.description' },
  { step: '03', titleKey: 'steps.step3.title', descriptionKey: 'steps.step3.description' },
  { step: '04', titleKey: 'steps.step4.title', descriptionKey: 'steps.step4.description' },
]

function getRoleFromSearchParams() {
  if (typeof window === 'undefined') return 'company'
  const roleParam = new URLSearchParams(window.location.search).get('role')
  const validRoles = ['company', 'government', 'partner', 'media', 'expert', 'volunteer']
  return roleParam && validRoles.includes(roleParam) ? roleParam : 'company'
}

export function Documents() {
  const t = useTranslations('documents');
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    role: getRoleFromSearchParams(),
    message: '',
    honeypot: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submittedRole, setSubmittedRole] = useState(getRoleFromSearchParams())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formStartTime] = useState(Date.now())
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [showMou, setShowMou] = useState(false)
  const isCaptchaEnabled = Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)

  useEffect(() => {
    if (!isCaptchaEnabled) return

    window.onCaptchaSuccess = (token: string) => {
      setCaptchaToken(token);
    };
  
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, [isCaptchaEnabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setError(null)

    if (isCaptchaEnabled && !captchaToken) {
      setError(t('form.captchaError'));
      setLoading(false)
      return;
    }
  
    try {
      if (Date.now() - formStartTime < 3000) {
        setError(t('form.error'));
        return;
      }
  
      if (formData.honeypot) {
        setError(t('form.error'));
        return;
      }
  
      const dataToSend = {
        ...formData,
        timestamp: Date.now(),
        formStartedAt: formStartTime,
        captchaToken,
      };
  
      const response = await fetch(withBasePath('/api/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || t('form.error'));
        return;
      }

      // Успешная отправка — обновляем UI
      setSubmittedRole(formData.role);
      setSubmitted(true);
      setFormData({
        company: '',
        name: '',
        email: '',
        phone: '',
        role: getRoleFromSearchParams(),
        message: '',
        honeypot: '',
      });
  
      if (isCaptchaEnabled && window.grecaptcha?.reset) {
        window.grecaptcha.reset();
      }
      setCaptchaToken('');
  
      setTimeout(() => setSubmitted(false), 3500);
  
    } catch (err: unknown) {
      console.error('Submit error:', err);
      setError(err instanceof Error ? err.message : t('form.error'));
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = ['company', 'government', 'partner', 'media', 'expert', 'volunteer'];

  return (
    <section className="py-24 relative overflow-hidden" id="documents">
      <div id="membership" className="relative -top-24" />
      <div className="absolute inset-0 bg-[#F3F4E9]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#151515]/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#5F68A5]/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5F68A5]" />
            <span className="text-[#5F68A5] text-sm tracking-[0.2em] uppercase font-medium">{t('sectionTitle')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] mb-6 font-bebas leading-[0.95]">
            {t('title')}
            <br />
            <span className="text-[#5F891D]">{t('subtitle')}</span>
          </h2>
        </motion.div>

        {/* Документы и шаги */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Документы */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="ml-10">
            <h3 className="text-2xl font-bold text-[#151515] font-bebas tracking-wide mb-6">{t('documentsTitle')}</h3>
            <div className="space-y-4 mb-8">
              {documents.map((doc, index) => {
                const Icon = doc.icon
                const content = (
                  <div className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${doc.available ? 'bg-white border-[#151515]/10 hover:border-[#5F68A5]/30 hover:shadow-lg cursor-pointer' : 'bg-white/70 border-[#151515]/10 opacity-80 cursor-not-allowed'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${doc.available ? 'bg-[#5F68A5]/10 text-[#5F68A5]' : 'bg-[#151515]/8 text-[#151515]/45'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#151515] mb-0.5">{t(`docs.${doc.key}.title`)}</h4>
                      <p className="text-sm text-[#151515]/55">{t(`docs.${doc.key}.description`)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#151515]/45 hidden sm:block">{t(`docs.${doc.key}.size`)}</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${doc.available ? 'bg-[#F3F4E9] text-[#5F68A5]' : 'bg-[#F3F4E9] text-[#151515]/35'}`}>
                        {doc.available ? <Download className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                )
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                    {doc.available && doc.href ? (
                      <a href={doc.href} target="_blank" rel="noopener noreferrer" className="block group">{content}</a>
                    ) : (<div>{content}</div>)}
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <div className="w-full max-w-xl">
                <button
                  type="button"
                  onClick={() => setShowMou((prev) => !prev)}
                  className="w-full flex items-center justify-between gap-3 rounded-2xl bg-white border border-[#151515]/12 px-5 py-3 text-sm font-semibold text-[#151515] shadow-sm hover:border-[#5F68A5]/40 hover:shadow-md transition-all"
                >
                  <div className="text-left">
                    <div className="font-bebas text-lg leading-none">{t('memorandums.title')}</div>
                    <p className="text-[11px] text-[#151515]/60 mt-1">
                      {t('memorandums.description')}
                    </p>
                  </div>
                  <span className="text-xs text-[#151515]/60">
                    {showMou ? t('memorandums.hide') : t('memorandums.show')}
                  </span>
                </button>

                {showMou ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-3"
                  >
                    {mouDocuments.map((doc, index) => {
                      const Icon = doc.icon

                      return (
                        <motion.div
                          key={doc.key}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <a
                            href={doc.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="flex items-center gap-4 p-4 rounded-xl border bg-white border-[#151515]/10 hover:border-[#5F68A5]/30 hover:shadow-md transition-all cursor-pointer">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#5F68A5]/10 text-[#5F68A5]">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-[#151515] mb-0.5 text-sm">
                                  {t(`memorandums.items.${doc.key}.title`)}
                                </h5>
                                <p className="text-xs text-[#151515]/55">
                                  {t(`memorandums.items.${doc.key}.description`)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#151515]/45 hidden sm:block">
                                  {t(`memorandums.items.${doc.key}.size`)}
                                </span>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F3F4E9] text-[#5F68A5]">
                                  <Download className="w-4 h-4" />
                                </div>
                              </div>
                            </div>
                          </a>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Шаги */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="ml-10">
            <h3 className="text-2xl font-bold text-[#151515] font-bebas tracking-wide mb-6">{t('membershipTitle')}</h3>
            <div className="space-y-6">
              {membershipSteps.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative">
                  <div className="flex items-start gap-5">
                    <div className="relative flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#151515] flex items-center justify-center text-[#F3F4E9] font-bebas text-lg">{item.step}</div>
                      {index < membershipSteps.length - 1 && <div className="w-px h-12 bg-[#151515]/20 mt-2" />}
                    </div>
                    <div className="pt-2">
                      <h4 className="font-bold text-[#151515] mb-1">{t(item.titleKey)}</h4>
                      <p className="text-sm text-[#151515]/62 leading-relaxed">{t(item.descriptionKey)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Форма */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden" id="contact">
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
                <h3 className="text-3xl md:text-4xl font-bold text-[#F3F4E9] font-bebas tracking-wide mb-4">{t('form.title')}</h3>
                <p className="text-[#F3F4E9]/62 leading-relaxed mb-8">
                  {t('form.description')}
                </p>
                <div className="space-y-4">
                  {(t.raw('form.formOptions') as string[]).map((item, i) => (
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
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-[#5F891D]/20 rounded-full flex items-center justify-center mb-6">
                      <CircleCheck className="w-10 h-10 text-[#5F891D]" />
                    </div>
                    <h4 className="text-2xl font-bold text-[#F3F4E9] mb-2 font-bebas">{t('form.submitted')}</h4>
                    <p className="text-[#F3F4E9]/60 max-w-sm">
                      {t('form.submittedDescription', { role: t(`form.roles.${submittedRole}`) })}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                      <label htmlFor="company-website">Website</label>
                      <input
                        id="company-website"
                        type="text"
                        value={formData.honeypot}
                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                        autoComplete="off"
                        tabIndex={-1}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input required maxLength={100} autoComplete="organization" placeholder={t('form.placeholders.company')} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]" />
                      <Input required maxLength={100} autoComplete="name" placeholder={t('form.placeholders.name')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input required maxLength={254} autoComplete="email" type="email" placeholder={t('form.placeholders.email')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]" />
                      <Input required maxLength={30} autoComplete="tel" inputMode="tel" type="tel" placeholder={t('form.placeholders.phone')} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]" />
                    </div>

                    <div>
                      <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full h-10 rounded-md border border-white/10 bg-white/10 px-3 text-sm text-[#F3F4E9] focus:outline-none focus:border-[#5F891D]">
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>{t(`form.roles.${role}`)}</option>
                        ))}
                      </select>
                    </div>

                    <Textarea maxLength={1000} placeholder={t('form.placeholders.message')} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-white/10 border-white/10 text-[#F3F4E9] placeholder:text-[#F3F4E9]/45 focus:border-[#5F891D]" rows={4} />

                    <p className="text-xs leading-relaxed text-[#F3F4E9]/60">
                      {t('form.textOnlyNotice')}
                    </p>

                    {isCaptchaEnabled ? (
                      <div
                        className="g-recaptcha"
                        data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        data-callback="onCaptchaSuccess"
                      />
                    ) : null}

                    {error && <p className="text-[#F8911D] text-sm">{error}</p>}

                    <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-[#5F891D] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#4e7015] transition-all">
                      {loading ? t('form.sending') : t('form.submit')}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
