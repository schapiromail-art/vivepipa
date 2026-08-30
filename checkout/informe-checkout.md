# Informe de checkout — tudo que precisa ser configurado

Documento operacional. Cada campo aqui é copiável direto para a plataforma. Onde há
`{ }`, é um valor que só você tem.

---

## 1. Ficha do produto

| Campo | Valor |
|---|---|
| **Nome do produto** | Pele de Filtro |
| **Subtítulo** | O protocolo de 10 minutos para uma maquiagem que não craquela |
| **Tipo** | Produto digital · e-book / material complementar |
| **Categoria** | Beleza e estética |
| **Formato de entrega** | Arquivos PDF por e-mail, acesso imediato |
| **Preço** | **R$ 37,00** |
| **Parcelamento** | Cartão, até 12x (a plataforma calcula os juros) |
| **Pix** | **Ativado** — costuma ser 30 a 40% das vendas em low ticket no Brasil |
| **Boleto** | Desativado. Demora a compensar e derruba a leitura do teste |
| **Garantia** | 7 dias, incondicional |
| **Moeda** | BRL |
| **Idioma** | Português (Brasil) |
| **Order bump** | **Nenhum nesta fase** — decisão consciente |
| **Upsell** | **Nenhum nesta fase** |
| **Afiliados** | Desativado enquanto valida |

---

## 2. Descrição do produto

**Descrição curta** (para listagem, até 200 caracteres):

> O protocolo de 10 minutos para uma maquiagem que não craquela e não marca linha nenhuma
> — com a base que você já tem. 10 arquivos, 79 páginas, acesso imediato.

**Descrição longa** (página do produto na plataforma):

> Se a sua base craquela ao longo do dia, marca o bigode chinês e o corretivo acumula
> embaixo do olho, o problema provavelmente não é a sua base — é a espessura da camada.
>
> Depois dos 35 a pele retém menos água, e uma camada grossa não acompanha o movimento do
> rosto: ela trava dentro da linha de expressão e quebra ali. A mesma base, aplicada em
> três camadas finíssimas com 40 segundos entre elas, não faz isso.
>
> O Pele de Filtro é o protocolo completo desse método, com os tempos exatos — que é
> justamente o que nenhum artigo gratuito publica. Todo mundo diz “hidrate bem”. Ninguém
> diz quantos minutos.
>
> **Você recebe 10 arquivos, 79 páginas:**
>
> • Checklist do Espelho — para imprimir e usar amanhã de manhã
> • O Protocolo completo — 25 páginas, do preparo de pele ao retoque
> • Rosto Desinchado — gelo e drenagem linfática antes da maquiagem
> • Mapa das Olheiras — os 4 tipos e a correção de cor de cada um
> • Guia de Texturas — por que a base faz bolinhas
> • O Kit de R$ 100 — o que procurar no rótulo, por função
> • Efeito Lifting em 3 Movimentos
> • 7 Erros Depois dos 35
> • Diagnóstico — 14 problemas e a solução de cada um
> • Protocolo Express de 4 Minutos
>
> Acesso imediato por e-mail. 7 dias de garantia incondicional: teste amanhã de manhã e,
> se a sua maquiagem craquelar do mesmo jeito, você pede o dinheiro de volta e fica com
> todo o material.

---

## 3. E-mail de entrega

**Assunto:** `Seu acesso ao Pele de Filtro (comece pelo arquivo 01)`

**Corpo:**

> Oi, {primeiro_nome}!
>
> Seu acesso está liberado. São 10 arquivos e eles estão todos no link abaixo:
>
> **{LINK_DE_ACESSO}**
>
> **Comece pelo arquivo 01 — o Checklist do Espelho.** Imprima essa página hoje à noite e
> cole no espelho do banheiro. Amanhã de manhã você faz o protocolo olhando para ela, sem
> precisar decorar nada e sem precisar ler mais nada antes.
>
> O arquivo 02 é o guia completo, com o porquê de cada passo. Ele é para depois — para
> quando você já tiver testado e quiser entender o que está acontecendo.
>
> Se acordar com o rosto inchado em algum dia, abra o arquivo 03 antes de maquiar. São 6
> minutos e mudam a superfície inteira.
>
> Qualquer problema com o download, é só responder este e-mail.
>
> Um abraço,
> Pele de Filtro

> **Nota:** não prometa suporte por WhatsApp. Um e-mail de contato é suficiente para low
> ticket e não cria expectativa que você não vai conseguir cumprir.

---

## 4. Página de obrigado

**Redirecionamento após compra aprovada:** `{seudominio}/obrigado.html`

Essa página **não entrega o produto de imediato**. Ela mostra uma barra de progresso em
92%, um aviso de que falta um passo, e libera o acesso depois de um formulário curto.

O formulário captura: nome, WhatsApp, faixa etária, tipo de pele, o que mais incomoda hoje,
qual base usa, e um campo aberto — *“o que você já tentou e não funcionou?”*.

**Por que isso importa mais do que parece.** O ativo que sai dessa página é o telefone
qualificado e a pesquisa de público em primeira mão. O campo aberto é a melhor fonte de
copy que você vai ter: quando uma frase aparecer três vezes, ela vira headline.

