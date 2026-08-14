// src/data/clients.ts
// Logos de clientes para la franja de marcas de la Home. Los clientes
// históricos conservan su orden y los nuevos se agregan según el PDF aprobado.

export type ClientLogo = {
  id: string;
  src: string;
  name: string;
  alt: string;
};

function clientLogo(id: string, src: string, name: string): ClientLogo {
  return { id, src, name, alt: name };
}

export const CLIENT_LOGOS: ClientLogo[] = [
  clientLogo("salus", "/images/clientes/1.svg", "Salus"),
  clientLogo("estudio-lamas", "/images/clientes/2.svg", "Estudio Lamas"),
  clientLogo("bodega-wasiluk", "/images/clientes/3.svg", "Bodega Wasiluk"),
  clientLogo("bimba-bruder", "/images/clientes/4.svg", "Bimba Bruder"),
  clientLogo(
    "cocheria-san-jose",
    "/images/clientes/5.svg",
    "Cochería y Previsora San José",
  ),
  clientLogo("optica-claro", "/images/clientes/6.svg", "Óptica Claro"),
  clientLogo("grupo-bidart", "/images/clientes/7.svg", "Grupo Bidart"),
  clientLogo("punto-com", "/images/clientes/8.svg", "Punto Com"),
  clientLogo(
    "paris-londres",
    "/images/clientes/9.svg",
    "Paris Londres Beer House",
  ),
  clientLogo("ucem", "/images/clientes/10.svg", "UCEM"),
  clientLogo("siet", "/images/clientes/11.svg", "SIET"),
  clientLogo(
    "intendencia-paysandu",
    "/images/clientes/12.svg",
    "Intendencia Departamental de Paysandú",
  ),
  clientLogo(
    "junta-departamental-paysandu",
    "/images/clientes/13.svg",
    "Junta Departamental de Paysandú",
  ),
  clientLogo("isa", "/images/clientes/14.svg", "Isa"),
  clientLogo("pio-pio", "/images/clientes/15.svg", "Pío Pío"),
  clientLogo(
    "pontevedra-alimentos",
    "/images/clientes/17.svg",
    "Pontevedra Alimentos",
  ),
  clientLogo("comepa", "/images/clientes/18.svg", "COMEPA"),
  clientLogo(
    "condor-informatica",
    "/images/clientes/condor-informatica.webp",
    "CONDOR INFORMATICA",
  ),
  clientLogo(
    "vital-salud",
    "/images/clientes/vital-salud.webp",
    "VitalSalud",
  ),
  clientLogo(
    "cookie-moon",
    "/images/clientes/cookie-moon.webp",
    "COOKIE MOON - FELICIDAD EN CADA MORDIDA",
  ),
  clientLogo(
    "moa-alfajores-artesanales",
    "/images/clientes/moa-alfajores-artesanales.webp",
    "MOÁ - ALFAJORES ARTESANALES",
  ),
  clientLogo("owl-24hs", "/images/clientes/owl-24hs.webp", "Owl 24hs"),
  clientLogo(
    "jm-aromatizador-vehiculo",
    "/images/clientes/jm-aromatizador-vehiculo.webp",
    "JM - AROMATIZADOR PARA VEHÍCULO",
  ),
  clientLogo(
    "inmobiliaria-mannise",
    "/images/clientes/inmobiliaria-mannise.webp",
    "INMOBILIARIA MANNISE",
  ),
  clientLogo(
    "echart",
    "/images/clientes/echart.webp",
    "Echart - Desde 1975 en Paysandú",
  ),
  clientLogo(
    "green-lemon-baby-kids",
    "/images/clientes/green-lemon-baby-kids.webp",
    "Green lemon - Baby&kids",
  ),
  clientLogo("teenagers", "/images/clientes/teenagers.webp", "Teenagers"),
];
