import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label={`${siteConfig.name} home`}>
      <span
        aria-hidden="true"
        className="inline-flex size-10 items-center justify-center rounded-2xl bg-honey font-display text-lg font-extrabold text-foreground"
      >
        H
      </span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-extrabold">{siteConfig.name}</span>
        {!compact ? (
          <span className="block text-xs text-muted-foreground">Nursery &amp; Primary · Nigeria</span>
        ) : null}
      </span>
    </Link>
  );
}
