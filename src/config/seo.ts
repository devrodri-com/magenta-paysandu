import type { Metadata } from "next";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_PHONE_E164,
} from "@/data/contact";

export type SeoEnvironment = {
  [key: string]: string | undefined;
  SEO_INDEXING_ENABLED?: string;
  VERCEL_ENV?: string;
};

export type SeoRoute =
  | "/"
  | "/productos"
  | "/servicios"
  | "/sobre-nosotros"
  | "/contacto"
  | "/presupuesto"
  | "/testimonios";

export type IndexingContext = {
  portfolioHasContent?: boolean;
  portfolioEditoriallyApproved?: boolean;
};

export const SEO_CONFIG = {
  canonicalOrigin: "https://www.magentauruguay.com",
  canonicalHost: "www.magentauruguay.com",
  publicBrand: "Magenta",
  siteName: "Magenta Paysandú",
  legalName: "Grupo Magenta SAS",
  entityDescription: "Magenta, imprenta en Paysandú",
  titleSuffix: "Magenta Paysandú",
  language: "es-UY",
  locale: "es_UY",
  email: CONTACT_EMAIL,
  telephoneDisplay: WHATSAPP_DISPLAY,
  telephoneE164: `+${WHATSAPP_PHONE_E164}`,
  address: {
    streetAddress: CONTACT_ADDRESS,
    postalCode: "60000",
    addressLocality: "Paysandú",
    addressRegion: "Paysandú",
    addressCountry: "UY",
    countryName: "Uruguay",
  },
  foundingDate: "2010-06-02",
  publicFoundingCopy: "Desde 2010",
  delivery: {
    local:
      "Reparto semanal sin costo en Paysandú, coordinado según la producción. También ofrecemos entrega express con costo adicional.",
    national:
      "Enviamos a todo Uruguay por la agencia que elija el cliente. El despacho puede coordinarse junto con el reparto semanal o mediante una entrega express hasta la agencia, con costo adicional.",
  },
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  socialProfiles: [INSTAGRAM_URL, FACEBOOK_URL],
  googleMapsUrl:
    "https://www.google.com/maps/place/Magenta/data=!4m2!3m1!1s0x0:0x4cce7eeb45acbc13?sa=X&ved=1t:2428&ictx=111",
  openGraphImage: {
    path: "/og-magenta.jpg",
    width: 1200,
    height: 630,
    alt: "Logo de Magenta sobre fondo oscuro con referencias a impresión digital, offset y packaging gastronómico en Paysandú.",
  },
  schemaLogoPath: "/images/logo.svg",
  schemaImagePath: "/images/hero-image.jpg",
} as const;

export const PAGE_SEO: Record<
  SeoRoute,
  { title: string; description: string }
> = {
  "/": {
    title: "Magenta | Imprenta en Paysandú",
    description:
      "Impresión offset y digital, packaging, bolsas, etiquetas y papelería para empresas y emprendedores. Atención en Paysandú y envíos a todo Uruguay.",
  },
  "/productos": {
    title: "Productos impresos y packaging",
    description:
      "Packaging, bolsas de papel, adhesivos, etiquetas, papelería, revistas, catálogos, libretas, volantes y rollos térmicos.",
  },
  "/servicios": {
    title: "Impresión digital, offset y diseño",
    description:
      "Impresión digital y offset, diseño y asesoramiento para comercios, empresas y emprendedores en Paysandú.",
  },
  "/sobre-nosotros": {
    title: "Imprenta en Paysandú desde 2010",
    description:
      "Conocé la historia de Magenta, imprenta de Paysandú fundada en 2010 y dedicada a soluciones gráficas para empresas, comercios y emprendedores.",
  },
  "/contacto": {
    title: "Contacto, horarios y ubicación",
    description:
      "Contactá a Magenta en Proyectada 46 Nte. 987, Paysandú. Atención de lunes a viernes de 9:00 a 17:00 por WhatsApp, teléfono o email.",
  },
  "/presupuesto": {
    title: "Solicitar presupuesto de impresión",
    description:
      "Contanos qué necesitás imprimir y solicitá un presupuesto para packaging, bolsas, papelería, etiquetas u otros trabajos gráficos.",
  },
  "/testimonios": {
    title: "Opiniones de clientes",
    description:
      "Opiniones y experiencias de clientes que trabajaron con Magenta en Paysandú.",
  },
};

export const FUTURE_INDEXABLE_ROUTES = [
  "/",
  "/productos",
  "/servicios",
  "/sobre-nosotros",
  "/contacto",
  "/presupuesto",
] as const satisfies readonly SeoRoute[];

export const PORTFOLIO_EDITORIALLY_APPROVED = false;

export function isBuildIndexingEnabled(env: SeoEnvironment): boolean {
  return (
    env.SEO_INDEXING_ENABLED === "true" && env.VERCEL_ENV === "production"
  );
}

export const BUILD_INDEXING_ENABLED = isBuildIndexingEnabled(process.env);

function normalizePathname(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

export function canonicalUrl(pathname: SeoRoute | "/portfolio"): string {
  return new URL(pathname, SEO_CONFIG.canonicalOrigin).toString();
}

export function isFutureIndexableRoute(pathname: string): boolean {
  const normalizedPathname = normalizePathname(pathname);
  return FUTURE_INDEXABLE_ROUTES.some(
    (route) => route === normalizedPathname,
  );
}

export function isPortfolioBuildIndexable(
  hasContent: boolean,
  buildIndexingEnabled = BUILD_INDEXING_ENABLED,
  editoriallyApproved = PORTFOLIO_EDITORIALLY_APPROVED,
): boolean {
  return hasContent && editoriallyApproved && buildIndexingEnabled;
}

export function isPortfolioIndexingAllowed(
  hasContent: boolean,
  host: string | null,
  env: SeoEnvironment,
  editoriallyApproved = PORTFOLIO_EDITORIALLY_APPROVED,
): boolean {
  return (
    hasContent &&
    editoriallyApproved &&
    isBuildIndexingEnabled(env) &&
    isCanonicalHost(host)
  );
}

export function isRouteIndexable(
  pathname: string,
  buildIndexingEnabled = BUILD_INDEXING_ENABLED,
  context: IndexingContext = {},
): boolean {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === "/portfolio") {
    return isPortfolioBuildIndexable(
      context.portfolioHasContent ?? false,
      buildIndexingEnabled,
      context.portfolioEditoriallyApproved,
    );
  }

  return buildIndexingEnabled && isFutureIndexableRoute(normalizedPathname);
}

