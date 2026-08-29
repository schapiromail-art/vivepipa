# Estrutura de campanha

> **Este documento tem duas partes.** A de cima é o método da palestra do Maxxima —
> é o que você deve seguir. A de baixo é o teste-relâmpago de 1 dia que eu tinha montado
> antes de ver o material dele; fica registrado porque a leitura de métricas continua
> valendo, mas a estrutura de campanha da parte de cima substitui a de baixo.

---

# PARTE 1 — O método da palestra (siga este)

## Fase 1: Testadora 1-1-1 — descobrir qual criativo funciona

| | |
|---|---|
| Estrutura | 1 Campanha · 1 Conjunto · **1 criativo isolado** |
| Orçamento | **45% do valor do produto por dia** = R$ 16,65 |
| Público | Aberto (Brasil, mulheres 30–60, sem interesses) |
| Duração | 5 dias |
| Meta | **ROI 2** |

Um conjunto por criativo. Quatro criativos = quatro conjuntos = R$ 66,60/dia.

**Por que isolar.** Com vários criativos no mesmo conjunto, o algoritmo concentra a
entrega em um ou dois e os outros morrem com dados insuficientes para julgar. Você
termina sem saber o que funcionou. Isolado custa mais e é a única forma de saber o que
escalar — que é a informação que vale dinheiro depois.

## Fase 2: Gramado 1-1-4 — escalar o que sobreviveu

| | |
|---|---|
| Estrutura | 1 Campanha · 1 Conjunto · **os 4 criativos que bateram ROI 3** |
| Orçamento | 1X → 2X → até R$ 500/dia, **subindo de 5 em 5 dias** |
| Público | Aberto |
| Meta | **ROI 1.8** |

A meta cai de 2 para 1.8 na escala de propósito: volume maior sempre custa mais caro por
venda. Se você exigir o mesmo ROI da fase de teste, nunca escala.

## Como isso encaixa com "colocar algo rodando hoje"

Cinco dias não é hoje. O caminho que respeita as duas coisas:

- **Hoje:** suba a Testadora com os **dois** melhores criativos (ângulos A e B de
  `ads/copys.md`), R$ 33/dia no total. Não é para concluir nada hoje — é para o relógio
  dos 5 dias começar a correr hoje.
- **Dias 2–5:** cada criativo novo entra como conjunto isolado.
- **Dia 5:** quem bateu ROI 2 sobrevive. Quem bateu ROI 3 vai para a Gramado.
- **Depois:** sobe de 5 em 5 dias até R$ 500/dia, meta ROI 1.8.

> **Ajuste obrigatório para pixel frio.** A palestra assume pixel com histórico. Com zero
> compras, otimizar por Compra a R$ 16,65/dia não sai do aprendizado. Comece otimizando
> por **Iniciar finalização de compra** e troque para Compra quando acumular ~15 vendas.

> **Sobre paciência.** O erro que mata este método é mexer no dia 2. Cinco dias é cinco
> dias: editar orçamento, público ou criativo reinicia o aprendizado e você perde tudo o
> que já gastou. Olhe, anote, não toque.

---

# PARTE 2 — O teste-relâmpago de 1 dia (substituído)

*Registrado para referência. A leitura de métricas e os critérios de decisão continuam
válidos e valem para os dois métodos.*

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
| **CPA (custo por compra)** | **até R$ 18,50** (ROI 2) | acima de R$ 37 |

A meta ROI 2 da palestra significa **CPA de até R$ 18,50**. É mais exigente que os R$ 25
que eu tinha proposto, e ele está certo: a R$ 37 sem order bump, ROI 1,5 não paga imposto,
taxa de plataforma e reembolso. Daí para frente se melhora a margem com order bump e
upsell, não com anúncio mais barato.

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
