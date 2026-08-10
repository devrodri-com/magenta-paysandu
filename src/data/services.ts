// src/data/services.ts

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
    title: "Reparto sin costo",
    copy: "Entregamos en Paysandú sin costo adicional. También entregamos en otras zonas.",
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
 */
export type PrintingTechnology = {
  id: string;
  name: string;
  machine: string;
  copy: string;
  image: string;
  imageAlt: string;
};

export const PRINTING_TECHNOLOGIES: PrintingTechnology[] = [
  {
    id: "offset",
    name: "Impresión offset",
    machine: "Heidelberg Speedmaster",
    copy: "La mejor opción para grandes cantidades: menor costo por unidad y color consistente en toda la tirada.",
    image: "/images/servicios/heidelberg-speedmaster.jpg",
    imageAlt: "Máquina de impresión offset Heidelberg Speedmaster",
  },
  {
    id: "digital",
    name: "Impresión digital",
    machine: "Konica Minolta AccurioPrint C3070L",
    copy: "Ideal para tiradas cortas y trabajos con plazos ajustados: rapidez, colores vibrantes y definición precisa.",
    image: "/images/servicios/konica-c3070l.jpg",
    imageAlt: "Impresora digital Konica Minolta AccurioPrint C3070L",
  },
  {
    id: "plotter",
    name: "Plotter de corte",
    machine: "Toyocut",
    copy: "Corte rápido y preciso para adhesivos y etiquetas con formas especiales.",
    image: "/images/servicios/toyocut.jpg",
    imageAlt: "Plotter de corte Toyocut",
  },
];
