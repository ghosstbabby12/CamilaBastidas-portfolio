import es from "./es"
import en from "./en"

export type Dictionary = typeof es

export const dictionaries = { es, en } as const

export function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}
