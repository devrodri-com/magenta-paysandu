import { SEO_CONFIG } from "@/config/seo";

/**
 * Titular y frase de cierre compartidos por la Home (ServicesOverview) y
 * /servicios: el spec pide que sean idénticos en ambas superficies.
 */
export const SERVICES_HEADLINE = "Hacemos mucho más de lo que imaginás.";
export const SERVICES_CLOSING =
  "Si se puede hacer en papel, probablemente podamos hacerlo.";

/**
 * Pilares de servicio: cómo trabaja Magenta. Fuente única para la Home
 * (ServicesOverview) y /servicios, así el contenido no diverge.
 */
export type ServicePillar = {
  id: string;
  title: string;
  copy: string;
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "asesoramiento",
    title: "Te asesoramos",
    copy: "Para elegir la mejor opción para tu proyecto.",
  },
  {
    id: "diseno",
    title: "Diseñamos para vos",
    copy: "Creamos la imagen y adaptamos el diseño a cada pieza.",
  },
  {
    id: "tiradas",
    title: "Desde pocas unidades",
    copy: "Trabajamos desde pocas unidades hasta grandes tiradas, adaptando cada trabajo a tu necesidad.",
  },
  {
    id: "reparto",
    title: "Reparto y envíos",
    copy: `${SEO_CONFIG.delivery.local} ${SEO_CONFIG.delivery.national}`,
  },
  {
    id: "integral",
    title: "Todo en un solo lugar",
    copy: "Combinamos técnicas y terminaciones para que resuelvas todo con un solo proveedor.",
  },
];

/**
 * Tecnologías de impresión: respaldo técnico secundario de /servicios.
 * El copy explica cuándo conviene cada proceso, en lenguaje no técnico.
 * Las imágenes 2026 son generadas (no fotografías de las máquinas del
 * taller), por eso no se etiquetan con marcas ni modelos concretos.
 */
export type PrintingTechnology = {
  id: string;
  name: string;
  copy: string;
  image: string;
  imageAlt: string;
};

export const PRINTING_TECHNOLOGIES: PrintingTechnology[] = [
  {
    id: "offset",
    name: "Impresión offset",
    copy: "Ideal para grandes cantidades y trabajos que requieren consistencia de color en toda la tirada.",
    image: "/images/servicios/2026/impresion-offset.webp",
    imageAlt: "Prensa industrial de impresión offset en taller gráfico",
  },
  {
    id: "digital",
    name: "Impresión digital",
    copy: "Ideal para tiradas cortas y piezas que requieren flexibilidad o personalización.",
    image: "/images/servicios/2026/impresion-digital.webp",
    imageAlt: "Prensa digital de producción en taller gráfico",
  },
  {
    id: "plotter",
    name: "Plotter de corte",
    copy: "Ideal para adhesivos, etiquetas y piezas con formas especiales.",
    image: "/images/servicios/2026/plotter-corte.webp",
    imageAlt: "Plotter profesional de corte trabajando con adhesivos en taller gráfico",
  },
];
