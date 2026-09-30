import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { NavLink } from "@/lib/site-config";

/**
 * "More in this section" strip. A single curved band with pill links rather
 * than a grid of cards.
 */
export function RelatedPages({
  title = "Related pages",
  items,
}: {
  title?: string;
  items: NavLink[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="bg-cream py-14 md:py-16">
      <div className="container-page">
        <h2 className="text-xl md:text-2xl">{title}</h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {items.map((item) => (
            <li key={item.to + item.label}>
              <Link
                to={item.to}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/15 bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors duration-200 hover:border-navy hover:bg-navy hover:text-cream"
              >
                {item.label}
                <ArrowUpRight aria-hidden="true" className="size-4 opacity-70" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