Depois do formulário, a pessoa cai em `{seudominio}/acesso.html`, com os downloads.

---

## 5. Pixel e rastreamento

> ### Escolha UM. Nunca os dois.
>
> Ou o pixel configurado dentro da plataforma de checkout, **ou** o evento `Purchase` da
> página de obrigado. Se os dois estiverem ativos, cada venda conta duas vezes e o seu
> ROAS no gerenciador mente para cima — e você vai escalar em cima de um número falso.

**Recomendado:** pixel na plataforma de checkout, porque dispara na aprovação real do
pagamento, inclusive nas compras por Pix que compensam depois.

Se optar por esse caminho, **remova** o bloco `fbq('track','Purchase'...)` de
`landing/obrigado.html`.

**Eventos que devem existir:**

| Evento | Onde | Valor |
|---|---|---|
| `PageView` | Landing e obrigado | — |
| `Leu50` | Landing, ao passar de 50% da rolagem | — |
| `InitiateCheckout` | Clique no botão de compra da landing | 37,00 BRL |
| `Purchase` | Aprovação do pagamento | 37,00 BRL |

**API de Conversões:** ative se a plataforma permitir. Melhora a atribuição e não custa nada.

---

## 6. Textos legais

**Política de reembolso** (campo da plataforma):

> Garantia incondicional de 7 dias. Se você não gostar do material por qualquer motivo,
> basta solicitar o reembolso dentro de 7 dias a partir da compra e o valor é devolvido
> integralmente. Você não precisa justificar, e continua com todo o material.

**Disclaimer** (rodapé da landing, obrigatório):

> Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Pele de Filtro
> é material educativo sobre técnica de maquiagem: a compra deste material não garante
> nenhum tipo de resultado, e os resultados variam conforme o tipo de pele e os produtos
> utilizados.

**Aviso de conteúdo** (dentro dos arquivos 03 e 04, e vale repetir na descrição):

> Este material trata de técnica de maquiagem e cuidado cosmético. Não diagnostica, não
> trata condição de pele e não substitui avaliação médica.

**Dados de contato obrigatórios:** e-mail de suporte e razão social ou CPF do vendedor,
conforme exige a plataforma e o Código de Defesa do Consumidor.

---

## 7. Arquivos a subir

| # | Arquivo | Nome do PDF |
|---|---|---|
| 01 | Checklist do Espelho | `01-Pele-de-Filtro-Checklist-do-Espelho.pdf` |
| 02 | O Protocolo Pele de Filtro | `02-Pele-de-Filtro-Protocolo-Completo.pdf` |
| 03 | Rosto Desinchado | `03-Pele-de-Filtro-Rosto-Desinchado.pdf` |
| 04 | Mapa das Olheiras | `04-Pele-de-Filtro-Mapa-das-Olheiras.pdf` |
| 05 | Guia de Texturas | `05-Pele-de-Filtro-Guia-de-Texturas.pdf` |
| 06 | O Kit de R$ 100 | `06-Pele-de-Filtro-Kit-de-100-Reais.pdf` |
| 07 | Efeito Lifting | `07-Pele-de-Filtro-Efeito-Lifting.pdf` |
| 08 | 7 Erros Depois dos 35 | `08-Pele-de-Filtro-7-Erros.pdf` |
| 09 | Diagnóstico | `09-Pele-de-Filtro-Diagnostico.pdf` |
| 10 | Protocolo Express | `10-Pele-de-Filtro-Protocolo-Express.pdf` |

Nomeie assim mesmo. Ela vai baixar dez arquivos para a pasta de downloads, e o nome é o
que faz ela encontrar depois.

**Imagem de capa do produto:** o mockup dos dez arquivos juntos.

---

## 8. Checklist de configuração

☐ Produto criado, R$ 37, pagamento único
☐ Pix e cartão ativados · boleto desativado
☐ Parcelamento no cartão ativado
☐ Garantia de 7 dias configurada
☐ Os 10 PDFs subidos com os nomes da tabela acima
☐ Imagem de capa (mockup do kit)
☐ Descrição curta e longa preenchidas
☐ E-mail de entrega com o texto da seção 3
☐ Redirecionamento pós-compra para `/obrigado.html`
☐ Pixel configurado **em um lugar só**
☐ API de Conversões, se disponível
☐ Política de reembolso preenchida
☐ E-mail de suporte configurado
☐ Dados do vendedor completos

## 9. O teste que não pode ser pulado

**Compre você mesmo, com Pix, e percorra o caminho inteiro:**

anúncio → landing → botão → checkout → pagamento → página de obrigado → formulário →
página de acesso → e-mail de entrega → abrir os 10 PDFs.

Cronometre quanto tempo passa entre o pagamento e o e-mail chegar. Se passar de 5 minutos,
alguma configuração está errada.

**Depois, peça o reembolso** para verificar que o fluxo funciona. Você vai precisar dele
funcionando no dia em que alguém pedir, e é melhor descobrir agora.

> Vender e não entregar no dia do teste é a única falha desta lista que custa reembolso,
> reclamação e nota na plataforma.
