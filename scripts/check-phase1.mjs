/**
 * Phase One sanity checks that do not need a test framework.
 *
 * Run with:  node scripts/check-phase1.mjs
 *
 * 1. every route referenced by mainNav / parentLinks / footerLegalLinks exists
 * 2. the home hero has at least the agreed minimum number of slides
 * 3. no accidental colour regressions (the brand is cream + navy)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const src = join(root, "src");
const fail = [];
const ok = [];

/** Resolves a URL path to its route file, including directory `index.tsx` routes. */
function routeFileFor(path) {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const base = join(src, "routes", ...(clean === "" ? [] : clean.split("/")));
  for (const candidate of [`${base}.tsx`, join(base, "index.tsx")]) {
    try {
      statSync(candidate);
      return candidate;
    } catch {
      /* try the next form */
    }
  }
  return null;
}

const configSource = readFileSync(join(src, "lib", "site-config.ts"), "utf8");
const routeTargets = [...configSource.matchAll(/to:\s*"(\/[^"]*)"/g)].map((m) => m[1]);
const footerTargets = [...configSource.matchAll(/\{ label: "[^"]+", to: "(\/[^"]*)" \}/g)].map(
  (m) => m[1],
);
const allTargets = [...new Set([...routeTargets, ...footerTargets])];

for (const target of allTargets) {
  if (routeFileFor(target)) {
    ok.push(`route ok: ${target}`);
  } else {
    fail.push(`MISSING route file for "${target}"`);
  }
}

// --- hero slide count -------------------------------------------------------
const slidesSource = readFileSync(join(src, "content", "hero-slides.ts"), "utf8");
const slideCount = (slidesSource.match(/^  \{\n    eyebrow:/gm) ?? []).length;
const MIN_SLIDES = 7;
if (slideCount >= MIN_SLIDES) {
  ok.push(`hero has ${slideCount} slides (minimum ${MIN_SLIDES})`);
} else {
  fail.push(`hero has only ${slideCount} slides, needs at least ${MIN_SLIDES}`);
}

// --- carousel must declare the required behaviours --------------------------
const carousel = readFileSync(join(src, "components", "layout", "HeroCarousel.tsx"), "utf8");
for (const [label, pattern] of [
  ["loop", /loop:\s*true/],
  ["autoplay", /setInterval/],
  ["pause control", /Pause/],
  ["previous control", /scrollPrev/],
  ["next control", /scrollNext/],
  ["keyboard support", /ArrowLeft/],
  ["reduced motion", /prefers-reduced-motion/],
  ["touch support", /embla-carousel/],
]) {
  if (pattern.test(carousel)) ok.push(`carousel: ${label}`);
  else fail.push(`carousel missing: ${label}`);
}

// --- brand colour sanity ----------------------------------------------------
const styles = readFileSync(join(src, "styles.css"), "utf8");
for (const token of ["--color-cream", "--color-navy", "--brand-honey"]) {
  if (styles.includes(token)) ok.push(`token defined: ${token}`);
  else fail.push(`token missing: ${token}`);
}

// --- report -----------------------------------------------------------------
let fileCount = 0;
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else fileCount += 1;
  }
})(src);

console.log(`${fileCount} files under src/`);
for (const line of ok) console.log(`  PASS  ${line}`);
if (fail.length) {
  for (const line of fail) console.error(`  FAIL  ${line}`);
  console.error(`\n${fail.length} check(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${ok.length} checks passed.`);
console.log(`Reference used for UX patterns only: https://www.gayhurst.hackney.sch.uk/`);
console.log(`Files scanned relative to: ${relative(process.cwd(), root) || "."}`);
