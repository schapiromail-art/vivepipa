# vivepipa

## Pele de Filtro — validação de low ticket

Produto digital de R$ 47 para o mercado brasileiro: um protocolo de maquiagem para
mulheres 35+ cuja base craquela e marca linha de expressão. Montado para ser lançado e
testado em um dia com R$ 150 de mídia.

### Arquivos

| Arquivo | O que é |
|---|---|
| `oferta/oferta.md` | Público, dor, mecanismo, estrutura da oferta e bônus |
| `produto/pele-de-filtro.md` | O entregável completo — protocolo + 4 bônus, pronto para virar PDF |
| `pesquisa/voz-do-cliente.md` | **Benchmark de dores** — frases literais do nicho, glossário e o que mudar na copy |
| `pesquisa/palestra-maxxima.md` | Auditoria da palestra: os 14 blocos, as estruturas de campanha e a biblioteca de ofertas |
| `estrutura/framework-maxxima.md` | **Os cimentos** — os 15 blocos do template MAXXIMA e o padrão da página de obrigado |
| `landing/index.html` | Página de vendas nos 15 blocos, com pixel e `InitiateCheckout` |
| `landing/obrigado.html` | Pós-compra: barra de 92% e formulário de qualificação antes da entrega |
| `landing/acesso.html` | Entrega dos arquivos, depois do formulário |
| `ads/copys.md` | 6 ângulos de anúncio com copy completa |
| `ads/criativos.md` | Especificação dos 5 estáticos + carrossel, com paleta |
| `campanha/estrutura-campanha.md` | Estrutura, benchmarks do Brasil e critérios de decisão |
| `campanha/checklist-lancamento.md` | Ordem de operações do dia — **comece por aqui** |

### Antes de publicar

- `SEU_PIXEL_ID` em `index.html` (3x) e em `obrigado.html` (2x)
- `https://pay.kiwify.com.br/SEU_CODIGO` em `index.html` — a URL real do checkout
- Os `href="#"` de `acesso.html` — os links dos PDFs
- O bloco de autoridade de `index.html` — seu nome e sua história, sem inventar credencial

E no Kiwify: redirecionar a compra aprovada para `/obrigado.html`.

### Origem

A estrutura da página vem do `Template_Oficial_MAXXIMA.json` (export do Elementor,
15 blocos) e o padrão da obrigado vem de `trafegopagolowticket.com.br/obrigado/`.
O framework está documentado em `estrutura/framework-maxxima.md` — é o que se reaproveita
para o próximo produto.

### Escopo

Este repositório contém os ativos de marketing e o material do produto. A escolha da
Business Manager e da conta de anúncios é feita manualmente em `business.facebook.com` —
o Bloco 0 do checklist tem os critérios.
