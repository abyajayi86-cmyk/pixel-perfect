import { CarouselItem } from "@/components/ui/carousel";
import { ButtonLink } from "@/components/common/Button";
import { CarouselRail } from "@/components/common/CarouselRail";
import { EmptyStatePanel } from "@/components/common/EmptyStatePanel";
import { EventCard } from "@/components/common/EventCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { eventsEmptyState, upcomingEvents } from "@/content/feed";

/**
 * Homepage "Upcoming Events" — circular date markers on a horizontal rail.
 *
 * Events come from `feed.ts`, the same source the /calendar page list reads.
 * The school has not supplied a calendar yet, so the section renders the
 * shared empty state instead of the reference screenshot's example dates. When
 * confirmed events arrive in `feed.ts` they appear here and on /calendar at
 * the same time, with controls appearing only when they can actually scroll.
 */
export function UpcomingEvents() {
  return (
    <section aria-label="Upcoming events" className="bg-cream-deep py-14 md:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="What's on"
          title="Upcoming Events"
          intro="Dates for the school diary, added here as they are confirmed."
          action={
            <ButtonLink to="/calendar" variant="secondary">
              School calendar
            </ButtonLink>
          }
        />

        <div className="mt-9">
          {upcomingEvents.length === 0 ? (
            <EmptyStatePanel heading={eventsEmptyState.heading} body={eventsEmptyState.body} />
          ) : (
            <CarouselRail label="upcoming events">
              {upcomingEvents.map((event) => (
                <CarouselItem
                  key={`${event.month}-${event.date}-${event.title}`}
                  className="basis-[85%] sm:basis-[58%] md:basis-[45%] lg:basis-[31%]"
                >
                  <EventCard event={event} />
                </CarouselItem>
              ))}
            </CarouselRail>
          )}
        </div>
      </div>
    </section>
  );
}
