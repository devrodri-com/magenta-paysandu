// src/app/page.tsx
import Image from "next/image";
import Hero from "./components/Hero";
import BenefitsBar from "./components/BenefitsBar";
import FeaturedProducts from "./components/FeaturedProducts";
import AboutSection from "./components/AboutSection";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <Hero />

      {/* BENEFICIOS CLAVE */}
      <BenefitsBar />

      {/* PRODUCTOS / CATEGORÍAS PRINCIPALES */}
      <FeaturedProducts />

      {/* QUIÉNES SOMOS + MAPA */}
      <AboutSection />

      {/* TESTIMONIOS (placeholder) */}
      <Testimonials />

      {/* CONTACTO / CTA FINAL */}
      <section id="contacto" className="bg-slate-900 py-16 sm:py-20 text-white">
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
                  <label className="block text-xs font-medium text-slate-200">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-pink-400"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-200">WhatsApp</label>
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
                <label className="block text-xs font-medium text-slate-200">Mensaje</label>
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