# Medición y campañas

## Los eventos que dispara la landing

Todo pasa por `track()` en `src/lib/tracking.ts`, un único punto de salida que
dispara **en Meta y en Google a la vez**, para que las dos plataformas optimicen
por la misma señal.

| Evento interno | Meta | Google | Cuándo |
|---|---|---|---|
| `ver_condicoes` | `ViewContent` | `ver_condicoes` | Abre el formulario desde cualquier CTA |
| `simulou` | `CustomizeProduct` | `simulou` | Cambia de tipología en el simulador |
| `interesse_unidade` | `AddToCart` | `interesse_unidade` | Clic en una unidad de la tabla |
| `contato_whatsapp` | `Contact` | `contato_whatsapp` | Abre WhatsApp |
| `lead` | `Lead` | `lead` + conversión de Google Ads | Envía el formulario |
| `viu_planta`, `viu_acabamento`, `abriu_faq` | custom | custom | Señales de interés para audiencias |

Cada evento lleva `contexto` (de qué bloque salió) y `origem` (la campaña).

### Qué optimizar

- **Campaña de conversión:** optimizar por `lead`. Es el evento con intención
  real y el que dispara la conversión en Google Ads.
- **Si el volumen no alcanza** para salir de la fase de aprendizaje (menos de
  ~50 `lead` por semana), optimizar por `ver_condicoes` o `contato_whatsapp`
  las primeras dos semanas y recién ahí pasar a `lead`.
- **Remarketing:** audiencias de `simulou` y `interesse_unidade`. Es gente que
  ya vio la cuota y siguió mirando — el segmento más caliente que produce la
  página.

## Configuración

En `.env` (o en las variables de entorno de Netlify/Vercel/Lovable):

```
VITE_META_PIXEL_ID=
VITE_GA4_ID=
VITE_GOOGLE_ADS_ID=AW-XXXXXXXXX
VITE_GOOGLE_ADS_LEAD_LABEL=xxxxxxxxxxxxx
VITE_LEADS_ENDPOINT=
```

Si un ID está vacío, ese script **no se inyecta**: la página no carga nada que
no esté configurado. En desarrollo, `track()` loguea en consola.

> Faltando `VITE_LEADS_ENDPOINT`, el formulario entra en modo demo: valida,
> muestra el mensaje de éxito y deja el lead en la consola. Sirve para test,
> **no para producción**.

## UTMs y atribución

Al cargar la página se capturan `utm_source`, `utm_medium`, `utm_campaign`,
`utm_content`, `utm_term`, `gclid` y `fbclid`, y se guardan en `sessionStorage`.
Desde ahí van:

1. **Al payload del lead**, para que el CRM sepa de qué campaña vino.
2. **Al mensaje precargado de WhatsApp**, como `[origem: ...]`, para que el
   consultor lo vea sin abrir ningún panel.

Esquema sugerido de UTMs:

```
utm_source=meta|google
utm_medium=paid_social|cpc
utm_campaign=falesias_pt_conversao | falesias_es_arg | falesias_en_intl
utm_content=<creativo o grupo de anuncios>
```

Para forzar el idioma desde el anuncio, sumar `?lang=pt|es|en`. Ejemplo:

```
https://…/?lang=es&utm_source=meta&utm_medium=paid_social&utm_campaign=falesias_es_arg
```

## Las tres campañas

| | PT-BR | ES | EN |
|---|---|---|---|
| Público | Natal, Recife, João Pessoa, SP, RJ | AR (CABA, Córdoba, Rosario) | Europa / EEUU |
| Ángulo | Parcelamiento sin banco | Comprar en Brasil, dolarizar | Short-term rental yield |
| Objeción principal | "¿Y si no me aprueban?" | "¿Puedo comprar siendo extranjero?" | "¿Cómo administro a distancia?" |
| CTA que mejor rinde | WhatsApp | Formulario (huso horario) | Formulario |
| Landing | `?lang=pt` | `?lang=es` | `?lang=en` |

## Antes de poner plata

- [ ] Confirmar las condiciones de pago con el comercial y ajustar
      `site.pagamento` — hoy son una estructura, no una tabla aprobada
- [ ] Cargar Pixel, GA4 y Google Ads, y verificar los eventos con el
      *Meta Pixel Helper* y el *Tag Assistant*
- [ ] Conectar `VITE_LEADS_ENDPOINT` a un webhook real y probar un lead punta
      a punta
- [ ] Cambiar `site.whatsapp.numero` del número de test al comercial, y
      confirmar que el equipo responde en minutos en horario comercial
- [ ] Actualizar `site.estoque` con el stock del día
- [ ] Correr PageSpeed en mobile — el LCP entra en la nota de calidad
- [ ] Definir quién actualiza el stock y cada cuánto: una tabla desactualizada
      es la forma más rápida de quemar la confianza que la página construye
