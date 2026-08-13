import assert from "node:assert/strict";
import http from "node:http";

const origin = process.env.SEO_TEST_ORIGIN ?? "http://127.0.0.1:3101";
const requestHost = process.env.SEO_TEST_HOST ?? "localhost:3101";
const expectBuildIndexing =
  process.env.SEO_EXPECT_BUILD_INDEXING === "true";
const canonicalHost = "www.magentauruguay.com";
const REQUEST_TIMEOUT_MS = 5000;
const MAX_REDIRECTS_ALLOWED = 5;
const redirectStatuses = new Set([301, 302, 307, 308]);

const approvedRoutes = new Set([
  "/",
  "/productos",
  "/servicios",
  "/sobre-nosotros",
  "/contacto",
  "/presupuesto",
]);

const htmlRoutes = [
  "/",
  "/productos",
  "/servicios",
  "/sobre-nosotros",
  "/contacto",
  "/presupuesto",
  "/testimonios",
  "/portfolio",
  "/ruta-inexistente-de-prueba",
];

const expectedCanonicals = {
  "/": "https://www.magentauruguay.com",
  "/productos": "https://www.magentauruguay.com/productos",
  "/servicios": "https://www.magentauruguay.com/servicios",
  "/sobre-nosotros": "https://www.magentauruguay.com/sobre-nosotros",
  "/contacto": "https://www.magentauruguay.com/contacto",
  "/presupuesto": "https://www.magentauruguay.com/presupuesto",
  "/testimonios": "https://www.magentauruguay.com/testimonios",
};

const expectedSitemapUrls = [
  "https://www.magentauruguay.com/",
  "https://www.magentauruguay.com/productos",
  "https://www.magentauruguay.com/servicios",
  "https://www.magentauruguay.com/sobre-nosotros",
  "https://www.magentauruguay.com/contacto",
  "https://www.magentauruguay.com/presupuesto",
];

const expectedTitles = {
  "/": "Magenta | Imprenta en Paysandú",
  "/productos": "Productos impresos y packaging | Magenta Paysandú",
  "/servicios": "Impresión digital, offset y diseño | Magenta Paysandú",
  "/sobre-nosotros": "Imprenta en Paysandú desde 2010 | Magenta Paysandú",
  "/contacto": "Contacto, horarios y ubicación | Magenta Paysandú",
  "/presupuesto": "Solicitar presupuesto de impresión | Magenta Paysandú",
  "/testimonios": "Opiniones de clientes | Magenta Paysandú",
};

const expectedDescriptions = {
  "/":
    "Impresión offset y digital, packaging, bolsas, etiquetas y papelería para empresas y emprendedores. Atención en Paysandú y envíos a todo Uruguay.",
  "/productos":
    "Packaging, bolsas de papel, adhesivos, etiquetas, papelería, revistas, catálogos, libretas, volantes y rollos térmicos.",
  "/servicios":
    "Impresión digital y offset, diseño y asesoramiento para comercios, empresas y emprendedores en Paysandú.",
  "/sobre-nosotros":
    "Conocé la historia de Magenta, imprenta de Paysandú fundada en 2010 y dedicada a soluciones gráficas para empresas, comercios y emprendedores.",
  "/contacto":
    "Contactá a Magenta en Proyectada 46 Nte. 987, Paysandú. Atención de lunes a viernes de 9:00 a 17:00 por WhatsApp, teléfono o email.",
  "/presupuesto":
    "Contanos qué necesitás imprimir y solicitá un presupuesto para packaging, bolsas, papelería, etiquetas u otros trabajos gráficos.",
  "/testimonios":
    "Opiniones y experiencias de clientes que trabajaron con Magenta en Paysandú.",
};

const legacyRedirects = [
  { source: "/bolsas", destination: "/productos" },
  { source: "/papeleria", destination: "/productos" },
  { source: "/packaging", destination: "/productos" },
  { source: "/impresion-offset", destination: "/servicios" },
  { source: "/impresion-digital", destination: "/servicios" },
  { source: "/contact", destination: "/contacto" },
  { source: "/about", destination: "/sobre-nosotros" },
];

