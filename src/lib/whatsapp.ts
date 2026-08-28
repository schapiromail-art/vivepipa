import { site } from "@/config/site";
import { origemCurta, track } from "./tracking";

/** Monta o link do WhatsApp com contexto: de onde veio e o que estava vendo. */
export function whatsappUrl(contexto?: string) {
  const partes = [
    `Olá! Vim do site do ${site.nome}`,
    contexto ? `e tenho interesse em: ${contexto}` : "",
    `Gostaria de receber a tabela e as condições de pagamento.`,
    `[origem: ${origemCurta()}]`,
  ].filter(Boolean);
  return `https://wa.me/${site.whatsapp.numero}?text=${encodeURIComponent(partes.join(" "))}`;
}

export function abrirWhatsapp(contexto?: string) {
  track("contato_whatsapp", { contexto: contexto ?? "geral", origem: origemCurta() });
  window.open(whatsappUrl(contexto), "_blank", "noopener");
}
