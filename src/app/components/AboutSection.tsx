import Image from "next/image";

export default function AboutSection() {
  return (
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
          <p className="text-sm font-semibold text-slate-900">¿Dónde estamos?</p>
          <p className="mt-1 text-sm text-slate-700">
            Calle 46 Norte 987, Paysandú, Uruguay.
          </p>

          <div className="mt-4 overflow-hidden rounded-xl">
            <Image
              src="/images/hero-image.jpg"
              alt="Fachada de Imprenta Magenta en Paysandú"
              width={800}
              height={500}
              className="h-40 w-full object-cover"
            />
          </div>

          <div className="mt-4 h-40 w-full rounded-xl bg-slate-200">
            {/* Aquí luego incrustamos el mapa real */}
          </div>
        </div>
      </div>
    </section>
  );
}

