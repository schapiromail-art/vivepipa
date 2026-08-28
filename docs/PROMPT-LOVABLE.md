# Prompt maestro para Lovable

## Antes del prompt: conectar el repo

Este proyecto ya está en el stack nativo de Lovable (Vite + React + TypeScript +
Tailwind), así que se puede trabajar de dos formas:

1. **Repo → Lovable.** En Lovable: *New project → Import from GitHub* y elegir
   `schapiromail-art/vivepipa`. Lovable levanta el proyecto tal cual está y a
   partir de ahí se itera por chat.
2. **Lovable → repo.** Si preferís arrancar el diseño desde cero en Lovable, en
   el proyecto: *GitHub → Connect* y apuntarlo a `schapiromail-art/vivepipa`.
   Ojo: Lovable pushea a la rama que le indiques, así que conviene una rama
   propia para no pisar lo que ya está.

En cualquiera de los dos casos, después hay que cargar en Lovable las variables
de `.env.example` (Pixel, GA4, Google Ads, endpoint de leads).

---

## Prompt

> Copiar de acá para abajo.

```
Construí una landing page de una sola vista, trilingüe (PT-BR / ES / EN), para
campañas de Meta Ads y Google Ads de un emprendimiento inmobiliario de playa.

PROYECTO
Pipa Ubaia Falésias — condominio residencial en Av. Baía dos Golfinhos 2612,
Praia da Pipa, Tibau do Sul/RN, Brasil. Incorporadora: AR Construções LTDA.
12 bloques bajos, 5.201 m² construidos, 71 unidades en la 1ª fase (45
disponibles). Departamentos de 1 y 2 dormitorios, de 45 a 67 m², todos con
cochera. Planta baja con jardín privativo de hasta 26 m²; piso superior con
solárium privativo de hasta 36 m². Cuatro estilos de terminación: Navy,
Rústico, Clásico y Standard. Entrega prevista 2028. Registro de incorporación
R-4-2204, alvará 056/2023, licencia ambiental IDEMA, aprobación de bomberos.

REGLA CENTRAL, NO NEGOCIABLE
El precio se comunica SIEMPRE como cuota mensual, nunca como valor total. El
valor de tabla más bajo es R$ 579.880 y ese número espanta en un anuncio. El
plan es directo con la incorporadora, sin banco: 20% de entrada, 36 cuotas
mensuales, refuerzos anuales del 5% y 30% en la entrega de llaves. La landing
muestra "a partir de R$ 5.638/mes" y despliega la composición completa en una
barra de porcentajes, con el aviso de que es una simulación referencial y no
una propuesta.

ESTRUCTURA, EN ESTE ORDEN
1. Header fijo con logo, navegación, selector PT/ES/EN y CTA. Transparente
   sobre el hero, sólido al scrollear.
2. Hero a pantalla completa con render del proyecto al atardecer. Título
   aspiracional en serif ("Acorde nas falésias de Pipa"), subtítulo con la
   propuesta, caja con la cuota mínima, dos CTAs (formulario + WhatsApp) y una
   línea de sello legal.
3. Barra de prueba: 71 unidades / 45 disponibles / 5.201 m² / 4 estilos, barra
   de progreso con el % real disponible y la línea "el emprendimiento anterior
   se vendió 100%".
4. "Por qué ahora": tres tarjetas — parcelamiento directo sin banco, renta de
   temporada todo el año, obra con todos los papeles.
5. SIMULADOR (el bloque más importante): pestañas por tipología (1 y 2
   dormitorios × jardín y solárium). Al elegir una, muestra la cuota mensual en
   tipografía enorme, la entrada, los refuerzos, la barra de composición del
   plan y un CTA "quiero la tabla completa" que abre el formulario.
6. El proyecto: texto aspiracional + tres escenas (jardín privativo, solárium,
   piscina) + collage de renders.
7. Plantas: dos tarjetas (planta baja con jardín / superior con solárium) con
   superficies, bullets y la cuota desde. Abajo, la planta humanizada del
   bloque, ampliable en lightbox.
8. Terminaciones: pestañas Navy / Rústico / Clásico / Standard con galería y
   lightbox.
9. El condominio: amenities en lista de dos columnas sobre fondo oscuro.
10. Ubicación: mapa embebido + lista de distancias (centro de Pipa caminando,
    Praia do Amor, mirador del Chapadão, aeropuerto de Natal ≈90 km).
11. Inversión: por qué renta todo el año, con bullets y CTA al estudio de
    rentabilidad. Incluir que los extranjeros pueden comprar con CPF y cuenta
    bancaria brasileña.
12. Disponibilidad: tabla filtrable por bloque y por dormitorios, con
    superficie, jardín/solárium, cuota estimada y estado. El valor total NO se
    muestra.
13. Quién construye: la incorporadora + los cuatro sellos de documentación.
14. FAQ en acordeón: cómo funciona el parcelamiento, si un extranjero puede
    comprar, cuándo se entrega, si se puede alquilar por temporada, si viene
    amoblado, si quedan unidades con jardín.
15. Formulario de contacto con nombre, teléfono, email, objetivo y mensaje.
16. Cierre a pantalla ancha sobre render nocturno con doble CTA.
17. Footer con dirección, incorporadora, contacto y el texto legal completo.
+ Barra sticky inferior en mobile (CTA + WhatsApp) y botón flotante de WhatsApp
  en desktop, ambos apareciendo después del hero.

DISEÑO
Editorial y cálido, no corporativo. Serif display (Cormorant Garamond) para
títulos, Inter para texto. Paleta tomada del proyecto: terracota #6B3F3F,
dorado #A57F55, arena #F5EEE5, fondo #FBF8F4, tinta #1A1513. Mucho aire,
imágenes full-bleed, reglas finas doradas, animación de fade-up al scrollear
(respetando prefers-reduced-motion). Alternar secciones claras, arena y
oscuras para dar ritmo. Mobile-first.

CONVERSIÓN Y MEDICIÓN
- Todos los CTAs pasan por un único punto de tracking que dispara en Meta Pixel
  y en Google (GA4 + Google Ads) al mismo tiempo: ver_condicoes, simulou,
  interesse_unidade, contato_whatsapp, lead.
- Capturar utm_source/medium/campaign/content/term, gclid y fbclid al entrar,
  guardarlos en sessionStorage y adjuntarlos al lead y al mensaje de WhatsApp,
  para que el consultor sepa de qué campaña vino.
- El link de WhatsApp lleva mensaje precargado con el contexto del bloque desde
  el que se hizo clic.
- Los IDs de pixel y el endpoint de leads van por variables de entorno, nunca
  hardcodeados.

IDIOMAS
Un diccionario por idioma, tipado a partir del portugués para que falte una
clave rompa el build. Detección por ?lang= primero y por navegador después.
El español apunta al inversor argentino y suma la objeción de comprar en
Brasil siendo extranjero.

PERFORMANCE
Es tráfico pago: el LCP importa. Imágenes en WebP servidas desde el propio
dominio, con width y height declarados para no tener CLS, lazy en todo menos
el hero, que va con preload y fetchpriority alta.
```

## Cómo iterar después

Pedidos concretos funcionan mucho mejor que "mejorá el hero". Ejemplos:

- "En el simulador, agregá un slider de entrada entre 15% y 40% que recalcule
  la cuota en vivo."
- "Sumá un bloque de video antes de las plantas con el render en movimiento."
- "Hacé una variante del hero con el título centrado y el CTA más grande, para
  testear contra la actual."
- "Agregá un exit-intent en desktop que ofrezca la tabla de precios."
