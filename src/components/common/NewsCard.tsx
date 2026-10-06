import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Newspaper } from "lucide-react";
import { newsSourceLabels, type NewsItem } from "@/content/feed";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Formats a news date without touching the local timezone: `YYYY-MM-DD` is
 * split by hand rather than passed to `new Date`, which would read the string
 * as UTC midnight and could print the wrong day west of Greenwich. Anything
 * that is not an ISO date is printed exactly as supplied.
 */
function formatNewsDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;
  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1] ?? month;
  return `${Number(day)} ${monthName} ${year}`;
}

function isIsoDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

const cardClass =
  "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-navy/25 hover:shadow-[var(--shadow-lift)]";

/**
 * Compact news card used by the homepage "Latest News" rail and the /news
 * page list.
 *
 * The whole card is the link when a confirmed destination exists; without an
 * `href` it renders as a plain article and no action is shown, so a future
 * post without a URL can never produce a dead button. External links open in a
 * new tab with a safe `rel`.
 */
export function NewsCard({ item, className }: { item: NewsItem; className?: string }) {
  const time = isIsoDate(item.date) ? (
    <time
      dateTime={item.date}
      className="text-xs font-bold uppercase tracking-wider text-navy-tint"
    >
      {formatNewsDate(item.date)}
    </time>
  ) : (
    <span className="text-xs font-bold uppercase tracking-wider text-navy-tint">
      {formatNewsDate(item.date)}
    </span>
  );

  const source = item.source ? (
    <span className="rounded-full border border-honey/40 bg-honey-soft px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-navy-deep">
      {newsSourceLabels[item.source]}
    </span>
  ) : null;

  const media = item.image ? (
    <div className="zoom-media aspect-[16/10] w-full overflow-hidden">
      <img
        src={item.image}
        alt={item.alt ?? ""}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  ) : (
    <div className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-honey-soft via-cream to-honey/25">
      <Newspaper aria-hidden="true" className="size-9 text-honey-deep/70" />
    </div>
  );

  const body = (
    <>
      {media}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-3">
          {time}
          {source}
        </div>
        <h3 className="mt-2 font-display text-lg font-bold text-navy">{item.title}</h3>
        {item.excerpt ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
        ) : null}
        {item.href ? (
          <span className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-bold text-navy">
            View Post
            {item.external ? (
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            ) : (
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
              />
            )}
          </span>
        ) : null}
      </div>
    </>
  );

  if (item.external && item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(cardClass, className)}
      >
        {body}
      </a>
    );
  }

  if (item.href) {
    return (
      <Link to={item.href} className={cn(cardClass, className)}>
        {body}
      </Link>
    );
  }

  return <article className={cn(cardClass, className)}>{body}</article>;
}
