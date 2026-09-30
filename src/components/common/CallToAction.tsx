import { ButtonLink } from "./Button";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Action = { label: string; to: string };

/**
 * Closing call to action. Rendered as a full-width navy band with a domed
 * ("arch") top edge so it reads as part of the page rather than a floating box.
 */
export function CallToAction({
  title,
  intro,
  primary,
  secondary,
  className,
}: {
  title: string;
  intro?: string;
  primary: Action;
  secondary?: Action;
  className?: string;
}) {
  return (
    <section className={cn("bg-cream pt-2", className)}>
      <div className="container-page">
        <div className="on-navy relative overflow-hidden rounded-t-[3.5rem] bg-navy px-6 py-14 text-center md:px-12 md:py-20">
          {/* Decorative honey arc, purely decorative. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border-[3rem] border-honey/25"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full border-[3rem] border-cream/10"
          />
          <div className="relative">
            <h2 className="text-2xl text-cream md:text-4xl">{title}</h2>
            {intro ? (
              <p className="mx-auto mt-4 max-w-2xl text-base text-cream/80 md:text-lg">{intro}</p>
            ) : null}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink to={primary.to} variant="onNavy" size="lg">
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink
                  to={secondary.to}
                  size="lg"
                  className="border-2 border-cream/40 text-cream hover:bg-cream/10"
                >
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
