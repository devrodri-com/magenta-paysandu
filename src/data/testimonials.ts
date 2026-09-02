// src/data/testimonials.ts
// Los testimonios provienen de audios o mensajes reales de clientes,
// editados solo para claridad. El branding del cliente (logo, nombre, redes)
// es parte del incentivo para participar en esta sección.

export type Testimonial = {
  id: string;
  text: string;
  businessName: string;
  category?: string;
  relationshipNote?: string;
  logo?: string; // Ruta local dentro de public/ (ej: /images/testimonials/<id>.png), no URL externa
  instagram?: string;
  website?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "pio-pio",
    businessName: "Pio Pio",
    category: "Gastronomía",
    relationshipNote: "Más de 10 años trabajando juntos",
    text: "Los impresos son de excelente calidad y las entregas siempre llegan en tiempo y forma. Además, se adaptan a las necesidades de cada empresa. Los súper recomendamos.",
    logo: "/images/testimonials/pio-pio.svg",
  },
  // Fuente: audio autorizado; antigüedad del vínculo confirmada por Magenta y separada de la cita.
  {
    id: "bodega-wasiluk",
    businessName: "Bodega Wasiluk",
    category: "Vitivinicultura",
    relationshipNote: "Más de 10 años trabajando juntos",
    text: "Magenta siempre nos atiende con rapidez y eficiencia, incluso cuando tenemos una urgencia. Cumple nuestras expectativas, ofrece muy buenos precios y por eso seguimos confiando en su trabajo después de tantos años.",
    logo: "/images/clientes/3.svg",
  },
  // Fuente: audio autorizado por un representante; publicar sin nombre personal.
  {
    id: "condor-informatica",
    businessName: "Condor Informática",
    category: "Tecnología",
    relationshipNote: "Más de 10 años trabajando juntos",
    text: "Buen servicio, atención rápida y una muy buena experiencia trabajando con Magenta. Estamos muy conformes con la atención y la forma de trabajar.",
    logo: "/images/clientes/condor-informatica.webp",
  },
];
