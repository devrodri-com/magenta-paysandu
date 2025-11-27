// src/app/page.tsx
import Image from "next/image";
import Hero from "./components/Hero";
import BenefitsBar from "./components/BenefitsBar";
import FeaturedProducts from "./components/FeaturedProducts";
import AboutSection from "./components/AboutSection";
import Testimonials from "./components/Testimonials";
import QuoteCTA from "./components/QuoteCTA";
import ClientsStrip from "./components/ClientsStrip";

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