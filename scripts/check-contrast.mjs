/**
 * WCAG 2.1 contrast check for the Phase One palette.
 *
 * Run with:  node scripts/check-contrast.mjs
 *
 * The design system is defined in OKLCH. This converts those values to sRGB and
 * measures the contrast ratio of every foreground/background pair that actually
 * appears in the UI, so a palette tweak cannot quietly break AA compliance.
 *
 * AA thresholds: 4.5:1 for body text, 3:1 for large text (>=24px, or >=19px
 * bold) and for non-text UI such as borders and focus rings.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

/* ---------- OKLCH -> sRGB ---------- */

function oklchToSrgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return [r, g, bl].map((v) => Math.min(1, Math.max(0, v)));
}

function relativeLuminance([r, g, b]) {
  const lin = [r, g, b].map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrast(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------- palette, mirroring src/styles.css ---------- */

const P = {
  cream: [0.985, 0.014, 85],
  "cream-deep": [0.963, 0.027, 83],
  sand: [0.942, 0.032, 82],
  "surface-muted": [0.972, 0.011, 84],
  card: [0.998, 0.006, 88],
  navy: [0.29, 0.058, 257],
  "navy-deep": [0.21, 0.044, 258],
  "navy-soft": [0.955, 0.017, 257],
  "navy-tint": [0.42, 0.066, 257],
  honey: [0.83, 0.122, 79],
  "honey-soft": [0.962, 0.04, 84],
  "honey-deep": [0.6, 0.108, 62],
  foreground: [0.26, 0.035, 256],
  "muted-foreground": [0.47, 0.028, 256],
  plum: [0.42, 0.082, 305],
  "plum-soft": [0.962, 0.019, 305],
  sky: [0.46, 0.082, 243],
  "sky-soft": [0.962, 0.019, 243],
  leaf: [0.44, 0.072, 158],
  "leaf-soft": [0.962, 0.019, 158],
  coral: [0.55, 0.118, 32],
  "coral-soft": [0.965, 0.026, 32],
};

const srgb = (name) => oklchToSrgb(...P[name]);

/** [foreground, background, minimum, description] */
const PAIRS = [
  ["foreground", "cream", 4.5, "Body text on page background"],
  ["muted-foreground", "cream", 4.5, "Secondary text on page background"],
  ["muted-foreground", "cream-deep", 4.5, "Secondary text on deep cream band"],
  ["muted-foreground", "card", 4.5, "Secondary text on cards"],
  ["muted-foreground", "surface-muted", 4.5, "Secondary text on muted band"],
  ["navy", "cream", 4.5, "Headings and links on cream"],
  ["navy", "cream-deep", 4.5, "Headings on deep cream band"],
  ["navy", "card", 4.5, "Headings and links on cards"],
  ["navy-tint", "cream", 4.5, "Placeholder school details"],
  ["navy-tint", "cream-deep", 4.5, "Placeholder details on deep cream"],
  ["navy-tint", "honey-soft", 4.5, "Draft-content notice"],
  ["navy-deep", "honey", 4.5, "Announcement bar text"],
  ["cream", "navy", 4.5, "Button label on navy"],
  ["cream", "navy-deep", 4.5, "Hero heading on navy"],
  ["navy-deep", "honey", 4.5, "Button label on honey (hover)"],
  ["navy", "honey-soft", 4.5, "Secondary button label"],
  ["navy", "navy-soft", 4.5, "Text on navy tint panel"],
  ["honey", "navy", 3, "Footer column headings (large/bold)"],
  ["honey-deep", "honey-soft", 4.5, "Honey eyebrow on honey tint"],
  ["plum", "plum-soft", 4.5, "Section eyebrow: Our School"],
  ["sky", "sky-soft", 4.5, "Section eyebrow: Learning"],
  ["leaf", "leaf-soft", 4.5, "Section eyebrow: Parents"],
  ["coral", "coral-soft", 4.5, "Section eyebrow: Contact"],
  ["cream", "navy-deep", 3, "Hero scrim contrast against image"],
];

let failures = 0;
console.log("ratio   need  pair");
console.log("------  ----  -------------------------------------------------------");

for (const [fg, bg, min, label] of PAIRS) {
  const ratio = contrast(srgb(fg), srgb(bg));
  const pass = ratio >= min;
  if (!pass) failures += 1;
  console.log(
    `${ratio.toFixed(2).padStart(5)}:1  ${String(min).padStart(4)}  ${pass ? "PASS" : "FAIL"}  ${label}  (${fg} on ${bg})`,
  );
}

console.log("");
if (failures) {
  console.error(`${failures} pair(s) below the required ratio.`);
  process.exit(1);
}

// Guard the actual token file so the palette above cannot drift out of sync.
const styles = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");
const expected = [
  "--brand-navy: oklch(0.29 0.058 257)",
  "--brand-navy-deep: oklch(0.21 0.044 258)",
  "--brand-navy-tint: oklch(0.42 0.066 257)",
  "--brand-honey: oklch(0.83 0.122 79)",
  "--surface-cream: oklch(0.985 0.014 85)",
  "--surface-cream-deep: oklch(0.963 0.027 83)",
];
const drifted = expected.filter((token) => !styles.includes(token));
if (drifted.length) {
  console.error("Palette drift: these tokens changed in src/styles.css —");
  for (const token of drifted) console.error(`  ${token}`);
  console.error("Update the values in this script to match.");
  process.exit(1);
}

console.log(`All ${PAIRS.length} contrast pairs pass. Palette matches src/styles.css.`);
