// src/app/servicios/page.tsx
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de impresión en Paysandú – Imprenta Magenta",
  description: "Conocé los servicios de impresión digital, offset y plotter de corte de Imprenta Magenta para packaging, bolsas, volantes, afiches y material administrativo.",
};

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Nuestros servicios
          </h1>
          <p className="mt-4 text-sm text-slate-700 sm:text-base">
            En Imprenta Magenta combinamos impresión offset, impresión digital y plotter de
            corte para ofrecer soluciones gráficas completas: desde packaging gastronómico
            y bolsas de papel hasta afiches, tarjetas, libretas y más.
          </p>
        </header>

        {/* Tecnologías principales */}
        <section className="mt-12 grid gap-10 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-magenta">
              Impresión offset
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              La mejor opción para grandes cantidades, con costos accesibles por unidad y
              excelente fidelidad de color.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-700">
              <li>Grandes tiradas con bajo costo por unidad</li>
              <li>Diferentes papeles y texturas</li>
              <li>Calidad constante en cada impresión</li>
            </ul>
            <div className="mt-4 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
              <Image
                src="/images/servicios/heidelberg-speedmaster.jpg"
                alt="Heidelberg Speedmaster - Máquina de impresión offset"
                width={400}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-magenta">
              Impresión digital
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Ideal para tiradas cortas y trabajos urgentes. Gran velocidad y calidad de
              impresión para piezas personalizadas.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-700">
              <li>Tiradas cortas y personalizadas</li>
              <li>Correcciones rápidas</li>
              <li>Colores vibrantes y definición precisa</li>
            </ul>
            <div className="mt-4 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
              <Image
                src="/images/servicios/konica-c3070l.jpg"
                alt="Konica Minolta AccurioPrint C3070L - Impresora digital"
                width={400}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-magenta">
              Plotter de corte
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Permite realizar adhesivos y etiquetas con formas especiales, con rapidez y
              precisión en el corte.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-700">
              <li>Adhesivos con formas personalizadas</li>
              <li>Etiquetas y stickers en distintos formatos</li>
              <li>Corte preciso y rápido</li>
            </ul>
            <div className="mt-4 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
              <Image
                src="/images/servicios/toyocut.jpg"
                alt="Toyocut - Plotter de corte"
                width={400}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
          </article>
        </section>

        {/* Listado de productos y servicios */}
        <section className="mt-16 border-t border-slate-100 pt-10 grid gap-8 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
              Productos impresos
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Trabajamos una amplia variedad de piezas para cubrir las necesidades de tu
              negocio.
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-slate-800 sm:grid-cols-2">
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Cajas</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Bandejas</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Papel antigrasa</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Bolsas de papel</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Volantes</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Afiches</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Tarjetas personales</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Adhesivos y etiquetas</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Carpetas</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Sobres</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Libretas</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Plastificado</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Laminado</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
              Formularios y piezas especiales
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              También realizamos material administrativo y proyectos a medida para tu
              empresa o emprendimiento.
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-1 text-sm text-slate-800 sm:grid-cols-2">
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Hojas de facturación electrónica</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Blocks y anotadores</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Formularios</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Diplomas</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Entradas numeradas</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Revistas</li>
              <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-300">Y más</li>
            </ul>
          </article>
        </section>

        {/* Nota final */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">
            ¿No encontrás lo que buscás?
          </p>
          <p className="mt-2 max-w-xl">
            Muchos trabajos los desarrollamos a medida combinando distintas tecnologías y
            terminaciones. El asesoramiento personalizado es clave: mucha gente no sabe exactamente
            qué pedir, y nosotros los ayudamos a definirlo según sus necesidades.
          </p>
          <p className="mt-3 max-w-xl">
            Si tenés una idea específica o un proyecto especial, escribinos y te ayudamos
            a encontrar el mejor formato de impresión para tu caso.
          </p>
          <p className="mt-4 text-sm">
            ¿Querés presupuestar alguno de estos trabajos?{' '}
            <a
              href="/presupuesto"
              className="font-semibold text-brand-magenta hover:text-brand-rosa"
            >
              Pedir un presupuesto →
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}