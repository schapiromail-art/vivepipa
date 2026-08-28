import { createContext, useContext, useState, type ReactNode, type FormEvent } from "react";
import { X, MessageCircle, Check } from "lucide-react";
import { site } from "@/config/site";
import { useT } from "@/i18n";
import { track, origem, origemCurta } from "@/lib/tracking";
import { abrirWhatsapp } from "@/lib/whatsapp";
import { cx } from "@/lib/format";

type Ctx = { abrir: (contexto?: string) => void };
const LeadCtx = createContext<Ctx>({ abrir: () => {} });
export const useLead = () => useContext(LeadCtx);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [contexto, setContexto] = useState<string | null>(null);

  const abrir = (c?: string) => {
    track("ver_condicoes", { contexto: c ?? "geral" });
    setContexto(c ?? "geral");
  };

  return (
    <LeadCtx.Provider value={{ abrir }}>
      {children}
      {contexto !== null && <LeadModal contexto={contexto} onClose={() => setContexto(null)} />}
    </LeadCtx.Provider>
  );
}

function LeadModal({ contexto, onClose }: { contexto: string; onClose: () => void }) {
  const { t } = useT();
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-clay-900/70 backdrop-blur-sm p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-sand-50 p-7 sm:p-9 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-5 top-5 rounded-full p-1.5 text-ink/40 hover:bg-clay-600/10 hover:text-ink"
        >
          <X size={18} />
        </button>
        <p className="eyebrow text-clay-400">{t.form.eyebrow}</p>
        <h3 className="display mt-3 text-3xl">{t.form.titulo}</h3>
        <p className="mt-2 text-sm text-ink/60">{t.form.sub}</p>
        <LeadForm contexto={contexto} className="mt-7" />
      </div>
    </div>
  );
}

export function LeadForm({ contexto, className }: { contexto: string; className?: string }) {
  const { t } = useT();
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "erro">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");

    const fd = new FormData(e.currentTarget);
    const payload = {
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      interesse: String(fd.get("interesse") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
      contexto,
      empreendimento: site.nome,
      pagina: window.location.href,
      ...origem(),
    };

    try {
      if (site.leads.endpoint) {
        const r = await fetch(site.leads.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error(String(r.status));
      } else {
        // Modo demo: sem endpoint configurado, o lead vive só no console.
        console.info("[lead · sem VITE_LEADS_ENDPOINT]", payload);
      }
      track("lead", { contexto, interesse: payload.interesse, origem: origemCurta() });
      setEstado("ok");
    } catch {
      setEstado("erro");
    }
  }

  if (estado === "ok") {
    return (
      <div className={cx("text-center", className)}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay-600/10 text-clay-600">
          <Check size={26} />
        </div>
        <h4 className="display mt-5 text-2xl">{t.form.sucessoTitulo}</h4>
        <p className="mt-2 text-sm text-ink/60">{t.form.sucessoTexto}</p>
        <button onClick={() => abrirWhatsapp(contexto)} className="btn-whats mt-6 w-full">
          <MessageCircle size={17} /> {t.form.whatsapp}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cx("space-y-3", className)}>
      <input name="nome" required placeholder={t.form.nome} className="field" autoComplete="name" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="telefone"
          required
          type="tel"
          placeholder={t.form.telefone}
          className="field"
          autoComplete="tel"
        />
        <input name="email" required type="email" placeholder={t.form.email} className="field" autoComplete="email" />
      </div>
      <select name="interesse" required defaultValue="" className="field">
        <option value="" disabled>
          {t.form.interesse}
        </option>
        {t.form.interesseOpcoes.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <textarea name="mensagem" rows={2} placeholder={t.form.mensagem} className="field resize-none" />

      <button type="submit" disabled={estado === "enviando"} className="btn-primary w-full disabled:opacity-60">
        {estado === "enviando" ? t.form.enviando : t.form.enviar}
      </button>

      {estado === "erro" && <p className="text-center text-xs text-red-700">{t.form.erro}</p>}

      <p className="text-center text-[11px] text-ink/40">{t.form.privacidade}</p>

      <div className="flex items-center gap-3 pt-1">
        <span className="h-px flex-1 bg-clay-600/15" />
        <span className="text-[11px] uppercase tracking-widest text-ink/35">{t.form.ou}</span>
        <span className="h-px flex-1 bg-clay-600/15" />
      </div>

      <button type="button" onClick={() => abrirWhatsapp(contexto)} className="btn-whats w-full">
        <MessageCircle size={17} /> {t.form.whatsapp}
      </button>
    </form>
  );
}
