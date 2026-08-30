# Briefing de design — Pele de Filtro

Tudo o que precisa ser produzido, com especificação. O conteúdo de texto está todo escrito
e final: nada aqui pede que o designer invente copy.

---

## 1. A marca

**Nome:** Pele de Filtro
**Assinatura:** *o protocolo de 10 minutos*

**Não há pessoa por trás, e isso é uma decisão, não uma falta.** Não existe fundadora, não
existe foto de autora, não existe “o método que eu uso”. A marca fala como um protocolo:
específica, direta, sem carisma pessoal. Nunca invente uma maquiadora fictícia, nunca use
foto de banco de imagens como se fosse a autora.

**Tom de voz:** afirmativo e técnico sem ser frio. Números concretos em vez de adjetivos.
Nunca condescendente. Fala com uma mulher que já sabe se maquiar há vinte anos.

**Duas palavras proibidas em todo o material:** *ruga* e *envelhecida*. O nicho fala em
**linha de expressão** e **pele madura**. Também: **bigode chinês**, nunca sulco
nasogeniano; **pés de galinha**; **rosto descansado** como o benefício.

### Logo

Tipográfico, sem símbolo. “Pele de Filtro” em **Fraunces**, peso 700, tracking levemente
negativo. Uma versão em uma linha e uma em duas (“PELE DE / FILTRO”). Versões em ameixa
sobre claro, em claro sobre ameixa, e uma monocromática preta para os imprimíveis.

Sem ícone de rosto, sem pincel, sem gota. O nicho inteiro usa esses três.

---

## 2. Sistema visual

| Token | Hex | Uso |
|---|---|---|
| Fundo claro | `#FBF6F4` | fundo padrão |
| Fundo alternado | `#F5EBE9` | seções intercaladas |
| Escuro / ameixa | `#2B1A22` | hero, capas de PDF, blocos de preço |
| Texto sobre escuro | `#F4E7EB` | |
| Texto | `#3A2B31` | corpo |
| Texto secundário | `#7A6670` | apoios |
| **Acento rosa-berry** | `#C03A63` | CTAs, destaques, numeração |
| Acento escuro | `#A22E51` | hover, sombra de botão |
| Confirmação | `#2F8F6B` | checks, garantia |
| Linha | `#EBDCDE` | bordas |

**Tipografia:** **Fraunces** (títulos, 700) + **Poppins** (corpo, 400/500/600). Ambas no
Google Fonts e no Canva.

**Por que não o vermelho da referência:** `#AD1F1F` é a marca da mentoria, não uma regra.
Vermelho de tráfego pago destoa em beleza feminina. A ameixa e o rosa-berry vêm do mundo
da embalagem de cosmético, e o acento tem saturação suficiente para o botão brigar por
atenção em tráfego frio — que é o trabalho dele.

---

## 3. Os 10 PDFs

Conteúdo final em `produto/pdfs/`. Cada arquivo tem no topo um bloco com páginas, formato
e observações de diagramação. **79 páginas em 10 arquivos.**

| # | Arquivo | Pág. | Observação de design |
|---|---|---|---|
| 01 | Checklist do Espelho | 2 | **Preto sobre branco.** Imprimível em jato de tinta |
| 02 | O Protocolo Pele de Filtro | 25 | Uma seção por página. Os tempos de espera são o elemento gráfico mais forte. Tabelas nas páginas 4, 7, 9, 14, 21 e 22 |
| 03 | Rosto Desinchado | 10 | As duas sequências (gelo e drenagem) pedem numeração forte e muito ar. Avisos de segurança em caixa destacada |
| 04 | Mapa das Olheiras | 6 | A tabela da página 3 é o coração: amostra de cor real em círculo ao lado de cada linha |
| 05 | Guia de Texturas | 7 | A tabela de compatibilidade da página 6 é a mais consultada. Destacar com fundo |
| 06 | O Kit de R$ 100 | 5 | Glossário na página 2, comparativo em duas colunas na 3 |
| 07 | Efeito Lifting | 6 | **Precisa de 4 ilustrações** — ver abaixo |
| 08 | 7 Erros Depois dos 35 | 8 | Uma página por erro. Numeração muito grande em rosa-berry no topo. Bloco “Faça assim” em caixa verde |
| 09 | Diagnóstico | 8 | O índice da página 2 é o mais consultado do kit — escaneável em três segundos |
| 10 | Protocolo Express | 2 | **Preto sobre branco.** Segundo imprimível |

**Templates:** um de capa e um de miolo servem para os dez. Capa em ameixa com título em
Fraunces e o número do arquivo. Miolo em `#FBF6F4`, Poppins 11–12pt, entrelinha generosa,
rodapé com “Pele de Filtro” em todas as páginas.

**Espaço em branco não é desperdício** — é o que faz o protocolo parecer fácil. Se uma
página parece cheia, tire conteúdo dela.

