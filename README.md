# vivepipa — landing de conversión · Pipa Ubaia Falésias

Landing page de performance para campañas de **Meta Ads** y **Google Ads** del
emprendimiento *Pipa Ubaia Falésias* (Praia da Pipa, Tibau do Sul/RN, Brasil).

Trilingüe **PT-BR / ES / EN**, con el foco puesto en una sola decisión de
producto: **el precio se comunica como cuota mensual, nunca como valor total**.
El número grande espanta antes de calificar; la cuota entra en la cabeza de
alguien que está scrolleando un anuncio.

- Estructura y racional de conversión → [`docs/ESTRUCTURA.md`](docs/ESTRUCTURA.md)
- Prompt maestro para Lovable → [`docs/PROMPT-LOVABLE.md`](docs/PROMPT-LOVABLE.md)
- Medición, eventos y campañas → [`docs/ADS.md`](docs/ADS.md)

## Stack

Vite + React 18 + TypeScript + Tailwind — el mismo stack que usa Lovable, para
que el repo se pueda abrir ahí sin fricción.

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # genera dist/
npm run lint     # typecheck
```

## Lo único que hay que editar para operar

Todo lo que cambia en el día a día vive en **`src/config/site.ts`**:

| Campo | Qué controla |
|---|---|
| `whatsapp.numero` | número al que caen los leads (hoy el de test) |
| `pagamento.*` | estructura del parcelamiento que alimenta el simulador |
| `estoque.*` | contador de unidades y barra de escasez |
| `tracking.*` | Pixel de Meta, GA4 y Google Ads |
| `leads.endpoint` | webhook del formulario |

> ⚠️ **Las condiciones de pago del simulador son una estructura, no una tabla
> aprobada.** Antes de poner plata en Ads hay que confirmarlas con el comercial
> y ajustar `pagamento` en `src/config/site.ts`. El texto legal que acompaña
> cada resultado ya aclara que la simulación no es una propuesta.

Las variables sensibles van por entorno — ver [`.env.example`](.env.example).

## Datos del proyecto

| | |
|---|---|
| Dirección | Av. Baía dos Golfinhos, 2612 · Praia da Pipa · Tibau do Sul/RN |
| Incorporadora | AR Construções LTDA · SCP 02 |
| Unidades 1ª fase | 71 (45 disponibles, 26 reservadas) |
| Tipologías | 1 y 2 dormitorios · 45 a 67 m² · planta baja con jardín o superior con solárium |
| Entrega prevista | 2028 |
| Registro | R-4-2204 · Alvará 056/2023 · Licencia IDEMA |

El stock real de las 45 unidades está en `src/data/unidades.ts` (bloque,
tipología, superficies, valor de tabla y estado).

## Imágenes

Los 62 renders oficiales están optimizados a WebP ≤1600 px y servidos desde el
propio dominio (`public/img/`, 3,8 MB en total). No dependen del CDN de la
incorporadora: el LCP entra en la nota de calidad de Google Ads.

Para sumar renders nuevos: tirarlos en `assets-raw/` y correr `npm run images`.
El script los convierte y escupe la línea lista para pegar en
`src/data/galeria.ts`, con `width`/`height` incluidos para no romper el CLS.

## Deploy

`netlify.toml` ya deja configurado el build (`dist/`), el fallback de SPA y el
cacheo inmutable de assets. Sirve igual para Vercel o Cloudflare Pages.
