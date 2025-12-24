import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "@/data/products";

export default function FeaturedProducts() {
  return (
    <section
      id="servicios"
      className="bg-white py-16 sm:py-20 border-t border-slate-100"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Soluciones de impresión para tu marca
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base whitespace-normal">
          Las piezas impresas clave que impulsan tu identidad: bolsas, packaging, folletos, papelería y más.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.filter((item) => item.featured === true).map((item) => (
            <ProductCard
              key={item.nombre}
              title={item.nombre}
              description={item.texto}
              imageSrc={`/images/productos/${item.imagen}`}
            />
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-600 sm:text-base">
          ¿Querés ver más opciones? Visitá la sección de{" "}
          <Link
            href="/servicios"
            className="font-semibold text-brand-magenta hover:text-brand-rosa"
          >
            servicios
          </Link>{" "}
          o escribinos para asesorarte sobre el producto ideal para tu negocio.
        </p>
      </div>
    </section>
  );
}

