import type { MetadataRoute } from "next";
import { BUILD_INDEXING_ENABLED, SEO_CONFIG } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(BUILD_INDEXING_ENABLED
      ? { sitemap: `${SEO_CONFIG.canonicalOrigin}/sitemap.xml` }
      : {}),
  };
}
