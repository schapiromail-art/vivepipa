import { useMemo, useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { site } from "@/config/site";
import { disponiveis, type Unidade } from "@/data/unidades";
import { useT } from "@/i18n";
import { brl, m2 } from "@/lib/format";
import { simular } from "@/lib/pagamento";
import { track } from "@/lib/tracking";
import { Eyebrow, Reveal, Section, Title } from "./ui";
import { useLead } from "./Lead";

type Grupo = {
  id: string;
  dormitorios: number;
  tipo: Unidade["tipo"];
  unidades: Unidade[];
};

/** Agrupa o estoque real em tipologias comercializáveis. */
function agrupar(): Grupo[] {
  const mapa = new Map<string, Grupo>();
  for (const u of disponiveis) {
    const id = `${u.dormitorios}-${u.tipo}`;
    if (!mapa.has(id)) mapa.set(id, { id, dormitorios: u.dormitorios, tipo: u.tipo, unidades: [] });
    mapa.get(id)!.unidades.push(u);
  }
  return [...mapa.values()].sort(
    (a, b) => a.dormitorios - b.dormitorios || (a.tipo === "terreo" ? -1 : 1)
  );
}

/**
 * O bloco central da landing. Existe para trocar a pergunta "quanto custa?"
 * (número grande, assusta) pela pergunta "quanto fica por mês?" (número que
 * cabe na cabeça de quem está scrollando um anúncio).
 */
export function Simulador() {
  const { t, lang } = useT();
  const { abrir } = useLead();
  const grupos = useMemo(agrupar, []);
  const [ativo, setAtivo] = useState(grupos[0]?.id ?? "");

  const grupo = grupos.find((g) => g.id === ativo) ?? grupos[0];
  const menorValor = Math.min(...grupo.unidades.map((u) => u.valor));
  const plano = simular(menorValor);

  const areas = grupo.unidades.map((u) => u.metragem);
  const rotulo = (g: Grupo) =>
    `${g.dormitorios} ${g.dormitorios === 1 ? t.ui.quarto : t.ui.quartos} · ${
      g.tipo === "terreo" ? t.ui.jardim.toLowerCase() : t.ui.solario.toLowerCase()
    }`;
  const nome = `${grupo.dormitorios} ${grupo.dormitorios === 1 ? t.ui.quarto : t.ui.quartos} · ${
    grupo.tipo === "terreo" ? t.tipologias.terreo.nome : t.tipologias.superior.nome
  }`;

  return (
    <Section id="condicoes" tone="sand">
      <div className="container">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.simulador.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.simulador.titulo}</Title>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/60">{t.simulador.sub}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          {/* Seletor de tipologia */}
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {grupos.map((g) => {
              const on = g.id === ativo;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    setAtivo(g.id);
                    track("simulou", { tipologia: g.id });
                  }}
                  className={
                    "shrink-0 rounded-full border px-5 py-2.5 text-[13px] transition " +
                    (on
                      ? "border-clay-600 bg-clay-600 text-sand-50"
                      : "border-clay-600/20 bg-white/50 text-ink/70 hover:border-clay-400")
                  }
                >
                  {rotulo(g)}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-px overflow-hidden rounded-3xl bg-clay-600/10 lg:grid-cols-[1.15fr_1fr]">
            {/* Resultado */}
            <div className="bg-clay-900 p-8 text-sand-100 sm:p-10">
              <p className="eyebrow text-clay-400">{nome}</p>
              <p className="mt-2 text-[13px] text-sand-200/60">
                {m2(Math.min(...areas), lang)} – {m2(Math.max(...areas), lang)} · {grupo.unidades.length}{" "}
                {t.simulador.unidadesDisponiveis}
              </p>

              <div className="mt-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-sand-300/70">
                  {t.simulador.parcela}
                </p>
                <p className="display mt-1 text-6xl text-sand-50 sm:text-7xl">
                  {brl(plano.parcela, lang)}
                </p>
                <p className="mt-1 text-[13px] text-sand-200/60">
                  {plano.nParcelas} {t.simulador.parcelas}
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-sand-200/15 pt-6 text-[13px]">
                <div>
                  <dt className="text-sand-300/70">{t.simulador.entrada}</dt>
                  <dd className="mt-1 text-lg text-sand-50">{brl(plano.entrada, lang)}</dd>
                </div>
                <div>
                  <dt className="text-sand-300/70">
                    {plano.nReforcos} {t.simulador.reforcos}
                  </dt>
                  <dd className="mt-1 text-lg text-sand-50">{brl(plano.reforco, lang)}</dd>
                </div>
              </dl>
            </div>

            {/* Composição + CTA */}
            <div className="flex flex-col justify-between bg-sand-50 p-8 sm:p-10">
              <div>
                <Composicao />
                <p className="mt-7 flex gap-2 text-[11.5px] leading-relaxed text-ink/45">
                  <Info size={14} className="mt-0.5 shrink-0" />
                  {t.simulador.aviso}
                </p>
              </div>

              <button
                onClick={() => abrir(`simulador · ${nome}`)}
                className="btn-primary mt-8 w-full justify-between px-6"
              >
                {t.simulador.verTabela}
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Barra visual de como o valor se distribui — deixa o plano legível de relance. */
function Composicao() {
  const { t } = useT();
  const p = site.pagamento;
  const anos = Math.max(1, Math.round(p.parcelasObra / 12));
  const partes = [
    { label: t.composicao.entrada, pct: p.entradaPercentual, cor: "bg-clay-600" },
    {
      label: `${p.parcelasObra}x ${t.composicao.mensais}`,
      pct: 100 - p.entradaPercentual - p.reforcoPercentual * p.reforcosAnuais * anos - p.saldoChavesPercentual,
      cor: "bg-clay-400",
    },
    { label: t.composicao.reforcos, pct: p.reforcoPercentual * p.reforcosAnuais * anos, cor: "bg-sand-300" },
    { label: t.composicao.chaves, pct: p.saldoChavesPercentual, cor: "bg-ocean-400" },
  ].filter((x) => x.pct > 0);

  return (
    <div>
      <div className="flex h-2.5 overflow-hidden rounded-full">
        {partes.map((x) => (
          <div key={x.label} className={x.cor} style={{ width: `${x.pct}%` }} />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {partes.map((x) => (
          <li key={x.label} className="flex items-center gap-2.5 text-[13px] text-ink/70">
            <span className={`h-2 w-2 shrink-0 rounded-full ${x.cor}`} />
            <span className="flex-1">{x.label}</span>
            <span className="tabular-nums text-ink/45">{Math.round(x.pct)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
