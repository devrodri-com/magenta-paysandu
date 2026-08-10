import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import type { ProductCategory } from "@/data/products";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

type ProductCategorySectionProps = {
  product: ProductCategory;
  /** Posición 1-based dentro del catálogo, para el índice "01 / 08". */
  position: number;
  total: number;
  /** Los capítulos pares llevan fondo rosado muy sutil; los impares, blanco. */
  tinted: boolean;
};

/**
 * Capítulo del catálogo de /productos. Composición única para las ocho
 * categorías: texto a la izquierda, imagen grande a la derecha en desktop;
 * en mobile el orden es número → pregunta → nombre → resumen → lista → CTA
 * → imagen, sin reordenamientos visuales.
 */
export function ProductCategorySection({
  product,
  position,
  total,
  tinted,
}: ProductCategorySectionProps) {
  const index = String(position).padStart(2, "0");

  return (
    <section
      id={product.id}
      aria-labelledby={`${product.id}-heading`}
      className={`scroll-mt-24 ${tinted ? "bg-pink-50/50" : "bg-white"}`}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {index} / {String(total).padStart(2, "0")}
          </p>
          <p className="mt-4 text-[0.9375rem] font-semibold text-brand-magenta">
            {product.question}
          </p>
          <h2
            id={`${product.id}-heading`}
            className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[2.5rem]"
          >
            {product.name}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate-600 lg:text-lg">
            {product.summary}
          </p>

          <p className="mt-6 text-sm font-semibold text-slate-900">
            Podés realizar:
          </p>
          <ul className="mt-3 space-y-2">
            {product.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-slate-700">
                <LuCheck
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-magenta"
                />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/presupuesto"
            className={`group mt-7 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-[0.9375rem] font-semibold text-brand-magenta transition-colors hover:text-[#c3006b] hover:underline underline-offset-4 ${FOCUS_RING}`}
          >
            Pedir presupuesto
            <LuArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>

        {/* Asset aprobado 1:1: marco cuadrado, imagen completa, sin recorte. */}
        <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-3xl border border-slate-200 shadow-sm lg:ml-auto lg:mr-0">
          <Image
            src={product.image}
            alt={product.alt}
            width={600}
            height={600}
            sizes="(min-width: 640px) 560px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
