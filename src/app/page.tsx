import Hero from "./components/Hero";
import BenefitsBar from "./components/BenefitsBar";
import FeaturedProducts from "./components/FeaturedProducts";
import ServicesOverview from "./components/ServicesOverview";
import AboutSection from "./components/AboutSection";
import ClientsStrip from "./components/ClientsStrip";
import Testimonials from "./components/Testimonials";
import QuoteCTA from "./components/QuoteCTA";
import {
  buildHomeStructuredData,
  metadataForPath,
  serializeJsonLd,
} from "@/config/seo";

export const metadata = metadataForPath("/");

/*
 * El layout raíz ya envuelve las páginas en <main>: acá el contenedor es un
 * <div> para no anidar dos landmarks main.
 */
export default function Home() {
  const structuredData = buildHomeStructuredData();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />

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
