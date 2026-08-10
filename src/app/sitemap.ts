import type { MetadataRoute } from "next";

// No incluimos lastModified porque no es requerido y usar new Date() en cada build genera fechas cambiantes
// sin cambios reales, lo cual puede confundir a los motores de búsqueda.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.magentauruguay.com/",
    },
    {
      url: "https://www.magentauruguay.com/servicios",
    },
    {
      url: "https://www.magentauruguay.com/productos",
    },
    {
      url: "https://www.magentauruguay.com/presupuesto",
    },
    {
      url: "https://www.magentauruguay.com/contacto",
    },
    {
      url: "https://www.magentauruguay.com/sobre-nosotros",
    },
    {
      url: "https://www.magentauruguay.com/testimonios",
    },
    {
      url: "https://www.magentauruguay.com/portfolio",
    },
  ];
}
