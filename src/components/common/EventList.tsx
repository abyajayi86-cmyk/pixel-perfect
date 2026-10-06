import { eventsEmptyState, upcomingEvents, type UpcomingEvent } from "@/content/feed";
import { EmptyStatePanel } from "@/components/common/EmptyStatePanel";
import { EventCard } from "@/components/common/EventCard";

/**
 * The /calendar page list, rendered through `ContentPage`'s `appendBody`.
 *
 * Reads the same `feed.ts` array as the homepage "Upcoming Events" section,
 * and falls back to the shared empty state from `feed.ts` while the school's
 * calendar is unconfirmed — never a fabricated date.
 */
export function EventList({ items = upcomingEvents }: { items?: UpcomingEvent[] }) {
  if (items.length === 0) {
    return <EmptyStatePanel heading={eventsEmptyState.heading} body={eventsEmptyState.body} />;
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {items.map((event) => (
        <li key={`${event.month}-${event.date}-${event.title}`}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
