# Presupuesto por email · configuración operativa

## Flujo implementado

La página `/presupuesto` mantiene el contenido estático en un Server Component y limita el código de cliente al formulario interactivo. Al enviar, una Server Action normaliza y valida los datos, deriva las preguntas desde `src/data/questionSets.ts`, construye versiones de texto plano y HTML escapado, y recién entonces llama a Resend.

La aplicación no guarda los datos del formulario en una base de datos ni en archivos. El destinatario los recibe únicamente a través del email transaccional solicitado.

## Variables requeridas

Copiar las claves de `.env.example` a un archivo local no versionado, como `.env.local`, o configurarlas en el entorno de Preview/Production del proveedor:

```dotenv
RESEND_API_KEY=
MAGENTA_QUOTE_FROM="Imprenta Magenta Web <presupuestos@send.magentauruguay.com>"
MAGENTA_QUOTE_TO="info@magentauruguay.com"
```

- `RESEND_API_KEY`: secreto server-side emitido por Resend.
- `MAGENTA_QUOTE_FROM`: remitente propuesto para los pedidos web.
- `MAGENTA_QUOTE_TO`: destinatario operativo; en esta fase es `info@magentauruguay.com`.

Nunca guardar la API key ni otros secretos en Git, capturas, logs o documentación versionada. Ninguna de estas variables debe llevar el prefijo `NEXT_PUBLIC_`.

## Requisito de dominio

Antes de una prueba real con el remitente propuesto, hay que agregar y verificar `send.magentauruguay.com` en Resend y publicar los registros DNS que el proveedor indique. Sin esa verificación, Resend no aceptará envíos desde `presupuestos@send.magentauruguay.com`.

## Validación local y en Preview

1. Ejecutar `npm ci`.
2. Ejecutar `npm run lint`, `npm run typecheck`, `npm run test` y `npm run build`.
3. Sin variables configuradas, abrir `/presupuesto`, completar un envío válido y confirmar que aparece un error de configuración recuperable, sin falso éxito ni llamada aceptada por Resend.
4. En un entorno Preview aislado, cargar las tres variables y usar una API key de prueba con el dominio verificado.
5. Enviar un pedido controlado y confirmar en Resend y en `info@magentauruguay.com` que llegan texto y HTML, que el asunto es correcto y que “Responder” apunta al email del cliente.
6. Verificar también un error del proveedor y confirmar que la interfaz conserva los campos y no expone detalles internos.

Una respuesta aceptada por la API no demuestra por sí sola la entrega final al buzón. La prueba real debe registrar el resultado de Resend y la recepción en el destinatario antes de declarar listo el lanzamiento.

## Fuera de alcance de esta fase

- Adjuntos y autorespuestas.
- CRM, Firebase, analytics, base de datos o almacenamiento persistente.
- Templates de marketing o React Email.
- Rate limiting persistente, Cloudflare Turnstile y protección antispam completa.
- Cambios globales del sitio o despliegue a producción.

El honeypot y el control de tiempo mínimo son una barrera básica, no una solución antispam completa. Turnstile o un rate limit persistente siguen siendo un gate previo al lanzamiento definitivo.
