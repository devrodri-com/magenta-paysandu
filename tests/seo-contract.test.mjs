import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const projectRoot = process.cwd();

function loadTypeScriptModule(relativePath, dependencies = {}) {
  const filename = path.join(projectRoot, relativePath);
  const source = fs.readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
  });
  const compiledModule = { exports: {} };
  const localRequire = (specifier) => {
    if (Object.hasOwn(dependencies, specifier)) {
      return dependencies[specifier];
    }
    throw new Error(`Dependencia no permitida en el test SEO: ${specifier}`);
  };

  const execute = new Function(
    "module",
    "exports",
    "require",
    "__filename",
    "__dirname",
    outputText,
  );
  execute(
    compiledModule,
    compiledModule.exports,
    localRequire,
    filename,
    path.dirname(filename),
  );
  return compiledModule.exports;
}

function read(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

const contact = loadTypeScriptModule("src/data/contact.ts");
const seo = loadTypeScriptModule("src/config/seo.ts", {
  "@/data/contact": contact,
});
const portfolio = loadTypeScriptModule("src/data/portfolio.ts");
const sitemapModule = loadTypeScriptModule("src/app/sitemap.ts", {
  "@/config/seo": seo,
  "@/data/portfolio": portfolio,
});
const turnstile = loadTypeScriptModule("src/lib/turnstile.ts");
const nextConfig = loadTypeScriptModule("next.config.ts").default;

const expectedFutureRoutes = [
  "/",
  "/productos",
  "/servicios",
  "/sobre-nosotros",
  "/contacto",
  "/presupuesto",
];

const expectedFutureUrls = [
  "https://www.magentauruguay.com/",
  "https://www.magentauruguay.com/productos",
  "https://www.magentauruguay.com/servicios",
  "https://www.magentauruguay.com/sobre-nosotros",
  "https://www.magentauruguay.com/contacto",
  "https://www.magentauruguay.com/presupuesto",
];

test("el gate de build sólo se habilita con true literal en producción", () => {
  assert.equal(seo.isBuildIndexingEnabled({}), false);
  assert.equal(
    seo.isBuildIndexingEnabled({
      SEO_INDEXING_ENABLED: "false",
      VERCEL_ENV: "production",
    }),
    false,
  );
  assert.equal(
    seo.isBuildIndexingEnabled({
      SEO_INDEXING_ENABLED: "TRUE",
      VERCEL_ENV: "production",
    }),
    false,
  );
  assert.equal(
    seo.isBuildIndexingEnabled({
      SEO_INDEXING_ENABLED: "true",
      VERCEL_ENV: "preview",
    }),
    false,
  );
  assert.equal(
    seo.isBuildIndexingEnabled({
      SEO_INDEXING_ENABLED: "true",
      VERCEL_ENV: "production",
    }),
    true,
  );
});

test("la matriz futura contiene exactamente seis rutas e incluye presupuesto", () => {
  assert.deepEqual([...seo.FUTURE_INDEXABLE_ROUTES], expectedFutureRoutes);

  for (const pathname of expectedFutureRoutes) {
    assert.equal(seo.isRouteIndexable(pathname, false), false, pathname);
    assert.equal(seo.isRouteIndexable(pathname, true), true, pathname);
  }

  for (const pathname of [
    "/testimonios",
    "/portfolio",
    "/ruta-inexistente",
  ]) {
    assert.equal(seo.isRouteIndexable(pathname, true), false, pathname);
  }
});

test("el guard runtime exige producción, host canónico y política aprobada", () => {
  const enabledProduction = {
    SEO_INDEXING_ENABLED: "true",
    VERCEL_ENV: "production",
  };

  for (const pathname of expectedFutureRoutes) {
    assert.equal(
      seo.isIndexingAllowedForRequest(
        pathname,
        "www.magentauruguay.com",
        enabledProduction,
      ),
      true,
      pathname,
    );
    assert.equal(
      seo.shouldSendNoindexHeader(
        pathname,
        "magenta-paysandu.vercel.app",
        enabledProduction,
      ),
      true,
      pathname,
    );
  }

  assert.equal(
    seo.shouldSendNoindexHeader(
      "/productos",
      "www.magentauruguay.com",
      { SEO_INDEXING_ENABLED: "true", VERCEL_ENV: "preview" },
    ),
    true,
  );
  assert.equal(
    seo.shouldSendNoindexHeader(
      "/testimonios",
      "www.magentauruguay.com",
      enabledProduction,
    ),
    true,
  );
});

test("portfolio exige contenido, aprobación editorial, gate y host canónico", () => {
  const enabledProduction = {
    SEO_INDEXING_ENABLED: "true",
    VERCEL_ENV: "production",
  };

  assert.equal(portfolio.PORTFOLIO_ITEMS.length, 0);
  assert.equal(seo.PORTFOLIO_EDITORIALLY_APPROVED, false);
  assert.equal(seo.isPortfolioBuildIndexable(false, true, true), false);
  assert.equal(seo.isPortfolioBuildIndexable(true, true, false), false);
  assert.equal(seo.isPortfolioBuildIndexable(true, false, true), false);
  assert.equal(seo.isPortfolioBuildIndexable(true, true, true), true);
  assert.equal(
    seo.isPortfolioIndexingAllowed(
      true,
      "www.magentauruguay.com",
      enabledProduction,
      true,
    ),
    true,
  );
  assert.equal(
    seo.isPortfolioIndexingAllowed(
      true,
      "magenta-paysandu.vercel.app",
      enabledProduction,
      true,
    ),
    false,
  );
  assert.equal(
    seo.isRouteIndexable("/portfolio", true, {
      portfolioHasContent: true,
      portfolioEditoriallyApproved: false,
    }),
    false,
  );
  assert.equal(
    seo.isRouteIndexable("/portfolio", true, {
      portfolioHasContent: true,
      portfolioEditoriallyApproved: true,
    }),
    true,
  );
});

test("sitemap es 0 en prelaunch, 6 en future y portfolio es condicional", () => {
  assert.deepEqual(sitemapModule.buildSitemap(false, false, false), []);
  assert.deepEqual(
    sitemapModule.buildSitemap(true, false, false).map(({ url }) => url),
    expectedFutureUrls,
  );
  assert.deepEqual(
    sitemapModule.buildSitemap(true, true, false).map(({ url }) => url),
    expectedFutureUrls,
  );
  assert.deepEqual(
    sitemapModule.buildSitemap(true, true, true).map(({ url }) => url),
    [...expectedFutureUrls, "https://www.magentauruguay.com/portfolio"],
  );
});

test("metadata conserva títulos, descripciones y canonicals exactos", () => {
  const expectedCanonicals = {
    "/": "https://www.magentauruguay.com/",
    "/productos": "https://www.magentauruguay.com/productos",
    "/servicios": "https://www.magentauruguay.com/servicios",
    "/sobre-nosotros": "https://www.magentauruguay.com/sobre-nosotros",
    "/contacto": "https://www.magentauruguay.com/contacto",
    "/presupuesto": "https://www.magentauruguay.com/presupuesto",
    "/testimonios": "https://www.magentauruguay.com/testimonios",
  };

  for (const [pathname, canonical] of Object.entries(expectedCanonicals)) {
    const metadata = seo.metadataForPath(pathname);
    assert.equal(metadata.alternates.canonical, canonical, pathname);
    assert.equal(metadata.description, seo.PAGE_SEO[pathname].description);
    assert.equal(metadata.openGraph.url, canonical, pathname);
    assert.equal(metadata.openGraph.siteName, "Magenta Paysandú", pathname);
    assert.equal(metadata.twitter.card, "summary_large_image", pathname);
    assert.doesNotMatch(JSON.stringify(metadata), /\.vercel\.app/i, pathname);
  }

  assert.deepEqual(seo.metadataForPath("/").title, {
    absolute: "Magenta | Imprenta en Paysandú",
  });
  assert.equal(
    seo.PAGE_SEO["/presupuesto"].title,
    "Solicitar presupuesto de impresión",
  );
  assert.equal(
    seo.PAGE_SEO["/testimonios"].description,
    "Opiniones y experiencias de clientes que trabajaron con Magenta en Paysandú.",
  );
});

test("el mapa legacy contiene sólo los siete redirects aprobados", async () => {
  const redirects = await nextConfig.redirects();
  const expectedRedirects = [
    { source: "/bolsas", destination: "/productos", permanent: true },
    { source: "/papeleria", destination: "/productos", permanent: true },
    { source: "/packaging", destination: "/productos", permanent: true },
    {
      source: "/impresion-offset",
      destination: "/servicios",
      permanent: true,
    },
    {
      source: "/impresion-digital",
      destination: "/servicios",
      permanent: true,
    },
    { source: "/contact", destination: "/contacto", permanent: true },
    {
      source: "/about",
      destination: "/sobre-nosotros",
      permanent: true,
    },
  ];

  assert.deepEqual(redirects, expectedRedirects);
  assert.equal(nextConfig.skipTrailingSlashRedirect, undefined);
  assert.equal(new Set(redirects.map(({ source }) => source)).size, 7);

  for (const redirect of redirects) {
    assert.equal(redirect.destination.startsWith("/"), true, redirect.source);
    assert.equal(redirect.destination.startsWith("//"), false, redirect.source);
    assert.notEqual(redirect.destination, "/", redirect.source);
    assert.notEqual(redirect.destination, "/portfolio", redirect.source);
    assert.notEqual(redirect.destination, "/presupuesto", redirect.source);
    assert.doesNotMatch(redirect.source, /[*:]/, redirect.source);
    assert.doesNotMatch(redirect.destination, /\.vercel\.app/i, redirect.source);
    assert.doesNotMatch(redirect.destination, /^https?:\/\//i, redirect.source);
  }

  const sources = new Set(redirects.map(({ source }) => source));
  for (const forbiddenSource of [
    "/services",
    "/projects",
    "/hello-world",
    "/category/uncategorized",
    "/portfolio",
    "/presupuesto",
    "/wp-login.php",
    "/wp-json",
    "/wp-admin",
    "/feed",
    "/comments/feed",
    "/wp-content/uploads/2025/08/LOGO-MAGENTA.svg",
  ]) {
    assert.equal(sources.has(forbiddenSource), false, forbiddenSource);
  }
});

test("el graph contiene una sola WebSite y una sola LocalBusiness", () => {
  const structuredData = seo.buildHomeStructuredData();
  const websiteNodes = structuredData["@graph"].filter(
    (node) => node["@type"] === "WebSite",
  );
  const businessNodes = structuredData["@graph"].filter(
    (node) => node["@type"] === "LocalBusiness",
  );

  assert.equal(structuredData["@context"], "https://schema.org");
  assert.equal(websiteNodes.length, 1);
  assert.equal(businessNodes.length, 1);
  assert.equal(
    websiteNodes[0]["@id"],
    "https://www.magentauruguay.com/#website",
  );
  assert.equal(
    businessNodes[0]["@id"],
    "https://www.magentauruguay.com/#business",
  );
  assert.equal(websiteNodes[0].url, "https://www.magentauruguay.com/");
  assert.equal(websiteNodes[0].inLanguage, "es-UY");
  assert.equal(businessNodes[0].legalName, "Grupo Magenta SAS");
  assert.equal(businessNodes[0].foundingDate, "2010-06-02");
  assert.equal(businessNodes[0].telephone, "+59898273040");
  assert.equal(
    businessNodes[0].hasMap,
    "https://www.google.com/maps/place/Magenta/data=!4m2!3m1!1s0x0:0x4cce7eeb45acbc13?sa=X&ved=1t:2428&ictx=111",
  );

  const serialized = seo.serializeJsonLd(structuredData);
  assert.doesNotThrow(() => JSON.parse(serialized));
  assert.doesNotMatch(serialized, /\.vercel\.app/i);
  for (const forbiddenProperty of [
    "AggregateRating",
    "Review",
    "Product",
    "Offer",
    "priceRange",
    "taxID",
    "geo",
    "SearchAction",
    "FAQPage",
  ]) {
    assert.equal(serialized.includes(forbiddenProperty), false);
  }
});

test("la serialización JSON-LD neutraliza caracteres peligrosos", () => {
  const serialized = seo.serializeJsonLd({ value: "</script><script>" });
  assert.equal(serialized.includes("<"), false);
  assert.equal(serialized.includes("\\u003c/script"), true);
});

test("portfolio y 404 preservan LAUNCH_03 y evitan doble sufijo", () => {
  const portfolioPage = read("src/app/portfolio/page.tsx");
  const notFoundPage = read("src/app/not-found.tsx");
  const sitemap = read("src/app/sitemap.ts");

  assert.equal(portfolio.PORTFOLIO_ITEMS.length, 0);
  assert.match(portfolioPage, /if \(PORTFOLIO_ITEMS\.length === 0\)/);
  assert.match(portfolioPage, /notFound\(\)/);
  assert.match(portfolioPage, /PORTFOLIO_ITEMS\.map/);
  assert.match(portfolioPage, /title: "Página no encontrada"/);
  assert.doesNotMatch(
    portfolioPage,
    /Página no encontrada\s*[|–-]\s*(?:Imprenta )?Magenta/i,
  );
  assert.match(portfolioPage, /index: false/);
  assert.match(sitemap, /PORTFOLIO_EDITORIALLY_APPROVED/);
  assert.match(notFoundPage, /No encontramos esa página\./);
  assert.match(notFoundPage, /title: "Página no encontrada"/);
  assert.match(notFoundPage, /index: false/);
  assert.doesNotMatch(notFoundPage, /alternates|canonical/);
});

test("el escaneo de vercel se limita a superficies SEO y preserva Turnstile", () => {
  const seoSurfaceFiles = [
    "next.config.ts",
    "src/config/seo.ts",
    "src/proxy.ts",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "src/app/manifest.ts",
    "src/app/productos/page.tsx",
    "src/app/servicios/page.tsx",
    "src/app/sobre-nosotros/page.tsx",
    "src/app/contacto/page.tsx",
    "src/app/presupuesto/layout.tsx",
    "src/app/testimonios/page.tsx",
    "src/app/portfolio/page.tsx",
    "src/app/not-found.tsx",
  ];
  const seoSurface = seoSurfaceFiles.map(read).join("\n");

  assert.doesNotMatch(seoSurface, /\.vercel\.app/i);
  assert.deepEqual([...turnstile.TURNSTILE_PRODUCTION_HOSTNAMES], [
    "magentauruguay.com",
    "www.magentauruguay.com",
    "magenta-paysandu.vercel.app",
    "magenta-paysandu-git-refresh-magenta-2026-softbms-projects.vercel.app",
  ]);
});

test("copy y enlaces públicos respetan las políticas editoriales", () => {
  const publicFiles = [
    "src/app/components/BenefitsBar.tsx",
    "src/app/components/Footer.tsx",
    "src/app/components/Navbar.tsx",
    "src/app/testimonios/page.tsx",
    "src/data/about.ts",
    "src/data/services.ts",
  ];
  const source = publicFiles.map(read).join("\n");
  const forbiddenTestimonialsClaim = ["Experiencias", "verificadas"].join(
    " ",
  );

  assert.doesNotMatch(source, /Más de 1[56] años/i);
  assert.equal(
    source.toLowerCase().includes(forbiddenTestimonialsClaim.toLowerCase()),
    false,
  );
  assert.doesNotMatch(source, /href\s*=\s*["'{`]\/portfolio/i);
  assert.equal(seo.SEO_CONFIG.legalName, "Grupo Magenta SAS");
  assert.equal(seo.SEO_CONFIG.publicFoundingCopy, "Desde 2010");
  assert.match(read("src/app/components/Footer.tsx"), /SEO_CONFIG\.legalName/);
});
