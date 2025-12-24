// src/data/contact.ts
export const WHATSAPP_PHONE_E164 = "59898273040";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_E164}`;
export const WHATSAPP_URL_TEXT = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent("Hola! Quiero pedir un presupuesto.")}`;

export const CONTACT_EMAIL = "info@magentauruguay.com";
export const MAILTO_PRESUPUESTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Solicitud de presupuesto - Imprenta Magenta")}&body=${encodeURIComponent("Hola Magenta!%0D%0A%0D%0AQuiero solicitar un presupuesto para:%0D%0A-%20Producto:%0D%0A-%20Cantidad:%0D%0A-%20Medidas:%0D%0A-%20Terminación:%0D%0A-%20Fecha estimada:%0D%0A%0D%0AGracias!")}`;
