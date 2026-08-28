import { ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { cena } from "@/data/galeria";
import { valorMinimo } from "@/data/unidades";
import { useT } from "@/i18n";
import { brl } from "@/lib/format";
import { simular } from "@/lib/pagamento";
import { abrirWhatsapp } from "@/lib/whatsapp";
import { Img } from "./ui";
import { useLead } from "./Lead";

/**
 * O bloco que decide a campanha. Regra: a âncora de preço é a PARCELA,
 * nunca o valor cheio — o número grande espanta antes de qualificar.
 */
export function Hero() {
  const { t, lang } = useT();
  const { abrir } = useLead();
  const parcelaMinima = simular(valorMinimo).parcela;

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-clay-900">
      <Img
        foto={cena.heroPiscina}
        priority
        className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-clay-900/75 via-clay-900/35 to-clay-900/90" />

      <div className="container relative flex min-h-[100svh] flex-col justify-end pb-24 pt-32 sm:justify-center sm:pb-28">
        <div className="max-w-3xl text-sand-50">
          <p className="eyebrow animate-fade-up text-sand-300">{t.hero.eyebrow}</p>

          <h1
            className="display mt-5 whitespace-pre-line text-[3.1rem] leading-[0.95] animate-fade-up sm:text-[5.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            {t.hero.titulo}
          </h1>

          <p
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-sand-100/85 animate-fade-up sm:text-base"
            style={{ animationDelay: "160ms" }}
          >
            {t.hero.sub}
          </p>

          {/* Âncora econômica: parcela, não preço de tabela. */}
          <div
            className="mt-8 inline-flex flex-wrap items-end gap-x-4 gap-y-1 rounded-2xl border border-sand-100/20
                       bg-clay-900/40 px-6 py-4 backdrop-blur-md animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-sand-300">{t.hero.ancora}</p>
              <p className="mt-1 text-sm text-sand-100/70">
                {t.hero.ancoraDetalhe}{" "}
                <span className="display text-4xl text-sand-50">{brl(parcelaMinima, lang)}</span>
                <span className="text-sand-100/70">{t.hero.ancoraSufixo}</span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 animate-fade-up sm:flex-row" style={{ animationDelay: "320ms" }}>
            <button onClick={() => abrir("hero")} className="btn-primary">
              {t.hero.ctaPrimario}
            </button>
            <button onClick={() => abrirWhatsapp("hero")} className="btn-ghost text-sand-50">
              <MessageCircle size={17} /> {t.hero.ctaSecundario}
            </button>
          </div>

          <p
            className="mt-8 flex items-start gap-2 text-[11.5px] leading-relaxed text-sand-200/60 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-clay-400" />
            {t.hero.selo}
          </p>
        </div>
      </div>

      <a
        href="#projeto"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1
                   text-[10px] uppercase tracking-[0.2em] text-sand-100/50 sm:flex"
      >
        {t.hero.scroll}
        <ChevronDown size={16} className="animate-bounce" />
      </a>

      <span className="sr-only">
        {site.nome} — {site.endereco}
      </span>
    </section>
  );
}
