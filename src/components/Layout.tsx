import { useEffect, useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { logo, logoEscuro } from "@/data/galeria";
import { useT, langs, dicts, type Lang } from "@/i18n";
import { abrirWhatsapp } from "@/lib/whatsapp";
import { cx } from "@/lib/format";
import { useLead } from "./Lead";

export function Header() {
  const { t, lang, setLang } = useT();
  const { abrir } = useLead();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#projeto", label: t.nav.projeto },
    { href: "#condicoes", label: t.nav.condicoes },
    { href: "#plantas", label: t.nav.plantas },
    { href: "#localizacao", label: t.nav.localizacao },
    { href: "#unidades", label: t.nav.unidades },
  ];

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-sand-50/95 backdrop-blur-md shadow-sm text-ink" : "text-sand-50"
      )}
    >
      <div className="container flex h-[68px] items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3">
          <img src={solid ? logoEscuro : logo} alt={site.nome} width={300} height={238} className="h-9 w-auto" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] tracking-wide opacity-80 hover:opacity-100">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 sm:flex">
            {langs.map((l: Lang) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cx(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium tracking-widest transition",
                  lang === l ? "bg-clay-400/25 opacity-100" : "opacity-50 hover:opacity-90"
                )}
              >
                {dicts[l].label}
              </button>
            ))}
          </div>

          <button onClick={() => abrir("header")} className="btn-primary hidden px-5 py-2.5 text-[13px] md:inline-flex">
            {t.nav.cta}
          </button>

          <button onClick={() => setOpen((v) => !v)} className="p-1 lg:hidden" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-clay-600/10 bg-sand-50 px-5 pb-6 pt-4 text-ink lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2.5 text-sm">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex gap-1">
            {langs.map((l: Lang) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cx(
                  "rounded-full border border-clay-600/15 px-3 py-1 text-[11px] tracking-widest",
                  lang === l && "bg-clay-600 text-sand-50"
                )}
              >
                {dicts[l].label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/** Barra fixa no rodapé do mobile: o CTA que acompanha a rolagem inteira. */
export function StickyCTA() {
  const { t } = useT();
  const { abrir } = useLead();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cx(
        "fixed inset-x-0 bottom-0 z-50 transition-transform duration-500 md:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center gap-2 border-t border-clay-600/15 bg-sand-50/97 px-3 py-3 backdrop-blur-md">
        <button onClick={() => abrir("sticky")} className="btn-primary flex-1 px-4 py-3 text-[13px]">
          {t.sticky.cta}
        </button>
        <button
          onClick={() => abrirWhatsapp("sticky")}
          aria-label="WhatsApp"
          className="btn-whats h-12 w-12 shrink-0 p-0"
        >
          <MessageCircle size={20} />
        </button>
      </div>
    </div>
  );
}

export function WhatsappFab() {
  return (
    <button
      onClick={() => abrirWhatsapp("botao-flutuante")}
      aria-label="WhatsApp"
      className="fixed bottom-6 right-5 z-50 hidden h-14 w-14 items-center justify-center rounded-full
                 bg-[#25D366] text-[#08331b] shadow-xl shadow-black/20 transition hover:scale-105 md:flex"
    >
      <MessageCircle size={24} />
    </button>
  );
}

export function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-clay-900 py-16 text-sand-200/70">
      <div className="container grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <img src={logo} alt={site.nome} className="h-11 w-auto brightness-0 invert" />
          <p className="mt-5 max-w-md text-[13px] leading-relaxed">
            {site.endereco} · CEP {site.cep}
          </p>
          <p className="mt-2 text-[13px]">{site.incorporadora}</p>
        </div>

        <div>
          <p className="eyebrow mb-4 text-clay-400">{t.footer.nav}</p>
          <ul className="space-y-2 text-[13px]">
            <li><a href="#projeto" className="hover:text-sand-50">{t.nav.projeto}</a></li>
            <li><a href="#condicoes" className="hover:text-sand-50">{t.nav.condicoes}</a></li>
            <li><a href="#plantas" className="hover:text-sand-50">{t.nav.plantas}</a></li>
            <li><a href="#unidades" className="hover:text-sand-50">{t.nav.unidades}</a></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-clay-400">{t.footer.contato}</p>
          <button onClick={() => abrirWhatsapp("footer")} className="text-[13px] hover:text-sand-50">
            {site.whatsapp.exibicao}
          </button>
          <p className="mt-2 text-[13px]">{site.leads.emailComercial}</p>
        </div>
      </div>

      <div className="container mt-14 border-t border-sand-200/10 pt-8">
        <p className="text-[10.5px] leading-relaxed text-sand-200/40">{t.footer.legal}</p>
        <p className="mt-5 text-[11px] text-sand-200/40">
          © {new Date().getFullYear()} {site.nome}. {t.footer.direitos}
        </p>
      </div>
    </footer>
  );
}
