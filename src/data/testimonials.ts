// src/data/testimonials.ts
// Los testimonios provienen de audios o mensajes reales de clientes,
// editados solo para claridad. El branding del cliente (logo, nombre, redes)
// es parte del incentivo para participar en esta sección.

export type Testimonial = {
  id: string;
  text: string;
  businessName: string;
  category?: string;
  logo?: string; // Ruta local dentro de public/ (ej: /images/testimonials/<id>.png), no URL externa
  instagram?: string;
  website?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "pio-pio",
    businessName: "Pio Pio",
    category: "Gastronomía",
    text: "Los impresos son de excelente calidad y las entregas siempre llegan en tiempo y forma. Además, se adaptan a las necesidades de cada empresa. Los súper recomendamos.",
    logo: "/images/testimonials/pio-pio.svg",
  },
];

