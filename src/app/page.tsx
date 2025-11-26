// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-brand-magenta">
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-16">
          <span className="mb-4 inline-flex items-center rounded-full bg-brand-magenta/40 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blanco">
            Imprenta Magenta Paysandú
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Impresión offset y digital
            <br />
            con calidad y rapidez.
          </h1>
          <p className="mt-6 max-w-xl text-base text-slate-100 sm:text-lg">
            Más de 15 años acompañando a emprendedores, comercios y empresas de todo el país
            con soluciones de impresión digital y offset, folletos, bolsas de papel, packaging y mucho más.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta/70"
            >
              Escribinos por WhatsApp
            </a>
            <a
              href="#servicios"
              className="text-sm font-semibold text-slate-100 hover:text-brand-rosaClaro"
            >
              Ver servicios
            </a>
          </div>

          {/* Sello 15 años */}
          <Image
            src="/images/15anos.png"
            alt="15 años de Imprenta Magenta"
            width={260}
            height={260}
            className="pointer-events-none select-none hidden md:block absolute right-6 bottom-10 opacity-25"
          />
        </div>
      </section>

      {/* PRODUCTOS / CATEGORÍAS PRINCIPALES */}
      <section
        id="servicios"
        className="bg-white py-16 sm:py-20 border-t border-slate-100"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Productos principales
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Te ofrecemos una variedad de productos impresos para potenciar tu negocio.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                nombre: "Bolsas de papel",
                texto:
                  "Bolsas personalizadas con tu logo para locales comerciales, eventos y packaging premium.",
              },
              {
                nombre: "Folletos y volantes",
                texto:
                  "Folletos A5, A6 y formatos especiales para promociones, menús y campañas publicitarias.",
              },
              {
                nombre: "Papelería corporativa",
                texto:
                  "Tarjetas personales, hojas membretadas, sobres y talonarios que refuerzan la identidad de tu marca.",
              },
              {
                nombre: "Packaging impreso",
                texto:
                  "Cajas, bandejas y otros empaques a medida para presentar tus productos de forma profesional.",
              },
              {
                nombre: "Revistas y catálogos",
                texto:
                  "Revistas, catálogos y dípticos/trípticos para mostrar tus productos y servicios con impacto.",
              },
              {
                nombre: "Etiquetas y adhesivos",
                texto:
                  "Stickers, etiquetas y autoadhesivos para productos, packaging y señalización interna.",
              },
            ].map((item) => (
              <article
                key={item.nombre}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Acá después metemos imagen real */}
                <div className="mb-4 h-28 rounded-xl bg-slate-200/80" />

                <h3 className="text-base font-semibold text-slate-900">
                  {item.nombre}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {item.texto}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS + MAPA (placeholder) */}
      <section className="bg-pink-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Sobre Imprenta Magenta
            </h2>
            <p className="mt-4 text-sm text-slate-700 sm:text-base">
              Magenta es una imprenta moderna de Paysandú, especializada en impresión
              digital, offset y soluciones gráficas a medida. Combinamos tecnología,
              experiencia y atención personalizada para que cada pieza comunique lo mejor
              de tu marca.
            </p>
            <p className="mt-3 text-sm text-slate-700 sm:text-base">
              Trabajamos con emprendedores, comercios y empresas, ofreciendo asesoramiento
              en diseño, elección de materiales y terminaciones.
            </p>
          </div>

          <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              ¿Dónde estamos?
            </p>
            <p className="mt-1 text-sm text-slate-700">
              Calle 46 Norte 987, Paysandú, Uruguay.
            </p>
            <div className="mt-4 h-56 w-full rounded-xl bg-slate-200">
              {/* Aquí luego incrustamos el mapa real */}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS (placeholder) */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Próximamente vamos a sumar testimonios de clientes que confían en Magenta
            para sus impresos.
          </p>
        </div>
      </section>

      {/* CONTACTO / CTA FINAL */}
      <section
        id="contacto"
        className="bg-slate-900 py-16 sm:py-20 text-white"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                ¿Necesitás un presupuesto?
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-200 sm:text-base">
                Contanos qué tipo de trabajo necesitás (tarjetas, bolsas, folletos,
                revistas, etc.) y te respondemos a la brevedad.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/59898273040"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  Escribir por WhatsApp
                </a>
                <a
                  href="mailto:imprentamagentauy@gmail.com"
                  className="text-sm font-semibold text-slate-100 hover:underline"
                >
                  Enviar un email
                </a>
              </div>
            </div>

            <form className="space-y-4 rounded-2xl bg-slate-800 p-6 shadow-lg">
              <div>
                <label className="block text-xs font-medium text-slate-200">
                  Nombre / Empresa
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-pink-400"
                  placeholder="Tu nombre o el de tu negocio"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-pink-400"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-200">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-pink-400"
                    placeholder="+598..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-200">
                  Tipo de trabajo
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-pink-400"
                  placeholder="Ej: tarjetas personales, bolsas, folletos..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-200">
                  Mensaje
                </label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-pink-400"
                  rows={4}
                  placeholder="Contanos cantidades aproximadas, medidas u otros detalles."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-pink-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                Enviar consulta
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}