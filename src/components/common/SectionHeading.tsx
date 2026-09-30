import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  action?: ReactNode;
  /** Renders `title` as a level-1. Only the page hero should do this. */
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  action,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10",
        centered && "md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "text-center")}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading className={cn("mt-3 text-3xl md:text-4xl", eyebrow && "mt-3")}>{title}</Heading>
        {intro ? (
          <p className="mt-4 text-base text-muted-foreground md:text-lg md:leading-relaxed">
            {intro}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
