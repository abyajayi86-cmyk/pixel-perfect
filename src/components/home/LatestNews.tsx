import { CarouselItem } from "@/components/ui/carousel";
import { ButtonLink } from "@/components/common/Button";
import { CarouselRail } from "@/components/common/CarouselRail";
import { EmptyStatePanel } from "@/components/common/EmptyStatePanel";
import { NewsCard } from "@/components/common/NewsCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SocialFollow } from "@/components/home/SocialFollow";
import { newsEmptyState, newsItems } from "@/content/feed";

/**
 * Homepage "Latest News" with the social call-to-action beside it.
 *
 * Stories come from `feed.ts` — the same source the /news page list reads —
 * and there are none yet, because the brief supplies no confirmed posts. The
 * empty state is honest and shared rather than duplicated, and the data model
 * already supports cards, source badges and internal or external links for the
 * day the first confirmed story arrives.
 */
export function LatestNews() {
  return (
    <section aria-label="Latest news" className="bg-cream py-14 md:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="News"
          title="Latest News"
          intro="Updates and stories from across the Honeytots School community."
          align="center"
          action={
            <ButtonLink to="/news" variant="secondary">
              All news
            </ButtonLink>
          }
        />

        <div className="mt-9">
          {newsItems.length === 0 ? (
            <EmptyStatePanel heading={newsEmptyState.heading} body={newsEmptyState.body} />
          ) : (
            <CarouselRail label="news posts">
              {newsItems.map((item) => (
                <CarouselItem
                  key={`${item.date}-${item.title}`}
                  className="basis-[85%] sm:basis-[46%] md:basis-[32%] lg:basis-[23%]"
                >
                  <NewsCard item={item} />
                </CarouselItem>
              ))}
            </CarouselRail>
          )}
        </div>

        <SocialFollow />
      </div>
    </section>
  );
}
