// src/app/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import Hero from "./components/Hero";
import BenefitsBar from "./components/BenefitsBar";
import FeaturedProducts from "./components/FeaturedProducts";
import AboutSection from "./components/AboutSection";
import Testimonials from "./components/Testimonials";
import QuoteCTA from "./components/QuoteCTA";
import ClientsStrip from "./components/ClientsStrip";

export const metadata: Metadata = {
  title: "Imprenta Magenta Paysandú – Impresión digital y offset",
  description: "Imprenta Magenta ofrece impresión digital, offset, packaging gastronómico, bolsas de papel y soluciones gráficas a medida en Paysandú.",
};

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

      {/* PEDIR PRESUPUESTO */}
      <QuoteCTA />

      {/* CLIENTES */}
      <ClientsStrip />
    </main>
  );
}