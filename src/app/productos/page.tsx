// src/app/productos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { PRODUCT_CATEGORIES, OTHER_PRODUCTS } from "@/data/products";
import { WHATSAPP_URL_TEXT } from "@/data/contact";
import { ProductCategorySection } from "./ProductCategorySection";

export const metadata: Metadata = {
  title:
    "Productos – Volantes, libretas, packaging, adhesivos y más | Imprenta Magenta",
  description:
    "Volantes, libretas comerciales, packaging, adhesivos, revistas, bolsas de papel, papelería corporativa y rollos para POS. Impresión personalizada en Paysandú.",
};

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Variante para la banda oscura final: el offset del ring debe ser oscuro. */
const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-rosaClaro focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Apertura: banda full-width con fondo sutil y jerarquía alta */}
      <header className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-magenta">
            Productos
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            ¿Qué necesitás imprimir?
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Estas son las categorías que más imprimimos para comercios,
            empresas y emprendimientos. Elegí una para ver qué incluye, o
            escribinos si necesitás algo puntual: también realizamos trabajos a
            medida.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Las imágenes muestran ejemplos de productos y terminaciones. Cada
            trabajo se adapta a tu marca.
          </p>

          {/* Índice de categorías */}
          <nav aria-label="Categorías de productos" className="mt-10">
            <ul className="grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 lg:grid-cols-4">
              {PRODUCT_CATEGORIES.map((product, i) => (
                <li key={product.id}>
                  <a
                    href={`#${product.id}`}
                    className={`flex min-h-[52px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-brand-magenta/50 hover:bg-brand-magenta/[0.03] ${FOCUS_RING}`}
                  >
                    <span
                      aria-hidden="true"
                      className="text-xs font-semibold tabular-nums text-brand-magenta"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {product.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Capítulos: fondo alternado blanco / rosado muy sutil */}
      {PRODUCT_CATEGORIES.map((product, i) => (
        <ProductCategorySection
          key={product.id}
          product={product}
          position={i + 1}
          total={PRODUCT_CATEGORIES.length}
          tinted={(i + 1) % 2 === 0}
        />
      ))}

      {/*
        También realizamos: sección editorial full-width. El capítulo 08 cierra
        en pink-50/50, así que esta banda usa pink-50 pleno —un escalón apenas
        perceptible pero suficiente para que no se lean como un solo bloque.
      */}
      <section aria-labelledby="tambien-realizamos-heading" className="bg-pink-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
          <h2
            id="tambien-realizamos-heading"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.75rem] lg:text-[2rem]"
          >
            También realizamos
          </h2>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-slate-600 sm:text-base">
            Otros trabajos que imprimimos habitualmente, siempre adaptados a lo
            que tu negocio necesita.
          </p>

          {/* Texto estático: sin fondo, radio, hover ni foco — no son controles. */}
          <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
            {OTHER_PRODUCTS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-slate-200/70 py-3 text-[0.9375rem] leading-6 text-slate-800 sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-0.5 w-3 shrink-0 rounded-full bg-brand-magenta"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final: banda oscura premium */}
      <section aria-labelledby="cta-final-heading" className="bg-white">
        {/* pt propio: antes el espacio lo daba el padding del panel anterior. */}
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pt-20">
          <div className="rounded-3xl bg-slate-950 px-6 py-12 sm:px-12 sm:py-14">
            <h2
              id="cta-final-heading"
              className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              ¿No encontrás lo que buscás?
            </h2>
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-slate-300 sm:text-base">
              Muchos trabajos los realizamos a medida. Si tenés una idea o
              necesitás un producto específico, escribinos y te ayudamos a
              encontrar la mejor solución para tu empresa.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
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
        </div>
      </section>
    </main>
  );
}
