import { useState } from "react";
import { ArrowRight, Maximize2, X } from "lucide-react";
import { estilos, plantaBloco, type EstiloKey, type Foto } from "@/data/galeria";
import { disponiveis } from "@/data/unidades";
import { useT } from "@/i18n";
import { brl, cx, m2 } from "@/lib/format";
import { simular } from "@/lib/pagamento";
import { track } from "@/lib/tracking";
import { Eyebrow, Img, Reveal, Section, Title } from "./ui";
import { useLead } from "./Lead";

export function Tipologias() {
  const { t, lang } = useT();
  const { abrir } = useLead();
  const [zoom, setZoom] = useState<Foto | null>(null);

  const cards = (["terreo", "superior"] as const).map((tipo) => {
    const us = disponiveis.filter((u) => u.tipo === tipo);
    return {
      tipo,
      dados: tipo === "terreo" ? t.tipologias.terreo : t.tipologias.superior,
      areaMin: Math.min(...us.map((u) => u.metragem)),
      areaMax: Math.max(...us.map((u) => u.metragem)),
      externaMax: Math.max(...us.map((u) => (tipo === "terreo" ? u.areaJardim : u.areaSolarium) ?? 0)),
      parcela: simular(Math.min(...us.map((u) => u.valor))).parcela,
    };
  });

  return (
    <Section id="plantas" tone="light">
      <div className="container">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.tipologias.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.tipologias.titulo}</Title>
          <p className="mt-4 text-[15px] text-ink/60">{t.tipologias.sub}</p>
        </Reveal>

        <div className="mt-11 grid gap-6 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.tipo} delay={i * 90}>
              <article className="card flex h-full flex-col p-8">
                <h3 className="display text-3xl">{c.dados.nome}</h3>

                <dl className="mt-6 grid grid-cols-2 gap-5 border-y border-clay-600/10 py-5">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-ink/40">
                      {t.tipologias.areaTotal}
                    </dt>
                    <dd className="mt-1 text-[15px]">
                      {m2(c.areaMin, lang)} – {m2(c.areaMax, lang)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.15em] text-ink/40">
                      {c.tipo === "terreo" ? t.ui.jardim : t.ui.solario}
                    </dt>
                    <dd className="mt-1 text-[15px]">
                      {t.ui.ate} {m2(c.externaMax, lang)}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 flex-1 space-y-2">
                  {c.dados.bullets.map((b) => (
                    <li key={b} className="text-[13.5px] text-ink/60">
                      · {b}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-[13px] text-ink/50">
                  {t.tipologias.aPartirDe}{" "}
                  <span className="display text-2xl text-clay-600">{brl(c.parcela, lang)}</span>
                  {t.hero.ancoraSufixo}
                </p>

                <button
                  onClick={() => abrir(`planta · ${c.dados.nome}`)}
                  className="btn-primary mt-5 w-full justify-between px-6"
                >
                  {t.tipologias.cta}
                  <ArrowRight size={16} />
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-6">
          <button
            onClick={() => {
              setZoom(plantaBloco);
              track("viu_planta", { planta: "bloco" });
            }}
            className="group relative block w-full overflow-hidden rounded-3xl border border-clay-600/10 bg-white"
          >
            <Img foto={plantaBloco} alt="Planta baixa humanizada do Bloco A" className="w-full" />
            <span className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-clay-900/80 px-4 py-2 text-[11.5px] text-sand-50 backdrop-blur">
              <Maximize2 size={13} /> {t.ui.ampliar}
            </span>
          </button>
        </Reveal>
      </div>

      {zoom && <Lightbox foto={zoom} onClose={() => setZoom(null)} />}
    </Section>
  );
}

const ordem: EstiloKey[] = ["navy", "rustico", "classico", "standard"];

export function Acabamentos() {
  const { t } = useT();
  const [ativo, setAtivo] = useState<EstiloKey>("navy");
  const [zoom, setZoom] = useState<Foto | null>(null);
  const fotos = estilos[ativo];

  return (
    <Section tone="dark">
      <div className="container">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.acabamentos.eyebrow}</Eyebrow>
          <Title className="mt-5 text-sand-50">{t.acabamentos.titulo}</Title>
          <p className="mt-4 text-[15px] text-sand-200/65">{t.acabamentos.sub}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            {ordem.map((k) => (
              <button
                key={k}
                onClick={() => {
                  setAtivo(k);
                  track("viu_acabamento", { estilo: k });
                }}
                className={cx(
                  "shrink-0 rounded-full border px-5 py-2.5 text-[13px] transition",
                  ativo === k
                    ? "border-clay-400 bg-clay-400 text-clay-900"
                    : "border-sand-200/20 text-sand-200/70 hover:border-clay-400/60"
                )}
              >
                {t.acabamentos.estilos[k].nome}
              </button>
            ))}
          </div>

          <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-sand-200/60">
            {t.acabamentos.estilos[ativo].texto}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {fotos.slice(0, 8).map((f, i) => (
              <button
                key={f.src}
                onClick={() => setZoom(f)}
                className={cx(
                  "group relative overflow-hidden rounded-2xl",
                  i === 0 && "col-span-2 row-span-2 lg:col-span-2"
                )}
              >
                <Img
                  foto={f}
                  alt={`${t.acabamentos.estilos[ativo].nome} — ${i + 1}`}
                  className={cx(
                    "h-full w-full object-cover transition duration-700 group-hover:scale-105",
                    i === 0 ? "aspect-[4/3]" : "aspect-square"
                  )}
                />
              </button>
            ))}
          </div>

        </Reveal>
      </div>

      {zoom && <Lightbox foto={zoom} onClose={() => setZoom(null)} />}
    </Section>
  );
}

function Lightbox({ foto, onClose }: { foto: Foto; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-clay-900/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button onClick={onClose} aria-label="Fechar" className="absolute right-5 top-5 text-sand-100/70 hover:text-sand-50">
        <X size={26} />
      </button>
      <img src={foto.src} width={foto.w} height={foto.h} alt="" className="max-h-[92vh] w-auto max-w-full rounded-xl object-contain" />
    </div>
  );
}
