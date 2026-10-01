import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { familyStyles, type ColourFamily } from "@/lib/family";
import type { NavSection } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Desktop dropdown panel.
 *
 * This is deliberately a small, content-sized popover rather than a full-width
 * mega menu. It is anchored to the nav item that opened it: the `li` is the
 * positioning context, so the panel and its pointer both sit under the label
 * that triggered them and move with it.
 *
 * The visual language is recreated from the original Lovable header
 * (commit 60492e4), which used a shadcn `NavigationMenuContent` — sized by its
 * own content with `md:w-auto` — plus a `NavigationMenuIndicator` drawn as a
 * small rotated square, so the upper half reads as a pointer triangle. The
 * pointer reuses the same family background class as the panel, which makes it
 * read as part of the panel rather than a separate element.
 *
 * The current menu data, routes, ARIA wiring and keyboard behaviour are
 * unchanged from the previous mega menu; only the presentation differs. The
 * parent shortcut rail is deliberately NOT rendered here: it belongs to the
 * hero, so it stays visually independent of the navigation.
 *
 * Every entry links to a route that exists in `src/routes`.
 */
export function MegaMenu({
  section,
  onNavigate,
  className,
}: {
  section: NavSection;
  onNavigate: () => void;
  className?: string;
}) {
  const styles = familyStyles[section.family as ColourFamily];
  const children = section.children ?? [];

  return (
    <div
      // `left-0` keeps the panel flush with the nav item that opened it. The
      // narrow max-width plus `w-max` means it grows to fit the longest label
      // rather than stretching across the header.
      className={cn(
        "absolute left-0 top-full z-50 hidden w-max max-w-[min(21rem,calc(100vw-2rem))] pt-2 lg:block",
        className,
      )}
      onMouseLeave={onNavigate}
    >
      <div
        className={cn(
          "rounded-2xl border border-border/70 p-2 shadow-[var(--shadow-float)]",
          styles.soft,
        )}
      >
        {/*
          Pointer triangle: a rotated square, positioned so only its upper half
          shows above the panel. It carries the same family background as the
          panel so the join is seamless. `aria-hidden` and `pointer-events-none`
          keep it out of the accessibility tree and stop it from stealing hover
          from the panel edge.
        */}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-1.5 left-7 size-3 -translate-y-1/2 rotate-45 border-l border-t border-border/70",
            styles.soft,
          )}
        />

        {/* Section landing page, so the top-level item is one click away. */}
        <Link
          to={section.to}
          onClick={onNavigate}
          className="group/head flex min-h-10 items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-bold text-navy transition-colors duration-150 hover:bg-card"
        >
          {section.label}
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 opacity-50 transition-transform duration-200 ease-out group-hover/head:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover/head:translate-x-0"
          />
        </Link>

        <div className="mx-3 my-1 h-px w-auto bg-border/60" aria-hidden="true" />

        {/*
          Compact single-column list with a tight vertical rhythm. Rows keep a
          44px minimum target, so the tighter gap does not reduce the clickable
          area below the accessibility minimum. The list scrolls only if a
          section has enough entries to outgrow the available height.
        */}
        <ul className="flex max-h-[min(24rem,60vh)] flex-col gap-0.5 overflow-y-auto">
          {children.map((child) => (
            <li key={child.to + child.label}>
              <Link
                to={child.to}
                onClick={onNavigate}
                className="group flex min-h-11 items-center gap-2 rounded-xl px-3 py-1.5 text-[0.9rem] font-semibold text-navy/90 transition-colors duration-150 hover:bg-card hover:text-navy"
              >
                <span className="min-w-0 flex-1">{child.label}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[transform,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-60 motion-reduce:transform-none motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
