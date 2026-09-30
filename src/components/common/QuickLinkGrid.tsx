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

export function QuickLinkGrid({ items, columns = 4 }: { items: QuickLink[]; columns?: 2 | 3 | 4 }) {
  const grid =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <ul className={cn("grid grid-cols-1 gap-4", grid)}>
      {items.map((item) => {
        const styles = familyStyles[item.family ?? "honey"];
        const Icon = item.icon;
        return (
          <li key={item.to + item.label}>
            <Link
              to={item.to}
              className="card-surface group flex h-full min-h-28 flex-col gap-3 p-5 transition-shadow duration-200 hover:shadow-[var(--shadow-lift)]"
            >
              {Icon ? (
                <span
                  className={cn(
                    "inline-flex size-11 items-center justify-center rounded-2xl",
                    styles.soft,
                    styles.text,
                  )}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              ) : null}
              <span className="font-display text-lg font-bold">{item.label}</span>
              {item.description ? (
                <span className="text-sm text-muted-foreground">{item.description}</span>
              ) : null}
              <span
                className={cn(
                  "mt-auto inline-flex items-center gap-1.5 text-sm font-semibold",
                  styles.text,
                )}
              >
                Read more
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
