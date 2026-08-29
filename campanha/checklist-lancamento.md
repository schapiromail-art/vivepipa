# Checklist de lançamento — hoje

Ordem de operações. Cada bloco depende do anterior. Tempo total: 4 a 5 horas.

---

## BLOCO 0 — Escolher a BM (30 min) ⚠️ FAÇA ANTES DE TUDO

Você tem várias BMs e precisa decidir qual usar. Eu não consigo ver nenhuma delas daqui —
entre em `business.facebook.com` e responda estas seis perguntas para cada uma:

1. A BM está **restrita**? (aparece aviso vermelho no topo)
2. Ela está **verificada**? (Configurações → Central de Segurança → Verificação do negócio)
3. A conta de anúncios está **ativa**, não desativada?
4. O **meio de pagamento** está aprovado e sem dívida pendente?
5. Existe uma **fanpage** vinculada, com foto, alguma publicação e sem restrição?
6. Ela já **gastou** alguma coisa antes, ou é totalmente nova?

### Como decidir

**Use a BM que:** está ativa, tem meio de pagamento aprovado, tem fanpage com algum
histórico, e **não é a sua mais valiosa**.

**Não use:** a BM que sustenta qualquer operação que já esteja rodando. Um teste de nicho
novo com criativo novo é exatamente o tipo de coisa que gera rejeição de anúncio. Se der
problema, você quer perder o ativo descartável, não o principal.

**Se todas as suas BMs estiverem restritas:** não force. Publicar de uma BM restrita
normalmente derruba o que sobrou. O caminho é criar uma BM nova a partir de um perfil
pessoal com histórico real, vincular fanpage nova, e aceitar limite de gasto baixo nos
primeiros dias.

### Aquecimento se a conta for nova

Conta nova com R$ 150/dia de cara chama atenção. Se a conta nunca gastou:
- Comece com **R$ 50** no dia 1 e suba ~30% por dia se não houver rejeição.
- Deixe o primeiro anúncio ser o mais conservador dos criativos (o Ângulo 1, texto puro).
- Meio de pagamento no nome do titular do perfil, não de terceiro.

> Com uma conta ativa e aquecida, mantenha os R$ 150. Com conta nova, R$ 50 hoje e a
> leitura passa a ser sobre CTR e InitiateCheckout, não sobre CPA — R$ 50 não compram
> conclusão sobre custo por venda.

**Me diga o que encontrou** nas seis perguntas e eu te digo qual usar e como configurar.

---

## BLOCO 1 — Produto no Kiwify (45 min)

- [ ] Criar produto digital, **R$ 47**, pagamento único
- [ ] Ativar **Pix e cartão** (Pix costuma ser 30–40% das vendas em low ticket no Brasil)
- [ ] Ativar parcelamento no cartão
- [ ] Subir o material: `produto/pele-de-filtro.md` exportado como PDF
      *(no Google Docs: colar → Arquivo → Baixar → PDF. 20 minutos.)*
- [ ] Configurar entrega automática por e-mail
- [ ] Garantia de **7 dias** ativada
- [ ] Checkout em português, com o mínimo de campos possível
- [ ] **Colar o pixel do Meta no checkout do Kiwify** (Configurações → Pixels).
      Sem isso você não registra a compra e a campanha otimiza no escuro.
- [ ] Copiar a **URL do checkout** — vai no `landing/index.html`
- [ ] Em Configurações do produto → **redirecionar após a compra** para
      `seudominio.com/obrigado.html`. É essa página que captura o WhatsApp e segmenta
      a compradora — sem ela você vende R$ 47 e não fica com nada
- [ ] **Comprar você mesmo**, com Pix, e percorrer o caminho inteiro: checkout → obrigado
      → formulário → página de acesso → e-mail. É o único teste que importa

> O último item não é opcional. Vender e não entregar em dia de teste é a única falha
> desta lista que custa reembolso e reclamação.

---

## BLOCO 2 — Página (30 min)

