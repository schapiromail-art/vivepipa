# Auditoria do material da palestra — Ricardo Maxxima

22 fotos da palestra no Drive (evento **Subido**), todas lidas. O OCR do Drive devolveu
11 delas vazias; baixadas direto pelo link de compartilhamento e lidas como imagem,
saíram inteiras.

---

## 0. As regras do produto — e onde nós estamos errando

Quatro slides definem o que um low ticket pode ser. São os mais importantes do material
e são os que mais mexem no nosso produto.

> ### “Produto Low Ticket a pessoa não compra para aprender nada, **ela compra para usar**.”

> ### “Produto Low Ticket **não tem Curva de Aprendizagem**!”

> ### “O aluno precisa consumir em **no máximo 48 horas**!”

E a lista do que **não funciona mais**:
> ✗ Métodos com siglas ✗ Cursos com muitas aulas ✗ Precise estudar

**Formatos que ele lista como low ticket:** Mini Curso · Template · Pack de Prompts ·
Scripts e Roteiros · Mapa Mental · Calculadora · Planilha · Ebook · Áudio · Checklist.

### O que isso quer dizer para o Pele de Filtro

O produto hoje é um guia de ~1.800 palavras com o Checklist do Espelho no fim. Pela régua
dele, isso está invertido: o guia é material de **estudo**, e o checklist é o material de
**uso**. Quem compra às 22h quer aplicar às 7h da manhã seguinte, não ler um capítulo
sobre por que a pele retém menos água.

**Correção:** o Checklist do Espelho vira o produto principal e abre a entrega. O guia
passa a ser o material de apoio, para quem quiser entender o porquê depois de já ter
aplicado. Nada some — muda a ordem e muda o que a página promete entregar.

Duas coisas que já estão certas: “Método das 3 Camadas Finas” não é sigla (o que ele
condena é PRSA-tipo-nome-de-método, não nome descritivo), e o protocolo inteiro se
consome em 10 minutos, muito abaixo do teto de 48 horas.

---

## 0b. A tabela de preços — R$ 67 é o ponto marcado em verde

Slide com duas colunas:

| **Low Ticket Frio** 🥶 (tráfego frio) | **Low Ticket Branding** (Instagram, público quente) |
|---|---|
| R$ 37 | R$ 147 |
| R$ 47 | **R$ 197** ← verde |
| **R$ 67** ← verde | |
| R$ 87 ← laranja | |
| R$ 97 ← laranja | |

O verde marca o recomendado; o laranja, a zona de atrito. Para **tráfego frio**, que é
exatamente o nosso caso, ele aponta **R$ 67**. R$ 37 é o piso da faixa, não o alvo.

Isso tem consequência direta na conta: com a meta ROI 2 dele, R$ 37 te dá **CPA máximo de
R$ 18,50**, enquanto R$ 67 te dá **R$ 33,50**. O CPM é o mesmo nos dois casos — você
compra o mesmo clique e tem quase o dobro de margem para pagá-lo.

---

## 0c. PRSA — a fórmula dos criativos

Dois slides, um com a sigla e outro aberto:

> **P** — Problema
> **R** — Rota
> **S** — Solução
> **A** — Ação

É a estrutura de cada anúncio: nomear o problema, mostrar o caminho errado que ela está
seguindo (a Rota), apresentar a solução, pedir a ação. As copys em `ads/copys.md` foram
reescritas nessa ordem.

---

## 0d. O funil — Fase 02

Diagrama do slide, transcrito:

```
Produto → Anúncios → Página de Venda → Checkout → Página Obrigado
             ↓            ↑                        “Qualifico Lead (PORTA)”
         Instagram ──────┘                                ↓
                                                   Página Obrigado ✓
```

**A obrigado de qualificação aparece no diagrama com o nome “PORTA”** — é uma etapa
desenhada do funil, não um detalhe da página dele. É exatamente o que construímos em
`landing/obrigado.html` → `landing/acesso.html`, e confirma que a leitura que fizemos da
página de obrigado dele estava certa.

Note também a seta pontilhada: **Instagram alimenta a página de venda** em paralelo aos
anúncios. O perfil não é decoração — é fonte de tráfego no mesmo funil.

---

## 1. A lógica da página de vendas — 14 blocos

Este slide é a fonte primária. Note que **difere do template JSON em dois pontos**:

