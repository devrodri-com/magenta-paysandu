// src/app/components/Testimonials.tsx
import { LuQuote } from "react-icons/lu";
import { TESTIMONIALS } from "@/data/testimonials";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Muy pronto vamos a sumar testimonios reales de emprendedores, comercios y
          empresas que eligen Magenta para sus trabajos impresos. Dejamos esta sección
          lista para mostrar esas experiencias.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.length === 0 ? (
            // Placeholder cuando no hay testimonios
            [1, 2, 3].map((index) => (
              <article
                key={index}
                className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm"
              >
                <LuQuote className="h-6 w-6 text-brand-magenta" />
                <p className="mt-4 text-sm text-slate-700">
                  Estamos preparando esta sección con experiencias reales de clientes que trabajan con Imprenta Magenta.
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Próximamente
                </p>
              </article>
            ))
          ) : (
            // Testimonios reales
            TESTIMONIALS.map((testimonial) => (
              <article
                key={testimonial.id}
                className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm"
              >
                <LuQuote className="h-6 w-6 text-brand-magenta" />
                <p className="mt-4 text-sm text-slate-700 flex-1">
                  {testimonial.text}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {testimonial.logo && (
                      <div className="relative h-10 w-10 flex-shrink-0 rounded-xl bg-slate-100 p-2">
                        <Image
                          src={testimonial.logo}
                          alt={`Logo de ${testimonial.businessName}`}
                          fill
                          className="object-contain rounded-xl"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {testimonial.businessName}
                      </p>
                      {testimonial.category && (
                        <p className="text-xs text-slate-500 mt-1">
                          {testimonial.category}
                        </p>
                      )}
                    </div>
                  </div>
                  {(testimonial.instagram || testimonial.website) && (
                    <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                      {testimonial.instagram && (
                        <a
                          href={testimonial.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-brand-magenta transition"
                          aria-label={`Instagram de ${testimonial.businessName}`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      )}
                      {testimonial.website && (
                        <a
                          href={testimonial.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-brand-magenta transition"
                          aria-label={`Web de ${testimonial.businessName}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