- [ ] Em `landing/index.html`, trocar `SEU_PIXEL_ID` pelo ID do pixel (**aparece 3 vezes**)
- [ ] Trocar `https://pay.kiwify.com.br/SEU_CODIGO` pela URL real do checkout
- [ ] Trocar `SEU_PIXEL_ID` também em `landing/obrigado.html` (dispara o `Purchase`)
- [ ] **Decidir quem registra a compra:** ou o pixel dentro do Kiwify, ou o evento da
      `obrigado.html`. Os dois juntos contam a venda em dobro e o seu ROAS mente
- [ ] Publicar: arraste a pasta `landing/` em app.netlify.com/drop — leva 2 minutos e não
      precisa de conta paga. Vai publicar `index`, `obrigado` e `acesso` de uma vez.
      Domínio próprio é melhor, mas não é bloqueante hoje
- [ ] Na Netlify, conferir em **Forms** que o formulário `qualificacao` foi detectado
- [ ] Subir os PDFs e trocar os `href="#"` de `landing/acesso.html` pelos links reais
- [ ] Abrir a página **no celular** e conferir: carrega rápido, botão visível, sem
      rolagem horizontal
- [ ] Clicar no botão e confirmar que chega no checkout com o preço certo
- [ ] Instalar a extensão **Meta Pixel Helper** no Chrome e verificar que dispara
      `PageView` na página e `InitiateCheckout` no clique

---

## BLOCO 3 — Criativos (60–90 min)

- [ ] Montar no Canva os criativos 1, 3 e 4 de `ads/criativos.md` (1080x1350)
- [ ] Montar o carrossel de 4 cartões
- [ ] Nomear os arquivos no padrão `PDF_<ângulo>_<formato>_v1`
- [ ] Reduzir cada print a 50% na tela e conferir se a manchete ainda se lê

> Se o tempo apertar, faça só os criativos **1 e 3**. Dois criativos bons validam melhor
> que cinco apressados.

---

## BLOCO 4 — Campanha (30 min)

Estrutura **Testadora 1-1-1** da palestra — um conjunto por criativo, isolado:

- [ ] Campanha: objetivo **Vendas**, sem CBO
- [ ] **Conjunto 1:** R$ 21,15/dia · 1 criativo só (ângulo A)
- [ ] **Conjunto 2:** R$ 21,15/dia · 1 criativo só (ângulo B)
- [ ] Otimização: **InitiateCheckout** (pixel frio) — Compra depois de ~15 vendas
- [ ] Público: Brasil · Mulheres · 30–60 · sem interesses, nos dois
- [ ] Posicionamentos: Advantage+
- [ ] Conferir em cada anúncio: URL de destino correta, CTA certo, título e descrição
- [ ] **Revisar o link de destino uma vez mais.** Link errado é a forma mais comum de
      queimar um dia inteiro de orçamento
- [ ] Publicar e anotar a hora

---

## BLOCO 5 — Leitura

**Não mexa em nada durante os 5 dias.** Editar orçamento, público ou criativo reinicia o
aprendizado e queima o que você já gastou. A leitura real é no dia 5.

**Ao longo dos 5 dias:**
- [ ] Anotar os números todo dia, sem tocar em nada
- [ ] Desligar um conjunto só se ele gastar R$ 50 sem um único clique no link

**No dia 5**, anote e compare com a tabela de `campanha/estrutura-campanha.md`:

```
Investido:            R$ ______
Impressões:           ______      CPM: R$ ______
Cliques no link:      ______      CTR: ____%   CPC: R$ ______
Visitas na página:    ______
InitiateCheckout:     ______      (____% das visitas)
Compras:              ______      (____% dos checkouts)
Faturamento:          R$ ______   CPA: R$ ______   ROAS: ____
Melhor criativo:      ______________________
```

Os quatro cenários de leitura (A, B, C, D) estão em `campanha/estrutura-campanha.md`.
Quem bateu ROI 2 sobrevive; quem bateu ROI 3 vai para a Gramado 1-1-4.
Me mande esses números e eu te digo o que escalar.

---

## Se sobrar tempo (não é para hoje)

- **Order bump** no checkout: "Mapa de Cores para o Seu Tom de Pele" por +R$ 27.
  É o que transforma CPA de R$ 25 numa margem confortável — mais barato que qualquer
  otimização de anúncio.
- **Upsell** pós-compra: aula em vídeo do protocolo, R$ 67.
- **Sequência de e-mail** de 3 dias para quem abandonou o checkout.
