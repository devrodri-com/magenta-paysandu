// src/app/testimonios/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import TestimonialCard from "../components/TestimonialCard";
import { TESTIMONIALS } from "@/data/testimonials";
import { WHATSAPP_URL_TEXT } from "@/data/contact";

export const metadata: Metadata = {
  title: "Testimonios de clientes – Imprenta Magenta Paysandú",
  description:
    "Experiencias de empresas y comercios que eligieron a Magenta para sus trabajos impresos en Paysandú.",
};

/** Variante para la banda oscura final: el offset del ring debe ser oscuro. */
const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/** Magenta oscurecido ~15%: #e6007e no alcanza AA 4,5:1 en texto chico sobre fondos claros. */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

/*
 * El layout raíz ya envuelve las páginas en <main>: acá el contenedor es un
 * <div> para no anidar dos landmarks main.
 *
 * El listado consume la misma fuente que la Home (TESTIMONIALS) y escala sin
 * reescritura: 1 → card destacada centrada, 2 → dos columnas, 3+ → hasta tres.
 */
export default function TestimoniosPage() {
  const count = TESTIMONIALS.length;

  return (
    <div className="min-h-screen bg-white">
      {/* A. Apertura */}
      <header className="bg-gradient-to-b from-pink-50/80 via-pink-50/40 to-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
          <p
            className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
          >
            Testimonios
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Experiencias de quienes trabajan con Magenta
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Conocé la experiencia de empresas y comercios que eligieron a
            Magenta para sus trabajos impresos.
          </p>
        </div>
      </header>

      {/* B. Listado: misma fuente de datos y misma card que la Home. */}
      {count > 0 && (
        <section
          aria-label="Testimonios de clientes"
          className="pb-16 pt-2 sm:pb-20"
        >
          <div className="mx-auto max-w-6xl px-4">
            {count === 1 ? (
              <div className="mx-auto max-w-4xl">
                <TestimonialCard testimonial={TESTIMONIALS[0]} featured />
              </div>
            ) : (
              <ul
                className={`grid gap-6 sm:grid-cols-2 ${
                  count >= 3 ? "lg:grid-cols-3" : ""
                }`}
              >
                {TESTIMONIALS.map((testimonial) => (
                  <li key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* C. CTA final: banda oscura compacta, mismo patrón que /sobre-nosotros. */}
      <section aria-labelledby="testimonios-cta-heading" className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:py-14">
          <h2
            id="testimonios-cta-heading"
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            ¿Querés trabajar con Magenta?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-slate-300 sm:text-base">
            Contanos qué necesitás y te ayudamos a encontrar la mejor solución
            para tu proyecto.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
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
    </div>
  );
}
