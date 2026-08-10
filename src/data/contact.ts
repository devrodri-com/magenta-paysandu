// src/data/contact.ts
export const WHATSAPP_PHONE_E164 = "59898273040";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_E164}`;
export const WHATSAPP_URL_TEXT = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent("Hola! Quiero pedir un presupuesto.")}`;

/** Variante para consultas generales (no de presupuesto). */
export const WHATSAPP_URL_TEXT_CONSULTA = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent("Hola! Quiero hacer una consulta.")}`;

/** Número tal como se comunica públicamente (equivale a WHATSAPP_PHONE_E164). */
export const WHATSAPP_DISPLAY = "098 273 040";

export const CONTACT_EMAIL = "info@magentauruguay.com";

/** Mailto simple para consultas generales; la plantilla de presupuesto vive en MAILTO_PRESUPUESTO. */
export const MAILTO_CONTACTO = `mailto:${CONTACT_EMAIL}`;

/**
 * Redes oficiales. URLs idénticas a las que hoy usa la Navbar; migrar ese
 * componente a estas constantes queda para una fase de hardening.
 */
export const INSTAGRAM_URL = "https://instagram.com/magentapaysandu";
export const FACEBOOK_URL = "https://facebook.com/magentapaysandu";

export const CONTACT_ADDRESS = "Proyectada 46 Nte. 987";
export const CONTACT_CITY = "60000 Paysandú, Uruguay";
export const CONTACT_HOURS = "Lunes a viernes, 9:00 a 17:00 h";

const MAPS_QUERY = encodeURIComponent(
  `${CONTACT_ADDRESS}, ${CONTACT_CITY}`,
);
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const MAPS_LINK_URL = `https://www.google.com/maps?q=${MAPS_QUERY}`;
export const MAILTO_PRESUPUESTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Solicitud de presupuesto - Imprenta Magenta")}&body=${encodeURIComponent("Hola Magenta!%0D%0A%0D%0AQuiero solicitar un presupuesto para:%0D%0A-%20Producto:%0D%0A-%20Cantidad:%0D%0A-%20Medidas:%0D%0A-%20Terminación:%0D%0A-%20Fecha estimada:%0D%0A%0D%0AGracias!")}`;
