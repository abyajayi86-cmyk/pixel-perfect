import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  HeartHandshake,
  Shirt,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import earlyYearsImage from "@/assets/stage-early-years.jpg";
import primaryImage from "@/assets/stage-primary.jpg";
import welcomeImage from "@/assets/welcome-head.jpg";
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
import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { ParentLinks } from "@/components/layout/ParentLinks";
import { meta } from "@/lib/simple-page";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Nursery & Primary School",
      "Honeytots School: a caring Nigerian nursery and primary school where every child is known, nurtured and inspired.",
    ),
  component: Home,
});

const quickLinks = [
  {
    label: "Admissions",
    to: "/admissions",
    description: "Start your journey with us.",
    icon: GraduationCap,
    family: "honey" as const,
  },
  {
    label: "School Fees",
    to: "/admissions/fees",
    description: "Fee information and enquiries.",
    icon: Wallet,
    family: "leaf" as const,
  },
  {
    label: "Term Dates",
    to: "/parents/term-dates",
    description: "Session and holiday dates.",
    icon: CalendarDays,
    family: "sky" as const,
  },
  {
    label: "Uniform",
    to: "/parents/uniform",
    description: "What children wear.",
    icon: Shirt,
    family: "plum" as const,
  },
  {
    label: "Curriculum",
    to: "/learning/curriculum",
    description: "How learning is organised.",
    icon: BookOpen,
    family: "coral" as const,
  },
  {
    label: "Safeguarding",
    to: "/our-school/safeguarding",
    description: "Keeping every child safe.",
    icon: HeartHandshake,
    family: "leaf" as const,
  },
];

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

function Home() {
  return (
    <>
      <div className="relative overflow-x-clip">
        <HeroCarousel />
        <ParentLinks />
      </div>
      <div className="xl:hidden">
        <ParentLinks variant="inline" />
      </div>

      <section className="bg-cream py-4">
        <div className="container-page">
          <h2 className="eyebrow">Quick access</h2>
          <div className="mt-5">
            <QuickLinkGrid items={quickLinks} columns={3} />
          </div>
        </div>
      </section>

      <CurvedBreak from="cream" fill="cream-deep" />

      <ImageTextSplit
        image={welcomeImage}
        alt="A member of the Honeytots School team"
        ratio="4/3"
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
          Our full welcome message will be provided by the school.
        </p>
        <div className="mt-7">
          <ButtonLink to="/our-school/welcome" variant="secondary">
            Read our welcome
          </ButtonLink>
        </div>
      </ImageTextSplit>

      <CurvedBreak from="cream-deep" fill="cream" flip />

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

      <CurvedBreak from="cream" fill="muted" />

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
