# Presupuesto por email · configuración operativa

## Flujo implementado

La página `/presupuesto` mantiene el contenido estático en un Server Component y limita el código de cliente al formulario interactivo. Al enviar, una Server Action normaliza y valida los datos, deriva las preguntas desde `src/data/questionSets.ts`, verifica el token de Cloudflare Turnstile contra Siteverify y recién entonces construye el email y llama a Resend.

El orden es deliberado y está cubierto por tests: si Turnstile no queda verificado, Resend no se invoca.

1. Parsear y normalizar el `FormData`.
2. Validar honeypot y tiempo mínimo.
3. Validar campos y allowlist de `jobType`.
4. Confirmar que la configuración requerida existe.
5. Verificar el token con Siteverify.
6. Enviar con Resend.
7. Devolver el estado público.

La aplicación no guarda los datos del formulario en una base de datos ni en archivos. El destinatario los recibe únicamente a través del email transaccional solicitado.

## Variables requeridas

Copiar las claves de `.env.example` a un archivo local no versionado o configurarlas en el entorno de Preview/Production del proveedor:

```dotenv
RESEND_API_KEY=
MAGENTA_QUOTE_FROM="Imprenta Magenta Web <presupuestos@send.magentauruguay.com>"
MAGENTA_QUOTE_TO="info@magentauruguay.com"
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

- `RESEND_API_KEY`: secreto server-side emitido por Resend.
- `MAGENTA_QUOTE_FROM`: remitente propuesto para los pedidos web.
- `MAGENTA_QUOTE_TO`: destinatario operativo; en esta fase es `info@magentauruguay.com`.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Sitekey del widget. Es pública por definición y llega al navegador.
- `TURNSTILE_SECRET_KEY`: secreto de Siteverify. Sólo se lee server-side, nunca lleva el prefijo `NEXT_PUBLIC_`.

Sin las cinco variables, el formulario devuelve `configuration_error` y no envía nada. Nunca guardar secretos reales en Git, capturas, logs, fixtures ni documentación versionada.

`/presupuesto` se prerenderiza como estático, así que la Sitekey queda fijada en el build: cambiarla exige un nuevo deploy, no alcanza con editar la variable en el panel.

## Cloudflare Turnstile

El widget se renderiza en modo explícito desde el script oficial
(`api.js?render=explicit`) con `theme=dark`, `language=es`,
`appearance=interaction-only`, `execution=render` y `action=quote_form`. Con
`interaction-only` el desafío permanece oculto salvo que Cloudflare pida
interacción, por lo que el contenedor mide cero y no reserva espacio.

- El tamaño se elige midiendo el contenedor: `flexible` cuando hay 300px o más y
  `compact` por debajo. En 320px de viewport el formulario deja ~240px útiles, así
  que ahí corresponde `compact`.
- El token viaja en un único input oculto, `cf-turnstile-response`. La opción
  `response-field: false` evita que Cloudflare inyecte un segundo input con el
  mismo nombre.
- El token es de un solo uso: después de cada intento de envío el widget se vuelve
  a montar y emite uno nuevo. Los campos escritos se conservan salvo en el éxito,
  donde el formulario se limpia.
- El token nunca se muestra en pantalla ni se registra en consola.

### Hostnames permitidos

`Siteverify` se valida contra `success`, `action` y `hostname`. La lista vive en
`src/lib/turnstile.ts`:

```text
magentauruguay.com
www.magentauruguay.com
magenta-paysandu.vercel.app
magenta-paysandu-git-refresh-magenta-2026-softbms-projects.vercel.app
```

`magenta-paysandu-m5in` queda deliberadamente afuera: ese proyecto duplicado no es
el canónico y no recibirá las variables.

`localhost` y `127.0.0.1` sólo se habilitan con `TURNSTILE_ALLOW_LOCALHOST=true`,
una variable exclusiva de testing y desarrollo. Nunca debe cargarse en Preview ni
en Production: la lista no se amplía en silencio ni se deriva de `NODE_ENV`.

### Decisiones registradas

- **`remoteip` no se envía.** Es opcional en Siteverify y, si la IP que ve el
  hosting no coincide con la que vio Cloudflare —caso habitual en dual stack
  IPv4/IPv6—, un token legítimo se rechaza. El módulo acepta el parámetro y está
  cubierto por tests, pero la Server Action no lo provee.
- **Falla cerrado.** Timeout (≈9s), error de red, HTTP no OK o respuesta ilegible
  devuelven `verification_error`, nunca un pase libre.
- **La Sitekey baja como prop desde `page.tsx`.** Es la única razón por la que se
  tocó ese archivo: resolver `NEXT_PUBLIC_TURNSTILE_SITE_KEY` en el Server
  Component evita depender de que `process.env` quede inlineado en el bundle del
  navegador. Si falta la Sitekey, el formulario muestra `configuration_error` y el
  botón queda deshabilitado, sin aparentar que funciona.

### Claves de prueba

```text
CLOUDFLARE OFFICIAL TEST KEYS
PUBLIC / NON-SECRET
NEVER USE IN PREVIEW OR PRODUCTION
```

Los valores de abajo son las claves de prueba publicadas por Cloudflare en su
documentación. Son públicas y no son secretos, por eso pueden figurar acá. Sirven
únicamente para validación local, pasadas como variables temporales del proceso, y
nunca deben cargarse en Preview ni en Production.

```text
Sitekey  1x00000000000000000000AA  siempre aprueba
Sitekey  2x00000000000000000000AB  siempre bloquea
Sitekey  3x00000000000000000000FF  fuerza desafío interactivo
Secret   1x0000000000000000000000000000000AA  siempre aprueba
Secret   2x0000000000000000000000000000000AA  siempre falla
```

Las claves productivas no se usan en desarrollo.

#### Límite conocido de las claves dummy

Siteverify responde a un token dummy con metadata fija e incompleta:

```json
{ "success": true, "hostname": "example.com", "error-codes": [],
  "metadata": { "result_with_testing_key": true } }
