/**
 * Draft editorial content for Phase One inner pages.
 *
 * Draft copy written in warm, parent-friendly, Nigerian nursery and primary-school
 * voice. Every page that makes or implies factual claims about the school — staff
 * numbers, facilities, fees, term dates, age bands, curriculum affiliations, etc. —
 * keeps `awaitingConfirmation: true` so an amber draft notice is shown at the top.
 *
 * Landing pages whose copy is pure marketing (no facts that require school sign-off)
 * may use `awaitingConfirmation: false`. The default for anything else is true.
 *
 * Phase Two moves this registry into the `pages` / `page_sections` database tables
 * so the school edits it from /admin. Keep reads through `pageContent` so the swap
 * is a single-point change.
 */

import { schoolLocation, siteConfig } from "@/lib/site-config";
import {
  admissionsCms,
  classStructureCms,
  parentsCms,
  type ContentStatus,
} from "@/content/site-cms";
import type { FAQItem, JourneyStep } from "@/content/brand";

import welcomeHeadImage from "@/assets/welcome-head.jpg";
import heroHoneytotsImage from "@/assets/hero-honeytots.jpg";
import earlyYearsImage from "@/assets/stage-early-years.jpg";
import primaryImage from "@/assets/stage-primary.jpg";

export type PageSection = {
  heading: string;
  body: string[];
  /** Optional simple list rendered under the body. */
  list?: string[];
};

export type PageContent = {
  title: string;
  eyebrow?: string;
  intro: string;
  sections: PageSection[];
  /**
   * Three-state content workflow matching the rest of the CMS.
   *   - "draft"                  → internal working copy
   *   - "awaiting_confirmation"  → sent to the school for sign-off
   *   - "published"              → school-approved, no warning banner
   */
  status?: ContentStatus;
  /**
   * Legacy boolean flag kept for backwards compatibility with the banner
   * renderer. Reads as the amber "awaiting confirmation" banner if true.
   * When `status` is set, `awaitingConfirmation` is derived from it:
   *   status === "awaiting_confirmation" → true
   *   anything else                      → false
   */
  awaitingConfirmation?: boolean;
  /**
   * Hand-picked related page links shown under the content. Falls back to the
   * sibling child-links from the nav section when omitted.
   */
  related?: Array<{ label: string; to: string }>;
  /**
   * Phase 5 inner-page decorations. Kept as boolean toggles rather than
   * inline JSX so the page def registry stays plain data (Phase 2 CMS-ready).
   * Each maps 1:1 to a visual component rendered by ContentPage.tsx.
   */
  heroJourneyLine?: boolean;
  learningStageCards?: boolean;
  brandValuesTiles?: boolean;
  /**
   * Optional lead image rendered at the top of the content column. `alt` is
   * read verbatim, so it must describe what the photo actually shows — never a
   * generic "image"/"photo". Inner pages stay complete and attractive without
   * one, so most pages leave this unset until the school supplies photography.
   */
  image?: { src: string; alt: string };
  /**
   * Phase 6 reusable component hooks: plain-data arrays so CMS can populate
   * them later as scalar/relation tables in the admin without code changes.
   *   journeySteps → JourneySteps visual stepper component
   *   faqItems     → FAQAccordion (native <details>) component with per-panel
   *                   draft-notice when awaitingConfirmation is true
   */
  journeySteps?: JourneyStep[];
  faqItems?: FAQItem[];
};

/**
 * Derives the backwards-compatible `awaitingConfirmation` boolean from a
 * page's three-state workflow status. If a page sets the legacy
 * `awaitingConfirmation` flag directly it is preserved.
 */
export function pageAwaitingConfirmation(p: PageContent): boolean {
  if (p.status === "awaiting_confirmation") return true;
  if (p.status === "draft" || p.status === "published") return false;
  return p.awaitingConfirmation === true;
}

const CONFIRM =
  "Information on this page will be updated following confirmation from Honeytots School.";

/** Confirmed seven-step admissions process, shared by every admissions page. */
export const admissionsProcess: JourneyStep[] = admissionsCms.applicationSteps.map((step) => ({
  title: step.title,
  text: step.description,
}));

/** The five documents the school asks every applicant to provide. */
export const requiredDocuments: string[] = admissionsCms.requiredDocuments.map((doc) => doc.name);

/** Confirmed daily schedule, e.g. "07:00 AM — Drop-Off Begins". */
const schoolDayList: string[] = parentsCms.schoolDay.map(
  (period) => `${period.timeFrom} — ${period.label}`,
);

/** Confirmed notes attached to schedule periods, e.g. the 8:00 AM handover rule. */
const schoolDayNotes: string[] = parentsCms.schoolDay
  .filter((period) => period.note)
  .map((period) => period.note as string);

/** Confirmed class sizes and staffing, e.g. "Creche — 8–10 children (2 Class Nannies)". */
const classStructure: string[] = classStructureCms.map(
  (entry) => `${entry.stage} — ${entry.groupSize} (${entry.staffing})`,
);

