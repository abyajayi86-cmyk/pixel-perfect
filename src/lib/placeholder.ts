/**
 * Phase One school details are placeholders held in `siteConfig` and
 * `content/pages.ts` so the site can be reviewed before Honeytots supplies
 * confirmed information.
 *
 * These helpers make it possible to *show* that fact in the UI: a bracketed
 * value is rendered with a visible "awaiting confirmation" treatment rather
 * than being silently hidden or, worse, replaced with invented copy.
 */

/** Matches a whole value wrapped in square brackets, e.g. "[School Phone Number]". */
const bracketed = /^\[.+\]$/;

/** True when a value is empty or still a bracketed placeholder. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return bracketed.test(value.trim());
}

/**
 * Strips the brackets so "[School Phone Number]" reads as
 * "School Phone Number" when displayed as an obvious gap to fill.
 */
export function placeholderLabel(value: string): string {
  const trimmed = value.trim();
  return bracketed.test(trimmed) ? trimmed.slice(1, -1) : trimmed;
}

/**
 * Renders a value as a plain string, or a muted "awaiting confirmation" marker
 * when it is still a placeholder.
 */
export function withFallback(value: string | undefined, fallback: string): string {
  return isPlaceholder(value) ? fallback : (value as string);
}

/**
 * Strips every character that is not a digit or a leading plus.
 *
 * - Bracketed placeholders return an empty string (combined with !isPlaceholder in components
 *   this means we never generate a `tel:` or `wa.me` href containing placeholder text).
 * - Values such as "+234 80x xxx xxxx" become "+23480xxxxxxx".
 * - Values with internal hyphens, brackets, spaces are stripped so `tel:` links are clean.
 */
export function sanitizeDigits(raw: string | undefined | null): string {
  if (!raw) return "";
  if (isPlaceholder(raw)) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const leading = trimmed.startsWith("+") ? "+" : "";
  const digits = trimmed.replace(/\D/g, "");
  return leading + digits;
}
