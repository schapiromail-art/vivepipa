# Estrutura de campanha — validação em 1 dia

Objetivo de hoje **não é lucrar**. É responder uma pergunta: *existe demanda a R$ 37 para
esta dor?* Com R$ 150 dá para responder isso com honestidade.

---

## A campanha

| Camada | Configuração |
|---|---|
| **Campanha** | Objetivo **Vendas**. Sem CBO — orçamento no conjunto (ABO) |
| **Conjunto** | 1 só. Orçamento diário **R$ 150** |
| **Otimização** | Compra (ver exceção do pixel frio abaixo) |
| **Público** | Brasil · Mulheres · 30 a 60 anos · **sem interesses** |
| **Posicionamentos** | Advantage+ (automáticos) |
| **Criativos** | 4 estáticos + 1 carrossel no mesmo conjunto |
| **Página de destino** | A landing, não o checkout direto |

### Por que um conjunto só

Com R$ 150 dividido em três conjuntos, nenhum recebe volume suficiente para significar
nada — você termina o dia com três resultados igualmente inconclusivos. Um conjunto com
cinco criativos deixa o algoritmo distribuir, e o que você aprende é **qual ângulo
funciona**, que é a informação que importa na validação.

### Por que sem interesses

Segmentação por interesse em público feminino amplo no Brasil hoje encarece o CPM sem
melhorar a qualidade. O criativo é que faz a segmentação: uma imagem que diz "depois dos
35" não é clicada por quem tem 24 anos. Deixe amplo e deixe o criativo filtrar.

### Exceção importante: pixel frio

Se o pixel é novo e nunca registrou compra, otimizar por Compra com R$ 150/dia pode
travar o conjunto em aprendizado — ele não encontra sinal suficiente e entrega mal.

**Se o seu pixel tem zero compras históricas**, faça assim no dia 1:
otimize por **Iniciar finalização de compra (InitiateCheckout)**. Tem volume muito maior,
sai do aprendizado, e para validar demanda serve igual — se ninguém sequer inicia o
checkout, a oferta não passou.

A partir de ~15 compras acumuladas, troque a otimização para Compra e recrie o conjunto.

---

## Números de referência — Brasil, público feminino amplo

Use como régua para saber se está caro ou barato, não como meta:

| Métrica | Saudável | Preocupante |
|---|---|---|
| CPM | R$ 18 – 35 | acima de R$ 45 |
| CTR (todos) | acima de 1,5% | abaixo de 0,8% |
| CTR (link, outbound) | acima de 1,0% | abaixo de 0,5% |
| Custo por clique no link | até R$ 1,20 | acima de R$ 2,00 |
| Página → InitiateCheckout | acima de 8% | abaixo de 4% |
| InitiateCheckout → Compra | acima de 25% | abaixo de 12% |
| **CPA (custo por compra)** | **até R$ 25** | acima de R$ 37 |

A R$ 37 de ticket, CPA de R$ 25 é ROAS 1,48 — margem apertada mas **validado**. Daí para
frente se melhora com order bump e upsell, não com anúncio mais barato.

Com CPC de R$ 1,00, R$ 150 compram ~150 cliques. Com 8% de checkout e 25% de conversão,
isso é ~3 vendas. **Três vendas não provam que você tem um negócio — provam que a oferta
não está morta**, que é exatamente a pergunta de hoje.

---

## Critérios de decisão

### Matar um criativo
Gastou **R$ 25** e:
- nenhum clique no link, **ou**
- CTR abaixo de 0,7%

Desligue esse anúncio e deixe o orçamento com os outros. Não mexa em mais nada.

### Ler o resultado no fim do dia

**Cenário A — teve compra, CPA até R$ 30.**
Validado. Amanhã: duplique o conjunto com R$ 300, produza 3 variações do criativo
vencedor, e monte order bump (+R$ 27) para melhorar a margem.

**Cenário B — teve InitiateCheckout mas nenhuma compra.**
O anúncio e a página funcionaram; **o checkout ou o preço travaram**. Verifique nesta
ordem: o checkout está em português e aceita Pix? O preço na página bate com o do
checkout? A página de pagamento pede dados demais? Corrija e rode mais um dia antes de
concluir qualquer coisa sobre a oferta.

**Cenário C — teve clique mas quase nenhum InitiateCheckout (abaixo de 4%).**
O anúncio prometeu uma coisa e a página entregou outra. O problema é a página, não a
oferta. Reescreva o topo da página com as mesmas palavras do anúncio vencedor.

**Cenário D — CTR abaixo de 0,8% em todos os criativos.**
A dor não está escrita com as palavras dela. Troque os ângulos antes de trocar a oferta —
`ads/copys.md` tem dois de reserva e seis variações de título. Só depois de uma segunda
rodada de criativos é que se conclui algo sobre o nicho.

> **O erro de leitura mais comum:** matar a oferta quando o problema era o criativo.
> Antes de concluir "esse nicho não vende", tenha rodado pelo menos dois ângulos
> diferentes com CTR decente. CTR baixo nunca é evidência sobre a oferta — é evidência
> sobre o anúncio.

---

## O que NÃO fazer hoje

- **Não mexa na campanha nas primeiras 6 horas.** Editar reinicia o aprendizado e você
  perde o dia. Olhe às 6h de veiculação, depois só no fim do dia.
- **Não crie 5 conjuntos.** Com R$ 150 você compra um resultado legível ou cinco ilegíveis.
- **Não olhe o relatório de hora em hora.** As primeiras duas horas sempre parecem
  desastre: o CPA inicial é alto e cai conforme o algoritmo encontra o público.
- **Não use o seu melhor ativo para testar.** Se a conta cair num teste, você perdeu o
  teste e a conta.
