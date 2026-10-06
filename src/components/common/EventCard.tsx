import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { UpcomingEvent } from "@/content/feed";
import { cn } from "@/lib/utils";

const cardClass =
  "group flex h-full gap-4 rounded-[1.75rem] border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-navy/25 hover:shadow-[var(--shadow-lift)]";

/**
 * Event card with the circular date marker the brief asks for: day and month
 * in a honey disc, then the title, time and detail beside it.
 *
 * Fields other than `date`, `month` and `title` are optional, so a confirmed
 * event can be added to `feed.ts` with as little as three values. No date is
 * ever invented — the card only renders what the school supplied.
 */
export function EventCard({ event, className }: { event: UpcomingEvent; className?: string }) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="flex size-16 shrink-0 flex-col items-center justify-center rounded-full bg-honey text-navy-deep shadow-[var(--shadow-card)]"
      >
        <span className="text-xl font-extrabold leading-none">{event.date}</span>
        <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.14em]">
          {event.month}
        </span>
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-bold text-navy">{event.title}</h3>
        {event.time ? <p className="mt-1 text-sm font-semibold text-navy">{event.time}</p> : null}
        {event.description ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
        ) : null}
        {event.href ? (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-navy">
            Event details
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </span>
        ) : null}
      </div>
    </>
  );

  if (event.href) {
    return (
      <Link to={event.href} className={cn(cardClass, className)}>
        {inner}
      </Link>
    );
  }

  return <article className={cn(cardClass, className)}>{inner}</article>;
}
