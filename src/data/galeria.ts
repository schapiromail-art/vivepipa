/**
 * Imagens do empreendimento, otimizadas e servidas pelo próprio domínio
 * (WebP ≤1600px). Cada foto carrega w/h para reservar o espaço e evitar CLS —
 * o Core Web Vitals entra na nota de qualidade do Google Ads.
 *
 * Gerado a partir do material oficial da incorporadora.
 */
export type Foto = { src: string; w: number; h: number };

export const fotosNavy: Foto[] = [
  { src: "/img/navy-8.webp", w: 480, h: 640 },
  { src: "/img/navy-3.webp", w: 480, h: 640 },
  { src: "/img/navy-1.webp", w: 480, h: 640 },
  { src: "/img/navy-2.webp", w: 480, h: 640 },
  { src: "/img/navy-4.webp", w: 640, h: 427 },
  { src: "/img/navy-5.webp", w: 640, h: 427 },
  { src: "/img/navy-7.webp", w: 640, h: 426 },
  { src: "/img/navy-6.webp", w: 640, h: 360 },
];

export const fotosRustico: Foto[] = [
  { src: "/img/rustico-12.webp", w: 480, h: 640 },
  { src: "/img/rustico-4.webp", w: 480, h: 640 },
  { src: "/img/rustico-3.webp", w: 480, h: 640 },
  { src: "/img/rustico-1.webp", w: 480, h: 640 },
  { src: "/img/rustico-2.webp", w: 480, h: 640 },
  { src: "/img/rustico-11.webp", w: 640, h: 427 },
  { src: "/img/rustico-6.webp", w: 640, h: 427 },
  { src: "/img/rustico-7.webp", w: 640, h: 427 },
  { src: "/img/rustico-8.webp", w: 640, h: 426 },
  { src: "/img/rustico-5.webp", w: 640, h: 426 },
  { src: "/img/rustico-9.webp", w: 640, h: 360 },
  { src: "/img/rustico-10.webp", w: 640, h: 360 },
];

export const fotosClassico: Foto[] = [
  { src: "/img/classico-9.webp", w: 640, h: 640 },
  { src: "/img/classico-6.webp", w: 480, h: 640 },
  { src: "/img/classico-5.webp", w: 640, h: 427 },
  { src: "/img/classico-8.webp", w: 640, h: 427 },
  { src: "/img/classico-3.webp", w: 640, h: 427 },
  { src: "/img/classico-4.webp", w: 640, h: 427 },
  { src: "/img/classico-7.webp", w: 640, h: 427 },
  { src: "/img/classico-1.webp", w: 397, h: 640 },
  { src: "/img/classico-2.webp", w: 360, h: 640 },
];

export const fotosStandard: Foto[] = [
  { src: "/img/standard1.webp", w: 320, h: 320 },
  { src: "/img/standard3.webp", w: 320, h: 213 },
  { src: "/img/standard10.webp", w: 320, h: 213 },
  { src: "/img/standard9.webp", w: 320, h: 213 },
  { src: "/img/standard2.webp", w: 320, h: 213 },
  { src: "/img/standard4.webp", w: 320, h: 213 },
  { src: "/img/standard8.webp", w: 320, h: 213 },
  { src: "/img/standard7.webp", w: 194, h: 320 },
  { src: "/img/standard5.webp", w: 180, h: 320 },
  { src: "/img/standard6.webp", w: 180, h: 320 },
];

export type EstiloKey = "navy" | "rustico" | "classico" | "standard";

export const estilos: Record<EstiloKey, Foto[]> = {
  navy: fotosNavy,
  rustico: fotosRustico,
  classico: fotosClassico,
  standard: fotosStandard,
};

/** Cenas escolhidas por função narrativa, não por ordem de arquivo. */
export const cena = {
  heroPiscina: { src: "/img/u005.webp", w: 1600, h: 900 },
  piscinaDia: { src: "/img/u004.webp", w: 1600, h: 900 },
  caminhoJardim: { src: "/img/u001.webp", w: 1600, h: 900 },
  jardimEntreBlocos: { src: "/img/u003.webp", w: 1600, h: 900 },
  ruaFachada: { src: "/img/u002.webp", w: 1600, h: 900 },
  portariaNoite: { src: "/img/u008.webp", w: 1600, h: 900 },
  chegada: { src: "/img/u009.webp", w: 1600, h: 900 },
  recepcao: { src: "/img/u010.webp", w: 1448, h: 1086 },
  aereaPorDoSol: { src: "/img/u011.webp", w: 1536, h: 1024 },
  aereaComMar: { src: "/img/u012.webp", w: 1535, h: 1024 },
  loungeFamilia: { src: "/img/u014.webp", w: 1600, h: 900 },
  coworking: { src: "/img/u013.webp", w: 1600, h: 900 },
  gourmet: { src: "/img/u016.webp", w: 1535, h: 1024 },
};

/**
 * Varandas: mostram o térreo com jardim e o superior com solário na mesma
 * imagem — são as melhores fotos para os cards de tipologia (enquadre em
 * `object-position: bottom` para o térreo, `top` para o superior).
 */
export const varandas = {
  navy: { src: "/img/varanda-navy.webp", w: 1400, h: 1867 },
  rustico: { src: "/img/varanda-rustico.webp", w: 1400, h: 1867 },
  classico: { src: "/img/varanda-classico.webp", w: 1400, h: 1400 },
};

export const plantaBloco = { src: "/img/plantabaixahumanizadablocoa.webp", w: 1254, h: 1254 };
export const logo = "/img/logo.png";
/** Versão monocromática escura, para o header quando fica claro. */
export const logoEscuro = "/img/logo-dark.png";
