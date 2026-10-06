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

// --- curved section transitions must work between any two surfaces ----------
const curvedBreak = readFileSync(join(src, "components", "common", "CurvedBreak.tsx"), "utf8");

if (/backgroundColor:\s*"var\(--color-cream\)"/.test(curvedBreak)) {
  fail.push("CurvedBreak still hardcodes the incoming surface to cream");
} else {
  ok.push("curve: incoming surface is no longer hardcoded to cream");
}
for (const [label, pattern] of [
  ["declares an explicit incoming surface", /from\?:\s*SurfaceTone/],
  ["incoming surface is applied to the wrapper", /backgroundColor:\s*surfaces\[from\]/],
  ["surfaces are named tokens, not raw colour strings", /const surfaces = \{/],
  ["accepts a muted surface", /muted:\s*"var\(--color-surface-muted\)"/],
  // The wave itself must be painted from the same token map. Passing the tone
  // key straight to the SVG `fill` attribute renders an invalid colour, which
  // browsers fall back to black - a solid black band across every section join.
  ["outgoing surface is mapped through the token map", /<path[^>]*fill=\{surfaces\[fill\]\}/],
]) {
  if (pattern.test(curvedBreak)) ok.push(`curve: ${label}`);
  else fail.push(`curve missing: ${label}`);
}

// Guard the mapping itself: no call site may hand CurvedBreak a raw CSS colour,
// and no tone key may reach the SVG fill attribute unresolved.
for (const [label, pattern] of [
  ["no call site passes a raw var() colour", /<CurvedBreak[^>]*\b(?:from|fill)="var\(/],
  [
    "the path fill is never a bare tone key",
    /<path[^>]*\bfill="(?:cream|cream-deep|sand|muted|navy)"/,
  ],
]) {
  if (pattern.test(curvedBreak)) fail.push(`curve: ${label}`);
  else ok.push(`curve: ${label}`);
}

// Every break on the home page must name both of the surfaces it sits between.
const homeRoute = readFileSync(join(src, "routes", "index.tsx"), "utf8");
const breaks = homeRoute.match(/<CurvedBreak\b[\s\S]*?\/>/g) ?? [];
if (breaks.length === 0) {
  fail.push("home: no curved section transitions found");
} else {
  ok.push(`home: ${breaks.length} curved section transition(s)`);
}
for (const [index, tag] of breaks.entries()) {
  if (/\bfrom=/.test(tag)) ok.push(`curve #${index + 1}: names its incoming surface`);
  else fail.push(`curve #${index + 1} does not name its incoming surface`);
}

// The muted band must be entered and left by a curve, not a hard edge.
if (/<CurvedBreak[^>]*\bfill="muted"/.test(homeRoute)) {
  ok.push("home: muted band is entered with a curve");
} else {
  fail.push("home: the cream -> muted boundary is still a hard edge");
}
if (/<CurvedBreak[^>]*\bfrom="muted"/.test(homeRoute)) {
  ok.push("home: muted band is left with a curve");
} else {
  fail.push("home: the muted -> cream boundary is still a hard edge");
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
if (/relative overflow-x-clip/.test(homeRoute)) ok.push("home: off-canvas rail panel is clipped");
else fail.push("home: rail panel is not clipped — the tucked panel will widen the page");

// The rail is desktop-only; the inline variant must remain for touch.
if (/xl:hidden/.test(homeRoute) && /variant="inline"/.test(homeRoute)) {
  ok.push("home: inline parent links retained for small screens");
} else {
  fail.push("home: inline parent links for small screens are missing");
}

// --- one address, defined once, reused everywhere ----------------------------
const siteConfigFile = readFileSync(join(src, "lib", "site-config.ts"), "utf8");
const locationSection = readFileSync(
  join(src, "components", "common", "LocationSection.tsx"),
  "utf8",
);
const contactRoute = readFileSync(join(src, "routes", "contact", "index.tsx"), "utf8");
const contactCard = readFileSync(join(src, "components", "common", "ContactCard.tsx"), "utf8");
const pageContent = readFileSync(join(src, "content", "pages.ts"), "utf8");

for (const [label, pattern] of [
  ["holds the address as one constant", /export const schoolLocation = \{[\s\S]*?address:/],
  ["flags the address as client-confirmed", /provisional:\s*false/],
  ["builds the map URL from that constant", /google\.com\/maps\?q=\$\{encodeURIComponent/],
  [
    "builds directions from that constant",
    /google\.com\/maps\/dir\/\?api=1&destination=\$\{encodeURIComponent/,
  ],
]) {
  if (pattern.test(siteConfigFile)) ok.push(`location config: ${label}`);
  else fail.push(`location config missing: ${label}`);
}

// The address must be defined once. If the raw street address is inlined into a
// component, route or content file the two surfaces can drift apart.
const streetAddress = "11 Alakija Street";
for (const [name, source] of [
  ["LocationSection.tsx", locationSection],
  ["contact/index.tsx", contactRoute],
  ["ContactCard.tsx", contactCard],
  ["pages.ts", pageContent],
]) {
  if (source.includes(streetAddress)) {
    fail.push(`location: ${name} hard-codes "${streetAddress}" instead of reading schoolLocation`);
  } else {
    ok.push(`location: ${name} reads the address from site-config`);
  }
}

// The map must be an accessible, lazy frame rather than a bare embed.
for (const [label, pattern] of [
  ["map frame carries a title", /<iframe[\s\S]{0,300}?title="/],
  ["map frame lazy-loads", /<iframe[\s\S]{0,300}?loading="lazy"/],
  [
    "map frame has a fixed height so the page cannot reflow",
    /<iframe[\s\S]{0,400}?className="[^"]*h-\[/,
  ],
  ["directions open safely in a new tab", /rel="noopener noreferrer"/],
  ["provisional notice is tied to the flag", /schoolLocation\.provisional/],
  ["prints the address as semantic contact info", /<address/],
]) {
  if (pattern.test(locationSection)) ok.push(`location: ${label}`);
  else fail.push(`location missing: ${label}`);
}

// Both required surfaces must actually render the shared block.
if (/<LocationSection\b/.test(homeRoute)) ok.push("home: renders the shared location section");
else fail.push("home: the shared location section is missing");

// The location band must be the last thing on the page, ahead of the footer.
const homeLocationIndex = homeRoute.indexOf("<LocationSection");
const homeCallToActionIndex = homeRoute.lastIndexOf("<CallToAction");
if (homeLocationIndex > homeCallToActionIndex) {
  ok.push("home: location section sits below the closing call to action");
} else {
  fail.push("home: the location section is not after the closing call to action");
}

if (/<LocationMap\b/.test(contactRoute)) ok.push("contact: renders the shared map");
else fail.push("contact: the shared map is missing");

// The address appears in the contact card too, so it needs the same caveat.
if (/schoolLocation\.provisional/.test(contactCard)) {
  ok.push("contact: the address in the contact card carries the provisional notice");
} else {
  fail.push("contact: the contact card presents the address without the provisional notice");
}

// --- scope stays inside what the school confirmed ----------------------------
for (const [label, pattern] of [
  [
    "strapline lists the four confirmed levels",
    /strapline: "Creche · Playgroup · Nursery · Primary"/,
  ],
  ["confirmed motto replaces the placeholder", /motto: "Nurturing Excellent Leaders"/],
]) {
  if (pattern.test(siteConfigFile)) ok.push(`school info: ${label}`);
  else fail.push(`school info: ${label}`);
}

if (/\[School Motto Awaiting Confirmation\]/.test(siteConfigFile)) {
  fail.push("school info: the motto placeholder is still in place");
}

// "Pre-Primary" was never a confirmed level, so it must not appear as one.
if (/Pre-Primary/.test(pageContent)) {
  fail.push("scope: pages.ts still offers a Pre-Primary class");
} else {
  ok.push("scope: pages.ts no longer names an unconfirmed Pre-Primary class");
}
const enquiryForms = readFileSync(join(src, "components", "forms", "EnquiryForms.tsx"), "utf8");
if (/Pre-Primary/.test(enquiryForms)) {
  fail.push("scope: the enquiry form still offers a Pre-Primary class");
} else {
  ok.push("scope: the enquiry form offers only confirmed class names");
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
