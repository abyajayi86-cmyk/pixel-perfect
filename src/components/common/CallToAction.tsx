import { ButtonLink } from "./Button";

type Action = { label: string; to: string };

export function CallToAction({
  title,
  intro,
  primary,
  secondary,
}: {
  title: string;
  intro?: string;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section className="container-page py-12 md:py-16">
      <div className="rounded-3xl bg-cream px-6 py-10 text-center md:px-12 md:py-14">
        <h2 className="text-2xl md:text-4xl">{title}</h2>
        {intro ? (
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">{intro}</p>
        ) : null}
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink to={primary.to} size="lg">
            {primary.label}
          </ButtonLink>
          {secondary ? (
            <ButtonLink to={secondary.to} variant="secondary" size="lg">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