| # | Slide da palestra | No template JSON |
|---|---|---|
| 1 | Vender Sozinho | igual |
| 2 | Depoimentos | igual |
| 3 | **Dor Latente Principal** | “Ruminação” |
| 4 | **Transição da Dor para Solução** | “Passo a Passo” |
| 5 | **Agora Você Vai** | “Benefícios” (bloco extra) |
| 6 | Tudo que você vai receber + Bônus | separado em Entregáveis + Bônus |
| 7 | Para quem serve | igual |
| 8 | Ancoragem com preço | “Recapitulando” |
| 9 | Valor (botão) | igual |
| 10 | **Conversa Séria** | vem *depois* da Autoridade |
| 11 | **Autoridade** | vem *antes* da Conversa Séria |
| 12 | Valor (botão) | igual |
| 13 | FAQ | igual |
| 14 | Rodapé | igual |

**Onde os dois discordam, eu fico com o template.** A palestra põe Conversa Séria (10)
antes de Autoridade (11); o template inverte. Conversa Séria — “agora você tem duas
opções” — é o fecho emocional da página, e colocar a biografia do autor *depois* dela
esfria o argumento no pior momento possível. Autoridade antes funciona melhor: é a
credencial de quem está prestes a confrontar. Mantivemos Autoridade → Conversa Séria.

Vale dizer que essa é a única divergência de ordem entre os dois, e que o slide pode
simplesmente listar os blocos sem afirmar sequência. Se na palestra ele disse o
contrário, me avise e eu inverto.

Os nomes também ensinam mais que os do template. **“Transição da Dor para Solução”**
deixa claro que o bloco do passo a passo não é conteúdo — é a ponte. E **“Agora Você
Vai”** é uma instrução de escrita: os benefícios em segunda pessoa e no futuro, não em
lista de recursos.

---

## 2. Ruminação Mental — a base psicológica

Slide, transcrito:

> “A ruminação mental ocorre quando a pessoa fica presa em ciclos de pensamentos sobre
> problemas ou até desejos que gera angústia e frustração. (…) esses pensamentos se
> repetem sem que a pessoa tome uma atitude para mudar a situação.”

Isso é uma instrução de copy, não teoria. O bloco de dor **não argumenta e não explica**:
ele devolve para ela o pensamento que ela já tem em loop, até ela concordar. A venda
começa depois do segundo “sim”. É por isso que o template repete “Estou certo?”.

Erro que isso previne: escrever o bloco de dor em terceira pessoa (“muitas mulheres
sofrem com…”). Ruminação é primeira pessoa.

---

## 3. As estruturas de campanha (isto muda o nosso plano)

Dois slides, transcritos:

**Teste de Criativos — “ABO Testadora” 1-1-1**
> 1 Campanha · 1 Conjunto · 1 Criativo isolado
> **45% do valor do produto por dia** · Público Aberto
> Teste por 5 dias · Meta ROI 2

**Teste de Escala — “ABO Gramado” 1-1-4**
> 1 Campanha · 1 Conjunto · 4 Criativos (os que bateram ROI 3)
> 1X → 2X → R$ 500 por dia (sobe de 5 em 5 dias) · Público Aberto
> Teste por 5 dias · Meta ROI 1.8

### O que isso significa no nosso preço

Fechamos em **R$ 47** — o degrau intermediário da tabela dele.

45% de R$ 47 = **R$ 21,15 por dia, por criativo isolado**.
Dois criativos = R$ 42,30/dia. Quatro = R$ 84,60/dia; cinco dias = **R$ 423**.

*(Este arquivo documenta os slides dele: a tabela acima é a dele, com R$ 37 no piso.
O nosso preço está em `oferta/oferta.md`.)*

### Onde isso conflita com o que eu te propus

Eu montei um teste de **1 dia com R$ 150 num conjunto só, com 4 criativos juntos**.
A mentoria manda **isolar cada criativo, gastar menos por dia e esperar 5 dias**.

As duas coisas respondem perguntas diferentes:

| | Meu plano (1 dia) | Método da palestra (5 dias) |
|---|---|---|
| Pergunta | “esta oferta está morta?” | “qual criativo escala?” |
| Custo | R$ 150 | R$ 333 |
| Confiabilidade | baixa — 3 vendas não são amostra | alta |
| Descobre criativo vencedor | não | sim, isolado |

**O método da palestra é mais correto e você deveria segui-lo.** Criativos misturados num
conjunto só não dizem qual funcionou: o algoritmo concentra a entrega em um ou dois e os
outros morrem sem dados suficientes para julgar. Isolar custa mais e é a única forma de
saber o que escalar.

