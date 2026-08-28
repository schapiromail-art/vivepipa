import type { Lang } from "@/i18n";

const locales: Record<Lang, string> = { pt: "pt-BR", es: "es-AR", en: "en-US" };

/**
 * Sempre em BRL — o imóvel é em reais em qualquer idioma.
 * O símbolo é escrito à mão porque `style: "currency"` devolve "BRL" fora do
 * pt-BR, e "R$" é o que o comprador reconhece.
 */
export function brl(v: number, lang: Lang = "pt", compacto = false) {
  const n = new Intl.NumberFormat(locales[lang], {
    maximumFractionDigits: 0,
    notation: compacto ? "compact" : "standard",
  }).format(v);
  return `R$ ${n}`;
}

export function m2(v: number, lang: Lang = "pt") {
  return `${new Intl.NumberFormat(locales[lang], { maximumFractionDigits: 2 }).format(v)} m²`;
}

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function numero(v: number, lang: Lang = "pt") {
  return new Intl.NumberFormat(locales[lang], { maximumFractionDigits: 0 }).format(v);
}
