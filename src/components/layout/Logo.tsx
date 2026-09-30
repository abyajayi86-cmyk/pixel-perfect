import { Link } from "@tanstack/react-router";
import { isPlaceholder } from "@/lib/placeholder";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Wordmark.
 *
 * Phase One has no approved Honeytots logo, so this is a typographic mark
 * built from the school name: a navy "H" disc plus the name. It is marked as a
 * placeholder in code comments so it is replaced the moment real artwork
 * arrives. No logo has been invented.
 *
 * `onDark` inverts the colours for use over the carousel.
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
  const showMotto = !isPlaceholder(siteConfig.motto);
  const subline = showMotto ? siteConfig.motto : siteConfig.strapline;

  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-3", className)}
      aria-label={`${siteConfig.name} — home`}
    >
      {/* Placeholder mark: replace with the approved Honeytots logo. */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-11 shrink-0 items-center justify-center rounded-full font-display text-xl font-extrabold",
          onDark ? "bg-honey text-navy-deep" : "bg-navy text-cream",
        )}
      >
        H
      </span>
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
            {subline}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
