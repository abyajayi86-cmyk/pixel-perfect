import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CalendarDays, GraduationCap, HeartHandshake, Shirt, Wallet } from "lucide-react";
import hero from "@/assets/hero-honeytots.jpg";
import early from "@/assets/stage-early-years.jpg";
import primary from "@/assets/stage-primary.jpg";
import head from "@/assets/welcome-head.jpg";
import { ButtonLink } from "@/components/common/Button";
import { QuickLinkGrid } from "@/components/common/QuickLinkGrid";
import { CallToAction } from "@/components/common/CallToAction";
import { meta } from "@/lib/simple-page";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Nursery & Primary School",
      "Honeytots School: a caring nursery and primary school where every child is known, nurtured and inspired.",
    ),
  component: Home,
});

const quick = [
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

function Home() {
  return (
    <>
      <section className="bg-honey-soft">
        <div className="container-page grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
              Nursery & Primary School
            </p>
            <h1 className="mt-3 text-4xl leading-tight md:text-6xl">
              Where little ones grow into confident learners
            </h1>
            <p className="mt-5 text-lg text-muted-foreground md:text-xl">
              At Honeytots, every child is known, nurtured and inspired in a warm, safe and joyful
              school.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/book-a-visit">Book a Visit</ButtonLink>
              <ButtonLink to="/admissions" variant="secondary">
                Admissions
              </ButtonLink>
            </div>
          </div>
          <img
            src={hero}
            alt="Children learning together at Honeytots School"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
            width={1200}
            height={900}
          />
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="text-3xl">Quick links</h2>
        <div className="mt-6">
          <QuickLinkGrid items={quick} columns={3} />
        </div>
      </section>

      <section className="container-page grid items-center gap-10 py-14 lg:grid-cols-2">
        <img
          src={head}
          alt="Honeytots School leadership"
          className="aspect-[4/3] w-full rounded-3xl object-cover"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">Welcome</p>
          <h2 className="mt-2 text-3xl">A warm welcome to Honeytots</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We are a caring community where children feel happy, safe and ready to learn. Our full
            welcome message will be provided by the school.
          </p>
          <div className="mt-6">
            <ButtonLink to="/our-school/welcome" variant="secondary">
              Read our welcome
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="text-3xl">Learning at every stage</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            {
              img: early,
              title: "Early Years / Nursery",
              text: "Play-based learning that builds curiosity and confidence.",
              to: "/learning/early-years",
            },
            {
              img: primary,
              title: "Primary School",
              text: "Strong foundations from Primary 1 to Primary 6.",
              to: "/learning/primary",
            },
          ].map((s) => (
            <article key={s.title} className="card-surface overflow-hidden">
              <img
                src={s.img}
                alt=""
                className="aspect-[16/9] w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-2xl">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
                <div className="mt-4">
                  <ButtonLink to={s.to} variant="secondary" size="sm">
                    Learn more
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CallToAction
        title="Come and see Honeytots for yourself"
        intro="The best way to understand our school is to visit. We would be glad to welcome you."
        primary={{ label: "Book a Visit", to: "/book-a-visit" }}
        secondary={{ label: "Contact Us", to: "/contact" }}
      />
    </>
  );
}
