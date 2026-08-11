// src/app/page.tsx
import type { Metadata } from "next";
import Hero from "./components/Hero";
import BenefitsBar from "./components/BenefitsBar";
import FeaturedProducts from "./components/FeaturedProducts";
import ServicesOverview from "./components/ServicesOverview";
import AboutSection from "./components/AboutSection";
import ClientsStrip from "./components/ClientsStrip";
import Testimonials from "./components/Testimonials";
import QuoteCTA from "./components/QuoteCTA";

export const metadata: Metadata = {
  title: "Imprenta Magenta Paysandú – Impresión digital y offset",
  description: "Imprenta Magenta ofrece impresión digital, offset, packaging, bolsas de papel y soluciones gráficas a medida en Paysandú.",
};

/*
 * El layout raíz ya envuelve las páginas en <main>: acá el contenedor es un
 * <div> para no anidar dos landmarks main.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <Hero />

      {/* BENEFICIOS CLAVE */}
      <BenefitsBar />

      {/* PRODUCTOS / CATEGORÍAS PRINCIPALES */}
      <FeaturedProducts />

      {/* SERVICIOS */}
      <ServicesOverview />

      {/* QUIÉNES SOMOS + MAPA */}
      <AboutSection />

      {/* PRUEBA SOCIAL: marcas que confían → experiencia real → pedir presupuesto */}
      <ClientsStrip />
      <Testimonials />

      {/* PEDIR PRESUPUESTO */}
      <QuoteCTA />
    </div>
  );
}
