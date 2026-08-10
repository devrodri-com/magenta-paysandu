// src/app/servicios/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import {
  SERVICE_PILLARS,
  PRINTING_TECHNOLOGIES,
  SERVICES_HEADLINE,
  SERVICES_CLOSING,
} from "@/data/services";
import { WHATSAPP_URL_TEXT } from "@/data/contact";

export const metadata: Metadata = {
  title:
    "Servicios – Asesoramiento, diseño e impresión offset y digital | Imprenta Magenta",
  description:
    "Te asesoramos y diseñamos con vos: impresión offset, impresión digital y plotter de corte para resolver trabajos a medida en Paysandú, desde pocas unidades hasta grandes tiradas.",
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Variante para la banda oscura final: el offset del ring debe ser oscuro. */
const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/**
 * Magenta oscurecido ~15% (mismo tono que el hover de los CTA del sitio):
 * #e6007e no alcanza AA 4,5:1 en texto chico sobre pink-50 ni slate-50.
 */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* A. Apertura: superficie ligeramente rosada, identidad propia frente a Home y /productos. */}
      <header className="bg-gradient-to-b from-pink-50/80 via-pink-50/40 to-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Servicios
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {SERVICES_HEADLINE}
          </h1>
          <div className="mt-5 max-w-2xl space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            <p>
              Ya sea que necesites una libreta, un packaging personalizado o
              algún trabajo que no viste en esta página, escribinos.
            </p>
            <p>
              Te asesoramos para encontrar la mejor forma de hacerlo, combinando
              distintas tecnologías y terminaciones hasta lograr el resultado
              que buscás.
            </p>
            <p className="font-semibold text-slate-900">{SERVICES_CLOSING}</p>
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <Link
              href="/presupuesto"
              className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-7 text-sm font-semibold text-white transition hover:bg-[#c3006b] sm:w-auto ${FOCUS_RING}`}
            >
              Pedir presupuesto
            </Link>
            <a
              href={WHATSAPP_URL_TEXT}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 underline-offset-4 transition-colors hover:text-brand-magenta hover:underline ${FOCUS_RING}`}
            >
              Escribir por WhatsApp
              <LuArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>
      </header>

      {/* B. Los cinco pilares: núcleo de la página, lista editorial numerada. */}
      <section aria-label="Cómo trabajamos" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14 lg:py-16">
          {/* role="list": el preflight quita list-style y VoiceOver deja de anunciar la lista. */}
          <ol role="list" className="divide-y divide-slate-200">
            {SERVICE_PILLARS.map((pillar, i) => (
              <li
                key={pillar.id}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-7 sm:gap-x-6 sm:py-8 lg:grid-cols-[4rem_minmax(0,20rem)_minmax(0,1fr)] lg:items-baseline lg:gap-x-8"
              >
                <span
                  aria-hidden="true"
                  className="pt-1 text-sm font-semibold tabular-nums text-brand-magenta sm:text-base lg:pt-0"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {pillar.title}
                </h2>
                <p className="col-start-2 mt-2 text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base lg:col-start-3 lg:mt-0">
                  {pillar.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* C. Capacidad técnica: respaldo secundario, menor jerarquía que los pilares. */}
      <section
        aria-labelledby="capacidad-tecnica-heading"
        className="border-t border-slate-100 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 lg:py-20">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Capacidad técnica
          </p>
          <h2
            id="capacidad-tecnica-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Tecnología para cada tipo de trabajo
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Combinamos impresión offset, impresión digital y corte especializado
            para elegir el proceso adecuado según cada proyecto.
          </p>

          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PRINTING_TECHNOLOGIES.map((tech, i) => (
              <li
                key={tech.id}
                className={
                  // En la grilla de 2 columnas (640-1023px) la última card de un
                  // total impar quedaría huérfana a la izquierda: ocupa las dos
                  // columnas, centrada y con el ancho exacto de una card normal
                  // (50% del riel menos la mitad del gap-8).
                  i === PRINTING_TECHNOLOGIES.length - 1 &&
                  PRINTING_TECHNOLOGIES.length % 2 === 1
                    ? "sm:col-span-2 sm:w-[calc(50%-1rem)] sm:justify-self-center lg:col-span-1 lg:w-auto lg:justify-self-auto"
                    : undefined
                }
              >
                {/*
                  Los assets son 800×600 con la máquina completa sobre fondo
                  negro: el contenedor 4:3 + object-cover muestra la foto entera
                  sin recorte, y el bg-black cubre cualquier borde de redondeo.
                */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">
                  <Image
                    src={tech.image}
                    alt={tech.imageAlt}
                    fill
                    sizes="(min-width: 1152px) 352px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 sm:text-lg">
                  {tech.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {tech.machine}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {tech.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* D. CTA final: cierre oscuro y compacto, full-bleed para no calcar el panel de /productos. */}
      <section aria-labelledby="servicios-cta-heading" className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <h2
            id="servicios-cta-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            ¿Tenés una idea o necesitás algo especial?
          </h2>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-slate-300 sm:text-base">
            Contanos qué querés hacer y te ayudamos a encontrar la mejor forma
            de llevarlo a la realidad.
          </p>
          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <Link
              href="/presupuesto"
              className={`inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-brand-magenta px-7 text-sm font-semibold text-white transition hover:bg-[#c3006b] sm:w-auto ${FOCUS_RING_DARK}`}
            >
              Pedir presupuesto
            </Link>
            <a
              href={WHATSAPP_URL_TEXT}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-white underline-offset-4 transition-colors hover:text-brand-rosaClaro hover:underline ${FOCUS_RING_DARK}`}
            >
              Escribir por WhatsApp
              <LuArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
