import { newsEmptyState, newsItems, type NewsItem } from "@/content/feed";
import { EmptyStatePanel } from "@/components/common/EmptyStatePanel";
import { NewsCard } from "@/components/common/NewsCard";

/**
 * The /news page list, rendered through `ContentPage`'s `appendBody`.
 *
 * Reads the same `feed.ts` array as the homepage section, so the page and the
 * homepage can never show different stories. With no confirmed posts it shows
 * the shared empty state from `feed.ts` rather than invented headlines.
 */
export function NewsList({ items = newsItems }: { items?: NewsItem[] }) {
  if (items.length === 0) {
    return <EmptyStatePanel heading={newsEmptyState.heading} body={newsEmptyState.body} />;
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={`${item.date}-${item.title}`}>
          <NewsCard item={item} />
        </li>
      ))}
    </ul>
  );
}
