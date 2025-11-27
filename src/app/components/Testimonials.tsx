import { LuQuote } from "react-icons/lu";

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
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm"
            >
              <LuQuote className="h-6 w-6 text-brand-magenta" />
              <p className="mt-4 text-sm text-slate-700">
                Testimonio {item} pendiente. Esta tarjeta va a mostrar la opinión de un
                cliente real sobre su experiencia imprimiendo con Magenta.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Próximamente
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
