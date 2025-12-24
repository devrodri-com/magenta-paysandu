export type Product = {
  nombre: string;
  texto: string;
  imagen: string;
  featured?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    nombre: "Bolsas de papel",
    texto:
      "Bolsas personalizadas con tu logo, ideales para locales comerciales, eventos y packaging de marca.",
    imagen: "bolsas.jpg",
    featured: true,
  },
  {
    nombre: "Packaging impreso",
    texto:
      "Cajas, bandejas, papel antigrasa y otros empaques impresos a medida para presentar y proteger tus productos.",
    imagen: "packaging.jpg",
    featured: true,
  },
  {
    nombre: "Folletos y volantes",
    texto:
      "Volantes en distintos formatos para campañas, promociones y comunicados comerciales.",
    imagen: "folletos.jpg",
    featured: true,
  },
  {
    nombre: "Papelería corporativa",
    texto:
      "Tarjetas personales con diferentes papeles y terminaciones, para una primera impresión profesional.",
    imagen: "papeleria.jpg",
    featured: true,
  },
  {
    nombre: "Etiquetas y adhesivos",
    texto:
      "Etiquetas y stickers para productos, packaging y señalización interna.",
    imagen: "etiquetas.jpg",
    featured: false,
  },
  {
    nombre: "Revistas y catálogos",
    texto:
      "Revistas y catálogos impresos con acabado profesional para presentar tu oferta en detalle.",
    imagen: "revistas.jpg",
    featured: false,
  },
];

