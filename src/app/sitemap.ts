import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.magentauruguay.com/",
      lastModified: new Date(),
    },
    {
      url: "https://www.magentauruguay.com/servicios",
      lastModified: new Date(),
    },
    {
      url: "https://www.magentauruguay.com/productos",
      lastModified: new Date(),
    },
    {
      url: "https://www.magentauruguay.com/presupuesto",
      lastModified: new Date(),
    },
    {
      url: "https://www.magentauruguay.com/sobre-nosotros",
      lastModified: new Date(),
    },
    {
      url: "https://www.magentauruguay.com/testimonios",
      lastModified: new Date(),
    },
    {
      url: "https://www.magentauruguay.com/portfolio",
      lastModified: new Date(),
    },
  ];
}
