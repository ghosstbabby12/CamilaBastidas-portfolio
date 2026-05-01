"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

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

const DICTIONARY = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      experience: "Experiencia",
      mygame: "Juego",
      gallery: "Galería",
      testimonials: "Testimonios",
      contact: "Contacto",
    },
    actions: {
      viewProjects: "Ver Proyectos",
      contactMe: "Contáctame",
      scrollTop: "Volver arriba",
      theme: {
        light: "Modo Claro",
        dark: "Modo Oscuro",
      },
      language: "Idioma",
    },

    hero: {
      welcome: "Hola, soy Camila Bastidas",
      tagline: "Desarrolladora Full Stack · Backend & APIs · IA Aplicada",
      intro: {
        part1: "",
        unlock: "",
        part2: "",
        hidden: "",
        part3: ""
      },
      builtWith: "Stack tecnológico:",
      strudel: {
        title: "Strudel Live Coding",
        description: "Experimenta con música generativa y live coding"
      }
    },

    sections: {
      aboutTitle: "Sobre Mí",
      projectsTitle: "Mis Proyectos",
      contactTitle: "Contáctame",
    },
    experience: {
      title: "Experiencia",
      subtitle: "Mi trayectoria en el desarrollo de software y aprendizaje continuo",
      items: {
        student: {
          title: "Estudiante de Ingeniería de Software",
          company: "UNIVERSIDAD COOPERATIVA DE COLOMBIA",
          period: "2021 - Actualidad",
          description: "Formación académica en desarrollo de software, algoritmos, estructuras de datos, bases de datos y metodologías ágiles. Participación activa en proyectos académicos y competencias de programación."
        },
        developer: {
          title: "Desarrolladora Full Stack",
          company: "Proyectos Freelance",
          period: "2023 - Actualidad",
          description: "Desarrollo de aplicaciones web modernas utilizando Next.js, React, TypeScript y Tailwind CSS. Creación de experiencias interactivas y portafolios gamificados con enfoque en UX/UI."
        },
        projects: {
          title: "Creadora de Proyectos Interactivos",
          company: "Portfolio Personal",
          period: "2022 - Actualidad",
          description: "Diseño y desarrollo de experiencias web únicas inspiradas en videojuegos retro. Implementación de sistemas de gamificación, música generativa con Strudel y elementos interactivos creativos."
        },
        achievements: {
          title: "Logros y Aprendizaje",
          company: "Desarrollo Continuo",
          period: "2021 - Actualidad",
          description: "Dominio de múltiples tecnologías modernas, participación en comunidades de desarrollo, creación de proyectos que combinan arte, música y programación. Inspiración constante de los juegos retro y la cultura gamer."
        }
      }
    },
    mygame: {
      title: "Juego",
      subtitle: "Disfruta de una versión arcade interactiva integrada en mi portfolio",
      header: {
        score: "PUNTAJE",
        level: "NIVEL",
        credits: "CRÉDITOS",
        selectGame: "SELECCIONA UN JUEGO"
      }
    },
    contact: {
      title: "Contáctame",
      subtitle: "¿Tienes una idea, proyecto o colaboración? Escríbeme y lo hablamos 🚀",
      social: "Sígueme en mis redes sociales",
      submit: "Enviar Mensaje",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      placeholderName: "Tu nombre",
      placeholderEmail: "tu@email.com",
      placeholderMessage: "Escribe tu mensaje...",
      cta: "¿Tienes una idea, proyecto o colaboración? Escríbeme y lo hablamos 🚀"
    },
    projects: {
      description: "Una selección de proyectos que demuestran mis habilidades en desarrollo web, desde aplicaciones empresariales hasta experiencias interactivas creativas.",
      personalProjects: "🎨 Proyectos Personales",
      academicProjects: "🎓 Proyectos Académicos",
      featured: "Destacado",
      code: "Código",
      demo: "Demo",
      cta: "¿Interesado en ver más de mi trabajo?",
      viewMore: "Ver más en GitHub",
      items: {}
    },
    about: {
      title: "Sobre Mí",
      greeting: "¡Hola! Soy",
      name: "Camila Bastidas",
      bio: "Estudiante de sexto semestre de Ingeniería de Software en la Universidad Cooperativa de Colombia, con enfoque en desarrollo backend y construcción de soluciones tecnológicas de alta complejidad.",
      bio2: "Cuento con experiencia en el diseño e implementación de APIs, manejo de bases de datos e integración de servicios en aplicaciones web y móviles. Me interesa especialmente la inteligencia artificial aplicada, habiendo trabajado en el entrenamiento de modelos y procesamiento de información.",
      bio3: "Me destaco por mi organización, capacidad analítica y facilidad para comunicar ideas técnicas en inglés, lo que me permite trabajar en entornos colaborativos y adaptarme rápidamente a nuevos retos.",
      inspiration: "",
      tetrisGames: "",
      inspirationEnd: "",

      interestsTitle: "✨ Mis Pasiones",
      interests: {
        music: "Música",
        art: "Arte",
        cooking: "Cocina",
        gaming: "Videojuegos",
        sports: "Deporte",
        coding: "Programación"
      },

      statsTitle: "📊 En Números",
      stats: {
        age: "Años",
        exp: "Años de Experiencia",
        projects: "Proyectos Completados",
        tech: "Tecnologías Dominadas"
      },

      cards: {
        mission: {
          title: "Mi Misión",
          description: "Desarrollar soluciones digitales innovadoras que resuelvan problemas reales mientras crean experiencias memorables para los usuarios."
        },
        approach: {
          title: "Mi Enfoque",
          description: "Combino arquitectura de software robusta con diseño centrado en el usuario, priorizando código limpio, accesible y escalable."
        },
        passion: {
          title: "Mi Pasión",
          description: "Explorar tecnologías emergentes, contribuir a proyectos open source y construir aplicaciones que fusionen funcionalidad con creatividad visual."
        }
      }
    },

    
    pacman: {
      title: "👻 GHOST-MAN",
      score: "Puntaje",
      lives: "Vidas",
      cherries: "Cerezas",
      instructions: "Usa las flechas ⬆️⬇️⬅️➡️ para moverte",
      galleryButton: "🍒 Galería 👁️✨",
      won: "¡GANASTE! 🎉",
      gameOver: "GAME OVER 👻",
      playAgain: "Jugar de nuevo",
      retry: "Reintentar",
      card: {
        title: "PAC-MAN",
        description: "Versión clásica del arcade icónico. Recolecta cerezas para desbloquear mi galería personal con fotos y recuerdos.",
        pressToStart: "PRESIONA PARA INICIAR",
        startButton: "START",
        codeButton: "</> Código",
        demoButton: "↗ Demo"
      }
    },
    boo: {
      title: "👻 GHOST HOUSE",
      startTip: "¡CUIDADO CON LOS BOOS!",
      controls: "Usa las flechas para moverte — ⬆️ o ESPACIO para saltar",
      start: "START",
      card: {
        title: "BOO MARIO BROS",
        description: "Mini recreación del juego original de Mario Bros. Recolecta testimonios golpeando bloques y descarga mi hoja de vida completando el nivel.",
        pressToStart: "PRESIONA PARA INICIAR",
        startButton: "START",
        codeButton: "</> Código",
        demoButton: "↗ Demo"
      }
    },
    gallery: {
      title: "Galería Interactiva",
      unlockTitle: "Desbloquea mi galería personal de dos formas",
      option1: "Demuestra que sabes ejecutar mi proyecto en local",
      option2: "Juega Pac-Man y recolecta 3 cerezas 🍒",
      locked: "Galería Bloqueada",
      question: "Pregunta",
      of: "de",
      installDeps: "Instala las dependencias:",
      runLocal: "Ejecuta el proyecto en local:",
      placeholder: "Escribe el comando aquí",
      next: "▶ Siguiente",
      unlock: "🔓 Desbloquear Galería",
      wrongAnswer: "❌ Respuesta incorrecta. ¡Inténtalo de nuevo!",
      or: "O",
      playPacman: "🍒 Jugar Pac-Man",
      collectCherries: "Recolecta 3 cerezas para desbloquear",
      back: "Volver al inicio"
    },
    testimonials: {
      title: "Testimonios",
      subtitle: "Lo que dicen quienes han trabajado conmigo",
      locked: "Testimonios Bloqueados",
      unlockMessage: "Completa uno de los juegos en la sección Arcade para desbloquear los testimonios",
      goToGames: "Ir a Arcade"
    },
    interactiveGallery: {
      title: "Galería Interactiva",
      subtitle: "Explora mi lado más personal 💫 — cada categoría revela momentos de mi vida si respondes correctamente las preguntas de desarrollo web.",
      locked: "Sección Bloqueada",
      unlocked: "Sección Desbloqueada",
      unlock: "🔓 Desbloquear",
      placeholder: "Escribe tu respuesta...",
      wrongAnswer: "❌ Respuesta incorrecta. ¡Inténtalo de nuevo!",
      backToHome: "Volver al Inicio",
      categories: {
        videoGames: {
          title: "Video Games",
          emoji: "🎮",
          question: "Comando para ejecutar un proyecto en Next.js"
        },
        food: {
          title: "Food",
          emoji: "🍔",
          question: "Lenguaje de programación para el frontend web (tres letras)"
        },
        friends: {
          title: "Hommies",
          emoji: "👯",
          question: "¿Qué método HTTP se usa para enviar datos al servidor?"
        },
        trips: {
          title: "Trips",
          emoji: "✈️",
          question: "Framework de CSS usado en este proyecto (nombre completo)"
        },
        hobbies: {
          title: "Hobbies",
          emoji: "🎨",
          question: "Sistema de control de versiones más popular"
        }
      }
    }
  },
  en: {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    mygame: "Game",
    gallery: "Gallery",
    testimonials: "Testimonials",
    contact: "Contact",
  },
  actions: {
    viewProjects: "View Projects",
    contactMe: "Contact me",
    scrollTop: "Back to top",
    theme: {
      light: "Light Mode",
      dark: "Dark Mode",
    },
    language: "Language",
  },
  hero: {
    welcome: "Hi, I'm Camila Bastidas",
    tagline: "Full Stack Developer · Backend & APIs · Applied AI",
    intro: {
      part1: "",
      unlock: "",
      part2: "",
      hidden: "",
      part3: ""
    },
    builtWith: "Tech stack:",
    strudel: {
      title: "Strudel Live Coding",
      description: "Experience generative music and live coding"
    }
  },
  sections: {
    aboutTitle: "About Me",
    projectsTitle: "My Projects",
    contactTitle: "Contact Me",
  },
  experience: {
    title: "Experience",
    subtitle: "My journey in software development and continuous learning",
    items: {
      student: {
        title: "Software Engineering Student",
        company: "UNIVERSIDAD COOPERATIVA DE COLOMBIA",
        period: "2021 - Present",
        description: "Academic training in software development, algorithms, data structures, databases and agile methodologies. Active participation in academic projects and programming competitions."
      },
      developer: {
        title: "Full Stack Developer",
        company: "Freelance Projects",
        period: "2023 - Present",
        description: "Development of modern web applications using Next.js, React, TypeScript and Tailwind CSS. Creation of interactive experiences and gamified portfolios with focus on UX/UI."
      },
      projects: {
        title: "Interactive Projects Creator",
        company: "Personal Portfolio",
        period: "2022 - Present",
        description: "Design and development of unique web experiences inspired by retro video games. Implementation of gamification systems, generative music with Strudel and creative interactive elements."
      },
      achievements: {
        title: "Achievements & Learning",
        company: "Continuous Development",
        period: "2021 - Present",
        description: "Mastery of multiple modern technologies, participation in development communities, creation of projects that combine art, music and programming. Constant inspiration from retro games and gamer culture."
      }
    }
  },
  mygame: {
    title: "Game",
    subtitle: "Enjoy an interactive arcade version embedded in my portfolio",
    header: {
      score: "SCORE",
      level: "LEVEL",
      credits: "CREDITS",
      selectGame: "SELECT GAME"
    }
  },
  contact: {
    title: "Contact Me",
    subtitle: "Got an idea, project or collaboration? Write to me and let's talk 🚀",
    social: "Follow me on social media",
    submit: "Send Message",
    name: "Name",
    email: "Email",
    message: "Message",
    placeholderName: "Your name",
    placeholderEmail: "you@email.com",
    placeholderMessage: "Write your message...",
    cta: "Got an idea, project or collaboration? Write to me and let's talk 🚀"
  },
  projects: {
    description: "A selection of projects that showcase my web development skills, from enterprise apps to interactive creative experiences.",
    personalProjects: "🎨 Personal Projects",
    academicProjects: "🎓 Academic Projects",
    featured: "Featured",
    code: "Code",
    demo: "Demo",
    cta: "Interested in seeing more of my work?",
    viewMore: "View more on GitHub"
  },
  about: {
    title: "About Me",
    greeting: "Hi! I'm",
    name: "Camila Bastidas",
    bio: "Sixth-semester Software Engineering student at Universidad Cooperativa de Colombia, focused on backend development and building high-complexity technological solutions.",
    bio2: "I have experience designing and implementing APIs, managing databases, and integrating services in web and mobile applications. I'm particularly interested in applied artificial intelligence, having worked on model training and information processing.",
    bio3: "I stand out for my organization, analytical thinking, and ability to communicate technical ideas in English, which allows me to thrive in collaborative environments and adapt quickly to new challenges.",
    inspiration: "",
    tetrisGames: "",
    inspirationEnd: "",

    interestsTitle: "✨ My Passions",
    interests: {
      music: "Music",
      art: "Art",
      cooking: "Cooking",
      gaming: "Gaming",
      sports: "Sports",
      coding: "Coding"
    },

    statsTitle: "📊 By The Numbers",
    stats: {
      age: "Years Old",
      exp: "Years of Experience",
      projects: "Completed Projects",
      tech: "Technologies Mastered"
    },

    cards: {
      mission: {
        title: "My Mission",
        description: "Develop innovative digital solutions that solve real problems while creating memorable experiences for users."
      },
      approach: {
        title: "My Approach",
        description: "I combine robust software architecture with user-centered design, prioritizing clean, accessible, and scalable code."
      },
      passion: {
        title: "My Passion",
        description: "Exploring emerging technologies, contributing to open source projects, and building applications that merge functionality with visual creativity."
      }
    }
  },
  pacman: {
    title: "👻 GHOST-MAN",
    score: "Score",
    lives: "Lives",
    cherries: "Cherries",
    instructions: "Use arrows ⬆️⬇️⬅️➡️ to move",
    galleryButton: "🍒 Gallery 👁️✨",
    won: "YOU WIN! 🎉",
    gameOver: "GAME OVER 👻",
    playAgain: "Play again",
    retry: "Retry",
    card: {
      title: "PAC-MAN",
      description: "Classic version of the iconic arcade game. Collect cherries to unlock my personal gallery with photos and memories.",
      pressToStart: "PRESS TO START",
      startButton: "START",
      codeButton: "</> Code",
      demoButton: "↗ Demo"
    }
  },
  boo: {
    title: "👻 GHOST HOUSE",
    startTip: "WATCH OUT FOR BOOS!",
    controls: "Use arrows to move — ⬆️ or SPACE to jump",
    start: "START",
    card: {
      title: "BOO MARIO BROS",
      description: "Mini recreation of the original Mario Bros game. Collect testimonials by hitting blocks and download my resume by completing the level.",
      pressToStart: "PRESS TO START",
      startButton: "START",
      codeButton: "</> Code",
      demoButton: "↗ Demo"
    }
  },
  gallery: {
    title: "Interactive Gallery",
    unlockTitle: "Unlock my personal gallery in two ways",
    option1: "Prove you know how to run my project locally",
    option2: "Play Pac-Man and collect 3 cherries 🍒",
    locked: "Gallery Locked",
    question: "Question",
    of: "of",
    installDeps: "Install dependencies:",
    runLocal: "Run the project locally:",
    placeholder: "Type the command here",
    next: "▶ Next",
    unlock: "🔓 Unlock Gallery",
    wrongAnswer: "❌ Wrong answer. Try again!",
    or: "OR",
    playPacman: "🍒 Play Pac-Man",
    collectCherries: "Collect 3 cherries to unlock",
    back: "Back to home"
  },
  testimonials: {
    title: "Testimonials",
    subtitle: "What people who have worked with me say",
    locked: "Testimonials Locked",
    unlockMessage: "Complete one of the games in the Arcade section to unlock testimonials",
    goToGames: "Go to Arcade"
  },
  interactiveGallery: {
    title: "Interactive Gallery",
    subtitle: "Explore my personal side 💫 — each category reveals moments of my life if you answer the web development questions correctly.",
    locked: "Locked Section",
    unlocked: "Unlocked Section",
    unlock: "🔓 Unlock",
    placeholder: "Write your answer...",
    wrongAnswer: "❌ Wrong answer. Try again!",
    backToHome: "Back to Home",
    categories: {
      videoGames: {
        title: "Video Games",
        emoji: "🎮",
        question: "Command to run a Next.js project"
      },
      food: {
        title: "Food",
        emoji: "🍔",
        question: "Programming language for web frontend (three letters)"
      },
      friends: {
        title: "Hommies",
        emoji: "👯",
        question: "What HTTP method is used to send data to the server?"
      },
      trips: {
        title: "Trips",
        emoji: "✈️",
        question: "CSS framework used in this project (full name)"
      },
      hobbies: {
        title: "Hobbies",
        emoji: "🎨",
        question: "Most popular version control system"
      }
    }
  }
}
} as const

function getByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc: any, key: string) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj)
}

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
    const value = getByPath(DICTIONARY[lang], key)
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