const canonicalSlashRoutes = [
  { source: "/productos/", destination: "/productos", type: "html" },
  { source: "/servicios/", destination: "/servicios", type: "html" },
  {
    source: "/sobre-nosotros/",
    destination: "/sobre-nosotros",
    type: "html",
  },
  { source: "/contacto/", destination: "/contacto", type: "html" },
  {
    source: "/presupuesto/",
    destination: "/presupuesto",
    type: "html",
  },
  {
    source: "/testimonios/",
    destination: "/testimonios",
    type: "html",
  },
  { source: "/robots.txt/", destination: "/robots.txt", type: "text" },
  { source: "/sitemap.xml/", destination: "/sitemap.xml", type: "xml" },
  { source: "/images/logo.svg/", destination: "/images/logo.svg", type: "asset" },
];

const nonTargetRoutes = [
  "/services",
  "/services/",
  "/projects",
  "/projects/",
  "/hello-world",
  "/hello-world/",
  "/category/uncategorized",
  "/category/uncategorized/",
  "/wp-login.php",
  "/wp-login.php/",
  "/wp-json",
  "/wp-json/",
  "/wp-admin",
  "/wp-admin/",
  "/feed",
  "/feed/",
  "/comments/feed",
  "/comments/feed/",
  "/wp-content/uploads/2025/08/LOGO-MAGENTA.svg",
  "/wp-content/uploads/2025/08/LOGO-MAGENTA.svg/",
  "/ruta-antigua-desconocida",
  "/ruta-antigua-desconocida/",
];

function normalizedHost(host) {
  return host.toLowerCase().split(":", 1)[0];
}

function request(pathname, accept = "text/html") {
  const url = new URL(pathname, origin);

  return new Promise((resolve, reject) => {
    const clientRequest = http.get(
      url,
      {
        headers: {
          Accept: accept,
          "Accept-Encoding": "identity",
          Host: requestHost,
        },
      },
      (response) => {
        response.setEncoding("utf8");
        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          resolve({
            body,
            headers: response.headers,
            status: response.statusCode ?? 0,
          });
        });
      },
    );

    clientRequest.setTimeout(REQUEST_TIMEOUT_MS, () => {
      clientRequest.destroy(
        new Error(`Timeout HTTP para ${pathname} tras ${REQUEST_TIMEOUT_MS}ms`),
      );
    });
    clientRequest.on("error", reject);
  });
}

