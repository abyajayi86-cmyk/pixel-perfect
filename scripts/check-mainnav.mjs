import { readFileSync } from "fs";

const siteConfigContent = readFileSync("src/lib/site-config.ts", "utf-8");

// Extract all routes from mainNav children arrays
const childrenArrayRegex = /children:\s*\[([\s\S]*?)\]/g;
const linkRegex = /\{\s*label:\s*"[^"]+",\s*to:\s*"([^"]+)"\s*\}/g;

const navRoutes = new Set();
let childrenMatch;
while ((childrenMatch = childrenArrayRegex.exec(siteConfigContent)) !== null) {
  const block = childrenMatch[1];
  let linkMatch;
  while ((linkMatch = linkRegex.exec(block)) !== null) {
    let route = linkMatch[1];
    if (route !== "/") route = route.replace(/\/$/, "");
    navRoutes.add(route);
  }
}

// Also get top-level section routes
const sectionRegex = /\{\s*label:\s*"[^"]+",\s*to:\s*"([^"]+)"\s*,/g;
let sectionMatch;
while ((sectionMatch = sectionRegex.exec(siteConfigContent)) !== null) {
  let route = sectionMatch[1];
  if (route !== "/") route = route.replace(/\/$/, "");
  navRoutes.add(route);
}

console.log(`Total routes in mainNav: ${navRoutes.size}`);
console.log([...navRoutes].sort().join(", "));
