import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CalendarCheck, Clock, HeartHandshake, Sparkles, Users } from "lucide-react";
import earlyYearsImage from "@/assets/stage-early-years.jpg";
import primaryImage from "@/assets/stage-primary.jpg";
import welcomePortrait from "@/assets/honeytots-welcome-portrait.jpg.asset.json";
import { ButtonLink } from "@/components/common/Button";
import { CallToAction } from "@/components/common/CallToAction";
import { CircularFeature } from "@/components/common/CircularFeature";
import { CurvedBreak } from "@/components/common/CurvedBreak";
import { ImageTextSplit } from "@/components/common/ImageTextSplit";
import { JourneyLine } from "@/components/common/JourneyLine";
import { LocationSection } from "@/components/common/LocationSection";
import { QuickLinkGrid } from "@/components/common/QuickLinkGrid";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ValuesPlaceholderSection } from "@/components/common/ValuesPlaceholderSection";
import { LatestNews } from "@/components/home/LatestNews";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { UsefulLinks } from "@/components/home/UsefulLinks";
import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { ParentLinks } from "@/components/layout/ParentLinks";
import { siteConfig } from "@/lib/site-config";
import { meta } from "@/lib/simple-page";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Nursery & Primary School",
      "Honeytots School: a caring Nigerian nursery and primary school where every child is known, nurtured and inspired.",
      "/",
    ),
  component: Home,
});

const stages = [
  {
    image: earlyYearsImage,
    title: "Early Years & Nursery",
    text: "Play-based learning that builds curiosity and confidence.",
    to: "/learning/early-years",
    shape: "arch" as const,
  },
  {
    image: primaryImage,
    title: "Primary School",
    text: "Strong foundations from Primary 1 to Primary 6.",
    to: "/learning/primary",
    shape: "circle" as const,
  },
];

const lifeAtHoneytots = [
  {
    label: "Our Facilities",
    to: "/our-school/facilities",
    description: "Classrooms, outdoor play and learning spaces.",
    icon: Sparkles,
    family: "sky" as const,
  },
  {
    label: "About Honeytots",
    to: "/our-school/about",
    description: "What makes our school community special.",
    icon: Users,
    family: "plum" as const,
  },
  {
    label: "Meet the Team",
    to: "/our-school/staff",
    description: "The people who look after every child.",
    icon: HeartHandshake,
    family: "honey" as const,
  },
];

/**
 * Homepage quick facts (content brief §4). Established and office hours read
 * from `siteConfig` so the numbers cannot drift from the footer or contact
 * card; the curriculum line is the wording the brief approves specifically for
 * the home hero area.
 */
const quickFacts = [
  { label: "Established", value: String(siteConfig.yearEstablished), icon: CalendarCheck },
  {
    label: "Curriculum",
    value: "Blended Nigerian & British Montessori/EYFS Approach",
    icon: BookOpen,
  },
  {
    label: "Class sizes",
    value: "Small teacher-to-student ratios for individualised attention",
    icon: Users,
  },
  { label: "Office Hours", value: siteConfig.openingHours, icon: Clock },
];

function Home() {
  return (
    <>
      <div className="-mt-18 relative overflow-x-clip sm:-mt-19">
        <HeroCarousel />
        <ParentLinks />
      </div>
      <div className="xl:hidden">
        <ParentLinks variant="inline" />
      </div>

      <ImageTextSplit
        image={welcomePortrait.url}
        alt="A woman wearing glasses and a wide-brimmed hat at a Honeytots event"
        ratio="3/4"
        shape="arch"
        tone="deep"
        overlap
      >
        <p className="eyebrow">Welcome</p>
        <h2 className="mt-3 text-3xl md:text-4xl">A warm welcome to Honeytots</h2>
        <div className="mt-4 space-y-3 text-lg leading-relaxed text-muted-foreground">
          <p>
            We are a small, caring community where children feel happy, safe and ready to learn.
          </p>
          <p>
            From Nursery through to Primary&nbsp;6, every child is known by name, nurtured and
            encouraged to do their best.
          </p>
        </div>
        <p className="mt-6 rounded-xl border border-honey/30 bg-honey-soft/70 px-4 py-3 text-sm text-navy-deep">
          {siteConfig.tagline}
        </p>
        <div className="mt-7">
          <ButtonLink to="/our-school/welcome" variant="secondary">
            Read our welcome
          </ButtonLink>
        </div>
      </ImageTextSplit>

      <CurvedBreak from="cream-deep" fill="cream" flip />

      <section aria-label="Quick facts" className="bg-cream pb-14 pt-6 md:pb-20">
        <div className="container-page">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((fact) => (
              <li
                key={fact.label}
                className="flex items-start gap-3.5 rounded-[1.75rem] border border-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-honey-soft text-honey-deep">
                  <fact.icon aria-hidden="true" className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="eyebrow block">{fact.label}</span>
                  <span className="mt-1.5 block font-display text-base font-bold leading-snug text-navy">
                    {fact.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ValuesPlaceholderSection />

      <CurvedBreak from="cream" fill="cream-deep" />

      <section className="bg-cream-deep py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Learning"
            title="Learning at every stage"
            intro="From a child's first days in Nursery through to Primary 6, every class is planned around what children of that age need."
            action={
              <ButtonLink to="/learning" variant="secondary">
                Explore learning
              </ButtonLink>
            }
          />

          <JourneyLine tone="honey" className="mt-8" density={16} depth={0.3} />

          <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10">
            {stages.map((stage) => (
              <CircularFeature
                key={stage.title}
                image={stage.image}
                alt=""
                title={stage.title}
                text={stage.text}
                to={stage.to}
                shape={stage.shape}
                mediaHeight="aspect-[3/4]"
              />
            ))}
          </div>
        </div>
      </section>

      <CurvedBreak from="cream-deep" fill="cream" />

      <section className="bg-cream py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Life at Honeytots"
            title="A community built around each child"
            intro="Small, consistent things build a happy school: our spaces, our team, and the way we work with families every day."
            action={
              <ButtonLink to="/our-school" variant="secondary">
                Our School
              </ButtonLink>
            }
          />
          <JourneyLine tone="navy" className="mt-8" density={16} depth={0.2} flip />
          <div className="mt-4">
            <QuickLinkGrid items={lifeAtHoneytots} columns={3} />
          </div>
        </div>
      </section>

      <CurvedBreak from="cream" fill="cream-deep" />

      <UsefulLinks />

      <CurvedBreak from="cream-deep" fill="cream" />

      <LatestNews />

      <CurvedBreak from="cream" fill="cream-deep" />

      <UpcomingEvents />

      <CurvedBreak from="cream-deep" fill="muted" />

      <CallToAction
        title="Come and see Honeytots for yourself"
        intro="The best way to understand our school is to visit. We would be glad to welcome you."
        primary={{ label: "Book a Visit", to: "/book-a-visit" }}
        secondary={{ label: "Contact Us", to: "/contact" }}
        className="bg-muted pt-2"
      />

      <CurvedBreak from="muted" fill="cream-deep" />

      <section className="bg-cream-deep py-16 md:py-24">
        <div className="container-page">
          <LocationSection />
        </div>
      </section>
    </>
  );
}