**Caixas de segurança:** os arquivos 03 e 04 têm avisos sobre quando procurar um médico.
Eles precisam de tratamento visual distinto das caixas de destaque comuns — borda em vez
de fundo, ou um tom mais sóbrio. Não podem parecer marketing.

### As 4 ilustrações do arquivo 07

Únicas ilustrações do kit. Rosto feminino estilizado, traço fino, linha em `#3A2B31` com
setas em `#C03A63`. Sem sombreamento, sem realismo.

1. Rosto de frente, seta diagonal da maçã do rosto em direção à têmpora
2. Rosto de frente com 4 pontos numerados: topo da maçã, osso da sobrancelha externo,
   canto interno do olho, arco do lábio
3. Detalhe do olho, traço curto ascendente no canto externo
4. Duas sobrancelhas lado a lado — uma com a ponta caindo, outra terminando na horizontal

## 4. Mockups — a peça que mais vende

**Produto digital sem mockup parece que não existe.** Isto entra na landing (bloco 5) e
nos criativos.

- Os 10 PDFs abertos em **tablet** e em **celular**
- Uma imagem com **os dez juntos**, em leque ou grade — é o retrato do overdelivery
- O Checklist do Espelho **impresso e colado num espelho de banheiro** — a única imagem
  que mostra o produto em uso, e provavelmente a melhor do kit

---

## 5. Imagens da landing

A página está publicada sem nenhuma imagem. **Beleza se vende olhando** — sem isso ela
perde para qualquer concorrente. Em ordem de impacto:

| Onde | O quê |
|---|---|
| Bloco 5 (entregáveis) | A imagem dos 10 juntos |
| Bloco 1 (hero) | Mulher **40+ real**, não modelo de 22. Ela precisa se reconhecer |
| Bloco 3 (ruminação) | Detalhe de textura: esponja, base, pó. Rompe o muro de texto |
| Bloco 4 (passo a passo) | 3 ícones em linha fina, rosa-berry |
| Bloco 10 (como acessar) | 3 ícones no mesmo estilo |

**Bloco 2 (depoimentos) fica vazio** até haver clientes reais. Não preencher com foto de
banco de imagens — é fraude e é o tipo de coisa que derruba conta e gera chargeback.

---

## 6. Criativos de anúncio

**1080 × 1350 (4:5)**. Estático e carrossel. Sem vídeo nesta fase.

Copy final em `ads/copys.md` — doze ângulos, todos na estrutura **PRSA** (Problema, Rota,
Solução, Ação). Produzir primeiro:

| Prioridade | Ângulo | Formato |
|---|---|---|
| 1 | **A** — a camada grossa | Estático, texto puro sobre `#FBF6F4` |
| 2 | **D** — “ninguém te diz quantos minutos” | Estático, os números como elemento gráfico |
| 3 | **B** — a base que faz bolinhas | Estático com a tabela craquelada × talhada |
| 4 | **F** — efeito lifting | Estático, reaproveita as ilustrações do PDF 07 |

**Regras de arte:** manchete em no máximo 7 palavras. Texto grande — se não dá para ler
com o print reduzido à metade, está pequeno. Contraste alto, sem texto sobre foto
detalhada sem faixa sólida atrás.

**Nomenclatura:** `PDF_<ângulo>_<formato>_v<n>.png`, por exemplo
`PDF_angA-camada_estatico-texto_v1.png`. No relatório do Meta você vai olhar por nome de
criativo — se todos se chamarem “design 1”, não dá para saber o que matar.

---

## 7. O que nunca fazer — política do Meta

Estas quatro regras derrubam anúncio de beleza. Valem para **arte e copy**:

**1. Nada de antes/depois de pele.** Se usar comparação, que seja de **maquiagem
aplicada** — nunca da pele, nunca da idade.

**2. O sujeito da frase é a base, nunca ela.** *“A base craquela porque a camada é
grossa”* roda. *“Sua pele parece mais velha”* é derrubado. Essa segunda frase é o hero da
**landing** e não pode aparecer em nenhum criativo.

**3. Não apresentar um traço normal como defeito a corrigir.** Linha de expressão não é
defeito: o que estamos corrigindo é o comportamento do produto.

**4. Nada de resultado garantido.** “Não craquela” descreve o protocolo; “garantimos pele
perfeita” é promessa proibida.

O disclaimer do rodapé da landing é obrigatório e já está escrito.

---

## 8. Checklist de entrega

☐ Logo em 3 versões (ameixa, clara, monocromática)
☐ Template de capa + template de miolo dos PDFs
☐ Os 10 PDFs diagramados, com 01 e 10 em preto sobre branco
☐ As 4 ilustrações do arquivo 07
☐ Mockups: tablet, celular, os 10 juntos, checklist no espelho
☐ 5 imagens da landing
☐ 4 criativos estáticos 1080×1350
☐ Favicon e imagem de compartilhamento (og:image) da landing
