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

import { schoolLocation } from "@/lib/site-config";
import type { ContentStatus } from "@/content/site-cms";
import type { FAQItem, JourneyStep } from "@/content/brand";

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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Welcome to Honeytots",
        body: [
          "Thank you for considering Honeytots for your child. We believe children learn best when they feel safe, valued and genuinely encouraged — and we work closely with families so each child settles well, understands what is expected, and makes steady, happy progress.",
          "Our motto — Nurturing excellent leaders — describes what we hope for every child: confidence, a love of learning, and kindness to others.",
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
    intro: "Who we are, the stages we provide, and the approach that runs through the school.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "The school, briefly",
        body: [
          "Honeytots provides Creche, Playgroup, Nursery and Primary education in Nigeria, supporting children from their earliest years through to the end of Primary 6.",
          "Classes are organised by developmental stage, with staffing and routines suited to each age group. Our approach is consistent across the school: high expectations, warm relationships, and calm, well-ordered classrooms.",
          CONFIRM,
        ],
        list: [
          "Creche · Playgroup · Nursery",
          "Primary 1 – Primary 6",
          "Staffing ratios — awaiting confirmation",
          "Class sizes — awaiting confirmation",
        ],
      },
    ],
    related: [
      { label: "Daily routines", to: "/parents/school-day" },
      { label: "Entry classes & ages", to: "/admissions/entry-guide" },
      { label: "Early Years learning", to: "/learning/early-years" },
    ],
  },
  "/our-school/vision-values": {
    title: "Vision, Mission & Values",
    eyebrow: "Our School",
    intro: "The principles that shape teaching, care and school life at Honeytots.",
    awaitingConfirmation: true,
    heroJourneyLine: true,
    brandValuesTiles: true,
    sections: [
      {
        heading: "Our direction",
        body: [
          "The six values below are taken from the Honeytots brand board. They describe the kind of community we try to be every day, and the character we hope every child grows into. Full vision and mission statements will be published here once confirmed by the school leadership. Final wording remains under school review.",
          CONFIRM,
        ],
        list: [
          "Excellence — every child can do their best",
          "Nurturing — warmth, care and safety first",
          "Integrity — honest, consistent, trustworthy",
          "Compassion — we look out for each other",
          "Growth — small steps build big progress",
          "Leadership — confident leaders, from the earliest years",
        ],
      },
      {
        heading: "Our motto",
        body: [
          "Nurturing excellent leaders. We believe every child can develop the qualities of a good leader: listening, taking responsibility, doing their best, and helping others to do their best too.",
        ],
      },
    ],
    related: [
      { label: "Culture in learning", to: "/learning/culture-values" },
      { label: "Safeguarding", to: "/our-school/safeguarding" },
      { label: "Welcome from leadership", to: "/our-school/welcome" },
    ],
  },
  "/our-school/staff": {
    title: "Leadership & Staff",
    eyebrow: "Our School",
    intro: "The team who teach, care for and support our children.",
    awaitingConfirmation: true,
    sections: [
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
          "Primary 6 supports transition into the next phase, whatever that looks like for each family. Where children prepare for common entrance or external examinations, planning begins well in advance and parents are kept closely informed.",
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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "A balanced framework",
        body: [
          "Literacy, numeracy and good learning habits sit at the centre, with equal attention to the arts, sciences, languages, physical education and social learning.",
          "The specific curriculum model Honeytots adopts, any external affiliations, and full term-by-term long-term plans are for the school leadership to confirm and publish. Termly timings, weekly structure and subject allocations are confirmed with families each term.",
          CONFIRM,
        ],
        list: [
          "Early Years — play-based with 7 areas of learning",
          "Primary — daily literacy & numeracy + broad subject base",
          "Nigerian heritage, culture & language across all stages",
          "Calm starts, valued breaks, well-paced active learning",
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
    journeySteps: [
      {
        title: "Explore Honeytots",
        text: "Read about our school, the learning stages, and daily life to see if Honeytots is the right fit for your family.",
      },
      {
        title: "Book a visit",
        text: "Meet the team, see the children in session, walk around the classrooms and play areas, and ask all your questions.",
      },
      {
        title: "Check entry requirements",
        text: "Confirm the right class for your child's age and readiness, and the documents we will need to start the process.",
      },
      {
        title: "Contact admissions",
        text: "Our admissions team guides you through next steps, expected timelines, and anything else you need to start with confidence.",
      },
    ],
    sections: [
      {
        heading: "Your admissions journey",
        body: [
          "Every family's journey to Honeytots is slightly different, but the four steps above are a good outline of what to expect from first contact through to your child starting with us.",
          "Nothing replaces a school visit. We strongly encourage you to come and see the school in session before making a final decision.",
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
    awaitingConfirmation: true,
    heroJourneyLine: true,
    sections: [
      {
        heading: "Applying to Honeytots",
        body: [
          "During Phase 1 preview, applications begin with an enquiry or a school visit. Our admissions team guides you through the process, tells you exactly what documents are required, and supports you at each step.",
          "A full online application system will be added in a later phase so families can complete the process online if they prefer.",
          CONFIRM,
        ],
      },
      {
        heading: "Process & after application",
        body: [
          "We keep the process clear and honest — clear timelines, open communication, no last-minute surprises. If you are unsure about any step, send a message or call the school office.",
          "Once an application is complete, the school confirms next steps and expected timescales in writing. When a place is offered, you receive a first-day pack: uniform info, timings, settling-in arrangements, and anything else you need.",
        ],
      },
    ],
    related: [
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Admission Requirements", to: "/admissions/requirements" },
      { label: "Entry Classes & Ages", to: "/admissions/entry-guide" },
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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Supporting documents & requirements",
        body: [
          "Requirements vary slightly by class. The list below is a typical guide while Honeytots finalises its published schedule. Your application checklist is confirmed in writing once you begin the process.",
          "The more we know about your child before they start — interests, friendships, medical needs, things they find hard, things they love — the better we can care for them and plan support. Please share honestly — we are here to help, not judge.",
          CONFIRM,
        ],
        list: [
          "Completed & signed admission form",
          "Child's birth certificate or age declaration",
          "Immunisation / health records",
          "Recent child passport photographs",
          "Previous school reports (transferring)",
          "Head-teacher reference (where required)",
          "Parent / guardian ID",
          "Proof of address (as required)",
          "Medical / learning needs — handled confidentially",
        ],
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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Fees",
        body: [
          "Honeytots does not publish fee amounts on this website until they are confirmed in writing by school leadership — this avoids families seeing figures that later change and ensures every enquirer receives consistent, up-to-date information.",
          "For the current fee schedule — tuition, deposits, and any extras (meals, transport, uniforms or learning materials) — contact the admissions team directly. They confirm what is included, what is paid separately, and any payment plans or instalment options available. Questions about what is included, how billing works, and what happens on mid-term leave are all answered before a family accepts a place.",
          CONFIRM,
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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Times & routines",
        body: [
          "Arrival, registration, lesson blocks, break, lunch, assembly and closing times are confirmed by the school each term and published to families. Families joining before the website schedule is live receive this information directly from the office.",
          "In Early Years the day balances play, stories, songs, movement and rest, with gentle routines. In Primary the day is more structured with daily literacy and numeracy, varied subjects, valued break times and calm finishes.",
          CONFIRM,
        ],
      },
      {
        heading: "Arrivals, dismissals & after-school",
        body: [
          "Calm starts and finishes make a real difference. Staff are visible to support transitions and answer parent questions. For safeguarding, only authorised adults collect a child — any changes must be notified to the office in advance.",
          "Assembly themes, break and lunch arrangements, after-school activities and wrap-around care options are confirmed each term.",
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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Uniform guidance",
        body: [
          "A simple, clearly defined uniform helps children focus on learning, removes small comparisons and gives families a predictable morning routine. Uniform items, sports/PE kit and purchase locations will be published here once confirmed by the school.",
          "The school aims to keep uniform affordable and allow families reasonable flexibility on sourcing, within the clear guidelines issued.",
          CONFIRM,
        ],
      },
      {
        heading: "Appearance & lost property",
        body: [
          "Hair, jewellery and personal item guidelines are written with simplicity, common sense and respect for cultural and religious needs, and apply consistently across the school community.",
          "Please name every item of uniform and kit — named items almost always find their way back. Unnamed jumpers, water bottles and shoes are particularly difficult to return.",
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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Meals, snacks & hydration",
        body: [
          "Nutritious meals and snacks support steady energy and good learning. Honeytots will confirm full meal and snack arrangements — Early Years, Primary and packed-lunch guidance — before the next session begins.",
          "Children are encouraged to drink water throughout the day. Most families find a named, durable water bottle is the simplest approach.",
          CONFIRM,
        ],
      },
      {
        heading: "Dietary needs, allergies & faith",
        body: [
          "All dietary needs — allergies, intolerances, medical diets, and religious or cultural food requirements — are taken seriously. Share these during admission and update the office whenever there is a change. Staff are briefed and plans are in place so every child can eat safely.",
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
    sections: [
      {
        heading: "Why attendance & punctuality matter",
        body: [
          "Regular attendance helps children settle, build friendships and make steady progress. A small number of missed days each term adds up over the years to significant lost learning time. Children who attend well usually feel more confident in class.",
          "Arriving on time matters — late arrivals miss the start-of-day routine, first lesson instructions and the settling time that makes the rest of the day calmer.",
        ],
      },
      {
        heading: "Reporting absence & requests",
        body: [
          "Tell the school office as early as possible on the first morning of absence, with a brief reason. If we have not heard by mid-morning we will usually call to check — this is a safeguarding routine, not a criticism. For prolonged or recurring absence, the school will work with you to support your child.",
          "Arrange routine medical appointments outside school hours or during holidays wherever possible. Leave-during-term requests are handled under the Attendance policy — please apply in writing rather than assuming leave will be granted.",
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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Health arrangements in school",
        body: [
          "First aid, medication administration, handling illness during the day, isolation spaces and pastoral support arrangements are all published here once confirmed by the school leadership.",
          "All staff share responsibility for every child's wellbeing. Any child who is unwell, hurt or upset is attended to promptly and parents contacted as appropriate.",
          "Families sometimes need medication administered during the day. A clear written policy covers this; parents complete a consent form each time. Please hand medicines (with instructions) directly to the office — never send them in a child's bag.",
          CONFIRM,
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
    sections: [
      {
        heading: "We are glad to hear from you",
        body: [
          "The school office is the right first point of contact for most questions. If someone else is better placed to help, we pass your message on and confirm who is dealing with it and when to expect a reply.",
          "For admission questions you are also welcome to reach the admissions inbox directly — both routes are monitored during office hours.",
          "Being as specific as possible helps us route messages quickly. For example: a uniform question, fee query, or a concern about a child's wellbeing — telling us up front helps us respond properly the first time.",
        ],
        list: [
          "General enquiries → school office",
          "Admissions → admissions inbox",
          "Safeguarding concerns → designated lead (via office)",
          "Tours & visits → Book a Visit form",
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
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Getting here",
        body: [
          "For website preview we are working with a provisional address. Honeytots has not yet confirmed this as its permanent location; the final site may differ. Please confirm travel arrangements directly with the school office before a visit.",
          "Current working address: " + schoolLocation.address + ".",
          "An embedded map preview and Get Directions link use this provisional address. Both update automatically once the permanent site is confirmed.",
          "For booked visits the office confirms exact arrival instructions, parking (if driving), which entrance to use, and anything else you need to know in advance. Please do not arrive without an appointment if you wish to speak at length or tour — unscheduled visits are difficult to accommodate properly during the teaching day.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Contact Us", to: "/contact" },
      { label: "Contact info", to: "/contact/enquiry" },
    ],
  },

  "/news": {
    title: "News & Events",
    eyebrow: "Parents",
    intro: "Updates and stories from across the school.",
    sections: [
      {
        heading: "No news articles yet",
        body: [
          "School news will appear here once published. News is database-driven and will be managed from the school's admin area by trained, approved staff members.",
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
        heading: "No events listed yet",
        body: [
          "Upcoming events will appear here once published by the school. Events are database-driven and managed from the admin area. Parents are also notified of key dates through direct communication before each event.",
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
