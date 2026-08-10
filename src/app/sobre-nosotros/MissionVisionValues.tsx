// src/app/sobre-nosotros/MissionVisionValues.tsx
import type { IconType } from "react-icons";
import { LuCheck, LuHeart, LuTarget, LuTelescope } from "react-icons/lu";
import { MISSION, VALUES, VISION } from "@/data/about";

/** Magenta oscurecido ~15% para el texto chico sobre fondos claros (AA 4,5:1). */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

/**
 * Remate geométrico de marca, reconstruido del croquis con CSS puro.
 *
 * Las tres cards comparten la misma pendiente (-42% de alto por ancho completo)
 * para que el lenguaje sea uno solo; cambian la paleta y la pieza secundaria.
 * Al estar todas las coordenadas en porcentajes de la propia franja, el motivo
 * se reescala con el ancho de la card sin romperse en ningún breakpoint.
 */
const MOTIF_BAND = "polygon(0% 100%, 100% 100%, 100% 26%, 0% 68%)";
const MOTIF_STRIPE = "polygon(0% 42%, 100% 0%, 100% 14%, 0% 56%)";

type Motif = "mision" | "vision" | "valores";

/** Cuña oscura: asoma sobre la banda en Visión y queda contenida en Valores. */
const MOTIF_WEDGE: Record<Motif, string | null> = {
  mision: null,
  vision: "polygon(100% 100%, 100% 20%, 30% 100%)",
  valores: "polygon(100% 100%, 100% 44%, 22% 100%)",
};

const MOTIF_STRIPE_COLOR: Record<Motif, string> = {
  mision: "bg-brand-rosaClaro",
  vision: "bg-brand-magenta",
  valores: "bg-brand-magenta",
};

function BrandMotif({ variant }: { variant: Motif }) {
  const wedge = MOTIF_WEDGE[variant];

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 block h-[68px] overflow-hidden sm:h-[76px] lg:h-[104px]"
    >
      <span
        className={`absolute inset-0 block ${MOTIF_STRIPE_COLOR[variant]}`}
        style={{ clipPath: MOTIF_STRIPE }}
      />
      <span
        className="absolute inset-0 block bg-brand-magenta"
        style={{ clipPath: MOTIF_BAND }}
      />
      {wedge ? (
        <span
          className="absolute inset-0 block bg-slate-900"
          style={{ clipPath: wedge }}
        />
      ) : null}
    </span>
  );
}

/*
 * pb reservado = alto del motivo + aire, para que el texto nunca lo pise.
 * El contenido va en flujo normal: los tres encabezados arrancan en el mismo
 * eje y, con las cards estiradas por la grilla, los tres remates también.
 */
const CARD =
  "relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-6 pb-24 pt-8 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:px-8 sm:pb-28 sm:pt-10 lg:pb-[8.25rem]";
/*
 * El texto arranca pegado al encabezado —como en el croquis— y el sobrante de
 * Misión y Visión frente a la lista de Valores queda abajo, absorbido por el
 * remate. Centrarlo verticalmente lo deja flotando lejos de la línea de acento.
 */
const CARD_BODY =
  "mt-6 text-[0.9375rem] leading-[1.85] text-slate-600 sm:text-base";

function PillarHeader({ icon: Icon, title }: { icon: IconType; title: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon
        aria-hidden="true"
        className="h-14 w-14 text-brand-magenta lg:h-16 lg:w-16"
      />
      <h3 className="mt-5 text-[1.375rem] font-bold uppercase tracking-wide text-brand-magenta sm:text-2xl">
        {title}
      </h3>
      <span
        aria-hidden="true"
        className="mt-3 block h-[3px] w-10 rounded-full bg-brand-magenta"
      />
    </div>
  );
}

export default function MissionVisionValues() {
  return (
    /*
     * Rosa mínimo: despega el tríptico de la franja slate-50 de Tecnología, que
     * viene justo debajo, sin convertirlo en un bloque de color.
     */
    <section
      aria-labelledby="pilares-heading"
      className="border-t border-slate-100 bg-pink-50/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        {/*
          Desde lg el título entra en una línea y la fila se completa con una
          regla editorial que ocupa el resto del riel. Por debajo, los dos
          tramos vuelven a ser bloques y la regla desaparece.
        */}
        <div className="lg:flex lg:items-center lg:gap-8">
          <h2
            id="pilares-heading"
            className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:whitespace-nowrap lg:text-[2.5rem] xl:text-5xl"
          >
            <span className="block lg:inline">Nuestros pilares:</span>{" "}
            <span className={`block lg:inline ${MAGENTA_TEXT_AA}`}>
              lo que nos define
            </span>
          </h2>
          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-gradient-to-r from-brand-magenta/40 from-0% via-slate-300/70 via-12% to-transparent lg:block"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          <article className={CARD}>
            <PillarHeader icon={LuTarget} title="Misión" />
            <p className={CARD_BODY}>{MISSION}</p>
            <BrandMotif variant="mision" />
          </article>

          <article className={CARD}>
            <PillarHeader icon={LuTelescope} title="Visión" />
            <p className={CARD_BODY}>{VISION}</p>
            <BrandMotif variant="vision" />
          </article>

          {/* En tablet ocupa las dos columnas y la lista pasa a dos filas de valores. */}
          <article className={`${CARD} sm:col-span-2 lg:col-span-1`}>
            <PillarHeader icon={LuHeart} title="Valores" />
            {/* role="list": el preflight quita list-style y VoiceOver deja de anunciar la lista. */}
            <ul
              role="list"
              className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-1"
            >
              {VALUES.map((value) => (
                <li
                  key={value}
                  className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[3px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-brand-magenta text-white"
                  >
                    <LuCheck className="h-3 w-3" />
                  </span>
                  {value}
                </li>
              ))}
            </ul>
            <BrandMotif variant="valores" />
          </article>
        </div>
      </div>
    </section>
  );
}
