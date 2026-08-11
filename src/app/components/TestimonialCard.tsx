// src/app/components/TestimonialCard.tsx
import Image from "next/image";
import { LuGlobe, LuInstagram, LuQuote } from "react-icons/lu";
import type { Testimonial } from "@/data/testimonials";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/*
 * Presentación compartida entre la Home (pieza destacada) y /testimonios
 * (listado). `featured` solo escala tipografía y respiración; el contenido
 * sale tal cual de src/data/testimonials.ts, sin estrellas, fechas ni firmas.
 */
export default function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: Testimonial;
  featured?: boolean;
}) {
  return (
    <figure
      className={`flex h-full flex-col rounded-3xl border border-slate-200 bg-white shadow-sm ${
        featured ? "p-7 sm:p-10" : "p-6 sm:p-7"
      }`}
    >
      <LuQuote
        aria-hidden="true"
        className={`shrink-0 text-brand-magenta ${featured ? "h-7 w-7" : "h-6 w-6"}`}
      />
      <blockquote
        className={`mt-4 flex-1 leading-relaxed text-slate-800 ${
          featured ? "text-lg sm:text-xl" : "text-sm sm:text-base"
        }`}
      >
        <p>{testimonial.text}</p>
      </blockquote>
      <figcaption
        className={`mt-6 flex items-center gap-4 border-t border-slate-100 ${
          featured ? "pt-6" : "pt-5"
        }`}
      >
        {testimonial.logo && (
          /* unoptimized: /_next/image rechaza SVG (400) con la config por defecto. */
          <Image
            src={testimonial.logo}
            alt=""
            width={96}
            height={96}
            unoptimized
            className={`shrink-0 rounded-xl object-contain ${
              featured ? "h-14 w-14" : "h-11 w-11"
            }`}
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {testimonial.businessName}
          </p>
          {testimonial.category && (
            <p className="mt-0.5 text-xs text-slate-500">
              {testimonial.category}
            </p>
          )}
        </div>
        {(testimonial.instagram || testimonial.website) && (
          <div className="flex shrink-0 items-center gap-1">
            {testimonial.instagram && (
              <a
                href={testimonial.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${testimonial.businessName}`}
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-brand-magenta ${FOCUS_RING}`}
              >
                <LuInstagram aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
            {testimonial.website && (
              <a
                href={testimonial.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Sitio web de ${testimonial.businessName}`}
                className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-brand-magenta ${FOCUS_RING}`}
              >
                <LuGlobe aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
