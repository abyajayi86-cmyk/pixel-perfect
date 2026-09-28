import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { familyStyles, type ColourFamily } from "@/lib/family";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  family?: ColourFamily;
  crumbs: Crumb[];
};

export function PageHero({ eyebrow, title, intro, family = "honey", crumbs }: PageHeroProps) {
  const styles = familyStyles[family];

  return (
    <header className={cn("border-b border-border/70", styles.soft)}>
      <div className="container-page py-8 md:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl">
          {eyebrow ? (
            <p className={cn("text-sm font-bold uppercase tracking-[0.14em]", styles.text)}>{eyebrow}</p>
          ) : null}
          <h1 className="mt-2 text-3xl leading-tight md:text-5xl">{title}</h1>
          {intro ? <p className="mt-4 text-lg text-muted-foreground md:text-xl">{intro}</p> : null}
        </div>
        <div className={cn("mt-8 h-1.5 w-24 rounded-full", styles.bar)} />
      </div>
    </header>
  );
}
