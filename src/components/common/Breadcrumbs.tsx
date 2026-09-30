import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground">
        <li>
          <Link to="/" className="rounded-sm font-semibold hover:text-navy hover:underline">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden="true" className="size-4 opacity-50" />
            {item.to ? (
              <Link
                to={item.to}
                className="rounded-sm font-semibold hover:text-navy hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-navy">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
