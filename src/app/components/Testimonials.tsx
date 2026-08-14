// src/app/components/Testimonials.tsx
import { LuArrowUpRight } from "react-icons/lu";
import { SEO_CONFIG } from "@/config/seo";
import { TESTIMONIALS } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Magenta oscurecido ~15%: #e6007e no alcanza AA 4,5:1 en texto chico sobre fondos claros. */
const MAGENTA_TEXT_AA = "text-[#c3006b]";

/*
 * Prueba social de la Home: con un solo testimonio real se muestra como pieza
 * destacada centrada; cuando haya dos o tres pasa solo a grilla, sin
 * placeholders en ningún caso.
 */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) {
    return null;
  }

  const featured = TESTIMONIALS.length === 1;

  return (
    <section
      aria-labelledby="testimonios-heading"
      className="border-t border-slate-100 bg-pink-50/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p
          className={`text-xs font-semibold uppercase tracking-widest ${MAGENTA_TEXT_AA}`}
        >
          Testimonios
        </p>
        <h2
          id="testimonios-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          La experiencia de quienes trabajan con Magenta
        </h2>

        {featured ? (
          <div className="mx-auto mt-10 max-w-4xl">
            <TestimonialCard testimonial={TESTIMONIALS[0]} featured />
          </div>
        ) : (
          <ul
            className={`mt-10 grid gap-6 sm:grid-cols-2 ${
              TESTIMONIALS.length >= 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {TESTIMONIALS.map((testimonial) => (
              <li key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex justify-center">
          <a
            href={SEO_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver reseñas de Magenta en Google Maps"
            className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold underline-offset-4 transition-colors hover:underline ${MAGENTA_TEXT_AA} ${FOCUS_RING}`}
          >
            Ver reseñas en Google
            <LuArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
