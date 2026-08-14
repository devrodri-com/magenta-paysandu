import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ClientsStrip from "@/app/components/ClientsStrip";
import { ABOUT_STORY, ABOUT_SUMMARY } from "./about";
import { CLIENT_LOGOS } from "./clients";
import {
  MACHINE_IMAGE_NOTE,
  PRINTING_TECHNOLOGIES,
  SERVICE_PILLARS,
} from "./services";
import { TESTIMONIALS } from "./testimonials";

const APPROVED_ABOUT_COPY =
  "Acompañamos principalmente a empresas, comercios y emprendedores de Paysandú, y también trabajamos con clientes de todo Uruguay para transformar sus ideas en productos impresos de calidad.";

const APPROVED_NEW_CLIENTS = [
  {
    id: "condor-informatica",
    name: "Condor Informática",
    alt: "Logo de Condor Informática",
  },
  {
    id: "vital-salud",
    name: "VitalSalud",
    alt: "Logo de VitalSalud",
  },
  {
    id: "cookie-moon",
    name: "Cookie Moon",
    alt: "Logo de Cookie Moon",
  },
  {
    id: "moa-alfajores-artesanales",
    name: "Moá Alfajores Artesanales",
    alt: "Logo de Moá Alfajores Artesanales",
  },
  {
    id: "owl-24hs",
    name: "Owl 24hs",
    alt: "Logo de Owl 24hs",
  },
  {
    id: "jm-aromatizador-vehiculo",
    name: "JM Aromatizador para vehículo",
    alt: "Logo de JM Aromatizador para vehículo",
  },
  {
    id: "inmobiliaria-mannise",
    name: "Inmobiliaria Mannise",
    alt: "Logo de Inmobiliaria Mannise",
  },
  { id: "echart", name: "Echart", alt: "Logo de Echart" },
  {
    id: "green-lemon-baby-kids",
    name: "Green Lemon Baby & Kids",
    alt: "Logo de Green Lemon Baby & Kids",
  },
  { id: "teenagers", name: "Teenagers", alt: "Logo de Teenagers" },
] as const;

