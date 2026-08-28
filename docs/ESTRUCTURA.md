# Estructura de la landing y racional de conversión

## El diagnóstico de los dos sites

**El site actual del proyecto** (`pipaubaia.com.br/pipa-ubaia-falesias`) no es
una página: es un iframe que apunta a una landing generada por MinhaObra
(`aquinoconstrucoes.com.br/lp/pipa-ubaia-falesias`), renderizada 100% en el
cliente. Consecuencias concretas para pauta:

- **No indexa.** El HTML que llega al robot tiene un título y nada más.
- **No mide.** Un iframe cross-domain rompe el Pixel de Meta y el seguimiento
  de conversiones de Google Ads: la conversión ocurre en otro dominio.
- **No carga rápido.** Bundle de 1,1 MB de JS antes del primer píxel.

Tiene, eso sí, el contenido bueno: 62 renders, plantas humanizadas, 4 estilos de
terminación, el stock real y toda la documentación legal. Ese material es el
activo; el envase es lo que hay que rehacer.

**La referencia (Doisa · Reserva Pipa)** es un site *institucional* de catálogo,
no una landing de performance. Su orden es: marca → destino → arquitectos →
accesos → plantas → tour 360 → tipologías → galería → diferenciales →
sustentabilidad → seguridad → quiénes somos → palabra del CEO → WhatsApp
flotante. Dieciséis bloques hasta llegar a un CTA real. Funciona para una marca
que ya tiene tráfico propio y ciclo largo; **quema presupuesto en Ads**, donde
el 70% del tráfico decide en la primera pantalla.

## La inversión de la pirámide

Para tráfico pago hay que invertir el orden: **oferta y captura arriba, romance
después**. La secuencia de esta landing:

| # | Bloque | Trabajo que hace | Componente |
|---|---|---|---|
| 0 | Header + selector de idioma | Ancla de navegación y CTA siempre presente | `Layout.tsx` |
| 1 | **Hero** | Deseo en 3 s + **ancla de precio en cuota** + doble CTA (formulario / WhatsApp) + sello legal | `Hero.tsx` |
| 2 | **Barra de prueba** | 71 unidades / 45 disponibles / 5.201 m² / 4 estilos + barra de escasez real + "el anterior se vendió 100%" | `ProofBar` |
| 3 | **Por qué ahora** | Las 3 objeciones de compra, respondidas antes de que aparezcan: banco, renta, papeles | `Oferta` |
| 4 | **Simulador** ★ | El corazón. Convierte "¿cuánto sale?" en "¿cuánto queda por mes?" | `Simulador.tsx` |
| 5 | El proyecto | Recién acá empieza lo aspiracional: jardín privativo, solárium, piscina | `Projeto` |
| 6 | Plantas | Planta baja con jardín vs. superior con solárium, con la cuota de cada una | `Tipologias.tsx` |
| 7 | Terminaciones | Navy / Rústico / Clásico / Standard con galería y lightbox | `Acabamentos` |
| 8 | El condominio | Amenities en lista escaneable, no en prosa | `Condominio` |
| 9 | Ubicación | Mapa + distancias reales | `Localizacao` |
| 10 | **Inversión** | El bloque que la referencia no tiene y que más vende: renta de temporada, compra por extranjeros | `Investimento` |
| 11 | **Disponibilidad** | Tabla filtrable del stock real, con la cuota estimada por unidad | `Unidades.tsx` |
| 12 | Quién construye | Seguridad jurídica: registro, alvará, IDEMA, bomberos | `Construtora` |
| 13 | FAQ | Objeciones finales + señal semántica para Google | `Faq` |
| 14 | Formulario | Captura con contexto de dónde vino el clic | `Formulario` |
| 15 | Cierre | Última chance emocional + doble CTA | `ChamadaFinal` |
| — | Sticky mobile + FAB de WhatsApp | El CTA nunca sale de pantalla | `StickyCTA` |

★ = bloque que no existe en ninguno de los dos sites de referencia.

## La decisión de producto: la cuota, no el precio

Es la definición que estructura toda la página. El valor de tabla más bajo del
stock es R$ 579.880. Ese número, solo, en un anuncio de Instagram, hace scroll
hacia arriba.

El mismo valor, desarmado en el plan de pago directo con la incorporadora:

```
Entrada (20%)                R$ 115.976
36 cuotas mensuales (35%)    R$   5.638 / mes   ← lo que comunica la landing
3 refuerzos anuales (15%)    R$  28.994 c/u
Saldo en la entrega (30%)    R$ 173.964
```

**R$ 5.638/mes** es un número con el que alguien se queda pensando. Y como la
composición se muestra completa —barra de porcentajes, refuerzos y saldo de
llaves a la vista—, no hay letra chica: el lead que llega ya sabe la estructura,
que es exactamente lo que sube la calidad del lead y baja el trabajo del equipo
comercial.

El valor total no está oculto: está en `src/data/unidades.ts` y se muestra
cuando el comercial lo manda. Si mañana quieren abrirlo en público, es un flag:
`site.pagamento.exibirValorTotalPublico = true`.

> Los porcentajes de arriba son la **estructura** que ordena el simulador, no
> una tabla comercial aprobada. Confirmarlos con el comercial y ajustar
> `pagamento` en `src/config/site.ts` antes de pautar.

## Escasez honesta

45 disponibles sobre 71 = 63%. La barra muestra ese 63% real, no un "últimas
unidades" inventado. Cuando el comercial actualice el stock se toca
`site.estoque` y la barra sigue. La prueba social más fuerte del proyecto —el
Pipa Ubaia Residence anterior vendido al 100%— va justo debajo.

## Los tres idiomas

Detección por `?lang=` primero (para que la campaña mande el idioma desde la
URL) y por navegador después. Un diccionario por idioma en `src/i18n/`, con el
tipo `Dict` derivado del portugués: si se agrega una clave en `pt.ts`, TypeScript
rompe el build hasta que esté en `es.ts` y `en.ts`. No hay forma de publicar una
traducción a medias.

Los tres no son la misma pieza traducida:

- **PT-BR** — comprador brasileño. Foco en parcelamiento sin banco.
- **ES** — inversor argentino. Suma "¿un argentino puede comprar en Brasil?"
  (CPF, cuenta bancaria) en el FAQ y en el bloque de inversión.
- **EN** — comprador europeo/norteamericano. Mismo eje, vocabulario de
  *short-term rental*.

## Qué falta y quién lo tiene

| Falta | Quién lo tiene |
|---|---|
| Condiciones de pago aprobadas | Comercial de AR Construções |
| Video del emprendimiento | Existe (`PIPAUBAIAWhatsapp.mp4`), no está montado |
| Plantas en PDF para descargar | Incorporadora |
| Escenario de rentabilidad de temporada | Comercial — hoy el CTA promete el estudio |
| Testimonios del Residence anterior | La prueba social más barata que tienen sin usar |
