import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { ButtonLink, buttonClass } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  provisionalAddressNote,
  schoolDirectionsUrl,
  schoolLocation,
  schoolMapEmbedUrl,
} from "@/lib/site-config";

/**
 * The address, printed with the map.
 *
 * The provisional notice lives beside the flag it depends on, so when the school
 * confirms its permanent home, flipping `schoolLocation.provisional` is enough.
 */
export function LocationDetails({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex gap-3.5">
        <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-honey-soft text-navy-deep">
          <MapPin aria-hidden="true" className="size-4.5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-muted-foreground">Address</p>
          <address className="break-words font-semibold not-italic text-navy">
            {schoolLocation.address}
          </address>
        </div>
      </div>

      {schoolLocation.provisional ? (
        <p className="mt-4 rounded-2xl bg-honey-soft px-4 py-3 text-sm leading-relaxed text-navy-deep">
          {provisionalAddressNote}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Embedded Google map with a directions link.
 *
 * The frame has a fixed height so the page cannot reflow once the map loads,
 * and it lazy-loads because it sits below the fold wherever it is used. The map
 * is a text query, not a pinned marker, so nothing here claims a location has
 * been independently verified.
 */
export function LocationMap({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[2rem] border border-border/60 shadow-[var(--shadow-card)]">
        <iframe
          src={schoolMapEmbedUrl}
          title="Map showing the Honeytots School address in Abeokuta"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[17rem] w-full border-0 sm:h-[20rem] lg:h-[23rem]"
        />
      </div>
      <a
        href={schoolDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass("secondary", "md", "mt-4")}
      >
        <Navigation aria-hidden="true" />
        Get Directions
        <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}

/**
 * Shared address + map block for the homepage, immediately before the footer.
 *
 * The contact page composes `SectionHeading` and `LocationMap` directly instead,
 * because its address already appears in `ContactCard`.
 */
export function LocationSection({
  eyebrow = "Visit Honeytots",
  title = "Find Us",
  intro = "Come and visit Honeytots at our current location in Abeokuta.",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        <LocationDetails className="mt-7" />

        <ButtonLink to="/book-a-visit" variant="honey" size="md" className="mt-7">
          Book a Visit
        </ButtonLink>
      </div>

      <LocationMap />
    </div>
  );
}
