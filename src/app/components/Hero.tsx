import Image from "next/image";

export default function Hero() {
  return (
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
  );
}

