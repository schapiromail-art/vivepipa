import { site } from "@/config/site";

export type Plano = {
  valorTotal: number;
  entrada: number;
  parcela: number;
  nParcelas: number;
  reforco: number;
  nReforcos: number;
  saldoChaves: number;
};

/**
 * Converte o valor de tabela na estrutura do parcelamento direto:
 * entrada + parcelas mensais durante a obra + reforços anuais + saldo nas chaves.
 *
 * Sem juros e sem correção monetária: é o desenho do plano, não uma proposta.
 * A parcela mensal é o número que a landing comunica — o valor cheio só aparece
 * depois do lead, e sempre acompanhado do aviso comercial.
 */
export function simular(valorTotal: number): Plano {
  const { entradaPercentual, parcelasObra, reforcosAnuais, reforcoPercentual, saldoChavesPercentual } =
    site.pagamento;

  const anos = Math.max(1, Math.round(parcelasObra / 12));
  const nReforcos = reforcosAnuais * anos;

  const entrada = (valorTotal * entradaPercentual) / 100;
  const reforco = (valorTotal * reforcoPercentual) / 100;
  const saldoChaves = (valorTotal * saldoChavesPercentual) / 100;
  const saldoMensal = Math.max(0, valorTotal - entrada - reforco * nReforcos - saldoChaves);

  return {
    valorTotal,
    entrada,
    parcela: saldoMensal / parcelasObra,
    nParcelas: parcelasObra,
    reforco,
    nReforcos,
    saldoChaves,
  };
}
