import { cn } from "@/lib/utils";

export type JourneyLineTone = "honey" | "navy" | "plum" | "sky" | "leaf" | "coral";

const tones: Record<JourneyLineTone, string> = {
  honey: "stroke-honey/70",
  navy: "stroke-navy/25",
  plum: "stroke-plum/40",
  sky: "stroke-sky/40",
  leaf: "stroke-leaf/40",
  coral: "stroke-coral/40",
};

/**
 * Decorative segmented curved "journey line" accent.
 *
 * Short rounded dashes follow a gentle organic S-curve. Rendered as an SVG so
 * it scales cleanly at every viewport width and its density can be tuned
 * separately for small screens via density prop.
 *
 * Decorative-only: aria-hidden, pointer-events-none. Never used to separate
 * section surfaces (that job belongs to CurvedBreak). JourneyLine is a
 * micro-decoration that sits *inside* a section to connect related visual
 * blocks, e.g. between the section heading and the tile grid below it.
 */
export function JourneyLine({
  tone = "honey",
  className,
  /** Higher density = more dashes. Reduced on mobile via CSS media query below. */
  density = 14,
  /** SVG stroke-width for each dash. */
  dashWidth = 3,
  /** Roundness of the S-curve, 0..1. Higher = deeper wave. */
  depth = 0.35,
  /** Flip vertically so the curve travels the other way. */
  flip = false,
  /** Hide completely on small screens — decorative only, safe to drop. */
  hideOnMobile = true,
}: {
  tone?: JourneyLineTone;
  className?: string;
  density?: number;
  dashWidth?: number;
  depth?: number;
  flip?: boolean;
  hideOnMobile?: boolean;
}) {
  const dashCount = density;
  const w = 1440;
  const h = 80;
  const peak = h * depth;

  const points = Array.from({ length: dashCount }, (_, i) => {
    const t = (i + 0.5) / dashCount;
    const x = t * w;
    const y = h / 2 - peak * Math.sin(t * Math.PI) + peak * 0.5 * Math.sin(t * Math.PI * 2);
    return { x, y };
  });

  const dashLen = (w / dashCount) * 0.55;
  const gap = (w / dashCount) * 0.45;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none w-full select-none",
        hideOnMobile ? "hidden sm:block" : "block",
        className,
      )}
      style={{ height: h }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className={cn("block h-full w-full", tones[tone])}
        style={flip ? { transform: "scaleY(-1)" } : undefined}
      >
        <path
          d={`M0 ${h / 2} C ${w * 0.25} ${h / 2 - peak * 1.3}, ${w * 0.75} ${h / 2 + peak * 1.3}, ${w} ${h / 2}`}
          fill="none"
          strokeWidth={dashWidth}
          strokeLinecap="round"
          strokeDasharray={`${dashLen} ${gap}`}
        />
      </svg>
    </div>
  );
}
