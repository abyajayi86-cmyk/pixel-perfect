import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  action?: ReactNode;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", action }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "text-center")}>
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-2xl md:text-4xl">{title}</h2>
        {intro ? <p className="mt-3 text-base text-muted-foreground md:text-lg">{intro}</p> : null}
      </div>
      {action}
    </div>
  );
}
