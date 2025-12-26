// src/app/productos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_URL_TEXT } from "@/data/contact";

export const metadata: Metadata = {
  title: "Productos impresos – Bolsas, packaging, volantes y más | Imprenta Magenta",
  description: "Bolsas de papel, packaging, volantes, tarjetas personales, adhesivos, revistas y otras piezas impresas para tu marca.",
};

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Productos
          </h1>
          <p className="mt-4 text-sm text-slate-700 sm:text-base">
            Acá vas a encontrar las principales piezas impresas que realizamos en Imprenta
            Magenta. Esta página va a ir creciendo a medida que sumemos más ejemplos e
            imágenes de trabajos reales.
          </p>
        </header>

        {/* Bloques por necesidad */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
              Para tu local o comercio
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Ideal si necesitás piezas para mostrar tu marca en el punto de venta y acompañar la experiencia de tus clientes.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-slate-800">
              <li>• Bolsas de papel</li>
              <li>• Packaging</li>
              <li>• Volantes y afiches</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
              Para tu marca e identidad
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Piezas pensadas para que tu marca se vea consistente en cada punto de contacto.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-slate-800">
              <li>• Tarjetas personales</li>
              <li>• Papelería corporativa</li>
              <li>• Carpetas y sobres</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
              Para gestión y administración
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Material administrativo y piezas especiales que facilitan el día a día de tu negocio.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-slate-800">
              <li>• Libretas y blocks</li>
              <li>• Formularios y hojas de facturación</li>
              <li>• Entradas numeradas, diplomas y más</li>
            </ul>
          </article>
        </section>

        <section className="mt-12 rounded-2xl bg-slate-50 p-8 text-center">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            ¿No ves lo que buscás?
          </h2>
          <p className="mt-3 text-sm text-slate-700 sm:text-base max-w-2xl mx-auto">
            Hacemos trabajos a medida y te asesoramos para elegir materiales y terminaciones según tu necesidad.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL_TEXT}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta/70"
            >
              Escribinos por WhatsApp
            </a>
            <Link
              href="/presupuesto"
              className="rounded-full border border-slate-300/40 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-brand-rosaClaro hover:text-brand-rosaClaro transition"
            >
              Pedir presupuesto
            </Link>
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-slate-50 p-6 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Otros productos y combinaciones</p>
          <p className="mt-2 max-w-2xl">
            Además de estos productos, trabajamos libretas, blocks, formularios,
            papel antigrasa, diplomas, entradas numeradas y muchas otras piezas según las
            necesidades de cada cliente.
          </p>
          <p className="mt-2 max-w-2xl text-xs text-slate-500">
            Próximamente vamos a ampliar esta sección con más imágenes y detalles por
            categoría.
          </p>
        </section>
      </div>
    </main>
  );
}