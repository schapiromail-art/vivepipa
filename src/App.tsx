import { useEffect, useState } from "react";
import { I18nContext, detectLang, dicts, type Lang } from "@/i18n";
import { capturarOrigem, initTracking } from "@/lib/tracking";
import { LeadProvider } from "@/components/Lead";
import { Footer, Header, StickyCTA, WhatsappFab } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Simulador } from "@/components/Simulador";
import { Acabamentos, Tipologias } from "@/components/Tipologias";
import { Unidades } from "@/components/Unidades";
import {
  ChamadaFinal,
  Condominio,
  Construtora,
  Faq,
  Formulario,
  Investimento,
  Localizacao,
  Oferta,
  Projeto,
  ProofBar,
} from "@/components/Sections";

export default function App() {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    setLang(detectLang());
    capturarOrigem();
    initTracking();
  }, []);

  const t = dicts[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang, t]);

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      <LeadProvider>
        <Header />
        <main>
          {/* Ordem = funil. Desejo, prova, oferta, prova de novo, escolha, captura. */}
          <Hero />
          <ProofBar />
          <Oferta />
          <Simulador />
          <Projeto />
          <Tipologias />
          <Acabamentos />
          <Condominio />
          <Localizacao />
          <Investimento />
          <Unidades />
          <Construtora />
          <Faq />
          <Formulario />
          <ChamadaFinal />
        </main>
        <Footer />
        <StickyCTA />
        <WhatsappFab />
      </LeadProvider>
    </I18nContext.Provider>
  );
}
