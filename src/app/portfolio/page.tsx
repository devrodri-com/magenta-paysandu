import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  SEO_CONFIG,
  canonicalUrl,
  robotsForPath,
} from "@/config/seo";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

/*
 * Con el dataset vacío la ruta responde 404, así que el title real de Portfolio
 * sería engañoso: devolvemos metadata neutral y noindex explícito.
 */
export function generateMetadata(): Metadata {
  if (PORTFOLIO_ITEMS.length === 0) {
    return {
      title: "Página no encontrada",
      description: "La página que buscás no existe en el sitio de Magenta.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = "Portfolio de trabajos";
  const description =
    "Galería de trabajos realizados: bolsas personalizadas, packaging, etiquetas, afiches y otras piezas impresas para clientes reales.";
  const canonical = canonicalUrl("/portfolio");
  const imageUrl = new URL(
    SEO_CONFIG.openGraphImage.path,
    SEO_CONFIG.canonicalOrigin,
  ).toString();

  return {
    title,
    description,
    alternates: { canonical },
    robots: robotsForPath("/portfolio", undefined, {
      portfolioHasContent: true,
    }),
    openGraph: {
      type: "website",
      locale: SEO_CONFIG.locale,
      siteName: SEO_CONFIG.siteName,
      url: canonical,
      title: `${title} | ${SEO_CONFIG.titleSuffix}`,
      description,
      images: [
        {
          url: imageUrl,
          width: SEO_CONFIG.openGraphImage.width,
          height: SEO_CONFIG.openGraphImage.height,
          alt: SEO_CONFIG.openGraphImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SEO_CONFIG.titleSuffix}`,
      description,
      images: [imageUrl],
    },
  };
}

/*
 * Política de ruta: mientras PORTFOLIO_ITEMS esté vacío, /portfolio no existe
 * públicamente (404 + noindex) en lugar de publicar una página placeholder.
 * La arquitectura queda intacta: al sumar el primer trabajo real al dataset,
 * la ruta vuelve a responder 200 sin reescribir esta página ni el sitemap.
 *
 * El layout raíz ya envuelve las páginas en <main>: acá el contenedor es un
 * <div> para no anidar dos landmarks main.
 */
export default function PortfolioPage() {
  if (PORTFOLIO_ITEMS.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trabajos realizados
          </h1>
          <p className="mt-4 text-sm text-slate-700 sm:text-base">
            Una selección de trabajos de Magenta: bolsas personalizadas,
            packaging, etiquetas, afiches y otras piezas impresas para clientes
            reales.
          </p>
        </header>

        {/* Grid de trabajos */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_ITEMS.map((item) => {
            const firstImage = item.images[0];
            const imagePath = firstImage ? `/images/portfolio/${item.id}/${firstImage}` : null;

            return (
              <article
                key={item.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
              >
                {imagePath ? (
                  <div className="relative h-40 bg-slate-200">
                    <Image
                      src={imagePath}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 bg-slate-200" />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-magenta">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="mt-2 text-sm text-slate-700">
                      {item.description}
                    </p>
                  )}
                  {item.clientName && (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.clientName}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
