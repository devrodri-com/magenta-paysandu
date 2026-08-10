import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/data/products";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:ring-offset-2 focus-visible:ring-offset-white";

type ProductCardProps = {
  product: ProductCategory;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/productos#${product.id}`}
      className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-brand-magenta/40 ${FOCUS_RING}`}
    >
      <p className="text-[0.8125rem] font-medium leading-snug text-brand-magenta">
        {product.question}
      </p>

      {/* Los assets son 1:1: en un marco aspect-square no hay recorte. */}
      <div className="mt-3 aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
        {/*
          alt="" a propósito: dentro del link, pregunta + nombre + resumen ya
          nombran el destino; un alt descriptivo acá solo agrega ~15 palabras
          al anuncio del lector de pantalla. La descripción (product.alt) se
          usa en /productos, donde la imagen está fuera de todo link.
        */}
        <Image
          src={product.image}
          alt=""
          width={600}
          height={600}
          sizes="(min-width: 1152px) 265px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-900 transition-colors group-hover:text-brand-magenta">
        {product.name}
      </h3>
      {/* flex-1 empareja la altura: el acento queda al pie en toda la fila. */}
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-600">
        {product.summary}
      </p>

      {/* Acento inferior: crece en hover sin desplazar el layout. */}
      <span
        aria-hidden="true"
        className="mt-4 block h-1 w-10 rounded-full bg-brand-magenta transition-all duration-200 group-hover:w-16 motion-reduce:transition-none"
      />
    </Link>
  );
}
