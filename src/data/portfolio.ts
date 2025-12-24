export type PortfolioItem = {
  id: string;
  title: string;
  description?: string;
  clientName?: string;
  images: string[];
};

// Convención de assets:
// public/images/portfolio/<id>/<image-name>.jpg (o .png, etc.)
// Ejemplo: public/images/portfolio/bolsas-restaurant/hero.jpg
//          public/images/portfolio/bolsas-restaurant/detalle-1.jpg

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Ejemplo de estructura (comentado para empezar con array vacío):
  // {
  //   id: "bolsas-restaurant",
  //   title: "Bolsas personalizadas para restaurante",
  //   description: "Bolsas de papel kraft con diseño personalizado para comida para llevar.",
  //   clientName: "Restaurante Ejemplo",
  //   images: ["hero.jpg", "detalle-1.jpg"],
  // },
];