**A ressalva honesta:** você pediu para colocar algo rodando *hoje*, e cinco dias não é
hoje. O caminho que respeita as duas coisas:

- **Hoje:** suba a Testadora 1-1-1 com os **dois** melhores criativos — R$ 33/dia no
  total. Não é para concluir nada hoje; é para o relógio dos 5 dias começar a correr
  hoje em vez de amanhã.
- **Dias 2 a 5:** adicione os outros criativos como conjuntos isolados conforme forem
  ficando prontos.
- **Dia 5:** quem bateu ROI 2 sobrevive; quem bateu ROI 3 vai para a Gramado 1-1-4.
- **Escala:** sobe de 5 em 5 dias, meta ROI 1.8, até R$ 500/dia.

Isso troca “resposta ruim hoje” por “resposta boa na sexta”, gastando R$ 33 hoje em vez
de R$ 150. É a decisão certa, e é a que eu recomendo.

> **Continua valendo o que eu disse sobre pixel frio:** com zero compras no histórico,
> otimizar por Compra a R$ 16,65/dia não sai do aprendizado. Comece otimizando por
> **Iniciar finalização de compra** e troque quando acumular ~15 compras. A palestra
> assume um pixel com histórico; o seu ainda não tem.

---

## 4. Biblioteca de ofertas — o que ele mostrou funcionando

Slides marcados **“O que funciona”**:

| Oferta | Promessa | Padrão |
|---|---|---|
| **Tráfego Pago para Iniciantes** | “mini-curso de 47 minutos” | tempo exato + “sozinho” + objeção (“acha que é complicado demais”) |
| **Protocolo Sem Chulé** | “acabe com o seu chulé em apenas 48 horas” | dor vergonhosa + prazo curtíssimo + a palavra “protocolo” |
| **Projeto 100 Seguidores por Dia** | “calendário viral… que viram clientes, independente do seu nicho” | número diário + entregável nomeado + remoção de objeção de nicho |
| **Desafio Mil Seguidores** | “mil seguidores por semana sem fazer muito esforço” | número + prazo + “sem esforço” |

Marcado **“Não funciona mais”**:

| Oferta | Por quê |
|---|---|
| **Design para Instagram (Canva)** | promessa vaga (“artes impactantes”), sem número, sem prazo, sem dor. Ensina uma ferramenta em vez de resolver um problema |

### As quatro regras que saem daí

1. **Número ou prazo explícito.** 47 minutos, 48 horas, 100 por dia, mil por semana.
2. **“Protocolo”, “Projeto”, “Desafio”, “Calendário”** — substantivo que dá forma ao
   entregável. Ninguém compra “dicas”.
3. **A objeção vai na promessa**, não no FAQ: “mesmo que”, “sem esforço”, “independente
   do seu nicho”, “sozinho”.
4. **Resolver um problema, não ensinar uma ferramenta.** Foi o que matou o de Canva.

### Como o Pele de Filtro se sai nessas regras

| Regra | Nota |
|---|---|
| Número/prazo | ✅ “10 minutos” |
| Substantivo de entregável | ✅ “Protocolo” — o mesmo padrão do Sem Chulé |
| Objeção na promessa | ✅ “com a base que você já tem” |
| Problema, não ferramenta | ✅ resolve craquelado, não ensina maquiagem |

O nome e a promessa estão dentro do padrão que ele mostrou funcionando. O que estava
fraco era o **nível da dor** na headline — corrigido em `pesquisa/voz-do-cliente.md`.

---

## 5. A Cartilha — o funil dele por trás do funil

Slide da isca: **“Cartilha do Tráfego Pago Low Ticket”**
> “Não consegue ROI acima de 2 com seu Low Ticket? Copie minhas estruturas de campanhas
> (…) que vai FORÇAR o algoritmo do Meta Ads a bater ROI de 2 (ou mais) todos os dias!
> Só copiar no seu gerenciador.”

Com um gráfico de “seu ROI hoje” (1,30) contra “como vai ficar” (2,59 a 2,76).

É a mesma isca cuja página de obrigado nós dissecamos: formulário de 11 campos com
faixa de faturamento. **A estrutura de campanha que ele ensina de graça na palestra é o
produto da isca.** Ele entrega o método completo e monetiza a qualificação de quem o
recebe. Vale entender isso antes de copiar o modelo achando que o dinheiro está no
produto de entrada.
