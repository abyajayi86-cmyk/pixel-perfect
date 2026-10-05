import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";

/** Generate sitemap.xml from actual routes */

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
const routes = [];

for (const file of routeFiles) {
  const content = readFileSync(file, "utf-8");
  const match = content.match(/createFileRoute\("([^"]+)"\)/);
  if (match) {
    routes.push(match[1]);
  }
}

// Add root route
routes.push("/");

// Normalize (remove trailing slashes)
function normalizeRoute(route) {
  if (route === "/") return "/";
  return route.replace(/\/$/, "");
}

const normalizedRoutes = [...new Set(routes.map(normalizeRoute))].sort();

const baseUrl = "https://honeytots.school"; // Update with actual domain when known

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${normalizedRoutes
  .map((route) => {
    const url = baseUrl + route;
    const lastmod = new Date().toISOString().split("T")[0];
    const changefreq = route === "/" ? "weekly" : "monthly";
    const priority = route === "/" ? "1.0" : "0.8";
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", sitemap);
console.log(`Generated sitemap.xml with ${normalizedRoutes.length} routes`);
console.log("Routes:", normalizedRoutes.join(", "));
