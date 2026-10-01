import { Link } from "@tanstack/react-router";
import honeytotsLogo from "@/assets/logo.png";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Honeytots logo.
 *
 * Uses the actual approved logo artwork. The logo is transparent, so it adapts
 * to both the cream header and the dark hero overlay without introducing a solid
 * background.
 */
export function Logo({
  className,
  compact = false,
  onDark = false,
}: {
  className?: string;
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      <img
        src={honeytotsLogo}
        alt=""
        decoding="async"
        loading="eager"
        fetchPriority="high"
        // Height-driven with `w-auto`, so the square artwork keeps its aspect
        // ratio and is never stretched. Sized close to the previous 44px mark so
        // the header height is effectively unchanged; the artwork's transparent
        // padding means the visible crest sits slightly inside this box.
        className={cn("block object-contain", compact ? "h-9 w-auto" : "h-11 w-auto sm:h-12")}
        aria-hidden="true"
      />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-lg font-extrabold tracking-tight",
            onDark ? "text-cream" : "text-navy",
          )}
        >
          {siteConfig.name}
        </span>
        {!compact ? (
          <span
            className={cn(
              "block text-xs font-semibold",
              onDark ? "text-cream/75" : "text-muted-foreground",
            )}
          >
            {siteConfig.strapline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
