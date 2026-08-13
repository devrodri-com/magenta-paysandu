import { SEO_CONFIG } from "@/config/seo";

/**
 * Contenido institucional aprobado (Refresh 2026 · Nosotros).
 * Fuente única para la Home (AboutSection), /sobre-nosotros y el Footer:
 * el claim, la historia y los pilares no deben divergir entre superficies.
 */
export const ABOUT_CLAIM = `${SEO_CONFIG.publicFoundingCopy} haciendo tus ideas realidad`;

/** Historia completa: se muestra íntegra solo en /sobre-nosotros. */
export const ABOUT_STORY = [
  "Acompañamos a empresas, comercios y emprendedores de Paysandú a transformar sus ideas en productos impresos de calidad. Combinamos experiencia, atención personalizada y una inversión constante en tecnología para ofrecer más calidad, mejores tiempos de entrega y nuevos productos que acompañen el crecimiento de cada cliente.",
  "Creemos que una imprenta no solo imprime: asesora, propone y acompaña. Por eso trabajamos cerca de cada proyecto, incorporando nuevas máquinas y soluciones que nos permiten seguir evolucionando y brindar un servicio cada vez más completo, rápido y confiable.",
] as const;

/** Versión condensada de la historia para el resumen de la Home. */
export const ABOUT_SUMMARY = [
  "Acompañamos a empresas, comercios y emprendedores de Paysandú a transformar sus ideas en productos impresos de calidad.",
  "Combinamos experiencia, atención personalizada y tecnología para brindar soluciones cada vez más completas, rápidas y confiables.",
] as const;

/** Línea breve de identidad para el Footer. */
export const ABOUT_FOOTER_TAGLINE =
  `${SEO_CONFIG.publicFoundingCopy} acompañando a empresas, comercios y emprendedores.`;

export const MISSION =
  "Ayudar a empresas y emprendedores a convertir sus ideas en productos impresos, ofreciendo calidad, rapidez y atención personalizada en cada proyecto.";

export const VISION =
  "Ser la imprenta referente de Paysandú, reconocida por la innovación, la confianza y un servicio que impulsa el crecimiento de sus clientes.";

export const VALUES = [
  "Calidad sin negociación",
  "Atención personalizada",
  "Rapidez y cumplimiento",
  "Innovación constante",
  "Cercanía y respeto",
  "Compromiso con el crecimiento local",
] as const;