function publicAssetPath(assetPath: string) {
  return path.join(process.cwd(), "public", assetPath.replace(/^\//, ""));
}

function pillar(id: string) {
  const match = SERVICE_PILLARS.find((item) => item.id === id);
  expect(match).toBeDefined();
  return match!;
}

function technology(id: string) {
  const match = PRINTING_TECHNOLOGIES.find((item) => item.id === id);
  expect(match).toBeDefined();
  return match!;
}

describe("contenido editorial aprobado", () => {
  it("conserva los títulos, énfasis y textos finales de servicio", () => {
    const runs = pillar("tiradas");
    const delivery = pillar("reparto");

    expect(`${runs.title} ${runs.emphasis}`).toBe(
      "Desde pocas unidades hasta grandes tiradas",
    );
    expect(runs.emphasis).toBe("grandes tiradas");
    expect(runs.copy).toBe(
      "Adaptamos cada trabajo a la cantidad, el formato y las necesidades de cada proyecto.",
    );

    expect(`${delivery.title} ${delivery.emphasis}`).toBe(
      "Reparto semanal y entrega express",
    );
    expect(delivery.emphasis).toBe("entrega express");
    expect(delivery.copy).toBe(
      "Reparto semanal sin costo en Paysandú, coordinado según la producción. También ofrecemos entrega express con costo adicional. Para el resto del país, despachamos por la agencia que elija el cliente.",
    );
  });

  it("usa el párrafo institucional aprobado en ambas superficies", () => {
    expect(ABOUT_STORY[0]).toBe(APPROVED_ABOUT_COPY);
    expect(ABOUT_SUMMARY[0]).toBe(APPROVED_ABOUT_COPY);
  });

  it("identifica las máquinas en HTML y mantiene una sola nota aprobada", () => {
    const offset = technology("offset");
    const digital = technology("digital");
    const plotter = technology("plotter");

    expect(offset).toMatchObject({
      model: "Heidelberg Speedmaster SM 52, 2 cuerpos",
      image: "/images/servicios/2026/heidelberg-speedmaster-sm52.webp",
      imageWidth: 1536,
      imageHeight: 1024,
      imageAlt:
        "Máquina offset Heidelberg Speedmaster SM 52 de dos cuerpos, imagen ilustrativa",
    });
    expect(digital).toMatchObject({
      model: "Konica Minolta AccurioPrint C3070L",
      image:
        "/images/servicios/2026/konica-minolta-accurioprint-c3070l.webp",
      imageWidth: 1536,
      imageHeight: 1024,
      imageAlt:
        "Impresora digital Konica Minolta AccurioPrint C3070L, imagen ilustrativa",
    });
    expect(plotter).toMatchObject({
      image: "/images/servicios/2026/plotter-corte.webp",
      imageWidth: 1200,
      imageHeight: 900,
      imageAlt:
        "Plotter de corte para adhesivos y etiquetas, imagen ilustrativa",
    });
    expect(plotter.model).toBeUndefined();
    expect(MACHINE_IMAGE_NOTE).toBe(
      "Imágenes ilustrativas. Las referencias de impresión offset y digital corresponden a los modelos utilizados por Magenta; el plotter representa la tecnología de corte.",
    );
  });
});

describe("contrato de clientes", () => {
  it("mantiene 27 clientes lógicos, únicos y accesibles", () => {
    expect(CLIENT_LOGOS).toHaveLength(27);
    expect(new Set(CLIENT_LOGOS.map(({ id }) => id)).size).toBe(27);
    expect(new Set(CLIENT_LOGOS.map(({ src }) => src)).size).toBe(27);
    expect(new Set(CLIENT_LOGOS.map(({ name }) => name)).size).toBe(27);

    for (const logo of CLIENT_LOGOS) {
      expect(logo.name.trim()).not.toBe("");
      expect(logo.alt.trim()).not.toBe("");
      expect(existsSync(publicAssetPath(logo.src))).toBe(true);
    }

    const removedId = ["le", "o-burg", "ers"].join("");
    expect(CLIENT_LOGOS.some(({ id }) => id === removedId)).toBe(false);
    expect(existsSync(publicAssetPath("/images/clientes/16.svg"))).toBe(false);
  });

  it("usa literalmente los diez nombres y alt aprobados sin slogans", () => {
    const newClients = APPROVED_NEW_CLIENTS.map(({ id }) =>
      CLIENT_LOGOS.find((client) => client.id === id),
    );

    expect(newClients).toEqual(APPROVED_NEW_CLIENTS.map((approved) =>
      expect.objectContaining(approved),
    ));
    expect(newClients.map((client) => client?.name)).toEqual(
      APPROVED_NEW_CLIENTS.map(({ name }) => name),
    );
    expect(newClients.map((client) => client?.alt)).toEqual(
      APPROVED_NEW_CLIENTS.map(({ alt }) => alt),
    );
    expect(
      newClients.filter(
        (client) =>
          client && client.name === client.name.toLocaleUpperCase("es-UY"),
      ),
    ).toHaveLength(0);
    expect(newClients.map((client) => client?.name).join(" ")).not.toMatch(
      /felicidad en cada mordida|desde 1975 en Paysandú/i,
    );
  });

  it("incorpora los diez logos del PDF como WebP livianos", () => {
    for (const { id } of APPROVED_NEW_CLIENTS) {
      const logo = CLIENT_LOGOS.find((item) => item.id === id)!;
      expect(logo.src.endsWith(".webp")).toBe(true);
      expect(statSync(publicAssetPath(logo.src)).size).toBeLessThan(200 * 1024);
    }
  });

  it("anuncia los clientes una vez y mantiene los clones decorativos ocultos", () => {
    const markup = renderToStaticMarkup(createElement(ClientsStrip));
    const imageAlts = [...markup.matchAll(/<img\b[^>]*\balt="([^"]*)"/g)].map(
      (match) => match[1],
    );

    expect(imageAlts.filter(Boolean)).toHaveLength(27);
    expect(imageAlts.filter((alt) => alt === "")).toHaveLength(27);
    expect(markup).toMatch(/<ul[^>]*aria-hidden="true"/);
  });

  it("mantiene Pio Pio como único testimonio aprobado", () => {
    expect(TESTIMONIALS).toEqual([
      {
        id: "pio-pio",
        businessName: "Pio Pio",
        category: "Gastronomía",
        text: "Los impresos son de excelente calidad y las entregas siempre llegan en tiempo y forma. Además, se adaptan a las necesidades de cada empresa. Los súper recomendamos.",
        logo: "/images/testimonials/pio-pio.svg",
      },
    ]);
  });
});

describe("optimización de maquinaria", () => {
  it("mantiene los dos assets nuevos por debajo de 500 KB", () => {
    for (const id of ["offset", "digital"]) {
      const asset = technology(id).image;
      expect(existsSync(publicAssetPath(asset))).toBe(true);
      expect(statSync(publicAssetPath(asset)).size).toBeLessThan(500 * 1024);
    }
  });
});
