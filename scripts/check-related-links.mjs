import { readFileSync, readdirSync } from "fs";
import { join } from "path";

/** Check all related: entries in pages.ts against actual routes */

function getRouteFiles(dir) {
  let files = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getRouteFiles(fullPath));
    } else if (entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

const routeFiles = getRouteFiles("src/routes");
const actualRoutes = new Set();

for (const file of routeFiles) {
  const content = readFileSync(file, "utf-8");
  const match = content.match(/createFileRoute\("([^"]+)"\)/);
  if (match) {
    actualRoutes.add(match[1]);
  }
}
actualRoutes.add("/");

console.log(`Found ${actualRoutes.size} actual routes`);

function normalizeRoute(route) {
  if (route === "/") return "/";
  return route.replace(/\/$/, "");
}

const normalizedActualRoutes = new Set([...actualRoutes].map(normalizeRoute));

// 2. Parse pages.ts
const pagesContent = readFileSync("src/content/pages.ts", "utf-8");

// Find page keys using capture group
const pageKeyRegex = /"(\/[^"]+)":\s*\{/g;
const pageKeys = [];
let pageMatch;
while ((pageMatch = pageKeyRegex.exec(pagesContent)) !== null) {
  pageKeys.push(normalizeRoute(pageMatch[1])); // Use capture group [1]
}

console.log(`Pages in pages.ts: ${pageKeys.length}`);

// 3. Find all related links
const relatedRegex = /related:\s*\[([\s\S]*?)\]/g;
const linkRegex = /\{\s*label:\s*"([^"]+)",\s*to:\s*"([^"]+)"\s*\}/g;

let allRelatedLinks = [];
let relatedMatch;
while ((relatedMatch = relatedRegex.exec(pagesContent)) !== null) {
  const block = relatedMatch[1];
  let linkMatch;
  while ((linkMatch = linkRegex.exec(block)) !== null) {
    allRelatedLinks.push({ label: linkMatch[1], to: normalizeRoute(linkMatch[2]) });
  }
}

console.log(`Related links in pages.ts: ${allRelatedLinks.length}`);

// 4. Check related links
let missing = [];
let valid = [];
for (const link of allRelatedLinks) {
  if (normalizedActualRoutes.has(link.to)) {
    valid.push(link);
  } else {
    missing.push(link);
  }
}

console.log(`Valid related: ${valid.length}`);
console.log(`Missing related: ${missing.length}`);
if (missing.length > 0) {
  for (const m of missing) console.log(`  - ${m.to} (${m.label})`);
} else {
  console.log("✓ All related links valid");
}

// 5. Check pages.ts vs routes
let missingPages = [];
for (const key of pageKeys) {
  if (!normalizedActualRoutes.has(key)) {
    missingPages.push(key);
  }
}
if (missingPages.length > 0) {
  console.log("\nPages in pages.ts but NO route:");
  for (const m of missingPages) console.log(`  - ${m}`);
} else {
  console.log("✓ All pages.ts entries have routes");
}

// 6. Check routes vs pages.ts (exclude utility)
const utilityPages = new Set([
  "/sitemap",
  "/search",
  "/privacy-policy",
  "/cookie-policy",
  "/accessibility",
  "/gallery",
  "/news",
  "/parent-portal",
  "/book-a-visit",
  "/calendar",
  "/policies",
  "/",
  "/contact",
  "/contact/enquiry",
  "/contact/find-us",
]);
let routesWithoutPage = [];
for (const route of normalizedActualRoutes) {
  if (!pageKeys.includes(route) && !utilityPages.has(route)) {
    routesWithoutPage.push(route);
  }
}
if (routesWithoutPage.length > 0) {
  console.log("\nRoutes WITHOUT pages.ts entry:");
  for (const r of routesWithoutPage) console.log(`  - ${r}`);
} else {
  console.log("✓ All content routes have pages.ts entries");
}

// 7. Check mainNav
const siteConfigContent = readFileSync("src/lib/site-config.ts", "utf-8");
const navRoutes = new Set();
const navLinkRegex = /\{\s*label:\s*"[^"]+",\s*to:\s*"([^"]+)"\s*\}/g;
let navMatch;
while ((navMatch = navLinkRegex.exec(siteConfigContent)) !== null) {
  navRoutes.add(normalizeRoute(navMatch[1]));
}

console.log(`\nRoutes in mainNav: ${navRoutes.size}`);

let missingNavRoutes = [];
for (const route of navRoutes) {
  if (!normalizedActualRoutes.has(route)) {
    missingNavRoutes.push(route);
  }
}
if (missingNavRoutes.length > 0) {
  console.log("\nMainNav routes MISSING from actual:");
  for (const r of missingNavRoutes) console.log(`  - ${r}`);
} else {
  console.log("✓ All mainNav routes exist");
}

// 8. Routes not in mainNav (content routes only)
let routesNotInNav = [];
for (const route of normalizedActualRoutes) {
  if (!navRoutes.has(route) && !utilityPages.has(route) && route !== "/") {
    routesNotInNav.push(route);
  }
}
if (routesNotInNav.length > 0) {
  console.log("\nRoutes NOT in mainNav:");
  for (const r of routesNotInNav) console.log(`  - ${r}`);
}
