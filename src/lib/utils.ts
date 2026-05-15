import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function para combinar clases de Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Scroll suave a un elemento por selector (ej: "#about")
 */
export function scrollToElement(selector: string, offset: number = 0): void {
  // Soporta tanto selector CSS como ID puro
  const element = selector.startsWith("#")
    ? document.getElementById(selector.slice(1))
    : document.querySelector(selector)

  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  window.scrollTo({ top: offsetPosition, behavior: "smooth" })
}

/**
 * Scroll suave al tope de la página
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" })
}
