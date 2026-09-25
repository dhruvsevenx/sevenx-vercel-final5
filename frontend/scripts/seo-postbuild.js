#!/usr/bin/env node
/*
 * Post-build: write a static HTML entry per Global route so crawlers and link
 * previews get the right <head> without running JavaScript.
 *
 * The app is a single-page app, so every route used to be served the India
 * index.html: India title, canonical pointing at the homepage, India FAQ
 * schema. For /global and each /global/<service> page this script copies
 * build/index.html, strips the route-specific SEO tags and writes
 * build/<route>/index.html with that route's title, description, canonical,
 * Open Graph, hreflang and structured data (from src/content/globalContent.json,
 * the same file the pages render from, so schema always matches visible copy).
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const buildDir = path.resolve(root, process.env.BUILD_PATH || "build");
const content = require(path.join(root, "src/content/globalContent.json"));
const SITE = content.site;
const OG_IMAGE = `${SITE}/og-image.png`;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Keeps "</script>" out of inline JSON.
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

const organization = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "SevenX Media",
  url: `${SITE}/`,
  logo: `${SITE}/logo.png`,
  email: "contact@sevenxm.com",
  contactPoint: [
    { "@type": "ContactPoint", email: "contact@sevenxm.com", contactType: "sales" },
    { "@type": "ContactPoint", email: "partnerships@sevenxm.com", contactType: "partnerships" },
    { "@type": "ContactPoint", email: "admin@sevenxm.com", contactType: "billing support" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/sevenxmedia",
    "https://www.instagram.com/sevenxmedia",
    "https://twitter.com/sevenxmedia",
  ],
};

const faqPage = (items, url) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

function headTags({ title, description, url, ogTitle }) {
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}"/>`,
    `<link rel="canonical" href="${url}"/>`,
    `<link rel="alternate" hreflang="en" href="${SITE}/global"/>`,
    `<link rel="alternate" hreflang="en-in" href="${SITE}/"/>`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}/"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="SevenX Media"/>`,
    `<meta property="og:locale" content="en_GB"/>`,
    `<meta property="og:title" content="${esc(ogTitle || title)}"/>`,
    `<meta property="og:description" content="${esc(description)}"/>`,
    `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:image" content="${OG_IMAGE}"/>`,
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:site" content="@sevenxmedia"/>`,
    `<meta name="twitter:title" content="${esc(ogTitle || title)}"/>`,
    `<meta name="twitter:description" content="${esc(description)}"/>`,
    `<meta name="twitter:image" content="${OG_IMAGE}"/>`,
  ].join("");
}

// Removes every tag this script regenerates, whatever the minifier did to spacing.
function stripSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="(description|keywords|geo\.[a-z]+|ICBM|twitter:[a-z:]+)"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[a-z:_]+"[^>]*>/gi, "")
    .replace(/<link\s+rel="(canonical|alternate)"[^>]*>/gi, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
}

function writeRoute(route, head, schema) {
  const base = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");
  let html = stripSeo(base).replace(/<html lang="[^"]*"/i, '<html lang="en"');
  html = html.replace("</head>", `${head}${schema.map(ld).join("")}</head>`);
  const dir = path.join(buildDir, route.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(`seo-postbuild: wrote ${path.relative(root, path.join(dir, "index.html"))}`);
}

if (!fs.existsSync(path.join(buildDir, "index.html"))) {
  console.error(`seo-postbuild: ${buildDir}/index.html not found; run the build first.`);
  process.exit(1);
}

// Hub: /global
{
  const hub = content.hub;
  const url = SITE + hub.path;
  writeRoute(
    hub.path,
    headTags({ title: hub.title, description: hub.description, url, ogTitle: hub.ogTitle }),
    [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            ...organization,
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "SevenX Global services",
              itemListElement: [
                "Performance Marketing",
                "Media Buying",
                "Lead Generation",
                ...content.services.map((s) => s.name),
                "Tracking & Attribution",
                "Conversion Rate Optimisation",
              ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
            },
          },
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: hub.title,
            description: hub.description,
            inLanguage: "en",
            about: { "@id": `${SITE}/#organization` },
          },
        ],
      },
      faqPage(hub.faq, url),
    ]
  );
}

// Service pages: /global/<slug>
for (const s of content.services) {
  const url = `${SITE}/global/${s.slug}`;
  writeRoute(
    `/global/${s.slug}`,
    headTags({ title: s.title, description: s.description, url }),
    [
      {
        "@context": "https://schema.org",
        "@graph": [
          organization,
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name: s.name,
            serviceType: s.name,
            description: s.description,
            url,
            provider: { "@id": `${SITE}/#organization` },
          },
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name: s.title,
            description: s.description,
            inLanguage: "en",
            breadcrumb: { "@id": `${url}#breadcrumb` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "SevenX Global", item: `${SITE}/global` },
              { "@type": "ListItem", position: 2, name: s.name, item: url },
            ],
          },
        ],
      },
      faqPage(s.faq, url),
    ]
  );
}
