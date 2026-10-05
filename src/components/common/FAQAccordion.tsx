import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FAQData = {
  question: string;
  answer: string[];
};

type Props = {
  items: FAQData[];
  className?: string;
  draftAwaitingSchool?: boolean;
};

/**
 * Accessible FAQ accordion using native <details> for keyboard +
 * reduced-motion safety. Renderer only — FAQ copy lives in the
 * content registry (pages.ts) via the `faqItems` PageContent field.
 *
 * When `draftAwaitingSchool` is true, every panel carries a small
 * "Draft wording / requires final Honeytots school sign-off" inline
 * notice at the bottom of its answer body, consistent with the
 * project's draft-notification principle.
 */
export function FAQAccordion({ items, className, draftAwaitingSchool }: Props) {
  return (
    <div className={cn("space-y-3", className)} role="list">
      {items.map((item, index) => (
        <details
          key={item.question + "-" + index}
          role="listitem"
          className="group rounded-[1.5rem] border border-border bg-card shadow-[var(--shadow-card)] transition-[border-color,background-color,shadow] duration-150 ease-out open:border-navy/25 open:bg-surface-muted/30 open:shadow-[var(--shadow-lift)]"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-[1.5rem] px-4 py-4 sm:px-5 sm:py-5">
            <span className="flex-1 min-w-0">
              <span
                aria-hidden="true"
                className="mr-2 font-display text-sm font-extrabold tracking-wider text-muted-foreground"
              >
                Q{index + 1}.
              </span>
              <span className="font-display text-base font-bold text-navy sm:text-lg">
                {item.question}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-navy-soft text-navy transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none motion-reduce:group-open:rotate-0"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <div className="px-4 pb-5 sm:px-5 sm:pb-6">
            <div className="ml-6 space-y-3 text-muted-foreground sm:ml-7">
              {item.answer.map((paragraph, i) => (
                <p key={i} className="leading-relaxed [&:not(:last-child)]:mb-2">
                  {paragraph}
                </p>
              ))}
              {draftAwaitingSchool ? (
                <p
                  role="note"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-honey/40 bg-honey-soft px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-deep sm:text-[0.7rem]"
                >
                  Draft wording — requires final Honeytots school sign-off
                </p>
              ) : null}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
