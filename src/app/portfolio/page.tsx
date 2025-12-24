import type { Metadata } from "next";
import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio de trabajos – Imprenta Magenta Paysandú",
  description: "Galería de trabajos realizados: bolsas personalizadas, packaging, etiquetas, afiches y otras piezas impresas para clientes reales.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trabajos realizados
          </h1>
          <p className="mt-4 text-sm text-slate-700 sm:text-base">
            Acá vamos a mostrar una selección de trabajos de Magenta: bolsas
            personalizadas, packaging, etiquetas, afiches y otras piezas
            impresas para clientes reales.
          </p>
          <p className="mt-2 text-xs text-slate-500 sm:text-sm">
            Por ahora dejamos esta sección lista como mapa. Más adelante vamos a sumar
            fotos, descripciones y créditos según el material que nos compartan.
          </p>
        </header>

        {/* Grid de trabajos */}
        {PORTFOLIO_ITEMS.length > 0 ? (
          <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_ITEMS.map((item) => {
              const firstImage = item.images[0];
              const imagePath = firstImage ? `/images/portfolio/${item.id}/${firstImage}` : null;
              
              return (
                <article
                  key={item.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
                >
                  {imagePath ? (
                    <div className="relative h-40 bg-slate-200">
                      <Image
                        src={imagePath}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-slate-200" />
                  )}
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-sm text-slate-700">
                        {item.description}
                      </p>
                    )}
                    {item.clientName && (
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {item.clientName}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="mt-10">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
              <p className="text-lg font-semibold text-slate-700">Próximamente</p>
              <p className="mt-2 text-sm text-slate-500">
                Estamos preparando una selección de trabajos realizados para mostrar aquí.
              </p>
            </div>
          </section>
        )}

        {/* Nota para futuros contenidos */}
        <section className="mt-12 rounded-2xl bg-slate-50 p-6 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">¿Qué vamos a necesitar para completar esta sección?</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Fotos en buena calidad de bolsas, packaging, etiquetas, afiches, etc.</li>
            <li>Nombre del cliente y rubro (opcional, solo si quieren mostrarlo).</li>
            <li>Tipo de pieza realizada (bolsas, volantes, tarjetas, etc.).</li>
            <li>Un breve texto describiendo el trabajo (1–2 líneas por proyecto).</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500">
            Con esa información vamos a poder transformar estos placeholders en un
            portfolio real que muestre la variedad y calidad de los trabajos de
            Magenta.
          </p>
        </section>
      </div>
    </main>
  );
}
