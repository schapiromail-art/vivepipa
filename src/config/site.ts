/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PAINEL DE CONTROLE  ·  edite SÓ este arquivo para operar as campanhas
 * ─────────────────────────────────────────────────────────────────────────────
 * Tudo o que muda no dia a dia (WhatsApp, condições de pagamento, pixels,
 * urgência) está aqui. Nenhum componente precisa ser tocado.
 */

export const site = {
  nome: "Pipa Ubaia Falésias",
  incorporadora: "AR Construções LTDA · SCP 02",
  endereco: "Av. Baía dos Golfinhos, 2612 · Praia da Pipa · Tibau do Sul/RN",
  cep: "59.178-000",
  coords: { lat: -6.240519, lng: -35.039241 },
  entregaPrevista: "2028",
  inicioObra: "2026",
  areaConstruida: 5201.49,

  /** WhatsApp comercial. Formato internacional, só dígitos. */
  whatsapp: {
    numero: "5584981559502",
    exibicao: "+55 84 98155-9502",
  },

  /** Para onde o formulário posta. Vazio => modo demo (log no console). */
  leads: {
    /** ex.: webhook do Make/Zapier, RD Station, HubSpot, n8n… */
    endpoint: import.meta.env.VITE_LEADS_ENDPOINT ?? "",
    emailComercial: "arconstrucoescp02@gmail.com",
  },

  /**
   * ⚠️ CONDIÇÕES DE PAGAMENTO — CONFIRMAR COM O COMERCIAL ANTES DE SUBIR ADS.
   * Os valores abaixo são a estrutura do simulador, não uma tabela aprovada.
   * O simulador NUNCA promete: o texto legal em `disclaimerPagamento` acompanha
   * todo resultado.
   */
  pagamento: {
    entradaPercentual: 20, // % de sinal na assinatura
    parcelasObra: 36, // parcelas mensais até a entrega
    reforcosAnuais: 1, // reforços/balões por ano
    reforcoPercentual: 5, // % do valor total em cada reforço anual
    saldoChavesPercentual: 30, // % pago na entrega das chaves (recurso próprio ou financiamento)
    /** true = também mostrar o valor total da unidade na tabela pública */
    exibirValorTotalPublico: false,
  },

  /** Urgência real — atualizar quando o comercial atualizar o estoque. */
  estoque: {
    totalUnidades: 71,
    disponiveis: 45,
    reservadas: 26,
  },

  /** Tags de mídia. Deixe vazio para desativar. */
  tracking: {
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID ?? "",
    ga4Id: import.meta.env.VITE_GA4_ID ?? "",
    googleAdsId: import.meta.env.VITE_GOOGLE_ADS_ID ?? "",
    /** rótulo da conversão de lead no Google Ads (AW-XXX/label) */
    googleAdsLeadLabel: import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL ?? "",
  },

  /** Selos de segurança jurídica — verificados no material oficial da obra. */
  legal: {
    registroIncorporacao: "R-4-2204 · Matrícula 2204 · Ofício Único de Tibau do Sul",
    alvara: "Alvará de Construção nº 056/2023 · Prefeitura de Tibau do Sul/RN",
    licencaAmbiental: "Licença Simplificada IDEMA nº 2021-174146/TEC/LS-0578",
    bombeiros: "Auto de Análise Técnica nº 24316 · CBM/RN",
  },
} as const;
