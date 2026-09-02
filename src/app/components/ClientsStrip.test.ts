import { readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ClientsStrip, {
  getClientCarouselControlLabel,
  getNextClientCarouselPausedState,
} from "./ClientsStrip";

const componentSource = readFileSync(
  path.join(process.cwd(), "src/app/components/ClientsStrip.tsx"),
  "utf8",
);
const globalStyles = readFileSync(
  path.join(process.cwd(), "src/app/globals.css"),
  "utf8",
);

describe("control del carrusel de clientes", () => {
  it("no pausa por hover ni registra handlers de mouse o pointer", () => {
    expect(globalStyles).not.toMatch(
      /clients-marquee-(?:viewport|track)[^{]*:hover[^}]*[\s\S]*?animation-play-state\s*:\s*paused/,
    );
    expect(componentSource).not.toMatch(
      /(?:group-)?hover:\[animation-play-state:paused\]/,
    );
    expect(componentSource).not.toMatch(
      /on(?:Mouse|Pointer)(?:Enter|Leave|Over|Out)\s*=/,
    );
    expect(globalStyles.match(/animation-play-state\s*:\s*paused/g)).toHaveLength(
      1,
    );
    expect(globalStyles).toMatch(
      /\.clients-marquee-track\[data-paused="true"\]\s*{\s*animation-play-state:\s*paused;/,
    );
  });

  it("alterna entre pausa y reanudación mediante el botón", () => {
    expect(getNextClientCarouselPausedState(false)).toBe(true);
    expect(getNextClientCarouselPausedState(true)).toBe(false);
  });

  it("expone el estado inicial y los dos nombres accesibles", () => {
    const markup = renderToStaticMarkup(createElement(ClientsStrip));

    expect(getClientCarouselControlLabel(false)).toBe(
      "Pausar logos de clientes",
    );
    expect(getClientCarouselControlLabel(true)).toBe(
      "Reanudar logos de clientes",
    );
    expect(markup).toMatch(
      /<button[^>]*aria-pressed="false"[^>]*aria-label="Pausar logos de clientes"/,
    );
    expect(markup).toMatch(/data-paused="false"/);
  });

  it("conserva el heading y destaca únicamente la palabra Magenta", () => {
    const markup = renderToStaticMarkup(createElement(ClientsStrip));
    const heading = markup.match(
      /<h2\b[^>]*id="clientes-heading"[^>]*>([\s\S]*?)<\/h2>/,
    )?.[1];

    expect(heading).toBeDefined();
    expect(
      heading
        ?.replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<[^>]+>/g, ""),
    ).toBe("Algunas de las marcas que confían en Magenta");
    expect(heading).toMatch(
      /Algunas de las marcas que confían en(?:<!-- -->)? <span class="text-\[#c3006b\]">Magenta<\/span>/,
    );
    expect(heading?.match(/text-\[#c3006b\]/g)).toHaveLength(1);
  });

  it("conserva velocidad, loop y comportamiento estático en reduced motion", () => {
    expect(globalStyles).toContain(
      "animation: clients-marquee 84s linear infinite;",
    );
    expect(globalStyles).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.clients-marquee-track\s*{[\s\S]*?animation:\s*none;/,
    );
    expect(globalStyles).toMatch(
      /\.clients-marquee-group\s*{[\s\S]*?flex-wrap:\s*wrap;[\s\S]*?justify-content:\s*center;/,
    );
    expect(globalStyles).toMatch(
      /\.clients-marquee-duplicate,\s*\.clients-marquee-control\s*{\s*display:\s*none;/,
    );
  });
});
