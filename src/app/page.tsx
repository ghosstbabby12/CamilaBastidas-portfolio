'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Particles from '@/components/ui/Particles'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-ghost-gradient flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-ghost-purple"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-ghost-gradient relative overflow-x-hidden">
      {/* Fondo animado */}
      <Particles />
      <Header />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Gallery />
          <Testimonials />
          <Contact />
        </motion.div>
      </div>

      {/* Botón Scroll To Top */}
      <ScrollToTop />
    </main>
  )
}
