export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image: string
  githubUrl: string
  liveUrl: string
  featured: boolean
}

export const personalProjects: Project[] = [
  {
    id: 1,
    title: "Strudel Music",
    description: "Plataforma interactiva para crear música en vivo con código. Escucha algo de mi música y experimenta con patrones sonoros.",
    technologies: ["Strudel", "Web Audio API", "Live Coding"],
    image: "/projects/Strudel.png",
    githubUrl: "https://github.com/ghosstbabby12/ghostbabby-portfolio/blob/main/src/app/strudel/page.tsx",
    liveUrl: "/strudel",
    featured: true
  },
  {
    id: 2,
    title: "Blog de Recetas",
    description: "Blog personal con mis recetas favoritas, tips de cocina y fotografía gastronómica.",
    technologies: ["Next.js", "MDX", "Image Optimization"],
    image: "/projects/blog.png",
    githubUrl: "https://github.com/ghosstbabby12/healthy-recipes-blog.git",
    liveUrl: "https://healthy-recipes-blog.vercel.app",
    featured: false
  },
  {
    id: 3,
    title: "Mini Juegos Arcade",
    description: "Colección de mini juegos retro (Pac-Man y Mario Bros) construidos desde cero con Canvas API y TypeScript, sin librerías de juegos externas.",
    technologies: ["Canvas API", "TypeScript", "Next.js", "Game Physics"],
    image: "/projects/games.png",
    githubUrl: "https://github.com/ghosstbabby12/ghostbabby-arcade",
    liveUrl: "https://ghostbabby-arcade.vercel.app",
    featured: false
  }
]

export const academicProjects: Project[] = [
  {
    id: 1,
    title: "Unity 3D",
    description: "ZombieGame es un videojuego de terror y supervivencia en primera persona (FPS / Survival Horror) desarrollado en el motor Unity 2021.3.45f1.",
    technologies: ["Unity", "C#", "3D Game Development"],
    image: "/projects/Unity3D.png",
    githubUrl: "https://github.com/ghosstbabby12/Integracion-escenarios3D.git",
    liveUrl: "",
    featured: true
  },
  {
    id: 2,
    title: "Dashboard Epidemiológico Colombia",
    description: "Dashboard interactivo de datos epidemiológicos de Colombia con visualización de métricas, mapas y estadísticas de salud pública por región.",
    technologies: ["React", "D3.js", "Data Visualization", "Public Health API"],
    image: "/projects/Dashboard.png",
    githubUrl: "https://github.com/ghosstbabby12/LoginPerzonalizado.git",
    liveUrl: "https://colombia-dash-board-epidemiologico.vercel.app/",
    featured: false
  },
  {
    id: 3,
    title: "JuegoBricks",
    description: "🧪 Pruebas Unitarias con Pytest",
    technologies: ["Python", "Pytest", "Game Development"],
    image: "/projects/JuegoBricks.png",
    githubUrl: "https://github.com/ghosstbabby12/JuegoBricks.git",
    liveUrl: "https://juego-bricks-tau.vercel.app",
    featured: true
  },
  {
    id: 4,
    title: "Security Network",
    description: "Demostración del Patrón Decorator en Java/Spring Boot. Cada capa de seguridad (ej. SafeBrowsing, DNS) se aplica como un decorador a la URL base.",
    technologies: ["Java", "Spring Boot", "Patrón Decorator", "Security API"],
    image: "/projects/SecurityNetwork.png",
    githubUrl: "https://github.com/ghosstbabby12/PatronesDeSofware.git",
    liveUrl: "",
    featured: false
  },
  {
    id: 5,
    title: "GestorLab",
    description: "El sistema implementa autenticación y control de roles, donde los docentes pueden crear, editar y cancelar sus propias reservas, mientras que los administradores tienen la capacidad de aprobar o rechazar solicitudes, visualizar estadísticas de uso y exportar reportes en formato CSV.",
    technologies: ["Django", "Python", "PostgreSQL", "Bootstrap"],
    image: "projects/GestorLab.png",
    githubUrl: "https://github.com/ghosstbabby12/GestorLab.git",
    liveUrl: "https://gestorlab.onrender.com/accounts/login/",
    featured: true
  },
  {
    id: 6,
    title: "Manejo de Integración Continua",
    description: "Sistema de integración continua con React, implementando pruebas automatizadas con Jest y React Testing Library, y despliegue automático con Jenkins.",
    technologies: ["React 18", "Axios", "Jest + React Testing Library", "Jenkins (CI/CD)"],
    image: "/projects/ReactApp.jpg",
    githubUrl: "https://github.com/ghosstbabby12/Calidad-de-Software-P2.git",
    liveUrl: "https://calidad-de-software-p2.vercel.app",
    featured: false
  }
]
