import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CalendarDays, GraduationCap, HeartHandshake, Shirt, Wallet } from "lucide-react";
import earlyYearsImage from "@/assets/stage-early-years.jpg";
import primaryImage from "@/assets/stage-primary.jpg";
import communityImage from "@/assets/placeholder-community.svg";
import learningImage from "@/assets/placeholder-learning.svg";
import welcomeImage from "@/assets/welcome-head.jpg";
import { ButtonLink } from "@/components/common/Button";
import { CallToAction } from "@/components/common/CallToAction";
import { CurvedBreak } from "@/components/common/CurvedBreak";
import { ImageTextSplit } from "@/components/common/ImageTextSplit";
import { QuickLinkGrid } from "@/components/common/QuickLinkGrid";
import { SectionHeading } from "@/components/common/SectionHeading";
import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { ParentLinks } from "@/components/layout/ParentLinks";
import { meta } from "@/lib/simple-page";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Nursery & Primary School",
      "Honeytots School: a caring Nigerian nursery and primary school where every child is known, nurtured and inspired.",
    ),
  component: Home,
});

/**
 * The seven items parents most often need. Together with the Parent Links strip
 * this satisfies the AGENTS.md requirement that Admissions, Fees, School Day,
 * Calendar, Uniform, Policies and Contact are all within two clicks.
 */
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

function Home() {
  return (
    <>
      {/*
        The parent rail is a sibling of the carousel inside a relatively
        positioned wrapper, so it can overlap the hero without the carousel
        needing to know about it. Below xl the compact inline version is used.

        `overflow-x-clip` trims the rail's tucked panel, which is parked just
        off the right edge of the hero. Clipping (rather than `overflow-hidden`)
        keeps the wrapper out of the scroll container, so the off-canvas panel
        cannot widen the page and it cannot be scrolled into view by tabbing.
      */}
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

      <CurvedBreak fill="var(--color-cream-deep)" />

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
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We are a caring community where children feel happy, safe and ready to learn. Our full
          welcome message will be provided by the school.
        </p>
        <div className="mt-7">
          <ButtonLink to="/our-school/welcome" variant="secondary">
            Read our welcome
          </ButtonLink>
        </div>
      </ImageTextSplit>

      <CurvedBreak fill="var(--color-cream)" flip />

      <section className="bg-cream py-14 md:py-20">
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

          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {stages.map((stage) => (
              <article key={stage.title} className="group">
                {/*
                  The image is a link to the same stage page as the button below
                  it. `zoom-media` clips the container to the shape so the subtle
                  scale never breaks out of the arch or circle.
                */}
                <Link
                  to={stage.to}
                  className={cn(
                    "zoom-media block shadow-[var(--shadow-card)] transition-shadow duration-300 ease-out hover:shadow-[var(--shadow-lift)] motion-reduce:transition-none",
                    stage.shape === "circle" ? "shape-circle" : "shape-arch",
                  )}
                >
                  <img
                    src={stage.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={
                      stage.shape === "circle"
                        ? "aspect-square w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        : "aspect-[3/4] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    }
                  />
                </Link>
                <h3 className="mt-6 text-2xl">{stage.title}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">{stage.text}</p>
                <div className="mt-4">
                  <ButtonLink to={stage.to} variant="secondary" size="sm">
                    Learn more
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ImageTextSplit
        image={learningImage}
        alt="Placeholder for a Honeytots classroom photograph"
        ratio="5/4"
        shape="blob"
        tone="muted"
        reverse
        imagePlaceholder
        width={1280}
        height={1024}
      >
        <p className="eyebrow">Our School</p>
        <h2 className="mt-3 text-3xl md:text-4xl">Spaces that help children settle and learn</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Classrooms, outdoor space and the people who look after them all matter. Take a look at
          what we can show you today.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink to="/our-school/facilities">Our Facilities</ButtonLink>
          <ButtonLink to="/our-school/staff" variant="secondary">
            Meet the team
          </ButtonLink>
        </div>
      </ImageTextSplit>

      <ImageTextSplit
        image={communityImage}
        alt="Placeholder for a Honeytots school community photograph"
        ratio="4/3"
        shape="rounded"
        tone="cream"
        imagePlaceholder
      >
        <p className="eyebrow">Our School</p>
        <h2 className="mt-3 text-3xl md:text-4xl">A community built around each child</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Our team works closely with families so that a child's learning continues happily at home.
          Read about how we work, and what we ask of each other.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink to="/our-school/about">About Honeytots</ButtonLink>
          <ButtonLink to="/our-school/vision-values" variant="secondary">
            Our Vision &amp; Values
          </ButtonLink>
        </div>
      </ImageTextSplit>

      <CallToAction
        title="Come and see Honeytots for yourself"
        intro="The best way to understand our school is to visit. We would be glad to welcome you."
        primary={{ label: "Book a Visit", to: "/book-a-visit" }}
        secondary={{ label: "Contact Us", to: "/contact" }}
      />
    </>
  );
}
