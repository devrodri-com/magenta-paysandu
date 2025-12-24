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
    id: "ejemplo",
    businessName: "Nombre del negocio",
    category: "Rubro del comercio",
    text: "Acá se va a mostrar la experiencia real de un cliente de Imprenta Magenta. El testimonio surge de un mensaje o audio del cliente, editado solo para claridad, donde cuenta qué trabajo se realizó y cómo fue trabajar con Magenta.",
    logo: "/images/testimonials/placeholder2.png",
    instagram: "https://instagram.com/negocio",
    website: "https://www.negocio.com",
  },
];

