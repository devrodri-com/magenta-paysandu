import type { MetadataRoute } from "next";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

const BASE_URL = "https://www.magentauruguay.com";

// No incluimos lastModified porque no es requerido y usar new Date() en cada build genera fechas cambiantes
// sin cambios reales, lo cual puede confundir a los motores de búsqueda.
//
// /portfolio sólo entra al sitemap cuando el dataset tiene trabajos reales: con
// PORTFOLIO_ITEMS vacío la ruta responde 404, así que publicarla acá sería
// declarar una URL no indexable.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
    },
    {
      url: `${BASE_URL}/servicios`,
    },
    {
      url: `${BASE_URL}/productos`,
    },
    {
      url: `${BASE_URL}/presupuesto`,
    },
    {
      url: `${BASE_URL}/contacto`,
    },
    {
      url: `${BASE_URL}/sobre-nosotros`,
    },
    {
      url: `${BASE_URL}/testimonios`,
    },
    ...(PORTFOLIO_ITEMS.length > 0
      ? [
          {
            url: `${BASE_URL}/portfolio`,
          },
        ]
      : []),
  ];
}
