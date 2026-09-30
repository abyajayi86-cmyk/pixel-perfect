import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { NavLink } from "@/lib/site-config";

export function RelatedPages({
  title = "Related pages",
  items,
}: {
  title?: string;
  items: NavLink[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface-muted py-12">
      <div className="container-page">
        <h2 className="text-xl md:text-2xl">{title}</h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="card-surface flex min-h-14 items-center justify-between gap-3 px-5 py-4 font-semibold transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                {item.label}
                <ArrowUpRight aria-hidden="true" className="size-4 text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
