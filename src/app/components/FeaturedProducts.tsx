import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { ProductCard } from "./ProductCard";
import { PRODUCT_CATEGORIES } from "@/data/products";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export default function FeaturedProducts() {
  return (
    <section
      id="productos"
      aria-labelledby="productos-heading"
      className="scroll-mt-24 border-t border-slate-100 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-magenta">
          Productos
        </p>
        <h2
          id="productos-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          ¿Qué necesitás imprimir?
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Soluciones gráficas personalizadas para cada necesidad de tu negocio.
          Calidad, diseño y atención en cada detalle.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_CATEGORIES.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-slate-500">
          Las imágenes muestran ejemplos de productos y terminaciones. Cada
          trabajo se adapta a tu marca.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600 sm:text-base">
            ¿Buscás algo distinto? También realizamos trabajos a medida para tu
            empresa.
          </p>
          <Link
            href="/productos"
            className={`group inline-flex min-h-[44px] shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-full border border-brand-magenta/30 px-5 text-sm font-semibold text-brand-magenta transition-colors hover:border-brand-magenta hover:bg-brand-magenta/5 hover:text-[#c3006b] sm:self-auto ${FOCUS_RING}`}
          >
            Ver todos los productos
            <LuArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
