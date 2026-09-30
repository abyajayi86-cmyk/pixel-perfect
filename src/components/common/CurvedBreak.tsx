/**
 * Curved section transition.
 *
 * Section breaks are the main way the site avoids a stack of hard-edged
 * rectangles. `CurvedBreak` draws the wave that separates two sections, and
 * the caller supplies the colour of the section that follows so the two halves
 * always meet without a seam.
 *
 * Decorative only: the element is `aria-hidden` and `pointer-events-none`.
 */

type CurvedBreakProps = {
  /** CSS colour (or `var(--color-*)`) of the section the wave flows INTO. */
  fill: string;
  /** Height of the transition in pixels at desktop. */
  height?: number;
  /** Flip the wave so it curves the other way. */
  flip?: boolean;
  className?: string;
};

export function CurvedBreak({ fill, height = 72, flip = false, className }: CurvedBreakProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ height, lineHeight: 0, backgroundColor: "var(--color-cream)" }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-full w-full"
        style={flip ? { transform: "scaleY(-1)" } : undefined}
      >
        <path d="M0 100V62c180-30 380-46 600-46s420 16 600 46 240 30 240 30V100Z" fill={fill} />
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