async function followRedirectChain(
  pathname,
  accept = "text/html",
  maxRedirects = MAX_REDIRECTS_ALLOWED,
) {
  const visited = new Set();
  const redirects = [];
  let currentPathname = pathname;

  while (true) {
    assert.equal(
      visited.has(currentPathname),
      false,
      `redirect loop: ${pathname}`,
    );
    visited.add(currentPathname);

    const response = await request(currentPathname, accept);
    if (!redirectStatuses.has(response.status)) {
      return { finalPathname: currentPathname, redirects, response };
    }

    const location = response.headers.location ?? null;
    assert.notEqual(location, null, currentPathname);
    assert.equal(redirects.length < maxRedirects, true, pathname);
    assert.equal(location.startsWith("/"), true, currentPathname);
    assert.equal(location.startsWith("//"), false, currentPathname);
    assert.doesNotMatch(location, /^https?:\/\//i, currentPathname);
    assert.doesNotMatch(location, /\.vercel\.app/i, currentPathname);

    redirects.push({
      from: currentPathname,
      location,
      status: response.status,
    });

    const nextUrl = new URL(location, origin);
    currentPathname = `${nextUrl.pathname}${nextUrl.search}`;
  }
}

function extractAttribute(html, selectorPattern, attribute) {
  const element = html.match(selectorPattern)?.[0] ?? "";
  const valuePattern = new RegExp(`${attribute}=["']([^"']+)["']`, "i");
  return element.match(valuePattern)?.[1] ?? null;
}

function extractAllAttributes(html, selectorPattern, attribute) {
  const valuePattern = new RegExp(`${attribute}=["']([^"']+)["']`, "i");
  return [...html.matchAll(selectorPattern)]
    .map((match) => match[0].match(valuePattern)?.[1] ?? null)
    .filter((value) => value !== null);
}

function extractTitle(html) {
  return html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? null;
}

function extractJsonLd(html) {
  return [
    ...html.matchAll(
      /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => match[1]);
}

function assertSeoSurfacesAvoidPreview({
  canonical,
  openGraphUrl,
  jsonLd = [],
  pathname,
}) {
  for (const value of [canonical, openGraphUrl, ...jsonLd]) {
    if (value !== null) assert.doesNotMatch(value, /\.vercel\.app/i, pathname);
  }
}

const results = [];
const redirectResults = [];
const slashNormalizationResults = [];
const nonTargetResults = [];

for (const pathname of htmlRoutes) {
  const response = await request(pathname);
  const isNotFound =
    pathname === "/portfolio" || pathname === "/ruta-inexistente-de-prueba";
  const metadataShouldIndex =
    expectBuildIndexing && approvedRoutes.has(pathname);
  const hostAllowsIndexing =
    metadataShouldIndex && normalizedHost(requestHost) === canonicalHost;
  const robots = extractAttribute(
    response.body,
    /<meta\s+[^>]*name=["']robots["'][^>]*>/i,
    "content",
  );
  const robotsValues = extractAllAttributes(
    response.body,
    /<meta\s+[^>]*name=["']robots["'][^>]*>/gi,
    "content",
  );
  const canonical = extractAttribute(
    response.body,
    /<link\s+[^>]*rel=["']canonical["'][^>]*>/i,
    "href",
  );
  const openGraphUrl = extractAttribute(
    response.body,
    /<meta\s+[^>]*property=["']og:url["'][^>]*>/i,
    "content",
  );
  const description = extractAttribute(
    response.body,
    /<meta\s+[^>]*name=["']description["'][^>]*>/i,
    "content",
  );
  const openGraphTitle = extractAttribute(
    response.body,
    /<meta\s+[^>]*property=["']og:title["'][^>]*>/i,
    "content",
  );
  const openGraphDescription = extractAttribute(
    response.body,
    /<meta\s+[^>]*property=["']og:description["'][^>]*>/i,
    "content",
  );
  const title = extractTitle(response.body);
  const jsonLd = extractJsonLd(response.body);

  assert.equal(response.status, isNotFound ? 404 : 200, pathname);
  assert.doesNotMatch(response.body, /name=["']keywords["']/i, pathname);
  assertSeoSurfacesAvoidPreview({ canonical, openGraphUrl, jsonLd, pathname });

  if (isNotFound) {
    assert.equal(title, "Página no encontrada | Magenta Paysandú", pathname);
    assert.equal(
      description,
      "La página que buscás no existe en el sitio de Magenta.",
      pathname,
    );
    assert.equal(
      robotsValues.some((value) => /noindex/i.test(value)),
      true,
      pathname,
    );
    assert.equal(
      robotsValues.some((value) => /follow/i.test(value)),
      true,
      pathname,
    );
    assert.equal(canonical, null, pathname);
    assert.match(response.body, /No encontramos esa página\./i, pathname);
    assert.doesNotMatch(response.body, /Próximamente/i, pathname);
  } else {
    assert.match(response.body, /<html lang="es-UY"/i, pathname);
    assert.equal(title, expectedTitles[pathname], pathname);
    assert.equal(description, expectedDescriptions[pathname], pathname);
    assert.equal(
      robots,
      metadataShouldIndex ? "index, follow" : "noindex, follow",
      pathname,
    );
    assert.equal(canonical, expectedCanonicals[pathname], pathname);
    assert.equal(openGraphUrl, expectedCanonicals[pathname], pathname);
    assert.equal(openGraphTitle, expectedTitles[pathname], pathname);
    assert.equal(openGraphDescription, expectedDescriptions[pathname], pathname);
  }

  assert.equal(
    response.headers["x-robots-tag"] ?? null,
    hostAllowsIndexing ? null : "noindex, follow",
    pathname,
  );

  if (pathname === "/") {
    assert.equal(jsonLd.length, 1);
    const structuredData = JSON.parse(jsonLd[0]);
    assert.equal(structuredData["@graph"].length, 2);
    assert.equal(
      structuredData["@graph"].filter(({ "@type": type }) => type === "WebSite")
        .length,
      1,
    );
    assert.equal(
      structuredData["@graph"].filter(
        ({ "@type": type }) => type === "LocalBusiness",
      ).length,
      1,
    );
  }

  if (pathname === "/presupuesto") {
    assert.match(response.body, /<form\b/i, pathname);
    assert.match(response.body, /Datos para la cotización/i, pathname);
  }

  if (pathname === "/testimonios") {
    assert.match(response.body, /Pio Pio/i, pathname);
  }

  results.push({
    canonical,
    pathname,
    robots,
    status: response.status,
    title,
    xRobotsTag: response.headers["x-robots-tag"] ?? null,
  });
}

async function assertLegacyDestination(
  pathname,
  destination,
  destinationResponse,
) {
  const destinationShouldIndex =
    expectBuildIndexing && approvedRoutes.has(destination);
  const destinationHostAllowsIndexing =
    destinationShouldIndex && normalizedHost(requestHost) === canonicalHost;
  const robots = extractAttribute(
    destinationResponse.body,
    /<meta\s+[^>]*name=["']robots["'][^>]*>/i,
    "content",
  );
  const canonical = extractAttribute(
    destinationResponse.body,
    /<link\s+[^>]*rel=["']canonical["'][^>]*>/i,
    "href",
  );
  const openGraphUrl = extractAttribute(
    destinationResponse.body,
    /<meta\s+[^>]*property=["']og:url["'][^>]*>/i,
    "content",
  );

  assert.equal(destinationResponse.status, 200, pathname);
  assert.equal(
    robots,
    destinationShouldIndex ? "index, follow" : "noindex, follow",
    pathname,
  );
  assert.equal(canonical, expectedCanonicals[destination], pathname);
  assert.equal(
    destinationResponse.headers["x-robots-tag"] ?? null,
    destinationHostAllowsIndexing ? null : "noindex, follow",
    pathname,
  );
  assertSeoSurfacesAvoidPreview({
    canonical,
    openGraphUrl,
    pathname,
  });

  return { canonical, robots };
}

for (const { source, destination } of legacyRedirects) {
  for (const query of ["", "?utm_source=test"]) {
    const pathname = `${source}${query}`;
    const expectedLocation = `${destination}${query}`;
    const chain = await followRedirectChain(pathname, "text/html", 1);

    assert.equal(chain.redirects.length, 1, pathname);
    assert.equal(chain.redirects[0].status, 308, pathname);
    assert.equal(chain.redirects[0].location, expectedLocation, pathname);
    assert.equal(chain.finalPathname, expectedLocation, pathname);
    const metadata = await assertLegacyDestination(
      pathname,
      destination,
      chain.response,
    );

    redirectResults.push({
      canonical: metadata.canonical,
      finalPathname: chain.finalPathname,
      redirects: chain.redirects,
      pathname,
      robots: metadata.robots,
    });
  }

  for (const query of ["", "?utm_source=test"]) {
    const pathname = `${source}/${query}`;
    const normalizedSource = `${source}${query}`;
    const expectedDestination = `${destination}${query}`;
    const chain = await followRedirectChain(pathname, "text/html", 2);

    assert.equal(chain.redirects.length, 2, pathname);
    assert.equal(chain.redirects[0].status, 308, pathname);
    assert.equal(chain.redirects[0].location, normalizedSource, pathname);
    assert.equal(chain.redirects[1].status, 308, pathname);
    assert.equal(chain.redirects[1].location, expectedDestination, pathname);
    assert.equal(chain.finalPathname, expectedDestination, pathname);
    const metadata = await assertLegacyDestination(
      pathname,
      destination,
      chain.response,
    );

    redirectResults.push({
      canonical: metadata.canonical,
      finalPathname: chain.finalPathname,
      redirects: chain.redirects,
      pathname,
      robots: metadata.robots,
    });
  }
}

const multiQueryPath = "/packaging/?utm_source=instagram&utm_campaign=launch";
const multiQueryChain = await followRedirectChain(multiQueryPath, "text/html", 2);
assert.equal(multiQueryChain.redirects.length, 2, multiQueryPath);
assert.equal(
  multiQueryChain.redirects[0].location,
  "/packaging?utm_source=instagram&utm_campaign=launch",
  multiQueryPath,
);
assert.equal(
  multiQueryChain.redirects[1].location,
  "/productos?utm_source=instagram&utm_campaign=launch",
  multiQueryPath,
);
assert.equal(
  multiQueryChain.finalPathname,
  "/productos?utm_source=instagram&utm_campaign=launch",
  multiQueryPath,
);
assert.equal(multiQueryChain.response.status, 200, multiQueryPath);

for (const { source, destination, type } of canonicalSlashRoutes) {
  const accept =
    type === "xml"
      ? "application/xml"
      : type === "asset"
        ? "*/*"
        : type === "text"
          ? "text/plain"
          : "text/html";
  const chain = await followRedirectChain(source, accept, 1);

  assert.equal(chain.redirects.length, 1, source);
  assert.equal(chain.redirects[0].status, 308, source);
  assert.equal(chain.redirects[0].location, destination, source);
  assert.equal(chain.finalPathname, destination, source);
  assert.equal(chain.response.status, 200, source);

  let canonical = null;
  if (type === "html") {
    canonical = extractAttribute(
      chain.response.body,
      /<link\s+[^>]*rel=["']canonical["'][^>]*>/i,
      "href",
    );
    const metadataShouldIndex =
      expectBuildIndexing && approvedRoutes.has(destination);
    const hostAllowsIndexing =
      metadataShouldIndex && normalizedHost(requestHost) === canonicalHost;
    const robots = extractAttribute(
      chain.response.body,
      /<meta\s+[^>]*name=["']robots["'][^>]*>/i,
      "content",
    );

    assert.equal(canonical, expectedCanonicals[destination], source);
    assert.equal(
      robots,
      metadataShouldIndex ? "index, follow" : "noindex, follow",
      source,
    );
    assert.equal(
      chain.response.headers["x-robots-tag"] ?? null,
      hostAllowsIndexing ? null : "noindex, follow",
      source,
    );
  } else {
    assert.equal(
      chain.response.headers["x-robots-tag"] ?? null,
      null,
      source,
    );
  }

  slashNormalizationResults.push({
    canonical,
    destination,
    redirects: chain.redirects,
    source,
    status: chain.response.status,
  });
}

const commercialDestinations = new Set([
  "/",
  "/productos",
  "/servicios",
  "/contacto",
  "/sobre-nosotros",
  "/presupuesto",
]);

for (const pathname of nonTargetRoutes) {
  const chain = await followRedirectChain(pathname, "*/*");

  assert.equal(chain.response.status, 404, pathname);
  assert.equal(commercialDestinations.has(chain.finalPathname), false, pathname);
  assert.equal(
    chain.redirects.some(({ location }) =>
      commercialDestinations.has(new URL(location, origin).pathname),
    ),
    false,
    pathname,
  );

  nonTargetResults.push({
    finalPathname: chain.finalPathname,
    pathname,
    redirects: chain.redirects,
    status: chain.response.status,
  });
}

const robotsResponse = await request("/robots.txt", "text/plain");
assert.equal(robotsResponse.status, 200);
assert.match(robotsResponse.body, /User-Agent: \*/i);
assert.match(robotsResponse.body, /Allow: \//i);
assert.doesNotMatch(robotsResponse.body, /Disallow: \//i);
assert.equal(
  robotsResponse.body.includes("Sitemap:"),
  expectBuildIndexing,
);
assert.doesNotMatch(robotsResponse.body, /\.vercel\.app/i);
assert.equal(robotsResponse.headers["x-robots-tag"] ?? null, null);

const sitemapResponse = await request("/sitemap.xml", "application/xml");
assert.equal(sitemapResponse.status, 200);
const sitemapUrls = [
  ...sitemapResponse.body.matchAll(/<loc>([^<]+)<\/loc>/g),
].map((match) => match[1]);
assert.deepEqual(sitemapUrls, expectBuildIndexing ? expectedSitemapUrls : []);
assert.doesNotMatch(sitemapResponse.body, /\.vercel\.app/i);
assert.equal(sitemapResponse.headers["x-robots-tag"] ?? null, null);
assert.equal(sitemapResponse.body.includes("/testimonios"), false);
assert.equal(sitemapResponse.body.includes("/portfolio"), false);

const manifestResponse = await request(
  "/manifest.webmanifest",
  "application/manifest+json",
);
assert.equal(manifestResponse.status, 200);
assert.equal(manifestResponse.headers["x-robots-tag"] ?? null, null);
const manifest = JSON.parse(manifestResponse.body);
assert.equal(manifest.name, "Magenta Paysandú");
assert.equal(manifest.lang, "es-UY");

for (const pathname of ["/favicon.ico", "/og-magenta.jpg"]) {
  const assetResponse = await request(pathname, "*/*");
  assert.equal(assetResponse.status, 200, pathname);
  assert.equal(assetResponse.headers["x-robots-tag"] ?? null, null, pathname);
}

console.log(
  JSON.stringify(
    {
      buildIndexing: expectBuildIndexing,
      host: requestHost,
      legacyRedirects: redirectResults,
      nonTargetRoutes: nonTargetResults,
      routes: results,
      robotsAnnouncesSitemap: robotsResponse.body.includes("Sitemap:"),
      sitemapUrls,
      slashNormalizations: slashNormalizationResults,
      status: "PASS",
    },
    null,
    2,
  ),
);
