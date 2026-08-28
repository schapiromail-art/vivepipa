import { createContext, useContext } from "react";
import { pt, type Dict } from "./pt";
import { es } from "./es";
import { en } from "./en";

export type Lang = "pt" | "es" | "en";

export const dicts: Record<Lang, Dict> = { pt, es, en };
export const langs: Lang[] = ["pt", "es", "en"];

/** Detecta o idioma por ?lang=, depois pelo navegador. Default: pt. */
export function detectLang(): Lang {
  if (typeof window === "undefined") return "pt";
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q && (langs as string[]).includes(q)) return q as Lang;
  const nav = navigator.language.slice(0, 2).toLowerCase();
  if (nav === "es") return "es";
  if (nav === "en") return "en";
  return "pt";
}

export const I18nContext = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({
  lang: "pt",
  t: pt,
  setLang: () => {},
});

export const useT = () => useContext(I18nContext);
export type { Dict };