export const pageContent: Record<string, PageContent> = {
  "/our-school": {
    title: "Our School",
    eyebrow: "Our School",
    intro:
      "Honeytots is a Nursery and Primary school where every child is known by name — a small, warm community built on consistent routines and kind, clear expectations.",
    heroJourneyLine: true,
    sections: [
      {
        heading: "The school, in seven pages",
        body: [
          "Use the links below to read what we can share today. Our Welcome message introduces the leadership team; Vision & Values sets out the principles that shape each day; Facilities and Staff describe the place and the people; Safeguarding explains how we keep children safe; Policies holds the documents we ask every family to read; About Honeytots covers the practical facts about the school itself.",
        ],
      },
    ],
    related: [
      { label: "Read the Welcome", to: "/our-school/welcome" },
      { label: "Our Vision & Values", to: "/our-school/vision-values" },
      { label: "Keeping children safe", to: "/our-school/safeguarding" },
    ],
  },
  "/our-school/welcome": {
    title: "Welcome",
    eyebrow: "Our School",
    intro: "A warm welcome from the Honeytots leadership team.",
    image: {
      src: welcomeHeadImage,
      alt: "A member of the Honeytots School team welcoming visitors",
    },
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Welcome to Honeytots",
        body: [
          "Thank you for considering Honeytots for your child. We believe children learn best when they feel safe, valued and genuinely encouraged — and we work closely with families so each child settles well, understands what is expected, and makes steady, happy progress.",
          "Our motto — Nurturing Excellent Leaders — describes what we hope for every child: confidence, a love of learning, and kindness to others.",
          "The best way to understand our school is to visit. Please book a tour to meet staff and see the children at work and play.",
          CONFIRM,
        ],
        list: [
          "Prompt, respectful communication with families",
          "Clear termly learning information",
          "Honest feedback on progress and next steps",
          "A clear route to raise and follow up concerns",
        ],
      },
    ],
    related: [
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Our Vision & Values", to: "/our-school/vision-values" },
      { label: "Keeping children safe", to: "/our-school/safeguarding" },
    ],
  },
  "/our-school/about": {
    title: "About Honeytots",
    eyebrow: "Our School",
    intro:
      "Established in 2006, Honeytots School is dedicated to benchmark early years and primary education.",
    image: {
      src: heroHoneytotsImage,
      alt: "Children learning together at Honeytots School",
    },
    status: "published",
    sections: [
      {
        heading: "Our vision",
        body: [
          "To be the benchmark for excellence in early years and primary education, inspiring confident learners, compassionate leaders and responsible global citizens who shape the future of Nigeria and beyond.",
        ],
      },
      {
        heading: "Our mission",
        body: [
          "At Honeytots School (HS), our mission is to nurture every child to reach their fullest potential by providing a safe, inclusive and inspiring learning environment where academic excellence, character development and lifelong curiosity flourish together.",
          "We are committed to recognising each child's unique strengths, supporting their individual journey and partnering with families to develop confident, resilient and compassionate young people who are prepared for life beyond the classroom.",
        ],
      },
      {
        heading: "What we value",
        body: [
          "Six values shape teaching, care and school life at Honeytots, and describe the character we hope every child grows into.",
        ],
        list: [
          "Excellence — pursuing the highest standards in learning, character and personal development",
          "Nurturing — a caring, safe and supportive environment where every child is known, valued and loved",
          "Integrity — honesty, respect and fairness in all relationships and decisions",
          "Compassion — empathy, kindness and respect for others",
          "Growth — curiosity, creativity and resilience so children embrace learning and challenges",
          "Leadership — character, confidence and the skills to lead meaningfully",
        ],
      },
      {
        heading: "Leadership & authorised contact",
        body: [
          "Mrs. Odunsi — Head of Operations / Authorized Contact.",
          "Admissions enquiries, visits and general questions are handled by the school office during opening hours, " +
            siteConfig.openingHours +
            ".",
        ],
      },
      {
        heading: "The stages we provide",
        body: [
          "Honeytots offers Creche, Playgroup, Nursery and Primary education — a single, consistent path from a child's earliest years through to the end of Primary 6. Classes are organised by developmental stage, with staffing and routines suited to each age group.",
        ],
        list: [
          "Creche · Playgroup · Nursery · Primary",
          "Primary 1 – Primary 6",
          "Established 2006",
          "Fadeyi, Lagos",
        ],
      },
    ],
    related: [
      { label: "Vision, Mission & Values", to: "/our-school/vision-values" },
      { label: "Daily routines", to: "/parents/school-day" },
      { label: "Learning at Honeytots", to: "/learning" },
    ],
  },
  "/our-school/vision-values": {
    title: "Vision, Mission & Values",
    eyebrow: "Our School",
    intro: "The principles that shape teaching, care and school life at Honeytots.",
    status: "published",
    heroJourneyLine: true,
    brandValuesTiles: true,
    sections: [
      {
        heading: "Our direction",
        body: [
          "Our vision: to be the benchmark for excellence in early years and primary education, inspiring confident learners, compassionate leaders and responsible global citizens who shape the future of Nigeria and beyond.",
          "Our mission: to nurture every child to reach their fullest potential by providing a safe, inclusive and inspiring learning environment where academic excellence, character development and lifelong curiosity flourish together.",
        ],
      },
      {
        heading: "Our motto",
        body: [
          "Nurturing Excellent Leaders. We believe every child can develop the qualities of a good leader: listening, taking responsibility, doing their best, and helping others to do their best too.",
          "Our brand promise to families: " + siteConfig.tagline,
        ],
      },
    ],
    related: [
      { label: "About Honeytots", to: "/our-school/about" },
      { label: "Culture in learning", to: "/learning/culture-values" },
      { label: "Safeguarding", to: "/our-school/safeguarding" },
    ],
  },
  "/our-school/staff": {
    title: "Leadership & Staff",
    eyebrow: "Our School",
    intro: "The team who teach, care for and support our children.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Leadership & authorised contact",
        body: [
          "Mrs. Odunsi — Head of Operations / Authorized Contact at Honeytots School.",
          "Please contact the school office during opening hours, " +
            siteConfig.openingHours +
            ", and we will route your message to the right person.",
        ],
      },
      {
        heading: "Staff profiles — coming soon",
        body: [
          "Photographs, names, roles and short biographies for the leadership team and teaching staff will be published here once supplied by the school.",
          "Profiles will be managed from the school's admin area so additions and updates can be made without a developer.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Welcome message", to: "/our-school/welcome" },
      { label: "Safeguarding", to: "/our-school/safeguarding" },
      { label: "Book a Visit — meet the team", to: "/book-a-visit" },
    ],
  },
  "/our-school/facilities": {
    title: "Our Facilities",
    eyebrow: "Our School",
    intro: "The spaces where our children learn, play and grow.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Facilities at a glance",
        body: [
          "Learning and play spaces at Honeytots are designed with young children in mind: bright, orderly, and set up so children can move between activities safely and with growing independence.",
          "Full descriptions, floor arrangements and photographs will be published here once the school has confirmed the permanent site and any planned upgrades are complete.",
          CONFIRM,
        ],
        list: [
          "Bright, well-ventilated classrooms",
          "Safe, shaded outdoor play areas",
          "Age-appropriate Early Years equipment",
          "Quiet reading and group-work spaces",
          "Creative and practical work areas",
          "Child-appropriate washrooms",
          "Clean, regularly maintained areas",
        ],
      },
    ],
    related: [
      { label: "Early Years learning", to: "/learning/early-years" },
      { label: "Book a Visit — see facilities", to: "/book-a-visit" },
      { label: "Find Us / map", to: "/contact/find-us" },
    ],
  },
  "/our-school/safeguarding": {
    title: "Safeguarding & Child Protection",
    eyebrow: "Our School",
    intro: "The safety and wellbeing of every child is our first responsibility.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our commitment",
        body: [
          "Honeytots is committed to a safe environment where every child is protected from harm and treated with dignity. Safeguarding is the responsibility of every adult in our community — leadership, teachers, support staff, volunteers and contractors.",
          "All staff receive safeguarding training and safer-recruitment checks are completed for every adult working regularly with children.",
        ],
        list: [
          "Age-appropriate safety teaching (personal, online, relationships)",
          "Trained designated safeguarding lead and deputy",
          "Confidential, serious handling of every concern",
          "Clear reporting and follow-up for families",
        ],
      },
      {
        heading: "Raising a concern",
        body: [
          "If you have a concern about a child's safety or wellbeing — your own child or another — please contact the school office. Please do not investigate a concern yourself; our designated safeguarding lead is trained to handle these situations properly and involve the right agencies.",
          "All concerns are taken seriously, handled confidentially and followed up. You will be told what is happening at each stage, unless sharing would itself place a child at greater risk.",
        ],
      },
      {
        heading: "Awaiting school sign-off",
        body: [
          "Named safeguarding leads, reporting routes, whistleblowing procedures and the full child protection policy will be published here once signed off in writing by Honeytots leadership. In the meantime the Safeguarding & Child Protection policy card is clearly marked as requiring final school approval.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Contact the school office", to: "/contact" },
      { label: "Policies — Safeguarding card", to: "/our-school/policies" },
      { label: "Health & Wellbeing", to: "/parents/health-wellbeing" },
    ],
  },
  "/our-school/policies": {
    title: "School Policies",
    eyebrow: "Our School",
    intro:
      "How the school is run and the standards families can expect. Policies are reviewed on a regular cycle and any mid-year changes are communicated to parents before they take effect.",
    sections: [
      {
        heading: "Nine core policies — Phase 1 preview",
        body: [
          "The cards below list Honeytots' nine core policies for Phase 1 preview. Each card shows its name, short description, current status, and whether the wording has been signed off in writing by school leadership. Safeguarding and Privacy are additionally marked as requiring final school approval.",
          "For alternative formats or to request a specific document, see the canonical Policies & Downloads page linked below.",
        ],
      },
    ],
    related: [
      { label: "Policies & Downloads (canonical)", to: "/policies" },
      { label: "Safeguarding", to: "/our-school/safeguarding" },
      { label: "Privacy Policy", to: "/privacy-policy" },
    ],
  },

  "/learning": {
    title: "Learning at Honeytots",
    eyebrow: "Learning",
    intro:
      "A balanced education that combines strong foundations in literacy, numeracy and good character — with plenty of curiosity, creativity and play.",
    heroJourneyLine: true,
    learningStageCards: true,
    sections: [
      {
        heading: "Learning in eight parts",
        body: [
          "Every child's learning journey is different. We organise the school into two main stages — Early Years & Nursery, and Primary — with clear pathways for curriculum, subjects, assessment, enrichment, learning with technology, and the culture and values that run through everything.",
          "Choose a page below to explore what learning looks like at your child's stage.",
        ],
      },
      {
        heading: "Class structure & staffing",
        body: [
          "Classes stay deliberately small so every child is known and supported. Group sizes and staffing for each stage are set by the school as follows.",
        ],
        list: classStructure,
      },
    ],
    related: [
      { label: "Early Years & Nursery", to: "/learning/early-years" },
      { label: "Primary School", to: "/learning/primary" },
      { label: "Curriculum", to: "/learning/curriculum" },
    ],
  },
  "/learning/early-years": {
    title: "Early Years & Nursery",
    eyebrow: "Learning",
    intro: "Playful, purposeful early learning for our youngest children.",
    image: {
      src: earlyYearsImage,
      alt: "Children taking part in a supervised play activity",
    },
    awaitingConfirmation: true,
    heroJourneyLine: true,
    sections: [
      {
        heading: "How Early Years children learn",
        body: [
          "Learning is built around play, talk, stories, songs and exploration, held together by gentle routines. Teachers and assistants observe children closely and build on what each child already knows and can do.",
          "Our aim: for children to leave Early Years ready for Primary — confident, curious, able to work and play alongside others, with strong early literacy and numeracy foundations.",
        ],
        list: [
          "Communication & language",
          "Early literacy & numeracy",
          "Physical development (indoor + outdoor)",
          "Social & emotional development",
          "Creativity, music & expression",
          "Health & independence habits",
          "Cultural awareness & Nigerian heritage",
          "School readiness",
        ],
      },
      {
        heading: "Classes & settling in",
        body: [
          "Creche, Playgroup and Nursery — exact age bands and transitions are confirmed by the school before each entry round. Warm key-worker relationships, regular parent communication and predictable routines support every child.",
          "Transitions are planned individually: short visits first, longer stays as the child is ready, with honest conversations about what each child needs. We never rush settling in.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Entry classes & ages", to: "/admissions/entry-guide" },
      { label: "Primary School", to: "/learning/primary" },
      { label: "Book a Visit", to: "/book-a-visit" },
    ],
  },
  "/learning/primary": {
    title: "Primary School",
    eyebrow: "Learning",
    intro: "Primary 1 to Primary 6: building knowledge, skills and independence.",
    image: {
      src: primaryImage,
      alt: "Pupils working together in a primary classroom",
    },
    awaitingConfirmation: true,
    heroJourneyLine: true,
    sections: [
      {
        heading: "Primary 1 to Primary 6",
        body: [
          "Secure literacy and numeracy alongside science, technology, the arts, and social and citizenship learning. Each year group builds carefully on what came before so learning makes sense and children can see their own progress.",
          "Children are taught to work independently and collaboratively, manage time and equipment well, and take growing responsibility for their own learning. Good organisation is taught, not assumed.",
        ],
        list: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
      },
      {
        heading: "Core learning & transition",
        body: [
          "English and Mathematics receive dedicated daily time — fluency in reading, writing and number opens every other subject. Frequent small checks identify gaps early. Nigerian language teaching builds heritage connection, pride and fluency.",
          "Primary 6 supports transition into the next phase, whatever that looks like for each family. Planning for external examinations begins well in advance where applicable, and parents are kept closely informed.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Early Years & Nursery", to: "/learning/early-years" },
      { label: "Curriculum overview", to: "/learning/curriculum" },
      { label: "Assessment & progress", to: "/learning/assessment" },
    ],
  },
  "/learning/curriculum": {
    title: "Curriculum",
    eyebrow: "Learning",
    intro: "How learning is organised across the school.",
    status: "published",
    sections: [
      {
        heading: "Our framework",
        body: [
          "Honeytots follows a Nigerian & Montessori framework with blended international standards.",
          "Literacy, numeracy and good learning habits sit at the centre, with equal attention to the arts, sciences, languages, physical education and social learning. Termly timings, weekly structure and subject allocations are shared with families each term.",
        ],
        list: [
          "EYFS",
          "STEM, Science, Coding & Robotics",
          "ICT & Digital Education",
          "Languages, Music, Art & Creative Arts",
          "Co-Curricular Clubs, Sports & Excursions",
        ],
      },
    ],
    related: [
      { label: "Subjects we teach", to: "/learning/subjects" },
      { label: "Daily routines", to: "/parents/school-day" },
      { label: "Assessment & progress", to: "/learning/assessment" },
    ],
  },
  "/learning/subjects": {
    title: "Subjects We Teach",
    eyebrow: "Learning",
    intro: "Subject areas across Nursery and Primary.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Subject areas",
        body: [
          "Honeytots will confirm which subjects are offered at each phase and may add areas specific to the school's character and community. The list below shows subject areas commonly taught in Nigerian Nursery and Primary schools.",
          CONFIRM,
        ],
        list: [
          "English Studies",
          "Mathematics",
          "Nigerian Language",
          "Basic Science & Technology",
          "Physical & Health Education",
          "Nigerian History",
          "Social & Citizenship Studies",
          "Cultural & Creative Arts",
          "Basic Digital Literacy",
          "Music",
          "Religious & National Values",
          "Agriculture / Home Economics",
        ],
      },
    ],
    related: [
      { label: "Curriculum overview", to: "/learning/curriculum" },
      { label: "Enrichment & activities", to: "/learning/enrichment" },
      { label: "Early Years learning", to: "/learning/early-years" },
    ],
  },
  "/learning/assessment": {
    title: "Assessment",
    eyebrow: "Learning",
    intro: "How we follow and share each child's progress.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Following progress, not just measuring it",
        body: [
          "Teachers observe and assess children every day. These low-stakes checks plan lessons that match what each child needs, and quickly notice struggle or readiness for more challenge.",
          "Each term, progress is shared with parents in writing and through a meeting. Reports describe what a child can do, what they enjoyed, what was hard, and next steps.",
          "Assessment exists to help each child learn, not to rank or compare. Praise is for effort and improvement as well as for high attainment.",
          "Full details of the continuous assessment schedule, any formal examinations, and reporting dates are confirmed by the school each academic session.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Homework & Reading", to: "/parents/homework-reading" },
      { label: "Primary learning", to: "/learning/primary" },
      { label: "Parents' FAQs", to: "/parents" },
    ],
  },
  "/learning/digital-learning": {
    title: "ICT & Digital Learning",
    eyebrow: "Learning",
    intro: "Digital skills for today's Nigerian child.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Learning with technology",
        body: [
          "Early, guided experience of digital tools supports learning when used well — technology never replaces the teacher, the book, or the hand-written page.",
          "Alongside practical skills, children learn safe, responsible and kind use of digital spaces. Online safety is age-appropriate and revisited regularly.",
          "ICT facilities and full programme details are confirmed by the school before publication.",
          CONFIRM,
        ],
        list: [
          "Basic digital literacy & research skills",
          "Guided creation & productivity tools",
          "Age-appropriate online safety",
          "Responsible & kind digital citizenship",
        ],
      },
    ],
    related: [
      { label: "Subjects we teach", to: "/learning/subjects" },
      { label: "Enrichment activities", to: "/learning/enrichment" },
      { label: "Policies — Online Safety", to: "/policies" },
    ],
  },
  "/learning/enrichment": {
    title: "Enrichment & Activities",
    eyebrow: "Learning",
    intro: "Learning that continues beyond the classroom.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Clubs, visits & assemblies",
        body: [
          "Clubs and enrichment give children the chance to discover new interests, make friends across year groups, and develop talents beyond the timetable. Specific clubs, eligible year groups and days are published each term once staffing is confirmed.",
          "Planned visits, visitors to school, celebrations of Nigerian culture and heritage, and regular themed assemblies broaden children's experience and make learning memorable.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "School Calendar", to: "/calendar" },
      { label: "Culture & Values", to: "/learning/culture-values" },
      { label: "Term dates", to: "/parents/term-dates" },
    ],
  },
  "/learning/culture-values": {
    title: "Nigerian Culture & Values",
    eyebrow: "Learning",
    intro: "Heritage, language, citizenship and community.",
    sections: [
      {
        heading: "Rooted in Nigeria, ready for the world",
        body: [
          "Children learn about Nigerian history, languages, arts and community life, and about their responsibilities as citizens of their local community, their state and their country.",
          "We celebrate contemporary Nigeria as well as our heritage, and encourage respect for the many cultures, languages and traditions represented in our school community.",
          "Values are practiced through classroom jobs, caring for the school environment, listening to other people's points of view, resolving disagreements respectfully, and contributing to a school where everyone can belong.",
        ],
      },
    ],
    related: [
      { label: "Vision & Values", to: "/our-school/vision-values" },
      { label: "Subjects — Nigerian History & Language", to: "/learning/subjects" },
      { label: "Safeguarding", to: "/our-school/safeguarding" },
    ],
  },
  "/admissions": {
    title: "Admissions",
    eyebrow: "Admissions",
    intro:
      "Choosing the right school is an important decision. This section brings together the information families need to learn about Honeytots, arrange a visit and understand the next steps.",
    heroJourneyLine: true,
    journeySteps: admissionsProcess,
    sections: [
      {
        heading: "Your admissions journey",
        body: [
          "The seven steps above outline the Honeytots admissions process, from your first enquiry through to your child's first day with us.",
          "Places are offered subject to availability, so we encourage families to enquire early. Nothing replaces a school visit — we strongly recommend coming to see the school in session before making a final decision.",
        ],
      },
      {
        heading: "We are here to help",
        body: [
          "Applying for a school place can feel complicated. Our admissions team is there to answer your questions, to explain any part of the process that is unclear, and to make sure you have the information you need to make the right decision for your child.",
          "You do not need to have everything prepared before you get in touch. A conversation first is often the most helpful starting point.",
        ],
      },
    ],
  },
  "/admissions/how-to-apply": {
    title: "How to Apply",
    eyebrow: "Admissions",
    intro: "The steps to joining Honeytots, explained simply.",
    status: "published",
    heroJourneyLine: true,
    sections: [
      {
        heading: "Applying to Honeytots",
        body: [
          "Applications begin with an enquiry or a school visit. Our admissions team guides you through the process, tells you exactly which documents are required, and supports you at each step.",
          "A full online application system will be added in a later phase so families can complete the process online if they prefer.",
        ],
      },
      {
        heading: "The admissions process",
        body: [],
        list: admissionsProcess.map((step, index) => `${index + 1}. ${step.title} — ${step.text}`),
      },
      {
        heading: "Documents you will need",
        body: [
          "Please have the following ready before you submit an application. Requirements are confirmed in writing with you once the process begins.",
        ],
        list: requiredDocuments,
      },
      {
        heading: "After your application",
        body: [
          "We keep the process clear and honest — clear timelines, open communication, no last-minute surprises. If you are unsure about any step, send a message or call the school office.",
          "Once an application is complete, the school confirms next steps and expected timescales in writing. When a place is offered, you receive everything you need for your child's first day: uniform information, timings, settling-in arrangements and onboarding details.",
        ],
      },
    ],
    related: [
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Admission Requirements", to: "/admissions/requirements" },
      { label: "School Fees", to: "/admissions/fees" },
    ],
  },
  "/admissions/entry-guide": {
    title: "Entry Classes & Age Guide",
    eyebrow: "Admissions",
    intro: "Finding the right class for your child.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Entry classes",
        body: [
          "Honeytots accepts children into Creche, Playgroup, Nursery and Primary classes as places are available. The school determines exact age bands and session dates; contact admissions for up-to-date guidance before final publication.",
          "Readiness for school varies, so placement is not by age alone. If an alternative placement may benefit a child, we discuss this with the family and agree what is in the child's best interests.",
          CONFIRM,
        ],
        list: [
          "Creche — details awaiting confirmation",
          "Playgroup — details awaiting confirmation",
          "Nursery — details awaiting confirmation",
          "Primary 1 – Primary 6 — details awaiting confirmation",
        ],
      },
    ],
    related: [
      { label: "Admissions FAQs", to: "/admissions/faqs" },
      { label: "Admission Requirements", to: "/admissions/requirements" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
    ],
  },
  "/admissions/requirements": {
    title: "Admission Requirements",
    eyebrow: "Admissions",
    intro: "What we will need from families.",
    status: "published",
    sections: [
      {
        heading: "Required documents",
        body: [
          "Every application needs the five documents listed below. Your application checklist is confirmed in writing once you begin the process.",
          "The more we know about your child before they start — interests, friendships, medical needs, things they find hard, things they love — the better we can care for them and plan support. Please share honestly — we are here to help, not judge.",
        ],
        list: requiredDocuments,
      },
    ],
    related: [
      { label: "How to Apply", to: "/admissions/how-to-apply" },
      { label: "Entry Classes & Ages", to: "/admissions/entry-guide" },
      { label: "Book a Visit", to: "/book-a-visit" },
    ],
  },
  "/admissions/fees": {
    title: "School Fees",
    eyebrow: "Admissions",
    intro: "Fee information for prospective and current families.",
    status: "published",
    sections: [
      {
        heading: "Fees",
        body: [
          "Honeytots does not publish fee amounts on this website. Please contact the administration team directly for the current fee schedule — tuition, deposits, and any extras such as meals, uniforms or learning materials.",
          "Instalment plans are available by special arrangement. Please speak with the administration team about what would work for your family before accepting a place.",
          "Questions about what is included, how billing works, and any other payment questions are all answered before a family accepts a place.",
        ],
      },
    ],
    related: [
      { label: "Admissions FAQs", to: "/admissions/faqs" },
      { label: "Contact Admissions", to: "/contact" },
      { label: "How to Apply", to: "/admissions/how-to-apply" },
    ],
  },
  "/admissions/faqs": {
    title: "Frequently Asked Questions",
    eyebrow: "Admissions",
    intro: "Common questions parents and carers ask about applying to Honeytots.",
    awaitingConfirmation: true,
    faqItems: [
      {
        question: "Is there a deadline for applications?",
        answer: [
          "Applications are welcomed throughout the year, subject to available places. Starting early — well before you want your child to begin — usually gives families the most flexibility and the greatest chance of a place in the preferred class and term.",
          "The school will publish any specific deadlines for popular entry points once confirmed. Please check with the admissions team or this website nearer the time.",
        ],
      },
      {
        question: "Do you accept mid-year transfers into Primary?",
        answer: [
          "Yes, when there is a place available and when we believe the move is in the child's best interests. Transferring schools mid-year can be unsettling, so we take time to speak with families, review previous reports where available, and plan a thoughtful settling-in period.",
        ],
      },
      {
        question: "What does a school visit include?",
        answer: [
          "A visit typically includes a tour of the school at work, a chance to see classrooms and play areas, time with a member of the admissions or leadership team, and the opportunity to ask any questions you have.",
          "We try not to rush visits; please allow enough time for a proper conversation with the team before you leave.",
        ],
      },
      {
        question: "What support is there for children who need extra help?",
        answer: [
          "We work with families to understand each child's needs from the start. Where a child needs support — with learning, behaviour, English as an additional language, or a medical condition — we plan carefully and communicate clearly with parents.",
          "Where appropriate, we also work with external specialists recommended by the family or by the school to make sure every child gets the right level of care.",
        ],
      },
      {
        question: "What if we are not offered a place straight away?",
        answer: [
          "When a class is full, children are placed on a waiting list and families are kept informed. Places sometimes become available later in the year, and we contact parents in the order the school confirms.",
        ],
      },
      {
        question: "Do you operate a sibling priority policy?",
        answer: [
          "Sibling policies and other priorities for entry will be confirmed by the school before any formal admissions cycle begins. Please ask the admissions team for the current position when you enquire.",
        ],
      },
      {
        question: "We still have more questions — what should we do?",
        answer: [
          "Send a message, pick up the phone, or book a visit. There is no such thing as a silly question when you are choosing a school for your child.",
        ],
      },
    ],
    sections: [
      {
        heading: "Admissions questions",
        body: [
          "The questions and answers below are the ones families most often ask while considering Honeytots. They are written as general guidance for the Phase 1 preview and do not replace the final, signed-off admissions process. When something depends on school confirmation, the panel below each answer says so clearly.",
          "Questions about uniform, meals and allergies, or how parents are told about a child's progress are answered in the Parent Information and Learning sections of the website — not in this admissions FAQ. See the links at the bottom of this page.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Uniform", to: "/parents/uniform" },
      { label: "Meals & Allergies", to: "/parents/meals" },
      { label: "Progress & Reports", to: "/learning/assessment" },
      { label: "How to apply", to: "/admissions/how-to-apply" },
    ],
  },

  "/parents": {
    title: "Parent Information",
    eyebrow: "Parents",
    intro:
      "Practical, everyday information for Honeytots families — eight quick pages with what you need, when you need it.",
    heroJourneyLine: true,
    sections: [
      {
        heading: "Eight pages for everyday questions",
        body: [
          "Everything families need most often is collected here: the school day, term dates, uniform, meals, attendance, homework & reading, and health & wellbeing. Policies are kept separately so they are easy to find alongside the Our School section.",
          "If there is something you use regularly and it is missing, please tell the school office so we can improve these pages.",
        ],
      },
      {
        heading: "Birthday celebrations",
        body: [
          "The birthday child may wear non-uniform dress for the day.",
          "One small single-layer cake, 8–10 inches, please bring it before 11:00 AM. Each child receives one small juice carton (for example Ribena or Capri-Sun).",
          "Family joining the celebration is limited to the immediate nuclear family, and photos are taken in the 11:00 – 11:30 window.",
        ],
        list: ["No entertainers", "No party packs", "No gift bags", "No extra food"],
      },
    ],
    related: [
      { label: "School Day", to: "/parents/school-day" },
      { label: "Term Dates", to: "/parents/term-dates" },
      { label: "Uniform", to: "/parents/uniform" },
      { label: "Attendance", to: "/parents/attendance" },
    ],
  },
  "/parents/school-day": {
    title: "School Day",
    eyebrow: "Parents",
    intro: "Times, routines and everyday school information.",
    status: "published",
    sections: [
      {
        heading: "The daily schedule",
        body: [...schoolDayNotes, "School office hours: " + siteConfig.openingHours + "."],
        list: schoolDayList,
      },
      {
        heading: "Arrivals, dismissals & after-school",
        body: [
          "Calm starts and finishes make a real difference. Staff are visible to support transitions and answer parent questions. For safeguarding, only authorised adults collect a child — any changes must be notified to the office in advance.",
          "In Early Years the day balances play, stories, songs, movement and rest, with gentle routines. In Primary the day is more structured with daily literacy and numeracy, varied subjects, valued break times and calm finishes.",
          "After-school activities and wrap-around care options are confirmed each term.",
        ],
      },
    ],
    related: [
      { label: "Term Dates", to: "/parents/term-dates" },
      { label: "Calendar & Events", to: "/calendar" },
      { label: "Attendance & Punctuality", to: "/parents/attendance" },
    ],
  },
  "/parents/term-dates": {
    title: "Term Dates",
    eyebrow: "Parents",
    intro: "Session dates, holidays and mid-term breaks for the academic year.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Academic session",
        body: [
          "Term dates, INSET days and planned closures for the current and following session will be published here once confirmed by school leadership. Key dates also appear on the school calendar.",
          "Before publication, please enquire with the school office directly for up-to-date dates when planning travel or other commitments.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Calendar & Events", to: "/calendar" },
      { label: "School Day", to: "/parents/school-day" },
      { label: "School News", to: "/news" },
    ],
  },
  "/parents/uniform": {
    title: "Uniform",
    eyebrow: "Parents",
    intro: "What children wear to school.",
    status: "published",
    sections: [
      {
        heading: "Uniform guidance",
        body: [
          "A simple, clearly defined uniform helps children focus on learning, removes small comparisons and gives families a predictable morning routine. What children wear each day is set out below.",
        ],
      },
      ...parentsCms.uniform.map((group) => ({
        heading: group.category,
        body: [],
        list: group.items,
      })),
      {
        heading: "Lost property",
        body: [
          "Please name every item of uniform, footwear and kit — named items almost always find their way back. Unnamed jumpers, water bottles and shoes are particularly difficult to return.",
        ],
      },
    ],
    related: [
      { label: "School Day", to: "/parents/school-day" },
      { label: "Meals", to: "/parents/meals" },
      { label: "Admissions FAQs", to: "/admissions/faqs" },
    ],
  },
  "/parents/meals": {
    title: "School Meals",
    eyebrow: "Parents",
    intro: "Food, snacks and arrangements during the school day.",
    status: "published",
    sections: [
      {
        heading: "Lunchbox guidance",
        body: [
          "Children bring a packed lunchbox from home. A simple, balanced lunchbox keeps energy steady through the afternoon and avoids food waste.",
        ],
        list: [
          "Fresh fruit separately, or smoothies",
          "A leak-proof insulated flask",
          "Plain water only in class",
          "Enough water for the full day",
          "No microwave access",
          "No fizzy drinks",
          "No glass containers",
          "No high-sugar juices",
        ],
      },
      {
        heading: "Dietary needs, allergies & faith",
        body: [
          "All dietary needs — allergies, intolerances, medical diets, and religious or cultural food requirements — are taken seriously. Share these during admission and update the office whenever there is a change.",
          "If you are worried about a specific need, please raise it with the school before your child starts rather than assuming it will be covered.",
        ],
      },
    ],
    related: [
      { label: "Health & Wellbeing", to: "/parents/health-wellbeing" },
      { label: "Uniform", to: "/parents/uniform" },
      { label: "Admissions FAQs", to: "/admissions/faqs" },
    ],
  },
  "/parents/attendance": {
    title: "Attendance & Punctuality",
    eyebrow: "Parents",
    intro: "Being in school, on time, every day — when a child is well enough to attend.",
    status: "published",
    sections: [
      {
        heading: "Why attendance & punctuality matter",
        body: [
          "Regular attendance helps children settle, build friendships and make steady progress. A small number of missed days each term adds up over the years to significant lost learning time. Children who attend well usually feel more confident in class.",
          "The latest arrival time is 7:55 AM. Arriving on time means late arrivals do not miss the start-of-day routine, first lesson instructions and the settling time that makes the rest of the day calmer.",
        ],
      },
      {
        heading: "Reporting absence",
        body: [
          "If your child will be absent, notify the school line or the Head of School by 7:00 AM by call or text on every morning of absence, with a brief reason.",
          "If we have not heard by 7:00 AM we will usually call to check — this is a safeguarding routine, not a criticism. For prolonged or recurring absence, the school will work with you to support your child.",
          "Arrange routine medical appointments outside school hours or during holidays wherever possible. Leave during term is handled under the Attendance policy — please apply in writing rather than assuming leave will be granted.",
        ],
      },
    ],
    related: [
      { label: "Policies — Attendance", to: "/policies" },
      { label: "Health & Wellbeing", to: "/parents/health-wellbeing" },
      { label: "School Day", to: "/parents/school-day" },
    ],
  },
  "/parents/homework-reading": {
    title: "Homework & Reading",
    eyebrow: "Parents",
    intro: "Supporting learning at home without overwhelming family life.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Reading, homework & home support",
        body: [
          "Reading together at home is one of the most valuable things a family can do for a child. Even a few pages a day, shared regularly, builds vocabulary, imagination and the confidence that underpins every other subject.",
          "Homework expectations — type, frequency and typical duration — are confirmed by the school each year and communicated clearly to parents. Our principle: homework should be purposeful, not done for its own sake, and never take over family evenings or weekends.",
          "Small, consistent support works best: reading together, showing interest in the day's learning, a predictable place/time for homework, and praising effort as well as results. If homework repeatedly causes arguments, takes too long, or your child really struggles, tell the class teacher — we can adjust what is set or suggest a different approach.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Assessment & progress", to: "/learning/assessment" },
      { label: "Early Years learning", to: "/learning/early-years" },
      { label: "Parents' FAQs", to: "/parents" },
    ],
  },
  "/parents/health-wellbeing": {
    title: "Health & Wellbeing",
    eyebrow: "Parents",
    intro: "Care for the whole child — physically, emotionally and socially.",
    status: "published",
    sections: [
      {
        heading: "When your child is unwell",
        body: [
          "Please keep your child at home if they have a fever, vomiting, diarrhoea or any contagious illness.",
          "All staff share responsibility for every child's wellbeing. Any child who is unwell, hurt or upset is attended to promptly and parents contacted as appropriate.",
        ],
      },
      {
        heading: "Medication in school",
        body: [
          "Medication is administered only in exceptional circumstances, with prior written consent and approval from the Head of School.",
          "Please hand medicines (with instructions) directly to the office — never send them in a child's bag.",
        ],
      },
      {
        heading: "When a child is unhappy or anxious",
        body: [
          "Children sometimes have days or weeks when school is hard — new classes, new friendships, family changes at home, a small peer misunderstanding, or any number of other things can unsettle them in ways that are hard to put into words.",
          "Please come and talk to us early. Most things are straightforward when caught soon. Staff always take what you tell them seriously and respond with care.",
        ],
      },
    ],
    related: [
      { label: "Safeguarding", to: "/our-school/safeguarding" },
      { label: "School Meals", to: "/parents/meals" },
      { label: "Policies — Health & Medication", to: "/policies" },
    ],
  },

  "/contact": {
    title: "Contact Us",
    eyebrow: "Contact",
    intro:
      "Speak with the school office, send an enquiry, book a visit or find your way to Honeytots School.",
    status: "published",
    sections: [
      {
        heading: "We are glad to hear from you",
        body: [
          "The school office is the right first point of contact for most questions. If someone else is better placed to help, we pass your message on and confirm who is dealing with it and when to expect a reply.",
          "For admission questions, call or email the school office and we will route your message to the admissions team — both routes are monitored during opening hours.",
          "Being as specific as possible helps us route messages quickly. For example: a uniform question, fee query, or a concern about a child's wellbeing — telling us up front helps us respond properly the first time.",
        ],
        list: [
          "Address — " + schoolLocation.address,
          "Telephone — " + siteConfig.phone + ", " + siteConfig.phoneSecondary,
          "WhatsApp — " + siteConfig.whatsapp + ", " + siteConfig.whatsappSecondary,
          "Email — " + siteConfig.email,
          "Hours — " + siteConfig.openingHours,
          "Instagram — " + siteConfig.socialHandles.instagram,
          "Facebook — " + siteConfig.socialHandles.facebook,
        ],
      },
    ],
    related: [
      { label: "Send an Enquiry", to: "/contact/enquiry" },
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Find Us & Map", to: "/contact/find-us" },
    ],
  },
  "/contact/enquiry": {
    title: "Send an Enquiry",
    eyebrow: "Contact",
    intro: "Send a message to the Honeytots school office. We will respond during office hours.",
    sections: [
      {
        heading: "The enquiry form",
        body: [
          "Please complete the form below with as much detail as you are able. We read every message and respond to each one.",
          "If you would prefer to speak on the phone, call the school office during opening hours.",
        ],
      },
    ],
    related: [
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Contact Us", to: "/contact" },
      { label: "Find Us", to: "/contact/find-us" },
    ],
  },
  "/contact/find-us": {
    title: "Find Us",
    eyebrow: "Contact",
    intro: "Directions to Honeytots School.",
    status: "published",
    sections: [
      {
        heading: "Getting here",
        body: [
          "School address: " + schoolLocation.address + ".",
          "The embedded map and the Get Directions link both use this address. For booked visits the office confirms exact arrival instructions, parking (if driving), which entrance to use, and anything else you need to know in advance.",
          "Please do not arrive without an appointment if you wish to speak at length or tour — unscheduled visits are difficult to accommodate properly during the teaching day.",
          "School office hours: " + siteConfig.openingHours + ".",
        ],
      },
    ],
    related: [
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Contact Us", to: "/contact" },
      { label: "Send an Enquiry", to: "/contact/enquiry" },
    ],
  },

  "/news": {
    title: "News & Events",
    eyebrow: "Parents",
    intro: "Updates and stories from across the school.",
    sections: [
      {
        heading: "About school news",
        body: [
          "News is database-driven and will be managed from the school's admin area by trained, approved staff members. The current list below shares that same source, so the homepage and this page always show the same stories.",
          "Photographs of children are only published with written family consent, and children's full names are never used in gallery or news captions.",
        ],
      },
    ],
    related: [
      { label: "Calendar & Events", to: "/calendar" },
      { label: "Term Dates", to: "/parents/term-dates" },
      { label: "Contact the school", to: "/contact" },
    ],
  },
  "/calendar": {
    title: "Calendar & Events",
    eyebrow: "Parents",
    intro: "Upcoming events and important dates for the school community.",
    sections: [
      {
        heading: "How school events are published",
        body: [
          "Events are database-driven and managed from the admin area, and the list below shares that same source with the homepage. Parents are also notified of key dates through direct communication before each event.",
        ],
      },
    ],
    related: [
      { label: "Term Dates", to: "/parents/term-dates" },
      { label: "News & Updates", to: "/news" },
      { label: "School Day", to: "/parents/school-day" },
    ],
  },
  "/gallery": {
    title: "Gallery",
    eyebrow: "Our School",
    intro: "Life at Honeytots in pictures.",
    sections: [
      {
        heading: "No albums yet",
        body: [
          "Photo albums will appear here once the school's photographs are uploaded. All images of children require written media consent from parents or guardians before publication.",
          "Children's full names are never published in gallery captions. Descriptions are limited to the activity, year group or class where appropriate, and a short factual note.",
        ],
      },
    ],
    related: [
      { label: "News & Events", to: "/news" },
      { label: "Welcome to Honeytots", to: "/our-school/welcome" },
      { label: "Book a Visit", to: "/book-a-visit" },
    ],
  },
  "/policies": {
    title: "Policies & Downloads",
    eyebrow: "Parents",
    intro:
      "School documents families may need to read, download or refer back to during the academic year. This is the canonical policies page for downloads; a shorter overview is also available in the Our School section.",
    sections: [
      {
        heading: "Core school policies",
        body: [
          "The cards below list Honeytots' nine core policies for Phase 1 preview. Each card shows the policy name, short description, current status, and whether the wording has been signed off in writing by the school leadership.",
          "Once a policy is finalised, a PDF is uploaded to the policies folder and the Download policy button replaces the Document pending label.",
          "Safeguarding and Privacy are marked throughout as requiring final school approval. The remaining policies also carry awaiting-confirmation status but do not require the additional amber school-approval banner.",
          "If you need a policy in an alternative format — larger type, accessible PDF, plain text or another arrangement — please contact the school office. We will do our best to accommodate reasonable requests.",
        ],
      },
    ],
    related: [
      { label: "Our School Policies overview", to: "/our-school/policies" },
      { label: "Safeguarding", to: "/our-school/safeguarding" },
      { label: "Privacy Policy", to: "/privacy-policy" },
    ],
  },

  "/privacy-policy": {
    title: "Privacy Policy",
    intro: "How Honeytots School handles personal information.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our approach",
        body: [
          "We collect only the information needed to run the school, respond to enquiries, arrange visits and keep children safe. Information is stored securely, shared only with those who need it for their work, and kept no longer than necessary.",
          "This website is built with the Nigeria Data Protection Act and good international practice in mind. The full privacy notice — legal bases, retention periods, data categories, families' rights of access/correction/deletion, and any Data Protection Officer contact — will be published here once confirmed and signed off in writing by Honeytots leadership.",
          "Until the full notice is available, privacy concerns may be directed in writing to the school office, who will forward to the correct person.",
        ],
      },
      {
        heading: "Website data & school records",
        body: [
          "Contact and visit request forms collect a parent or guardian's name, contact details and any message. We do not knowingly collect sensitive information about children through public-facing forms on this website. If analytics cookies are ever enabled, visitors are clearly asked for consent before collection and the service is configured to protect privacy.",
          "The school holds additional personal information about enrolled children and families as part of normal operation — admissions records, health plans, attendance, reports and so on. The full privacy notice (once published) describes these categories, who within the school has access, and families' rights in relation to them.",
        ],
      },
    ],
    related: [
      { label: "Policies & Downloads", to: "/policies" },
      { label: "Cookie Policy", to: "/cookie-policy" },
      { label: "Safeguarding", to: "/our-school/safeguarding" },
    ],
  },
  "/cookie-policy": {
    title: "Cookie Policy",
    intro: "How this website uses cookies and similar small items of stored data.",
    sections: [
      {
        heading: "Necessary and optional cookies",
        body: [
          "Necessary cookies keep the website working properly (e.g. remembering a closed message or preventing duplicate form submissions). Necessary cookies are always active and do not require consent.",
          "Optional analytics cookies collect anonymous aggregate information about which pages visitors find helpful, to improve the site over time. Analytics is disabled by default during Phase 1 preview; when enabled, data collection begins only after a visitor explicitly accepts.",
          "At no point does this website use cookies or local storage for advertising purposes, or share visitor information with third-party advertising networks.",
        ],
      },
    ],
    related: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Accessibility", to: "/accessibility" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  "/accessibility": {
    title: "Accessibility",
    intro: "Our commitment to a website everyone can use.",
    sections: [
      {
        heading: "How we build for accessibility",
        body: [
          "This website is built to WCAG 2.2 AA standards: keyboard-accessible navigation, visible focus styles on every interactive element, clear heading structure, programmatically labelled forms, 24 colour-contrast pairs tested by the automated check suite, generous touch targets for fingers and styluses, and built-in support for reduced-motion operating-system settings.",
          "Colour-contrast verification is part of the standard test suite and runs on every proposed change. If a new component or colour combination fails the AA thresholds, it is not merged.",
          "If you have difficulty using any part of this website, please contact the school office so we can assist you directly and improve the site for other users at the same time. We take accessibility feedback seriously and follow up on every report.",
        ],
      },
    ],
    related: [
      { label: "Contact Us", to: "/contact" },
      { label: "Policies & Downloads", to: "/policies" },
      { label: "Sitemap", to: "/sitemap" },
    ],
  },
  "/sitemap": {
    title: "Sitemap",
    intro: "Every page on the Honeytots School website, organised by the main navigation sections.",
    sections: [
      {
        heading: "Full site index",
        body: [
          "The sitemap below is generated from the site's main navigation and shows every published page. If a page you expect is missing, please contact the school office and we will investigate.",
          "Main sections: Home · Our School · Learning · Admissions · Parents · Contact — each section links through to child pages via the top navigation, the mega menu, or the Explore quick-link grid shown on each landing page.",
        ],
        list: [
          "Home page — hero, welcome, learning stages, facilities, community, policies, contact CTA",
          "Our School — Welcome · About · Vision & Values · Staff · Facilities · Safeguarding · Policies · Gallery",
          "Learning — Early Years · Primary · Curriculum · Subjects · Assessment · Digital · Enrichment · Culture & Values",
          "Admissions — Overview · How to Apply · Entry Classes · Requirements · Fees · FAQs · Book a Visit",
          "Parents — School Day · Term Dates · Calendar · Uniform · Fees · Attendance · Homework · Health · Meals · Policies · News · Parent Portal",
          "Contact — Overview · Send an Enquiry · Find Us & Map · Book a Visit",
          "Legal & utility — Privacy · Cookies · Accessibility · Sitemap · Policies (canonical downloads)",
        ],
      },
    ],
    related: [
      { label: "Home", to: "/" },
      { label: "Our School", to: "/our-school" },
      { label: "Parents overview", to: "/parents" },
    ],
  },
  "/parent-portal": {
    title: "Parent Portal",
    eyebrow: "Parents",
    intro: "A secure space for families to access school updates, reports and notices.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Secure parent portal — coming soon",
        body: [
          "Honeytots families will soon have a dedicated sign-in area where you can view reports, term dates, notices and school updates directly from the office. Access is controlled with sign-in credentials issued to each enrolled family.",
          "Until launch, if you need to reach the school, send a message or request information, please contact the school office directly and we will respond promptly.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Contact the school", to: "/contact" },
      { label: "Term Dates", to: "/parents/term-dates" },
      { label: "Calendar & Events", to: "/calendar" },
    ],
  },
};
