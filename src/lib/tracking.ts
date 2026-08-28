import { site } from "@/config/site";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Injeta Meta Pixel, GA4 e Google Ads só se os IDs estiverem preenchidos. */
export function initTracking() {
  const { metaPixelId, ga4Id, googleAdsId } = site.tracking;

  if (metaPixelId) {
    /* eslint-disable */
    // prettier-ignore
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return; const n: any = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement; t.async = true; t.src = v;
      b.getElementsByTagName(e)[0].parentNode!.insertBefore(t, b.getElementsByTagName(e)[0]);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq?.("init", metaPixelId);
    window.fbq?.("track", "PageView");
  }

  const gtagId = ga4Id || googleAdsId;
  if (gtagId) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    if (ga4Id) window.gtag("config", ga4Id);
    if (googleAdsId) window.gtag("config", googleAdsId);
  }
}

/**
 * Um único ponto de saída para eventos. Dispara no Meta e no Google ao mesmo
 * tempo, para que as duas plataformas otimizem pelo mesmo sinal.
 */
export function track(event: string, params: Params = {}) {
  const standard: Record<string, string> = {
    lead: "Lead",
    contato_whatsapp: "Contact",
    ver_condicoes: "ViewContent",
    simulou: "CustomizeProduct",
    interesse_unidade: "AddToCart",
  };

  const fbEvent = standard[event];
  if (fbEvent) window.fbq?.("track", fbEvent, params);
  else window.fbq?.("trackCustom", event, params);

  window.gtag?.("event", event, params);

  if (event === "lead" && site.tracking.googleAdsId && site.tracking.googleAdsLeadLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${site.tracking.googleAdsId}/${site.tracking.googleAdsLeadLabel}`,
    });
  }

  if (import.meta.env.DEV) console.info("[track]", event, params);
}

/** Guarda a origem da visita para colar no lead e na mensagem de WhatsApp. */
export function capturarOrigem() {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams(window.location.search);
  const utms = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
  const found = Object.fromEntries(utms.map((k) => [k, p.get(k)]).filter(([, v]) => v));
  if (Object.keys(found).length) sessionStorage.setItem("origem", JSON.stringify(found));
}

export function origem(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem("origem") ?? "{}");
  } catch {
    return {};
  }
}

/** Rótulo curto da campanha, para o consultor saber de onde veio o lead. */
export function origemCurta(): string {
  const o = origem();
  const parts = [o.utm_source, o.utm_campaign, o.utm_content].filter(Boolean);
  if (!parts.length) return o.gclid ? "google-ads" : o.fbclid ? "meta-ads" : "direto";
  return parts.join(" / ");
}
