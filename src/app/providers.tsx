"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { dictionaries, getByPath } from "@/lib/i18n"

// THEME
export type Theme = "dark" | "light" | "system"

interface ThemeContextValue {
  theme: Theme
  actualTheme: "dark" | "light" // El tema real aplicado
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [actualTheme, setActualTheme] = useState<"dark" | "light">("dark")

  // Detectar y actualizar el tema real según las preferencias
  useEffect(() => {
    const updateActualTheme = () => {
      if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setActualTheme(prefersDark ? "dark" : "light")
      } else {
        setActualTheme(theme)
      }
    }

    updateActualTheme()

    // Escuchar cambios en las preferencias del sistema
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e: MediaQueryListEvent) => {
        setActualTheme(e.matches ? "dark" : "light")
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme])

  // Cargar preferencia guardada
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as Theme | null
      if (stored === "light" || stored === "dark" || stored === "system") {
        setTheme(stored)
      } else {
        setTheme("system") // Por defecto, seguir el sistema
      }
    } catch {}
  }, [])

  // Aplicar tema al DOM
  useEffect(() => {
    const root = document.documentElement
    if (actualTheme === "light") {
      root.classList.add("light")
    } else {
      root.classList.remove("light")
    }
  }, [actualTheme])

  // Guardar preferencia cuando el usuario la cambia
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    try {
      localStorage.setItem("theme", newTheme)
    } catch {}
  }

  const value = useMemo(
    () => ({
      theme,
      actualTheme,
      setTheme: handleSetTheme,
      toggleTheme: () => handleSetTheme(actualTheme === "light" ? "dark" : "light")
    }),
    [theme, actualTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}

// I18N
export type Lang = "es" | "en"

interface I18nContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("es")

  useEffect(() => {
    try {
      const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null
      if (stored === "es" || stored === "en") {
        setLang(stored)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang)
    } catch {}

    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "es")
  }, [lang])

  const t = (key: string) => {
    const value = getByPath(dictionaries[lang] as unknown as Record<string, unknown>, key)
    return typeof value === "string" ? value : key
  }

  const value = useMemo(() => ({ lang, setLang, toggleLang: () => setLang((l) => (l === "es" ? "en" : "es")), t }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}
