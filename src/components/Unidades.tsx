import { useMemo, useState } from "react";
import { site } from "@/config/site";
import { unidades, blocos, type Unidade } from "@/data/unidades";
import { useT } from "@/i18n";
import { brl, cx, m2 } from "@/lib/format";
import { simular } from "@/lib/pagamento";
import { track } from "@/lib/tracking";
import { Eyebrow, Reveal, Section, Title } from "./ui";
import { useLead } from "./Lead";

/**
 * Tabela de disponibilidade. Mostra estoque real (inclusive o que já foi
 * reservado — a escassez é o argumento) e a PARCELA estimada em vez do valor
 * de tabela, que só sai depois do lead.
 */
export function Unidades() {
  const { t, lang } = useT();
  const { abrir } = useLead();
  const [bloco, setBloco] = useState<string>("todos");
  const [quartos, setQuartos] = useState<number | "todos">("todos");

  const lista = useMemo(
    () =>
      unidades.filter(
        (u) => (bloco === "todos" || u.bloco === bloco) && (quartos === "todos" || u.dormitorios === quartos)
      ),
    [bloco, quartos]
  );

  const nDisponiveis = lista.filter((u) => u.status === "disponivel").length;

  return (
    <Section id="unidades" tone="light">
      <div className="container">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.unidades.eyebrow}</Eyebrow>
          <Title className="mt-5">{t.unidades.titulo}</Title>
          <p className="mt-4 text-[15px] text-ink/60">{t.unidades.sub}</p>
        </Reveal>

        <Reveal delay={80} className="mt-9">
          <div className="flex flex-wrap items-center gap-3">
            <select value={bloco} onChange={(e) => setBloco(e.target.value)} className="field w-auto min-w-[180px]">
              <option value="todos">{t.unidades.filtroTodos}</option>
              {blocos.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <div className="flex gap-1.5">
              {(["todos", 1, 2] as const).map((q) => (
                <button
                  key={String(q)}
                  onClick={() => setQuartos(q)}
                  className={cx(
                    "rounded-full border px-4 py-2 text-[12.5px] transition",
                    quartos === q
                      ? "border-clay-600 bg-clay-600 text-sand-50"
                      : "border-clay-600/20 text-ink/60 hover:border-clay-400"
                  )}
                >
                  {q === "todos" ? t.ui.todos : `${q} ${q === 1 ? t.ui.quarto : t.ui.quartos}`}
                </button>
              ))}
            </div>

            <span className="ml-auto text-[12.5px] text-ink/45">
              {nDisponiveis} {t.unidades.exibindo}
            </span>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-6 overflow-hidden rounded-2xl border border-clay-600/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-[13.5px]">
              <thead className="bg-sand-100 text-[11px] uppercase tracking-[0.13em] text-ink/45">
                <tr>
                  <th className="px-5 py-4 font-medium">{t.unidades.colUnidade}</th>
                  <th className="px-5 py-4 font-medium">{t.unidades.colTipo}</th>
                  <th className="px-5 py-4 font-medium">{t.unidades.colArea}</th>
                  <th className="px-5 py-4 font-medium">{t.unidades.colExterior}</th>
                  <th className="px-5 py-4 font-medium">{t.unidades.colQuartos}</th>
                  <th className="px-5 py-4 font-medium">{t.unidades.colParcela}</th>
                  <th className="px-5 py-4 font-medium">{t.unidades.colStatus}</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-clay-600/8">
                {lista.map((u) => (
                  <Linha key={`${u.bloco}-${u.numero}`} u={u} lang={lang} onCta={() => {
                    track("interesse_unidade", { unidade: `${u.bloco} ${u.numero}` });
                    abrir(`unidade ${u.bloco} ${u.numero}`);
                  }} />
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-4 text-[11.5px] text-ink/40">{t.unidades.nota}</p>
      </div>
    </Section>
  );
}

function Linha({ u, lang, onCta }: { u: Unidade; lang: "pt" | "es" | "en"; onCta: () => void }) {
  const { t } = useT();
  const livre = u.status === "disponivel";
  const plano = simular(u.valor);
  const externa = u.tipo === "terreo" ? u.areaJardim : u.areaSolarium;

  return (
    <tr className={cx("bg-sand-50 transition hover:bg-sand-100/60", !livre && "opacity-45")}>
      <td className="whitespace-nowrap px-5 py-4 font-medium">
        {u.bloco.replace("Bloco ", "")} · {u.numero}
      </td>
      <td className="px-5 py-4 text-ink/60">{u.tipo === "terreo" ? t.unidades.terreo : t.unidades.superior}</td>
      <td className="whitespace-nowrap px-5 py-4 text-ink/60">{m2(u.metragem, lang)}</td>
      <td className="whitespace-nowrap px-5 py-4 text-ink/60">{externa ? m2(externa, lang) : "—"}</td>
      <td className="px-5 py-4 text-ink/60">{u.dormitorios}</td>
      <td className="whitespace-nowrap px-5 py-4">
        {brl(plano.parcela, lang)}
        <span className="text-ink/40">{t.hero.ancoraSufixo}</span>
        {site.pagamento.exibirValorTotalPublico && (
          <span className="ml-2 text-[11.5px] text-ink/35">({brl(u.valor, lang, true)})</span>
        )}
      </td>
      <td className="px-5 py-4">
        <span
          className={cx(
            "rounded-full px-2.5 py-1 text-[11px]",
            livre ? "bg-ocean-400/12 text-ocean-600" : "bg-clay-600/10 text-clay-600"
          )}
        >
          {livre ? t.unidades.disponivel : t.unidades.reservado}
        </span>
      </td>
      <td className="px-5 py-4 text-right">
        {livre && (
          <button onClick={onCta} className="whitespace-nowrap text-[12.5px] font-medium text-clay-600 hover:underline">
            {t.unidades.cta} →
          </button>
        )}
      </td>
    </tr>
  );
}