```

No devuelve `action` y el hostname es `example.com`, así que la verificación falla
cerrado con `verification_error` y el envío nunca llega a Resend. **Eso es
correcto, no es una falla del contrato productivo**: el cliente sí envía
`action: "quote_form"` en las opciones de `turnstile.render()` —verificable en el
bundle y en runtime— y un token productivo devuelve esa `action` junto con el
hostname real.

La validación estricta de `action` y `hostname` no se relaja para acomodar las
claves dummy. En consecuencia, el tramo «token válido → email enviado» sólo puede
cerrarse en Preview con las claves productivas; localmente queda cubierto por
tests unitarios con `fetch` mockeado.

## Errores públicos

| Estado | Cuándo |
| --- | --- |
| `validation_error` | Campos, allowlist, honeypot o tiempo mínimo |
| `configuration_error` | Falta alguna de las cinco variables o la Sitekey |
| `verification_error` | Turnstile ausente, inválido, vencido, reutilizado, con `action` u `hostname` incorrectos, o Siteverify inalcanzable |
| `delivery_error` | Resend rechazó o falló el envío |
| `success` | Email aceptado por Resend |

El cliente nunca recibe `error-codes` de Cloudflare, el hostname observado, la
respuesta completa de Siteverify, el token, la IP ni stack traces.

## Requisito de dominio

Antes de una prueba real con el remitente propuesto, hay que agregar y verificar `send.magentauruguay.com` en Resend y publicar los registros DNS que el proveedor indique. Sin esa verificación, Resend no aceptará envíos desde `presupuestos@send.magentauruguay.com`.

## Validación local y en Preview

1. Ejecutar `npm ci`.
2. Ejecutar `npm run lint`, `npm run typecheck`, `npm run test` y `npm run build`.
3. Sin variables configuradas, abrir `/presupuesto`, completar un envío válido y confirmar que aparece un error de configuración recuperable, sin falso éxito ni llamada aceptada por Resend.
4. Levantar el servidor con las claves de prueba de Cloudflare y `TURNSTILE_ALLOW_LOCALHOST=true` como variables del proceso, y revisar en 320, 390, 768 y 1440 que el widget cargue en español, en tema oscuro, sin overflow y sin reservar espacio mientras está oculto.
5. Con la Sitekey que fuerza desafío, comprobar el estado visible, el teclado y el mensaje accesible; con la Sitekey que siempre bloquea, comprobar el error recuperable.
6. Con el secret que siempre falla, enviar y confirmar que llega `verification_error`, que los campos se conservan y que Resend no se invoca.
7. En un entorno Preview aislado, cargar las cinco variables y usar una API key de prueba con el dominio verificado.
8. Enviar un pedido controlado y confirmar en Resend y en `info@magentauruguay.com` que llegan texto y HTML, que el asunto es correcto y que “Responder” apunta al email del cliente.
9. Verificar también un error del proveedor y confirmar que la interfaz conserva los campos y no expone detalles internos.

Una respuesta aceptada por la API no demuestra por sí sola la entrega final al buzón. La prueba real debe registrar el resultado de Resend y la recepción en el destinatario antes de declarar listo el lanzamiento.

## Rate limiting

```text
PERSISTENT_RATE_LIMIT=NOT_IMPLEMENTED
```

No se implementa un rate limit en memoria, con `Map` global, contador local del
proceso ni cookie como única barrera: nada de eso es persistente ni confiable en
serverless, donde cada invocación puede caer en una instancia distinta.

El baseline de lanzamiento es Turnstile server-side + honeypot + tiempo mínimo +
token de un solo uso + la cuota propia de Resend. Una solución durable se evaluará
sólo si aparece abuso real o se aprueba un proveedor externo.

## Fuera de alcance de esta fase

- Adjuntos y autorespuestas.
- CRM, Firebase, analytics, base de datos o almacenamiento persistente.
- Templates de marketing o React Email.
- Rate limiting persistente.
- Cambios globales del sitio o despliegue a producción.
