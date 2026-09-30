import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { familyStyles, type ColourFamily } from "@/lib/family";
import { cn } from "@/lib/utils";

export type QuickLink = {
  label: string;
  to: string;
  description?: string;
  icon?: LucideIcon;
  family?: ColourFamily;
};

const columnClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Link grid used for "quick links" and section landing pages.
 *
 * Avoids the boxy look of a card grid: each item is a pill-shaped link with a
 * circular icon chip, and the border thickens on hover rather than the whole
 * tile changing colour.
 */
export function QuickLinkGrid({
  items,
  columns = 4,
  className,
}: {
  items: QuickLink[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <ul className={cn("grid grid-cols-1 gap-3", columnClass[columns], className)}>
      {items.map((item) => {
        const styles = familyStyles[item.family ?? "honey"];
        const Icon = item.icon;
        return (
          <li key={item.to + item.label}>
            <Link
              to={item.to}
              className="group flex min-h-28 items-start gap-4 rounded-[1.75rem] border border-border bg-card p-5 transition-all duration-200 hover:border-navy/30 hover:shadow-[var(--shadow-lift)]"
            >
              {Icon ? (
                <span
                  className={cn(
                    "inline-flex size-12 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105",
                    styles.soft,
                    styles.text,
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              ) : null}
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-display text-lg font-bold text-navy">
                  {item.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-navy-tint transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
                {item.description ? (
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
