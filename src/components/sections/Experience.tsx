'use client'
import { motion } from "framer-motion"
import Section from "@/components/ui/Section"
import { Briefcase, GraduationCap, Code, Award, Trophy, Globe } from "lucide-react"
import { useI18n, useTheme } from '@/app/providers'

const Experience = () => {
  const { t } = useI18n()
  const { actualTheme } = useTheme()

  const experiences = [
    {
      id: 1,
      title: t('experience.items.student.title'),
      company: t('experience.items.student.company'),
      period: t('experience.items.student.period'),
      description: t('experience.items.student.description'),
      icon: <GraduationCap className="w-6 h-6 text-white" />
    },
    {
      id: 2,
      title: t('experience.items.developer.title'),
      company: t('experience.items.developer.company'),
      period: t('experience.items.developer.period'),
      description: t('experience.items.developer.description'),
      icon: <Code className="w-6 h-6 text-white" />
    },
    {
      id: 3,
      title: t('experience.items.projects.title'),
      company: t('experience.items.projects.company'),
      period: t('experience.items.projects.period'),
      description: t('experience.items.projects.description'),
      icon: <Briefcase className="w-6 h-6 text-white" />
    },
    {
      id: 4,
      title: t('experience.items.achievements.title'),
      company: t('experience.items.achievements.company'),
      period: t('experience.items.achievements.period'),
      description: t('experience.items.achievements.description'),
      icon: <Award className="w-6 h-6 text-white" />
    },
    {
      id: 5,
      title: t('experience.items.competitions.title'),
      company: t('experience.items.competitions.company'),
      period: t('experience.items.competitions.period'),
      description: t('experience.items.competitions.description'),
      icon: <Trophy className="w-6 h-6 text-white" />
    }
  ]

  const languageItems = [
    { name: t('experience.languages.items.spanish.name'), level: t('experience.languages.items.spanish.level'), percent: 100, badge: t('experience.languages.native'), inProgress: false },
    { name: t('experience.languages.items.english.name'), level: t('experience.languages.items.english.level'), percent: 65, badge: t('experience.languages.inProgress'), note: t('experience.languages.items.english.note'), inProgress: true }
  ]

  return (
    <Section
      id="experience"
      title={t('experience.title')}
      subtitle={t('experience.subtitle')}
      background="default"
      padding="lg"
    >
      <div className="relative">
        {/* Línea vertical visible en móvil */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ghost-purple via-ghost-pink to-ghost-purple md:hidden"></div>

        <div className="space-y-8 md:space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 md:min-h-[200px] ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Punto de la línea - visible en móvil y desktop */}
              <motion.div
                className="flex absolute left-0 md:left-1/2 w-12 h-12 items-center justify-center rounded-full shadow-lg z-20 border-4"
                style={{
                  background: actualTheme === 'light'
                    ? 'linear-gradient(to bottom right, #a78bfa, #c4b5fd)'
                    : 'linear-gradient(to bottom right, #667eea, #764ba2)',
                  borderColor: actualTheme === 'light' ? '#ffffff' : '#0a0118',
                  top: '0',
                  transform: 'translateX(0) md:translate(-50%, 0)'
                }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {exp.icon}
              </motion.div>

              {/* Espaciador invisible para el diseño desktop */}
              <div className="hidden md:block w-1/2"></div>

              {/* Card de experiencia */}
              <motion.div
                className="w-full md:w-1/2 ml-16 md:ml-0 p-4 md:p-6 rounded-2xl glass-effect border shadow-xl hover:shadow-2xl transition-all duration-300 group relative z-10"
                style={{
                  borderColor: actualTheme === 'light'
                    ? 'rgba(167, 139, 250, 0.3)'
                    : 'rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gradient group-hover:scale-105 transition-all duration-300">
                      {exp.title}
                    </h3>
                    <p
                      className="font-medium mt-1 text-sm md:text-base"
                      style={{
                        color: actualTheme === 'light' ? '#7c3aed' : '#a78bfa'
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                </div>

                <span
                  className="inline-block text-xs md:text-sm px-3 py-1 rounded-full mb-3 md:mb-4"
                  style={{
                    color: actualTheme === 'light' ? '#6d28d9' : 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: actualTheme === 'light' ? 'rgba(167, 139, 250, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {exp.period}
                </span>

                <p
                  className="leading-relaxed text-sm md:text-base"
                  style={{
                    color: actualTheme === 'light' ? '#4b5563' : 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  {exp.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sección de idiomas */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <Globe className="w-6 h-6 text-ghost-purple" />
          <h3 className="text-2xl md:text-3xl font-bold text-gradient">
            {t('experience.languages.title')}
          </h3>
        </div>

        <div className="glass-effect rounded-3xl p-6 md:p-8 space-y-6 max-w-2xl mx-auto">
          {languageItems.map((lang) => (
            <div key={lang.name}>
              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg font-bold text-white/90 tracking-wide uppercase">
                    {lang.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-ghost-purple/40 text-ghost-purple font-medium tracking-wider">
                    {lang.level}
                  </span>
                  {lang.inProgress && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-ghost-purple/20 text-ghost-purple font-semibold animate-pulse">
                      {lang.badge}
                    </span>
                  )}
                </div>
                {!lang.inProgress && (
                  <span className="text-sm font-semibold text-white/50 tracking-widest uppercase">
                    {lang.badge}
                  </span>
                )}
              </div>
              {lang.note && (
                <p className="text-xs text-white/40 mb-2 italic">{lang.note}</p>
              )}
              <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-ghost-purple"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percent}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

export default Experience
