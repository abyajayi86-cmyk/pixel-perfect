import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { familyStyles, type ColourFamily } from "@/lib/family";
import type { NavSection } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Desktop mega menu.
 *
 * Rendered inline beneath the header bar (rather than in a floating popover) so
 * it can be wide, keyboard-navigable and readable by assistive technology. The
 * section title is itself a link, so every top-level item is reachable by a
 * single click as well as by opening the panel.
 *
 * Every entry links to a route that exists in `src/routes`.
 */
export function MegaMenu({
  section,
  parentLinks,
  onNavigate,
  className,
}: {
  section: NavSection;
  parentLinks: { label: string; to: string }[];
  onNavigate: () => void;
  className?: string;
}) {
  const styles = familyStyles[section.family as ColourFamily];
  const children = section.children ?? [];

  return (
    <div
      className={cn(
        "absolute inset-x-0 top-full z-40 hidden border-t border-border/70 shadow-[var(--shadow-float)] lg:block",
        styles.soft,
        className,
      )}
      onMouseLeave={onNavigate}
    >
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[18rem_minmax(0,1fr)_15rem]">
        {/* Section identity + link to the section landing page. */}
        <div>
          <p className={cn("eyebrow", styles.text)}>Section</p>
          <Link
            to={section.to}
            onClick={onNavigate}
            className="mt-2 inline-flex items-center gap-2 font-display text-2xl font-extrabold text-navy hover:underline"
          >
            {section.label}
            <ArrowRight aria-hidden="true" className="size-5" />
          </Link>
          {section.blurb ? (
            <p className="mt-3 text-sm leading-relaxed text-navy/70">{section.blurb}</p>
          ) : null}
        </div>

        {/* Section links, in a wide multi-column list. */}
        <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <li key={child.to + child.label}>
              <Link
                to={child.to}
                onClick={onNavigate}
                className="group flex min-h-11 items-center rounded-xl px-3 py-2 text-[0.95rem] font-semibold text-navy transition-colors duration-150 hover:bg-card"
              >
                {child.label}
                <ArrowRight
                  aria-hidden="true"
                  className="ml-auto size-4 shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-60"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Persistent parent shortcuts, repeated for reachability. */}
        <div className="rounded-[1.5rem] bg-card p-5">
          <p className={cn("eyebrow", styles.text)}>Parent links</p>
          <ul className="mt-3 space-y-0.5">
            {parentLinks.map((link) => (
              <li key={link.to + link.label}>
                <Link
                  to={link.to}
                  onClick={onNavigate}
                  className="flex min-h-10 items-center rounded-lg px-2 text-sm font-semibold text-navy hover:bg-cream-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
