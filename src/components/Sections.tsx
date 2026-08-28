import { useState } from "react";
import {
  Banknote,
  Check,
  ChevronDown,
  FileCheck2,
  MapPin,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { site } from "@/config/site";
import { cena } from "@/data/galeria";
import { useT } from "@/i18n";
import { cx, numero } from "@/lib/format";
import { track } from "@/lib/tracking";
import { abrirWhatsapp } from "@/lib/whatsapp";
import { Eyebrow, Img, Reveal, Section, Stat, Title } from "./ui";
import { LeadForm, useLead } from "./Lead";

/** Prova e escassez logo abaixo da dobra: números reais, sem inventar urgência. */
export function ProofBar() {
  const { t, lang } = useT();
  const { totalUnidades, disponiveis } = site.estoque;
  const pct = Math.round((disponiveis / totalUnidades) * 100);

  return (
    <section className="border-b border-clay-600/10 bg-sand-100 py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Stat valor={totalUnidades} label={t.proof.unidades} />
          <Stat valor={disponiveis} label={t.proof.restantes} />
          <Stat valor={numero(site.areaConstruida, lang)} label={t.proof.metros} />
          <Stat valor="4" label={t.proof.estilos} />
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-clay-600/10">
            <div className="h-full rounded-full bg-clay-600 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[12.5px] text-ink/50">
            <span className="font-medium text-clay-600">{pct}%</span> {t.proof.barra}
          </p>
        </div>

        <p className="mt-4 text-[12.5px] text-ink/45">{t.proof.vendido}</p>
      </div>
    </section>
  );
}

const icones = [Banknote, TrendingUp, FileCheck2];

export function Oferta() {
  const { t } = useT();
  return (
    <Section>
      <div className="container">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.oferta.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.oferta.titulo}</Title>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.oferta.itens.map((item, i) => {
            const Icon = icones[i];
            return (
              <Reveal key={item.titulo} delay={i * 90}>
                <article className="card h-full p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-clay-600/10 text-clay-600">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full bg-clay-600/8 px-3 py-1 text-[10.5px] uppercase tracking-[0.14em] text-clay-500">
                      {item.selo}
                    </span>
                  </div>
                  <h3 className="display mt-6 text-2xl">{item.titulo}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/60">{item.texto}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/** Bloco aspiracional: é aqui que a landing deixa de ser folheto e vira desejo. */
export function Projeto() {
  const { t } = useT();
  return (
    <Section id="projeto" tone="light">
      <div className="container grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Eyebrow>{t.lifestyle.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.lifestyle.titulo}</Title>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/65">{t.lifestyle.texto}</p>

          <div className="mt-9 space-y-7">
            {t.lifestyle.cenas.map((c) => (
              <div key={c.titulo} className="border-l border-clay-400/40 pl-5">
                <h3 className="text-[15px] font-medium">{c.titulo}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink/55">{c.texto}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-3">
            <Img
              foto={cena.piscinaDia}
              className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover"
            />
            <Img
              foto={cena.caminhoJardim}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <Img
              foto={cena.gourmet}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Condominio() {
  const { t } = useT();
  return (
    <Section tone="dark">
      <div className="container grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <Eyebrow>{t.condominio.eyebrow}</Eyebrow>
          <Title className="mt-5 text-sand-50">{t.condominio.titulo}</Title>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.condominio.itens.map((i) => (
              <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-sand-200/75">
                <Check size={15} className="mt-0.5 shrink-0 text-clay-400" />
                {i}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <Img
            foto={cena.loungeFamilia}
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
        </Reveal>
      </div>
    </Section>
  );
}

export function Localizacao() {
  const { t } = useT();
  const maps = `https://www.google.com/maps/search/?api=1&query=${site.coords.lat},${site.coords.lng}`;

  return (
    <Section id="localizacao" tone="sand">
      <div className="container">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.localizacao.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.localizacao.titulo}</Title>
          <p className="mt-4 flex items-start gap-2 text-[14px] text-ink/60">
            <MapPin size={16} className="mt-0.5 shrink-0 text-clay-400" />
            {t.localizacao.sub}
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-clay-600/10">
            <iframe
              title="Mapa"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full"
              src={`https://www.google.com/maps?q=${site.coords.lat},${site.coords.lng}&z=15&output=embed`}
            />
          </div>

          <div className="flex flex-col justify-between gap-6">
            <ul className="space-y-px overflow-hidden rounded-3xl bg-clay-600/10">
              {t.localizacao.pontos.map((p) => (
                <li key={p.nome} className="flex items-baseline justify-between bg-sand-50 px-6 py-5">
                  <span className="text-[14px]">{p.nome}</span>
                  <span className="text-[12.5px] text-ink/45">{p.detalhe}</span>
                </li>
              ))}
            </ul>
            <a href={maps} target="_blank" rel="noopener" className="btn-ghost w-full text-ink">
              {t.localizacao.verMapa}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Investimento() {
  const { t } = useT();
  const { abrir } = useLead();

  return (
    <Section tone="light">
      <div className="container grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Img
            foto={cena.aereaPorDoSol}
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <Eyebrow>{t.investimento.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.investimento.titulo}</Title>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/65">{t.investimento.texto}</p>

          <ul className="mt-7 space-y-3">
            {t.investimento.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-[14px] leading-relaxed text-ink/70">
                <Check size={16} className="mt-0.5 shrink-0 text-clay-400" />
                {b}
              </li>
            ))}
          </ul>

          <button onClick={() => abrir("estudo-rentabilidade")} className="btn-primary mt-8">
            {t.investimento.cta}
          </button>
        </Reveal>
      </div>
    </Section>
  );
}

export function Construtora() {
  const { t } = useT();
  const selos = Object.values(site.legal);

  return (
    <Section tone="sand">
      <div className="container">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.construtora.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.construtora.titulo}</Title>
          <p className="mt-5 text-[15px] leading-relaxed text-ink/65">{t.construtora.texto}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <p className="eyebrow text-ink/40">{t.construtora.selos}</p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-clay-600/10 sm:grid-cols-2">
            {selos.map((s) => (
              <div key={s} className="flex gap-3 bg-sand-50 px-6 py-5">
                <FileCheck2 size={17} className="mt-0.5 shrink-0 text-clay-400" />
                <span className="text-[12.5px] leading-relaxed text-ink/65">{s}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Faq() {
  const { t } = useT();
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <Section tone="light">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.faq.titulo}</Title>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-clay-600/10 border-y border-clay-600/10">
            {t.faq.itens.map((item, i) => {
              const on = aberto === i;
              return (
                <div key={item.p}>
                  <button
                    onClick={() => {
                      setAberto(on ? null : i);
                      if (!on) track("abriu_faq", { pergunta: item.p });
                    }}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    aria-expanded={on}
                  >
                    <span className="text-[15px] font-medium">{item.p}</span>
                    <ChevronDown
                      size={18}
                      className={cx("mt-0.5 shrink-0 text-clay-400 transition-transform", on && "rotate-180")}
                    />
                  </button>
                  <div
                    className={cx(
                      "grid transition-all duration-400",
                      on ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                    )}
                  >
                    <p className="overflow-hidden text-[14px] leading-relaxed text-ink/60">{item.r}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Formulario() {
  const { t } = useT();
  return (
    <Section id="contato" tone="sand">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <Eyebrow>{t.form.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.form.titulo}</Title>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/60">{t.form.sub}</p>
          <Img
            foto={cena.recepcao}
            className="mt-9 hidden aspect-[4/3] w-full rounded-3xl object-cover lg:block"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="card p-7 sm:p-9">
            <LeadForm contexto="formulario-principal" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function ChamadaFinal() {
  const { t } = useT();
  const { abrir } = useLead();

  return (
    <section className="relative overflow-hidden py-28">
      <Img
        foto={cena.portariaNoite}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-clay-900/75" />

      <div className="container relative text-center text-sand-50">
        <Reveal>
          <h2 className="display whitespace-pre-line text-[2.4rem] sm:text-6xl">{t.final.titulo}</h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] text-sand-100/75">{t.final.sub}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => abrir("chamada-final")}
              className="btn bg-sand-50 text-clay-700 hover:bg-white hover:shadow-lg"
            >
              {t.final.cta}
            </button>
            <button onClick={() => abrirWhatsapp("chamada-final")} className="btn-whats">
              <MessageCircle size={17} /> {t.form.whatsapp}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
