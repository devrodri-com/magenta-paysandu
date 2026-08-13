import type { MetadataRoute } from "next";
import { PAGE_SEO, SEO_CONFIG } from "@/config/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO_CONFIG.siteName,
    short_name: SEO_CONFIG.publicBrand,
    description: PAGE_SEO["/"].description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    lang: SEO_CONFIG.language,
    icons: [
      {
        src: "/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
