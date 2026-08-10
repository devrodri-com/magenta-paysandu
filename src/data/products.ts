// src/data/products.ts
// Fuente única de las categorías de productos (Refresh 2026 · Visual 02).
// Contenido editorial aprobado por Diana según los productos que más venden.

export type ProductCategory = {
  id: string;
  name: string;
  question: string;
  summary: string;
  image: string;
  alt: string;
  includes: readonly string[];
};

export const PRODUCT_CATEGORIES: readonly ProductCategory[] = [
  {
    id: "volantes",
    name: "Volantes",
    question: "¿Querés llegar a más clientes?",
    summary:
      "Promocioná productos, servicios o eventos con volantes, dípticos y trípticos de excelente calidad.",
    image: "/images/productos/2026/volantes.webp",
    alt: "Ejemplos de volantes, trípticos y menús impresos exhibidos sobre una mesa de la imprenta.",
    includes: ["Volantes", "Dípticos", "Trípticos"],
  },
  {
    id: "libretas",
    name: "Libretas",
    question: "¿Necesitás una libreta para trabajar?",
    summary:
      "Contado, crédito, recibo, presupuestos y más, impresas a medida para tu negocio.",
    image: "/images/productos/2026/libretas.webp",
    alt: "Libretas comerciales de presupuesto, remito, contado, crédito y recibo impresas con distintos colores.",
    includes: ["Contado", "Crédito", "Recibos", "Presupuestos"],
  },
  {
    id: "packaging",
    name: "Packaging",
    question: "¿Querés que tu producto se destaque?",
    summary:
      "Cajas de diferentes modelos, papel antigrasa y bandejas personalizadas que protegen y potencian tu marca.",
    image: "/images/productos/2026/packaging.webp",
    alt: "Packaging gastronómico personalizado: cajas para hamburguesas y papas, caja con manija, bandeja y papel antigrasa.",
    includes: ["Cajas de diferentes modelos", "Papel antigrasa", "Bandejas personalizadas"],
  },
  {
    id: "adhesivos",
    name: "Adhesivos",
    question: "¿Querés que tu marca se vea en todos lados?",
    summary:
      "Etiquetas y stickers personalizados en distintos tamaños y terminaciones.",
    image: "/images/productos/2026/adhesivos.webp",
    alt: "Planchas de stickers y etiquetas adhesivas de distintas formas, tamaños y terminaciones.",
    includes: ["Etiquetas", "Stickers", "Distintos tamaños y terminaciones"],
  },
  {
    id: "revistas",
    name: "Revistas",
    question: "¿Tenés mucho para mostrar?",
    summary:
      "Catálogos y revistas ideales para presentar productos, servicios o proyectos.",
    image: "/images/productos/2026/revistas.webp",
    alt: "Revista impresa con tapa a color y páginas interiores abiertas sobre una mesa.",
    includes: ["Catálogos", "Revistas"],
  },
  {
    id: "bolsas",
    name: "Bolsas",
    question: "¿Querés que recuerden tu marca?",
    summary:
      "Personalizadas con tu logo, en distintos tamaños, papeles y terminaciones.",
    image: "/images/productos/2026/bolsas.webp",
    alt: "Tres bolsas de papel personalizadas con cordón, en distintos tamaños.",
    includes: ["Distintos tamaños", "Papeles personalizados", "Terminaciones personalizadas"],
  },
  {
    id: "papeleria-corporativa",
    name: "Papelería corporativa",
    question: "¿Querés transmitir profesionalismo?",
    summary:
      "Sobres, carpetas, hojas membretadas, tarjetas personales, blocks y todo para tu identidad empresarial.",
    image: "/images/productos/2026/papeleria-corporativa.webp",
    alt: "Papelería corporativa: carpeta, hoja membretada, block, sobre y tarjetas personales de una misma marca.",
    includes: ["Sobres", "Carpetas", "Hojas membretadas", "Tarjetas personales", "Blocks"],
  },
  {
    id: "rollos",
    name: "Rollos",
    question: "¿Necesitás rollos para facturar o cobrar con POS?",
    summary:
      "Rollos térmicos para facturación y POS. También impresos para facturación.",
    image: "/images/productos/2026/rollos-termicos.webp",
    alt: "Rollos térmicos para POS y facturación, junto a rollos impresos personalizados.",
    includes: [
      "Rollos térmicos para POS",
      "Rollos para facturación",
      "Rollos impresos para facturación",
    ],
  },
];

export const OTHER_PRODUCTS: readonly string[] = [
  "Entradas numeradas",
  "Almanaques",
  "Colgantes",
  "Individuales",
  "Formularios autocopiantes",
  "Troquelados especiales",
  "Afiches",
  "Cupones",
  "Tickets",
  "Bonos colaboración",
  "Numerados",
  "Doblados",
];
