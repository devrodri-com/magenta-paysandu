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
  emphasis?: string;
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
    title: "Desde pocas unidades hasta",
    emphasis: "grandes tiradas",
    copy: "Adaptamos cada trabajo a la cantidad, el formato y las necesidades de cada proyecto.",
  },
  {
    id: "reparto",
    title: "Reparto semanal y",
    emphasis: "entrega express",
    copy: "Reparto semanal sin costo en Paysandú, coordinado según la producción. También ofrecemos entrega express con costo adicional. Para el resto del país, despachamos por la agencia que elija el cliente.",
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
 * Las imágenes son ilustrativas. Offset y digital representan los modelos
 * utilizados por Magenta; el plotter representa la tecnología de corte.
 */
export type PrintingTechnology = {
  id: string;
  name: string;
  model?: string;
  copy: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
};

export const MACHINE_IMAGE_NOTE =
  "Imágenes ilustrativas. Las referencias de impresión offset y digital corresponden a los modelos utilizados por Magenta; el plotter representa la tecnología de corte.";

export const PRINTING_TECHNOLOGIES: PrintingTechnology[] = [
  {
    id: "offset",
    name: "Impresión offset",
    model: "Heidelberg Speedmaster SM 52, 2 cuerpos",
    copy: "Ideal para grandes cantidades y trabajos que requieren consistencia de color en toda la tirada.",
    image: "/images/servicios/2026/impresion-offset.webp",
    imageWidth: 1200,
    imageHeight: 900,
    imageAlt:
      "Máquina offset Heidelberg Speedmaster SM 52 de dos cuerpos, imagen ilustrativa",
  },
  {
    id: "digital",
    name: "Impresión digital",
    model: "Konica Minolta AccurioPrint C3070L",
    copy: "Ideal para tiradas cortas y piezas que requieren flexibilidad o personalización.",
    image: "/images/servicios/2026/impresion-digital.webp",
    imageWidth: 1200,
    imageHeight: 900,
    imageAlt:
      "Impresora digital Konica Minolta AccurioPrint C3070L, imagen ilustrativa",
  },
  {
    id: "plotter",
    name: "Plotter de corte",
    copy: "Ideal para adhesivos, etiquetas y piezas con formas especiales.",
    image: "/images/servicios/2026/plotter-corte.webp",
    imageWidth: 1200,
    imageHeight: 900,
    imageAlt:
      "Plotter de corte para adhesivos y etiquetas, imagen ilustrativa",
  },
];
