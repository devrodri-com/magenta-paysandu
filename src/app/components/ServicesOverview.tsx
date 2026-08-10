// src/app/components/ServicesOverview.tsx
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuArrowRight,
  LuMapPin,
  LuMessagesSquare,
  LuPalette,
  LuSlidersHorizontal,
  LuStore,
} from "react-icons/lu";
import {
  SERVICE_PILLARS,
  SERVICES_HEADLINE,
  SERVICES_CLOSING,
} from "@/data/services";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50";

/**
 * Magenta oscurecido ~15% (mismo tono que el hover de los CTA del sitio):
 * #e6007e no alcanza AA 4,5:1 en texto chico sobre slate-50 (4,30:1).
 */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

/**
 * Los íconos viven acá y no en data/services.ts: cada superficie decide su
 * tratamiento visual (la Home usa íconos; /servicios usa números 01-05).
 */
const PILLAR_ICONS: Record<string, IconType> = {
  asesoramiento: LuMessagesSquare,
  diseno: LuPalette,
  tiradas: LuSlidersHorizontal,
  reparto: LuMapPin,
  integral: LuStore,
};

export default function ServicesOverview() {
  return (
    <section
      aria-labelledby="servicios-overview-heading"
      className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20"
    >
      {/*
        Composición editorial en desktop: presentación y CTA a la izquierda,
        lista de pilares a la derecha (ocupa las dos filas). En mobile el flujo
        natural del DOM da el orden pedido: introducción → pilares → CTA.
      */}
      <div className="mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-x-16">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Servicios
          </p>
          <h2
            id="servicios-overview-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {SERVICES_HEADLINE}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Ya sea que necesites una libreta, un packaging personalizado o un
            trabajo que todavía no viste en la web, te ayudamos a encontrar la
            mejor forma de hacerlo.
          </p>
        </div>

        {/* role="list": el preflight quita list-style y VoiceOver deja de anunciar la lista. */}
        <ul
          role="list"
          className="mt-8 divide-y divide-slate-200/80 border-y border-slate-200/80 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-start"
        >
          {SERVICE_PILLARS.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.id];
            return (
              <li key={pillar.id} className="flex items-start gap-4 py-4 sm:py-5">
                {Icon ? (
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-magenta"
                  />
                ) : null}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                    {pillar.title}
                  </h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-600">
                    {pillar.copy}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 lg:col-start-1 lg:row-start-2 lg:mt-6 lg:self-start">
          <p className="border-l-2 border-brand-magenta pl-4 text-base font-semibold leading-snug text-slate-900 sm:text-lg">
            {SERVICES_CLOSING}
          </p>
          <Link
            href="/servicios"
            className={`group mt-6 inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-brand-magenta/30 px-5 text-sm font-semibold ${MAGENTA_TEXT_AA} transition-colors hover:border-brand-magenta hover:bg-brand-magenta/5 ${FOCUS_RING}`}
          >
            Conocé nuestros servicios
            <LuArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