export function robotsForPath(
  pathname: string,
  buildIndexingEnabled = BUILD_INDEXING_ENABLED,
  context: IndexingContext = {},
): NonNullable<Metadata["robots"]> {
  return {
    index: isRouteIndexable(pathname, buildIndexingEnabled, context),
    follow: true,
  };
}

function fullTitle(pathname: SeoRoute): string {
  const title = PAGE_SEO[pathname].title;
  return pathname === "/"
    ? title
    : `${title} | ${SEO_CONFIG.titleSuffix}`;
}

export function metadataForPath(pathname: SeoRoute): Metadata {
  const page = PAGE_SEO[pathname];
  const canonical = canonicalUrl(pathname);
  const brandedTitle = fullTitle(pathname);
  const imageUrl = new URL(
    SEO_CONFIG.openGraphImage.path,
    SEO_CONFIG.canonicalOrigin,
  ).toString();

  return {
    title: pathname === "/" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: {
      canonical,
    },
    robots: robotsForPath(pathname),
    openGraph: {
      type: "website",
      locale: SEO_CONFIG.locale,
      siteName: SEO_CONFIG.siteName,
      url: canonical,
      title: brandedTitle,
      description: page.description,
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
      title: brandedTitle,
      description: page.description,
      images: [imageUrl],
    },
  };
}

function normalizeHost(host: string | null): string {
  if (!host) return "";

  const firstHost = host.split(",", 1)[0]?.trim().toLowerCase() ?? "";
  if (firstHost.startsWith("[")) {
    const closingBracket = firstHost.indexOf("]");
    return closingBracket >= 0
      ? firstHost.slice(1, closingBracket)
      : firstHost;
  }

  return firstHost.split(":", 1)[0] ?? "";
}

export function isCanonicalHost(host: string | null): boolean {
  return normalizeHost(host) === SEO_CONFIG.canonicalHost;
}

export function isIndexingAllowedForRequest(
  pathname: string,
  host: string | null,
  env: SeoEnvironment,
  context: IndexingContext = {},
): boolean {
  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname === "/portfolio") {
    return isPortfolioIndexingAllowed(
      context.portfolioHasContent ?? false,
      host,
      env,
      context.portfolioEditoriallyApproved,
    );
  }

  return (
    isBuildIndexingEnabled(env) &&
    isCanonicalHost(host) &&
    isFutureIndexableRoute(normalizedPathname)
  );
}

export function shouldSendNoindexHeader(
  pathname: string,
  host: string | null,
  env: SeoEnvironment,
  context: IndexingContext = {},
): boolean {
  return !isIndexingAllowedForRequest(pathname, host, env, context);
}

export function buildHomeStructuredData() {
  const websiteId = `${SEO_CONFIG.canonicalOrigin}/#website`;
  const businessId = `${SEO_CONFIG.canonicalOrigin}/#business`;
  const canonicalHome = canonicalUrl("/");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": websiteId,
        "@type": "WebSite",
        url: canonicalHome,
        name: SEO_CONFIG.siteName,
        alternateName: [
          SEO_CONFIG.publicBrand,
          "Imprenta Magenta",
          "Imprenta Magenta Paysandú",
          "magentauruguay.com",
        ],
        inLanguage: SEO_CONFIG.language,
        publisher: {
          "@id": businessId,
        },
      },
      {
        "@id": businessId,
        "@type": "LocalBusiness",
        name: SEO_CONFIG.publicBrand,
        legalName: SEO_CONFIG.legalName,
        alternateName: ["Imprenta Magenta", SEO_CONFIG.siteName],
        url: canonicalHome,
        email: SEO_CONFIG.email,
        telephone: SEO_CONFIG.telephoneE164,
        foundingDate: SEO_CONFIG.foundingDate,
        address: {
          "@type": "PostalAddress",
          streetAddress: SEO_CONFIG.address.streetAddress,
          postalCode: SEO_CONFIG.address.postalCode,
          addressLocality: SEO_CONFIG.address.addressLocality,
          addressRegion: SEO_CONFIG.address.addressRegion,
          addressCountry: SEO_CONFIG.address.addressCountry,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...SEO_CONFIG.openingHours.days],
          opens: SEO_CONFIG.openingHours.opens,
          closes: SEO_CONFIG.openingHours.closes,
        },
        hasMap: SEO_CONFIG.googleMapsUrl,
        sameAs: [...SEO_CONFIG.socialProfiles],
        logo: new URL(
          SEO_CONFIG.schemaLogoPath,
          SEO_CONFIG.canonicalOrigin,
        ).toString(),
        image: new URL(
          SEO_CONFIG.schemaImagePath,
          SEO_CONFIG.canonicalOrigin,
        ).toString(),
      },
    ],
  };
}

export function serializeJsonLd(value: unknown): string {
  const serialized = JSON.stringify(value);
  if (!serialized) {
    throw new Error("No se pudo serializar el JSON-LD de Magenta.");
  }

  return serialized
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
