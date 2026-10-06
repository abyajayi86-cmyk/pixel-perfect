/**
 * News and events feed — the single source of truth behind the homepage
 * "Latest News" and "Upcoming Events" sections and the /news and /calendar
 * pages.
 *
 * Phase One ships with no confirmed posts: the content brief supplies neither
 * news stories nor an event calendar, and inventing either would present
 * unconfirmed school activity as fact. Both arrays therefore stay empty and
 * every surface renders the shared empty state below instead of inventing
 * dates. When the school confirms a post, add it here and it appears on the
 * homepage and the relevant page at the same time — no second copy of the data
 * is kept anywhere.
 *
 * External posts must set `href` to the real destination and `external: true`;
 * post URLs are never assembled from a profile handle.
 */

export type NewsSource = "website" | "instagram" | "facebook";

export type NewsItem = {
  title: string;
  date: string;
  image?: string;
  /** Describes `image`; required for accessibility when a photo is present. */
  alt?: string;
  excerpt?: string;
  source?: NewsSource;
  href?: string;
  /** True when `href` points away from this site. */
  external?: boolean;
};

export type UpcomingEvent = {
  /** Day of the month, e.g. "12". */
  date: string;
  /** Month name, e.g. "October". */
  month: string;
  title: string;
  time?: string;
  description?: string;
  href?: string;
};

/** Confirmed news posts. Empty until the school supplies its first story. */
export const newsItems: NewsItem[] = [];

/** Confirmed events. Empty until the school supplies its calendar. */
export const upcomingEvents: UpcomingEvent[] = [];

/**
 * The one honest empty state for news, rendered by the homepage section, the
 * /news page list and anywhere else the feed appears.
 */
export const newsEmptyState = {
  heading: "No news posts yet",
  body: "School news will appear here once published. News is database-driven and will be managed from the school's admin area by trained, approved staff members.",
};

/** The one honest empty state for events. */
export const eventsEmptyState = {
  heading: "No events listed yet",
  body: "Upcoming events will appear here as the school calendar is confirmed.",
};

/** Display labels for the possible news sources. */
export const newsSourceLabels: Record<NewsSource, string> = {
  website: "Website",
  instagram: "Instagram",
  facebook: "Facebook",
};
