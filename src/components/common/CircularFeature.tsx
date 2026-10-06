import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CircularFeatureShape = "circle" | "arch";

/**
 * Reusable circular/arch-shaped feature link.
 *
 * Used on the homepage for learning stages, parent quick-links and school-life
 * accent imagery. A white raised border + soft shadow gives the image a framed
 * "badge" feel, a subtle honey-gold outer ring appears on hover to echo the
 * Honeytots palette, and the image scales ~1.03x on interaction.
 *
 * Respects prefers-reduced-motion by disabling the transform.
 */
export function CircularFeature({
  image,
  alt,
  title,
  text,
  to,
  shape = "arch",
  /** Height of the media area (px or any size class). Circle uses this for width too (always square). */
  mediaHeight = "aspect-square",
  accent = true,
  className,
}: {
  image: string;
  alt: string;
  title: string;
  text?: string;
  to: string;
  shape?: CircularFeatureShape;
  mediaHeight?: string;
  /** When true, a subtle honey ring animates in on hover around the frame. */
  accent?: boolean;
  className?: string;
}) {
  const isCircle = shape === "circle";
  const shapeClass = isCircle ? "shape-circle" : "shape-arch";
  const mediaAspect = isCircle ? "aspect-square" : mediaHeight;

  return (
    <article className={cn("group", className)}>
      <Link
        to={to}
        aria-label={alt ? `${title} — ${alt}` : title}
        className={cn(
          "zoom-media relative block",
          "shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-300 ease-out",
          "hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
          "focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-honey/40",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        )}
      >
        {accent ? (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -inset-2 rounded-[inherit] opacity-0 transition-opacity duration-300 ease-out",
              "bg-gradient-to-br from-honey/20 via-honey-soft/60 to-transparent blur-xl",
              "group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none",
            )}
          />
        ) : null}

        <span
          className={cn(
            "relative block overflow-hidden border-4 border-card ring-1 ring-border",
            shapeClass,
          )}
        >
          <span
            className={cn(
              "relative block overflow-hidden",
              isCircle ? "aspect-square w-full" : `w-full ${mediaAspect}`,
            )}
          >
            <img
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              className={cn(
                "block h-full w-full object-cover",
                "transition-transform duration-300 ease-out",
                "group-hover:scale-[1.035] group-focus-visible:scale-[1.035]",
                "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
              )}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/20 via-transparent to-transparent opacity-80"
            />
          </span>
        </span>
      </Link>

      <div className="mt-6">
        <h3 className="flex items-center gap-1.5 font-display text-2xl font-bold tracking-tight text-navy">
          <Link to={to} className="interactive-nav-underline">
            {title}
          </Link>
          <ArrowRight
            aria-hidden="true"
            className="size-4 shrink-0 text-navy-tint transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </h3>
        {text ? (
          <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">{text}</p>
        ) : null}
      </div>
    </article>
  );
}
