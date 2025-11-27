import Image from "next/image";
import { LuCheck } from "react-icons/lu";

export default function AboutSection() {
  return (
    <section className="bg-pink-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Sobre Imprenta Magenta
          </h2>
          <p className="mt-4 text-sm text-slate-700 sm:text-base">
            Magenta es una imprenta moderna de Paysandú con más de 15 años de experiencia, especializada en impresión digital, offset y soluciones gráficas a medida. Combinamos tecnología, diseño y atención personalizada para que cada pieza impresa refleje lo mejor de tu marca.
          </p>
          <p className="mt-3 text-sm text-slate-700 sm:text-base">
            Acompañamos a emprendedores, comercios y empresas de todo el país, brindando asesoramiento en diseño, elección de materiales, acabados y packaging gastronómico, uno de nuestros principales enfoques.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <LuCheck className="h-5 w-5 text-brand-magenta" />
              <p className="text-sm text-slate-700">
                Atención personalizada en cada proyecto.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <LuCheck className="h-5 w-5 text-brand-magenta" />
              <p className="text-sm text-slate-700">
                Calidad profesional en materiales y terminaciones.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <LuCheck className="h-5 w-5 text-brand-magenta" />
              <p className="text-sm text-slate-700">
                Más de 15 años de experiencia en el sector.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">¿Dónde estamos?</p>
          <p className="mt-1 text-sm text-slate-700">
            Proyectada 46 Nte. 987, 60000 Paysandú, Uruguay.
          </p>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Lunes a viernes, 9:00 a 17:00 h · WhatsApp: 098 273 040
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

          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">
            Mapa de ubicación
          </p>
          <div className="mt-4 h-40 w-full overflow-hidden rounded-xl">
            <iframe
              src="https://www.google.com/maps?q=Proyectada+46+Nte.+987,+60000+Paysand%C3%BA,+Uruguay&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
