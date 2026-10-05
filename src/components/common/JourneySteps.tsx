import type { ColourFamily } from "@/lib/family";
import { cn } from "@/lib/utils";

export type JourneyStepsTone = ColourFamily | "navy";

export type JourneyStepData = {
  title: string;
  text: string;
};

type Props = {
  steps: JourneyStepData[];
  tone?: JourneyStepsTone;
  className?: string;
};

const toneChip: Record<JourneyStepsTone, string> = {
  honey: "bg-honey-soft text-navy border-honey/40 ring-honey/60",
  navy: "bg-navy text-cream border-navy ring-navy-soft",
  plum: "bg-plum-soft text-navy border-plum/40 ring-plum/60",
  sky: "bg-sky-soft text-navy border-sky/40 ring-sky/60",
  leaf: "bg-leaf-soft text-navy border-leaf/40 ring-leaf/60",
  coral: "bg-coral-soft text-navy border-coral/40 ring-coral/60",
};

const toneLabel: Record<JourneyStepsTone, string> = {
  honey: "text-honey-deep",
  navy: "text-navy",
  plum: "text-plum-deep",
  sky: "text-sky-deep",
  leaf: "text-leaf-deep",
  coral: "text-coral-deep",
};

const toneConnector: Record<JourneyStepsTone, string> = {
  honey: "bg-honey/30",
  navy: "bg-navy/25",
  plum: "bg-plum/30",
  sky: "bg-sky/30",
  leaf: "bg-leaf/30",
  coral: "bg-coral/30",
};

/**
 * Horizontal (on desktop) / stacked (on mobile) step-by-step journey with
 * numbered circular chips and a connecting tone-matched line.
 *
 * Used for admissions processes, application journeys, and any 3–6 step
 * flow. Pure render prop: takes a typed steps[] array and tone, no embedded
 * copy so content stays in src/content registry.
 */
export function JourneySteps({ steps, tone = "navy", className }: Props) {
  return (
    <ol
      role="list"
      aria-label={steps.length === 1 ? "Journey step" : `Journey — ${steps.length} steps`}
      className={cn(
        "grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:gap-4",
        className,
      )}
    >
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        const number = index + 1;
        return (
          <li
            key={step.title + "-" + index}
            className="relative flex gap-4 rounded-[1.5rem] border border-border bg-card p-4 shadow-[var(--shadow-card)] md:flex-col md:gap-3 md:pb-6"
          >
            {!last ? (
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-8 top-10 hidden h-px w-[calc(100%-4rem)] md:block",
                  toneConnector[tone],
                )}
              />
            ) : null}

            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full border font-display text-lg font-extrabold tracking-tight ring-1 ring-inset md:size-12 md:text-xl",
                toneChip[tone],
              )}
            >
              {number}
            </span>

            <div className="min-w-0 md:min-h-[6rem]">
              <div
                className={cn(
                  "text-[0.72rem] font-bold uppercase tracking-[0.14em]",
                  toneLabel[tone],
                )}
              >
                Step {number}
              </div>
              <h4 className="mt-1 font-display text-lg font-bold text-navy">{step.title}</h4>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
