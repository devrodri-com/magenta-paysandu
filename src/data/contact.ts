// src/data/contact.ts
export const WHATSAPP_PHONE_E164 = "59898273040";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_E164}`;
export const WHATSAPP_URL_TEXT = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent("Hola! Quiero pedir un presupuesto.")}`;

export const CONTACT_EMAIL = "info@magentauruguay.com";
const MAILTO_PRESUPUESTO_SUBJECT = "Solicitud de presupuesto - Imprenta Magenta";
const MAILTO_PRESUPUESTO_BODY = `Hola Magenta!

Quiero solicitar un presupuesto para:
- Producto:
- Cantidad:
- Medidas:
- Terminación:
- Fecha estimada:

Gracias!`;

export const MAILTO_PRESUPUESTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAILTO_PRESUPUESTO_SUBJECT)}&body=${encodeURIComponent(MAILTO_PRESUPUESTO_BODY)}`;
