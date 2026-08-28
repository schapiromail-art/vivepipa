/**
 * Estoque real do empreendimento (fonte: painel da incorporadora, 08/2026).
 * `valor` é a tabela cheia — a landing NUNCA o mostra sozinho: ele entra
 * sempre pelo simulador, convertido em entrada + parcela.
 */
export type Unidade = {
  bloco: string;
  numero: string;
  tipo: "terreo" | "superior";
  dormitorios: number;
  vagas: number;
  metragem: number;
  areaUtil: number;
  areaJardim: number | null;
  areaSolarium: number | null;
  valor: number;
  status: "disponivel" | "reservado" | "vendido";
};

export const unidades: Unidade[] = [
  { bloco: "Bloco A", numero: "101", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: 18.8, areaSolarium: null, valor: 590160, status: "disponivel" },
  { bloco: "Bloco A", numero: "102", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: 23.4, areaSolarium: null, valor: 579880, status: "disponivel" },
  { bloco: "Bloco A", numero: "103", tipo: "terreo", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: 19.0, areaSolarium: null, valor: 799200, status: "disponivel" },
  { bloco: "Bloco A", numero: "201", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: null, areaSolarium: 22.6, valor: 611500, status: "disponivel" },
  { bloco: "Bloco A", numero: "202", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: null, areaSolarium: 35.95, valor: 595725, status: "disponivel" },
  { bloco: "Bloco A", numero: "203", tipo: "superior", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: null, areaSolarium: 31.65, valor: 823875, status: "disponivel" },
  { bloco: "Bloco B", numero: "101", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: 20.05, areaSolarium: null, valor: 591660, status: "disponivel" },
  { bloco: "Bloco B", numero: "102", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: 25.98, areaSolarium: null, valor: 579880, status: "disponivel" },
  { bloco: "Bloco B", numero: "103", tipo: "terreo", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: 22.0, areaSolarium: null, valor: 802800, status: "disponivel" },
  { bloco: "Bloco B", numero: "201", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: null, areaSolarium: 22.6, valor: 611500, status: "disponivel" },
  { bloco: "Bloco B", numero: "202", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: null, areaSolarium: 35.95, valor: 595725, status: "disponivel" },
  { bloco: "Bloco B", numero: "203", tipo: "superior", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: null, areaSolarium: 31.65, valor: 823875, status: "disponivel" },
  { bloco: "Bloco C", numero: "201", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 47.5, areaUtil: 42.5, areaJardim: null, areaSolarium: 25.15, valor: 617725, status: "disponivel" },
  { bloco: "Bloco C", numero: "202", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 45.6, areaUtil: 41.75, areaJardim: null, areaSolarium: 27.0, valor: 594925, status: "disponivel" },
  { bloco: "Bloco C", numero: "203", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 47.5, areaUtil: 42.5, areaJardim: null, areaSolarium: 25.15, valor: 617725, status: "disponivel" },
  { bloco: "Bloco D", numero: "101", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: 22.5, areaSolarium: null, valor: 594600, status: "disponivel" },
  { bloco: "Bloco D", numero: "102", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: 30.0, areaSolarium: null, valor: 579880, status: "disponivel" },
  { bloco: "Bloco D", numero: "103", tipo: "terreo", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: 30.4, areaSolarium: null, valor: 812880, status: "disponivel" },
  { bloco: "Bloco D", numero: "201", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: null, areaSolarium: 22.5, valor: 611500, status: "disponivel" },
  { bloco: "Bloco D", numero: "202", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: null, areaSolarium: 35.95, valor: 595725, status: "disponivel" },
  { bloco: "Bloco D", numero: "203", tipo: "superior", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: null, areaSolarium: 31.65, valor: 823875, status: "disponivel" },
  { bloco: "Bloco E", numero: "101", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 65.1, areaUtil: 57.9, areaJardim: 29.7, areaSolarium: null, valor: 816840, status: "disponivel" },
  { bloco: "Bloco E", numero: "102", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.2, areaJardim: 30.6, areaSolarium: null, valor: 579880, status: "disponivel" },
  { bloco: "Bloco E", numero: "103", tipo: "terreo", dormitorios: 2, vagas: 1, metragem: 65.14, areaUtil: 58.0, areaJardim: 30.4, areaSolarium: null, valor: 818280, status: "disponivel" },
  { bloco: "Bloco E", numero: "201", tipo: "superior", dormitorios: 2, vagas: 1, metragem: 65.1, areaUtil: 57.9, areaJardim: null, areaSolarium: 36.7, valor: 836250, status: "disponivel" },
  { bloco: "Bloco E", numero: "202", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.2, areaJardim: null, areaSolarium: 38.4, valor: 599400, status: "disponivel" },
  { bloco: "Bloco E", numero: "203", tipo: "superior", dormitorios: 2, vagas: 1, metragem: 65.15, areaUtil: 58.0, areaJardim: null, areaSolarium: 30.7, valor: 827850, status: "disponivel" },
  { bloco: "Bloco F", numero: "101", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: 22.55, areaSolarium: null, valor: 594660, status: "disponivel" },
  { bloco: "Bloco F", numero: "102", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: 30.0, areaSolarium: null, valor: 579880, status: "disponivel" },
  { bloco: "Bloco F", numero: "103", tipo: "terreo", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: 30.4, areaSolarium: null, valor: 812880, status: "disponivel" },
  { bloco: "Bloco F", numero: "201", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: null, areaSolarium: 22.6, valor: 611500, status: "disponivel" },
  { bloco: "Bloco F", numero: "202", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: null, areaSolarium: 35.95, valor: 595725, status: "disponivel" },
  { bloco: "Bloco F", numero: "203", tipo: "superior", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: null, areaSolarium: 31.65, valor: 823875, status: "disponivel" },
  { bloco: "Bloco H", numero: "101", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: 22.55, areaSolarium: null, valor: 594660, status: "disponivel" },
  { bloco: "Bloco H", numero: "102", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: 30.0, areaSolarium: null, valor: 579880, status: "disponivel" },
  { bloco: "Bloco H", numero: "103", tipo: "terreo", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: 30.4, areaSolarium: null, valor: 812880, status: "disponivel" },
  { bloco: "Bloco H", numero: "201", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: null, areaSolarium: 22.6, valor: 611500, status: "disponivel" },
  { bloco: "Bloco H", numero: "202", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: null, areaSolarium: 35.95, valor: 595725, status: "disponivel" },
  { bloco: "Bloco H", numero: "203", tipo: "superior", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: null, areaSolarium: 31.65, valor: 823875, status: "disponivel" },
  { bloco: "Bloco I", numero: "101", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: 22.55, areaSolarium: null, valor: 594660, status: "disponivel" },
  { bloco: "Bloco I", numero: "102", tipo: "terreo", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: 30.0, areaSolarium: null, valor: 579880, status: "disponivel" },
  { bloco: "Bloco I", numero: "103", tipo: "terreo", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: 30.4, areaSolarium: null, valor: 812880, status: "disponivel" },
  { bloco: "Bloco I", numero: "201", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 47.3, areaUtil: 42.2, areaJardim: null, areaSolarium: 22.6, valor: 611500, status: "disponivel" },
  { bloco: "Bloco I", numero: "202", tipo: "superior", dormitorios: 1, vagas: 1, metragem: 45.15, areaUtil: 41.3, areaJardim: null, areaSolarium: 35.95, valor: 595725, status: "disponivel" },
  { bloco: "Bloco I", numero: "203", tipo: "superior", dormitorios: 2, vagas: 1, metragem: 64.7, areaUtil: 57.8, areaJardim: null, areaSolarium: 31.65, valor: 823875, status: "disponivel" },
];

export const disponiveis = unidades.filter((u) => u.status === "disponivel");

export const valorMinimo = Math.min(...disponiveis.map((u) => u.valor));
export const valorMaximo = Math.max(...disponiveis.map((u) => u.valor));
export const areaMinima = Math.min(...disponiveis.map((u) => u.metragem));
export const areaMaxima = Math.max(...disponiveis.map((u) => u.metragem));
export const blocos = [...new Set(unidades.map((u) => u.bloco))].sort();
