# Imprenta Magenta Paysandú — Website MVP

[![CI](https://github.com/devrodri-com/magenta-paysandu/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/devrodri-com/magenta-paysandu/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.6-149eca)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)](https://www.typescriptlang.org)

Sitio institucional y de captación de pedidos de **Imprenta Magenta**
(Grupo Magenta SAS), imprenta de Paysandú, Uruguay, activa desde 2010.
El sitio presenta el catálogo, los servicios de producción y un formulario de
solicitud de presupuesto que entrega el pedido por email transaccional.

---

## Estado

**MVP público en etapa pre-cutover.** La aplicación se encuentra disponible en
Vercel para revisión y validación. El dominio
[www.magentauruguay.com](https://www.magentauruguay.com) continúa sirviendo
temporalmente el sitio anterior y será migrado mediante un cutover
independiente.

**URL recomendada hoy:** https://magenta-paysandu.vercel.app

| Elemento | Estado (verificado el 2026-08-15) |
| --- | --- |
| `https://magenta-paysandu.vercel.app` | Despliegue vigente del MVP. Responde 200 con `X-Robots-Tag: noindex, follow`. |
| `https://www.magentauruguay.com` | Dominio canónico objetivo. Hoy responde con el sitio WordPress anterior; cutover pendiente. |
| `https://magenta-paysandu-m5in.vercel.app` | Proyecto Vercel secundario conectado al mismo repositorio. No es el canónico y no se recomienda como URL pública. |
| Indexación | Deshabilitada en todos los entornos: `SEO_INDEXING_ENABLED` permanece en `false` hasta el cutover. |

Toda la metadata (`canonical`, `og:url`, JSON-LD) ya apunta al dominio
canónico, de modo que ningún despliegue de revisión compite por el ranking, y
ninguno redirige al sitio anterior.

Tras el cutover corresponde actualizar este README, el *About* del repositorio,
el gate de indexación y la verificación del dominio productivo.

---

## Problema de negocio y usuarios

La imprenta recibía pedidos por WhatsApp y teléfono sin un formato común, lo
que obligaba a un ida y vuelta para reunir los datos mínimos de una cotización
(producto, cantidad, medidas, terminación, plazo).

- **Usuario primario:** empresas, comercios y emprendedores de Paysandú y del
  resto de Uruguay que necesitan cotizar un trabajo impreso.
- **Usuario interno:** el equipo de Magenta, que recibe el pedido ya
  estructurado en su casilla, con las preguntas orientativas del tipo de
  trabajo ya respondidas o planteadas.

---

## Funcionalidades implementadas

Todo lo listado existe en el código de este repositorio y se puede reproducir
localmente con los comandos de la sección [Validación](#validación).

- **Páginas públicas:** Home, `/productos`, `/servicios`, `/sobre-nosotros`,
  `/contacto`, `/presupuesto`, `/testimonios`, más un 404 propio.
- **Formulario de presupuesto** (`/presupuesto`): selector accesible de tipo de
  trabajo, preguntas orientativas derivadas del tipo elegido, validación y
  normalización server-side, honeypot, tiempo mínimo de envío, verificación de
  Cloudflare Turnstile contra Siteverify y entrega por Resend en texto y HTML
  con `Reply-To` al cliente. Requiere las cinco variables de entorno; sin ellas
  devuelve `configuration_error` y no envía nada.
- **Control de indexación por entorno:** gate server-only de dos condiciones
  (`SEO_INDEXING_ENABLED === "true"` **y** `VERCEL_ENV === "production"`) que
  gobierna `robots.txt`, `sitemap.xml`, la metadata `robots` de cada página y la
  cabecera `X-Robots-Tag` emitida desde `src/proxy.ts`.
- **Política de rutas incompletas:** `/portfolio` responde **404 + noindex**
  mientras `PORTFOLIO_ITEMS` esté vacío, en lugar de publicar una página
  placeholder. `/testimonios` es accesible pero queda fuera del sitemap y de la
  matriz indexable.
- **Metadata y entidad:** títulos y descripciones por ruta, canonical absoluto,
  Open Graph con imagen 1200×630, Twitter card, favicons, manifest y un grafo
  JSON-LD con un único nodo `WebSite` y un único `LocalBusiness`, serializado
  con escape de caracteres peligrosos.
- **Redirects legacy:** siete redirects permanentes desde las URLs del sitio
  WordPress anterior, con la lista congelada por test.
- **Contenido tipado:** productos, servicios, preguntas del formulario,
  testimonios, logos de clientes y datos de contacto viven en `src/data/` como
  fuente única, sin duplicar copy entre páginas.

---

## Arquitectura

Aplicación Next.js con App Router, sin base de datos ni backend propio. El
único efecto externo es el envío de un email transaccional.

```
Navegador
   │
   ├── Server Components  →  HTML con metadata por ruta (src/app/**/page.tsx)
   │                          y datos tipados de src/data/
   │
   ├── src/proxy.ts       →  añade X-Robots-Tag: noindex, follow
   │                          cuando la request no cumple el gate
   │
   └── QuoteForm (client) →  Server Action submitQuoteRequest
                                 │
                                 ├─ 1. validar + normalizar (src/lib/quote-request.ts)
                                 ├─ 2. honeypot y tiempo mínimo
                                 ├─ 3. leer configuración de entorno
                                 ├─ 4. Turnstile Siteverify (src/lib/turnstile.ts)
                                 └─ 5. Resend (src/lib/quote-email.ts)
```

El orden importa y está cubierto por tests: **si Turnstile no queda verificado,
Resend no se invoca**. El código de cliente se limita al formulario y a la
navegación; el resto son Server Components.

Puntos de decisión centralizados:

- `src/config/seo.ts` — origen canónico, matriz de rutas indexables, gate de
  indexación, metadata por ruta y JSON-LD.
- `src/data/contact.ts` — teléfono, email, dirección y horarios, consumidos por
  el sitio y por el JSON-LD.
- `src/data/questionSets.ts` — allowlist de tipos de trabajo del formulario.

---

## Stack

Tomado de `package.json` y de los archivos de configuración.

| Capa | Tecnología |
| --- | --- |
| Framework | Next.js 16.3.1 (App Router) |
| UI | React 19.2.6, TypeScript 5 |
| Estilos | Tailwind CSS 4.3 vía `@tailwindcss/postcss` |
| Iconos | react-icons 5 |
| Email | Resend 6.18.1 |
| Anti-abuso | Cloudflare Turnstile (Siteverify, sin SDK) |
| Tests unitarios | Vitest 4.1.10 |
| Tests de contrato | `node:test` sobre TypeScript transpilado en memoria |
| Lint | ESLint 9 con `eslint-config-next` |
| Hosting | Vercel |
| CI | GitHub Actions |

Requiere **Node.js 20** (la versión usada por CI).

---

## Estructura del repositorio

```
src/
 ├─ app/
 │   ├─ page.tsx                  → Home
 │   ├─ layout.tsx                → metadata global, Navbar, Footer
 │   ├─ not-found.tsx             → 404 propio, noindex, sin canonical
 │   ├─ robots.ts, sitemap.ts     → generados según el gate de indexación
 │   ├─ manifest.ts               → webmanifest
 │   ├─ components/               → Navbar, Footer, Hero, cards, secciones
 │   ├─ productos/ servicios/     → catálogo y servicios
 │   ├─ sobre-nosotros/ contacto/ → institucional y contacto
 │   ├─ testimonios/              → accesible, fuera del sitemap
 │   ├─ portfolio/                → 404 mientras el dataset esté vacío
 │   └─ presupuesto/              → formulario + Server Action + Turnstile
 ├─ config/seo.ts                 → configuración SEO y de indexación
 ├─ data/                         → contenido tipado (fuente única)
 ├─ lib/                          → validación, email y Turnstile
 └─ proxy.ts                      → cabecera X-Robots-Tag por request
docs/refresh-2026/                → documentación operativa del formulario
public/images/                    → logos, mockups y recursos visuales
scripts/validate-seo-http.mjs     → validador HTTP contra un servidor local
tests/seo-contract.test.mjs       → contrato SEO, redirects y política editorial
.github/workflows/ci.yml          → pipeline de CI
```

---

## Instalación y desarrollo

```bash
npm ci
npm run dev
```

Abrir `http://localhost:3000`.

El formulario de presupuesto necesita variables de entorno para completar un
envío; sin ellas el resto del sitio funciona y `/presupuesto` muestra un error
de configuración recuperable en vez de aparentar que envía.

Build de producción:

```bash
npm run build
npm start
```

---

## Variables de entorno

Copiar `.env.example` a `.env.local` (no versionado) o configurarlas en el
panel del proveedor. **Este repositorio no contiene valores reales.**

| Nombre | Ámbito | Para qué |
| --- | --- | --- |
| `RESEND_API_KEY` | servidor | Autenticación con Resend. |
| `MAGENTA_QUOTE_FROM` | servidor | Remitente del email de presupuesto. |
| `MAGENTA_QUOTE_TO` | servidor | Destinatario operativo del pedido. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | cliente | Sitekey del widget. Es pública por definición y llega al navegador. |
| `TURNSTILE_SECRET_KEY` | servidor | Secreto de Siteverify. Nunca lleva el prefijo `NEXT_PUBLIC_`. |
| `SEO_INDEXING_ENABLED` | servidor | Gate de indexación. Sólo el literal `true` habilita, y únicamente con `VERCEL_ENV=production`. Permanece en `false` hasta el cutover. |
| `TURNSTILE_ALLOW_LOCALHOST` | servidor | Opcional, sólo desarrollo y testing: agrega `localhost` y `127.0.0.1` a los hostnames aceptados por Siteverify. No debe cargarse en Preview ni en Production. |

`/presupuesto` se prerenderiza como estático: cambiar la Sitekey exige un nuevo
deploy, no alcanza con editar la variable en el panel.

Detalle operativo completo en
[`docs/refresh-2026/presupuesto-email-setup.md`](docs/refresh-2026/presupuesto-email-setup.md).

---

## Validación

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm test            # Vitest · 85 tests en 5 archivos
npm run test:seo    # node:test · 12 tests de contrato SEO
```

Validador HTTP sobre un servidor real. Requiere un build previo y el puerto
3101 libre:

```bash
npm run build
npm run start -- -H 127.0.0.1 -p 3101
```

En otra terminal:

```bash
npm run validate:seo-http
```

Comprueba, contra respuestas HTTP reales, los códigos de estado, `title`,
`description`, `canonical`, `og:url`, la cabecera `X-Robots-Tag`, el JSON-LD de
la Home, el contenido de `robots.txt` y `sitemap.xml`, los siete redirects
legacy con y sin query string, la normalización de barra final y que rutas
antiguas no listadas terminen en 404 sin desviarse a páginas comerciales.
Imprime un informe JSON con `"status": "PASS"`.

Los cuatro comandos y el flujo HTTP se ejecutaron en este repositorio con
Node 20.19.4 y pasan.

---

## CI/CD

`.github/workflows/ci.yml` corre en cada pull request y en cada push a `main`,
con permisos `contents: read`:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm test`
5. `npm run test:seo`
6. Build **prelaunch** (`SEO_INDEXING_ENABLED=false`, `VERCEL_ENV=preview`) y
   validación HTTP contra ese build.
7. Build de **simulación de cutover** (`SEO_INDEXING_ENABLED=true`,
   `VERCEL_ENV=production`) y validación HTTP con el host canónico y con un
   host `.vercel.app`, para comprobar que sólo el canónico quedaría indexable.

El paso 7 verifica el comportamiento futuro sin habilitarlo: el gate real sigue
en `false`.

`.github/dependabot.yml` abre PRs semanales de npm (hasta 5 abiertas),
ignorando saltos de major.

Los deploys los realiza Vercel a partir de este repositorio. Hay **dos
proyectos Vercel** conectados al mismo repo, por lo que cada push genera dos
despliegues; sólo `magenta-paysandu` es el proyecto canónico.

---

## Seguridad y límites de confianza

Lo que sigue describe controles presentes en el código y cubiertos por tests.
No es una auditoría de seguridad ni una afirmación de que el sistema sea
invulnerable.

**Entrada del formulario**

- Normalización de caracteres de control y de formato (`\p{Cf}`) antes de
  validar, en una línea y en multilínea.
- Límites de longitud por campo y validación propia de email, incluyendo el
  rechazo de valores que podrían romper una cabecera (`<`, `>`, comas).
- `jobType` se valida contra una allowlist derivada de `QUESTION_SETS`; no se
  acepta un valor arbitrario.
- Honeypot (`website`) y tiempo mínimo de envío (1500 ms).
- Escape HTML del contenido del email; el asunto y el destinatario se sanitizan
  a una sola línea.

**Verificación anti-abuso**

- Turnstile se verifica server-side contra Siteverify y se exige `success`,
  `action` **y** `hostname` dentro de una lista fija.
- Falla cerrado: timeout (≈9 s), error de red, HTTP no OK o respuesta ilegible
  devuelven un resultado no verificado, nunca un pase libre.
- `localhost` sólo se acepta con `TURNSTILE_ALLOW_LOCALHOST=true`; la lista no
  se deriva de `NODE_ENV` ni se amplía en silencio.
- El token viaja en un único input oculto, es de un solo uso y no se registra.

**Secretos y datos**

- `RESEND_API_KEY` y `TURNSTILE_SECRET_KEY` se leen sólo en el servidor. La
  única variable con prefijo `NEXT_PUBLIC_` es la Sitekey, pública por diseño.
- `.gitignore` excluye `.env*` salvo `.env.example`, que no contiene valores.
- **No hay base de datos ni almacenamiento de archivos.** Los datos del
  formulario existen sólo durante la request y viajan al destinatario por
  email.
- Los errores devueltos al cliente son genéricos: no exponen `error-codes` de
  Cloudflare, el hostname observado, la respuesta de Siteverify, el token, la
  IP ni stack traces.

**Superficie pública**

- `X-Robots-Tag: noindex, follow` en toda request que no cumpla el gate de
  indexación, con el matcher excluyendo `robots.txt`, `sitemap.xml`, el
  manifest y los assets estáticos.
- El JSON-LD se serializa escapando `<`, `>`, `&`, U+2028 y U+2029.
- Los redirects legacy son una lista cerrada de destinos relativos; un test
  bloquea comodines, destinos absolutos y redirecciones a `.vercel.app`.

---

## Limitaciones y trabajo no implementado

- **Cutover pendiente.** El dominio canónico sigue sirviendo el sitio anterior y
  la indexación está deshabilitada hasta la migración.
- **Sin rate limiting persistente.** El baseline es Turnstile server-side +
  honeypot + tiempo mínimo + token de un solo uso + la cuota de Resend. No se
  implementó un contador en memoria ni por cookie porque no es confiable en
  serverless.
- **Entrega de email no verificada de extremo a extremo en este repositorio.**
  El tramo «token válido → email recibido» requiere claves productivas y el
  dominio remitente verificado en Resend; localmente sólo está cubierto con
  `fetch` mockeado. Las claves de prueba de Cloudflare no devuelven `action` y
  fallan cerrado por diseño.
- **`/portfolio` no tiene contenido.** `PORTFOLIO_ITEMS` está vacío, así que la
  ruta responde 404. La página y el sitemap ya contemplan el caso con
  contenido, pero además hace falta marcar la aprobación editorial
  (`PORTFOLIO_EDITORIALLY_APPROVED`).
- **`/testimonios` tiene un solo testimonio** y queda deliberadamente fuera del
  sitemap.
- **Sin métricas de rendimiento medidas en este repositorio.** No hay Lighthouse
  CI, presupuesto de performance ni resultados de Core Web Vitals versionados.
- **Sin analytics, CRM, base de datos, autenticación ni panel de
  administración.** No están en el alcance de esta fase.
- **Sin tests de interfaz ni end-to-end.** La cobertura automatizada es de
  lógica (Vitest) y de contrato HTTP/SEO.

---

## Enlaces

- **MVP en línea (URL recomendada):** https://magenta-paysandu.vercel.app
  *(noindex)*
- **Dominio canónico objetivo:** https://www.magentauruguay.com *(hoy sirve el
  sitio anterior; cutover pendiente)*
- **Documentación operativa del formulario:**
  [`docs/refresh-2026/presupuesto-email-setup.md`](docs/refresh-2026/presupuesto-email-setup.md)
- **Política de reporte de vulnerabilidades:** [`SECURITY.md`](SECURITY.md)

---

## Créditos y licencia

- **Diseño y desarrollo:** Rodrigo Opalo — https://www.devrodri.com
- **Branding e identidad:** Imprenta Magenta Paysandú
- **Mockups y recursos visuales del MVP actual:** generados con GPT Image 2,
  seleccionados y optimizados para uso web

Software propietario, de uso exclusivo de Imprenta Magenta Paysandú. El
repositorio es público para consulta, pero **no incluye un archivo de licencia**
y, por lo tanto, no otorga permisos de uso, copia, modificación ni
redistribución. Contribuciones externas no abiertas.
