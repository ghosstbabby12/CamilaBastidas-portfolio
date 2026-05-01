/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode: carbón editorial + magenta + dorado
        'ghost-purple': '#f03d7a',   // magenta — acento principal
        'ghost-pink':   '#f5c840',   // dorado — acento secundario
        'ghost-blue':   '#f8d87a',   // dorado claro
        'dark-bg':      '#1c1a1e',   // carbón cálido
        'dark-secondary':'#242028',
        'dark-accent':  '#2a2629',   // cards
      },
      backgroundImage: {
        // Fondo dark: carbón oscuro cálido
        'ghost-gradient': 'linear-gradient(135deg, #1a181c 0%, #1e1b1f 60%, #221e23 100%)',
        // Gradiente de texto: dorado → magenta
        'text-gradient':  'linear-gradient(135deg, #f5c840 0%, #f03d7a 100%)',
        // Botones: magenta
        'card-gradient':  'linear-gradient(135deg, #c42d60, #f03d7a)',
      },
      animation: {
        float:     'float 6s ease-in-out infinite',
        glow:      'glow 2s ease-in-out infinite alternate',
        fadeInUp:  'fadeInUp 0.8s ease-out',
        slideIn:   'slideIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)',   opacity: '0.3' },
          '50%':      { transform: 'translateY(-20px) rotate(180deg)', opacity: '0.7' },
        },
        glow: {
          '0%':   { filter: 'drop-shadow(0 0 4px rgba(240,61,122,0.4))' },
          '100%': { filter: 'drop-shadow(0 0 16px rgba(240,61,122,0.8))' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backdropBlur: { xs: '2px' },
      fontFamily:   { sans: ['Inter', 'system-ui', 'sans-serif'] },
      boxShadow:    { glow: '0 0 10px rgba(149,133,200,0.5)' },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
    },
  },
  plugins: [],
}
