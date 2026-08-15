# Política de seguridad

## Alcance

Esta política cubre el código de este repositorio: el sitio Next.js de Magenta
Paysandú y su formulario de solicitud de presupuesto.

Queda fuera de alcance la infraestructura de terceros que el proyecto consume
(Vercel, Cloudflare Turnstile, Resend, Google Maps). Los problemas en esos
servicios deben reportarse a sus respectivos proveedores.

## Versiones soportadas

Se mantiene únicamente la rama `main`. No hay versiones anteriores con soporte.

## Cómo reportar una vulnerabilidad

**No abras un issue público** para reportar una vulnerabilidad.

Escribí a **info@magentauruguay.com** con el asunto `Seguridad · magenta-paysandu`
e incluí, en la medida de lo posible:

- una descripción del problema y del impacto que ves;
- los pasos para reproducirlo;
- la URL o el archivo afectado;
- cualquier registro o captura relevante, sin datos de terceros.

Este es un proyecto de un solo mantenedor y no existe un programa de
recompensas ni un compromiso formal de tiempo de respuesta. Se hará lo posible
por acusar recibo y, si el reporte es válido, por corregirlo y comunicar el
resultado.

Pedimos no ejecutar pruebas que degraden el servicio, no acceder a datos que no
sean propios y no divulgar públicamente el problema hasta que exista una
corrección.

## Manejo de secretos

No se conocen credenciales reales versionadas en la revisión actual.
`.env.example` documenta únicamente los nombres y el propósito de las variables
requeridas. `.gitignore` excluye todos los archivos `.env*` salvo ese ejemplo.

Las claves de Cloudflare que figuran en
`docs/refresh-2026/presupuesto-email-setup.md` son las **claves de prueba
públicas** que Cloudflare publica en su documentación. No son secretos y no
deben usarse en Preview ni en Production.

Si detectás una credencial real filtrada en el historial, reportala por el
canal de arriba en lugar de abrir un issue.

## Validación de cambios

Los cambios destinados a `main` se validan mediante controles automatizados de
calidad y compilación.

Estos controles reducen ciertos riesgos, pero no constituyen una auditoría de
seguridad ni una garantía de ausencia de vulnerabilidades.
