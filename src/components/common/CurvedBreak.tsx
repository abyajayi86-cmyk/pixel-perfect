/**
 * Curved section transition.
 *
 * Section breaks are the main way the site avoids a stack of hard-edged
 * rectangles. `CurvedBreak` draws the wave that separates two sections, and
 * the caller names both surfaces it sits between, so the two halves always meet
 * without a seam.
 *
 * Decorative only: the element is `aria-hidden` and `pointer-events-none`.
 */

/**
 * The surfaces a curve may be drawn between. Naming the token rather than
 * passing a raw `var(...)` string means a typo cannot silently paint the wrong
 * band, and keeps the values in step with `src/styles.css`.
 */
const surfaces = {
  cream: "var(--color-cream)",
  "cream-deep": "var(--color-cream-deep)",
  sand: "var(--color-sand)",
  muted: "var(--color-surface-muted)",
  navy: "var(--color-navy-deep)",
} as const;

export type SurfaceTone = keyof typeof surfaces;

type CurvedBreakProps = {
  /** Surface the wave flows FROM: the band above the break. */
  from?: SurfaceTone;
  /** Surface the wave flows INTO: the colour of the curve itself. */
  fill: SurfaceTone;
  /** Height of the transition in pixels. */
  height?: number;
  /** Flip the wave so it curves the other way. */
  flip?: boolean;
  className?: string;
};

/**
 * The break is two halves that meet along the curve: the wrapper is painted
 * `from` (the band being left) and the path is painted `fill` (the band being
 * entered). Both are explicit, so a break between any two surfaces works.
 */
export function CurvedBreak({
  from = "cream",
  fill,
  height = 72,
  flip = false,
  className,
}: CurvedBreakProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ height, lineHeight: 0, backgroundColor: surfaces[from] }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-full w-full"
        style={flip ? { transform: "scaleY(-1)" } : undefined}
      >
        <path
          d="M0 100V62c180-30 380-46 600-46s420 16 600 46 240 30 240 30V100Z"
          fill={surfaces[fill]}
        />
      </svg>
    </div>
  );
}

/**
 * A thin honey rule with a circle at each end, used instead of a plain border
 * between related blocks.
 */
export function DotRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-1.5 w-24 rounded-full bg-honey ${className ?? ""}`}
    />
  );
}
