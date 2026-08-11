"use client";

// src/app/components/ClientsStrip.tsx
import Image from "next/image";
import { useState } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { CLIENT_LOGOS, type ClientLogo } from "@/data/clients";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Magenta oscurecido ~15%: #e6007e no alcanza AA 4,5:1 en texto chico sobre fondos claros. */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

/*
 * Ambos grupos comparten estas clases: mismo gap y mismo padding-right de
 * empalme, por lo que sus anchos efectivos son idénticos y translateX(-50%)
 * del track equivale exactamente a un grupo (ver globals.css).
 */
const GROUP_CLASSES =
  "clients-marquee-group flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14";

function LogoItem({
  logo,
  decorative = false,
}: {
  logo: ClientLogo;
  decorative?: boolean;
}) {
  return (
    <li className="flex shrink-0 items-center justify-center">
      {/* unoptimized: /_next/image rechaza SVG (400) con la config por defecto. */}
      <Image
        src={logo.src}
        alt={decorative ? "" : (logo.name ?? "")}
        width={160}
        height={160}
        unoptimized
        className="h-16 w-auto object-contain sm:h-20"
      />
    </li>
  );
}

/*
 * Client Component solo por el control de pausa: el estado vive en un
 * data-attribute y el CSS resuelve la animación, el hover y reduced motion.
 */
export default function ClientsStrip() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      aria-labelledby="clientes-heading"
      className="border-t border-slate-100 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
            >
              Clientes
            </p>
            <h2
              id="clientes-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Algunas de las marcas que confían en Magenta
            </h2>
          </div>
          {/*
            Patrón APG de control de reproducción: el nombre accesible alterna
            Pausar/Reanudar y comunica el estado; sin aria-pressed, que exigiría
            una etiqueta fija y aquí se contradiría con el texto visible.
          */}
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            className={`clients-marquee-control inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 ${FOCUS_RING}`}
          >
            {isPaused ? (
              <LuPlay aria-hidden="true" className="h-4 w-4" />
            ) : (
              <LuPause aria-hidden="true" className="h-4 w-4" />
            )}
            {isPaused ? "Reanudar" : "Pausar"}
          </button>
        </div>

        {/*
          En mobile el control queda apilado bajo el H2: 20 px hasta la cinta
          alcanzan y evitan el espacio muerto. Desde sm el control vuelve a la
          fila del encabezado y se recupera la separación original.
        */}
        <div className="clients-marquee-viewport mt-5 overflow-hidden sm:mt-10">
          <div
            className="clients-marquee-track flex w-max"
            data-paused={isPaused}
          >
            <ul className={GROUP_CLASSES}>
              {CLIENT_LOGOS.map((logo) => (
                <LogoItem key={logo.id} logo={logo} />
              ))}
            </ul>
            {/* Copia visual para el loop continuo, fuera del árbol accesible. */}
            <ul
              aria-hidden="true"
              className={`clients-marquee-duplicate ${GROUP_CLASSES}`}
            >
              {CLIENT_LOGOS.map((logo) => (
                <LogoItem key={`dup-${logo.id}`} logo={logo} decorative />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
