/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEADS_ENDPOINT?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_GOOGLE_ADS_LEAD_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
