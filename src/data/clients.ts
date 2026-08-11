// src/data/clients.ts
// Logos de clientes para la franja de marcas de la Home, en el orden histórico
// de public/images/clientes/. `name` solo se registra cuando la marca es
// legible con certeza en el propio SVG; si falta, el logo se trata como
// imagen decorativa (alt="") y no se anuncia en lectores de pantalla.

export type ClientLogo = {
  id: string;
  src: string;
  name?: string;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "salus", src: "/images/clientes/1.svg", name: "Salus" },
  { id: "estudio-lamas", src: "/images/clientes/2.svg", name: "Estudio Lamas" },
  {
    id: "bodega-wasiluk",
    src: "/images/clientes/3.svg",
    name: "Bodega Wasiluk",
  },
  { id: "bimba-bruder", src: "/images/clientes/4.svg", name: "Bimba Bruder" },
  {
    id: "cocheria-san-jose",
    src: "/images/clientes/5.svg",
    name: "Cochería y Previsora San José",
  },
  { id: "optica-claro", src: "/images/clientes/6.svg", name: "Óptica Claro" },
  { id: "grupo-bidart", src: "/images/clientes/7.svg", name: "Grupo Bidart" },
  { id: "punto-com", src: "/images/clientes/8.svg", name: "Punto Com" },
  {
    id: "paris-londres",
    src: "/images/clientes/9.svg",
    name: "Paris Londres Beer House",
  },
  { id: "ucem", src: "/images/clientes/10.svg", name: "UCEM" },
  { id: "siet", src: "/images/clientes/11.svg", name: "SIET" },
  {
    id: "intendencia-paysandu",
    src: "/images/clientes/12.svg",
    name: "Intendencia Departamental de Paysandú",
  },
  {
    id: "junta-departamental-paysandu",
    src: "/images/clientes/13.svg",
    name: "Junta Departamental de Paysandú",
  },
  { id: "isa", src: "/images/clientes/14.svg", name: "Isa" },
  { id: "pio-pio", src: "/images/clientes/15.svg", name: "Pío Pío" },
  { id: "leo-burgers", src: "/images/clientes/16.svg", name: "Leo Burgers" },
  {
    id: "pontevedra-alimentos",
    src: "/images/clientes/17.svg",
    name: "Pontevedra Alimentos",
  },
  { id: "comepa", src: "/images/clientes/18.svg", name: "COMEPA" },
];
