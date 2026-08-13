import type { MetadataRoute } from "next";
import {
  BUILD_INDEXING_ENABLED,
  FUTURE_INDEXABLE_ROUTES,
  PORTFOLIO_EDITORIALLY_APPROVED,
  canonicalUrl,
  isPortfolioBuildIndexable,
} from "@/config/seo";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";

// No incluimos lastModified porque no es requerido y usar new Date() en cada build genera fechas cambiantes
// sin cambios reales, lo cual puede confundir a los motores de búsqueda.
export function buildSitemap(
  buildIndexingEnabled = BUILD_INDEXING_ENABLED,
  portfolioHasContent = PORTFOLIO_ITEMS.length > 0,
  portfolioEditoriallyApproved = PORTFOLIO_EDITORIALLY_APPROVED,
): MetadataRoute.Sitemap {
  if (!buildIndexingEnabled) return [];

  const staticRoutes = FUTURE_INDEXABLE_ROUTES.map((pathname) => ({
    url: canonicalUrl(pathname),
  }));

  if (
    !isPortfolioBuildIndexable(
      portfolioHasContent,
      buildIndexingEnabled,
      portfolioEditoriallyApproved,
    )
  ) {
    return staticRoutes;
  }

  return [...staticRoutes, { url: canonicalUrl("/portfolio") }];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap();
}
