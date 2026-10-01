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
  [
    'aria-label "Pause slideshow"',
    /aria-label=\{autoplay \? "Pause slideshow" : "Play slideshow"\}/,
  ],
  ['aria-label "Play slideshow"', /"Play slideshow"/],
]) {
  if (pattern.test(carousel)) ok.push(`carousel: ${label}`);
  else fail.push(`carousel missing: ${label}`);
}

// --- the hero must not show numbered slide indicators -----------------------
if (/Go to slide/.test(carousel)) {
  fail.push("hero still renders numbered slide indicators (Go to slide N)");
} else {
  ok.push("hero: no numbered slide indicators");
}
if (/Slide \{|of \{total\}/.test(carousel)) {
  fail.push("hero still renders a 'Slide N of M' counter");
} else {
  ok.push("hero: no 'Slide N of M' counter");
}

// --- the announcement bar must not be rendered anywhere ---------------------
const siteLayout = readFileSync(join(src, "components", "layout", "SiteLayout.tsx"), "utf8");
if (/AnnouncementBar/.test(siteLayout)) {
  fail.push("SiteLayout still renders AnnouncementBar");
} else {
  ok.push("announcement bar is not rendered");
}
try {
  statSync(join(src, "components", "layout", "AnnouncementBar.tsx"));
  fail.push("AnnouncementBar.tsx still exists but is unused — remove it or wire it up");
} catch {
  ok.push("AnnouncementBar.tsx removed");
}

// --- interaction utilities must be defined and used -------------------------
const styles = readFileSync(join(src, "styles.css"), "utf8");
for (const token of ["--color-cream", "--color-navy", "--brand-honey"]) {
  if (styles.includes(token)) ok.push(`token defined: ${token}`);
  else fail.push(`token missing: ${token}`);
}
for (const utility of ["interactive", "zoom-media", "nav-underline"]) {
  if (styles.includes(`@utility ${utility}`)) ok.push(`interaction utility defined: ${utility}`);
  else fail.push(`interaction utility missing: ${utility}`);
  if (!styles.includes("prefers-reduced-motion")) {
    fail.push("styles.css lost its reduced-motion block");
    break;
  }
}
const interactiveUsers = [
  "components/common/Button.tsx",
  "components/common/QuickLinkGrid.tsx",
  "components/common/RelatedPages.tsx",
  "components/layout/ParentLinks.tsx",
];
for (const file of interactiveUsers) {
  const source = readFileSync(join(src, ...file.split("/")), "utf8");
  if (source.includes("interactive")) ok.push(`uses the interactive lift: ${file}`);
  else fail.push(`missing the interactive lift: ${file}`);
}

// --- navigation dropdowns must stay compact and self-contained --------------
const megaMenu = readFileSync(join(src, "components", "layout", "MegaMenu.tsx"), "utf8");
const header = readFileSync(join(src, "components", "layout", "Header.tsx"), "utf8");

if (/inset-x-0/.test(megaMenu)) {
  fail.push("dropdown is still full-width (inset-x-0) — it must be content-sized");
} else {
  ok.push("dropdown: content-sized, not full-width");
}
for (const [label, pattern] of [
  ["anchored to its nav item", /absolute left-0 top-full/],
  ["natural sizing", /w-max/],
  ["constrained max width", /max-w-\[min\(21rem/],
  ["compact padding", /p-2\b/],
  ["tight row rhythm", /gap-0\.5/],
  ["triangular pointer", /rotate-45/],
  ["pointer is decorative", /aria-hidden="true"/],
  ["pointer cannot block hover", /pointer-events-none/],
  ["rows keep a 44px target", /min-h-11/],
  ["reduced motion respected", /motion-reduce:transition-none/],
]) {
  if (pattern.test(megaMenu)) ok.push(`dropdown: ${label}`);
  else fail.push(`dropdown missing: ${label}`);
}

// The parent rail must be independent of the navigation dropdowns.
if (/parentLinks|Parent links|parent-links/i.test(megaMenu)) {
  fail.push("Parent links leaked into the navigation dropdown — it belongs to the hero rail");
} else {
  ok.push("dropdown: contains no parent links");
}
if (/parentLinks|parent-links/i.test(header)) {
  fail.push("Header still passes parentLinks to the navigation");
} else {
  ok.push("Header: parent links are not part of the navigation");
}
if (/<li key=\{section\.label\} className="relative">/.test(header)) {
  ok.push("Header: dropdown anchored inside its own nav item");
} else {
  fail.push("Header: nav item is not relative, so the dropdown cannot anchor to it");
}

// --- the parent rail must stay tucked until hovered or focused --------------
const parentLinks = readFileSync(join(src, "components", "layout", "ParentLinks.tsx"), "utf8");
for (const [label, pattern] of [
  ["tucked off-canvas by default", /translate-x-full/],
  ["reveals on hover", /group-hover:translate-x-0/],
  ["reveals on focus-within (keyboard)", /group-focus-within:translate-x-0/],
  ["operable by click, not hover-only", /onClick=\{\(\) => setOpen/],
  ["handle exposes expanded state", /aria-expanded=\{open\}/],
  ["handle names its panel", /aria-controls="parent-links-panel"/],
  ["reduced motion disables the slide", /motion-reduce:translate-x-0/],
  ["reduced motion disables the transition", /motion-reduce:transition-none/],
  ["transition sits in the restrained 150-300ms range", /duration-200/],
  ["reveal animates transform only, never width", /transition-\[transform,opacity\]/],
  ["handle is a real focusable control", /<button[\s\S]{0,200}aria-controls="parent-links-panel"/],
  ["focus rings stay honey on navy", /on-navy/],
]) {
  if (pattern.test(parentLinks)) ok.push(`parent rail: ${label}`);
  else fail.push(`parent rail missing: ${label}`);
}

// The tucked panel is parked outside the viewport, so it must be clipped or the
// page gains a horizontal scrollbar.
const homeRoute = readFileSync(join(src, "routes", "index.tsx"), "utf8");
if (/relative overflow-x-clip/.test(homeRoute)) ok.push("home: off-canvas rail panel is clipped");
else fail.push("home: rail panel is not clipped — the tucked panel will widen the page");

// The rail is desktop-only; the inline variant must remain for touch.
if (/xl:hidden/.test(homeRoute) && /variant="inline"/.test(homeRoute)) {
  ok.push("home: inline parent links retained for small screens");
} else {
  fail.push("home: inline parent links for small screens are missing");
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
