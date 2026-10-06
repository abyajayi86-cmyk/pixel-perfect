import type { ReactNode } from "react";

/**
 * Shared honest empty state for feed-backed content (news, events).
 *
 * The homepage sections and the /news and /calendar pages render this panel
 * whenever the underlying `feed.ts` arrays are empty, so a visitor is never
 * shown placeholder stories or invented dates. The wording comes from
 * `feed.ts` — one source of truth — and the optional action links through to
 * the full page.
 */
export function EmptyStatePanel({
  heading,
  body,
  action,
  className,
}: {
  heading: string;
  body: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        className ??
        "rounded-[2rem] border border-honey/40 bg-honey-soft px-6 py-10 text-center shadow-[var(--shadow-card)]"
      }
    >
      <h3 className="font-display text-xl font-bold text-navy-deep">{heading}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-navy-deep sm:text-base">
        {body}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
