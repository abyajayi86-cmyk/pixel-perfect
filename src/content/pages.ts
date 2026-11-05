/**
 * Editorial content for Phase One inner pages, organised around the
 * consolidated five-destination navigation:
 *
 *   HOME · OUR SCHOOL · ADMISSIONS · PARENTS · CONTACT
 *
 * The former Welcome/About/Vision/Staff/Facilities/Safeguarding pages and the
 * whole Learning section were merged into `/our-school`; the admissions
 * sub-pages into `/admissions`; meals into `/parents/school-day`; attendance,
 * health and homework into `/parents/attendance-wellbeing`; enquiry and
 * find-us into `/contact`; calendar and term dates into `/news`. Old copy was
 * carried across (summarised where it repeated) — no school facts were
 * invented or dropped. Old routes redirect to their new destinations.
 *
 * Every page that makes or implies factual claims about the school — staff
 * numbers, facilities, fees, term dates, age bands, curriculum affiliations,
 * etc. — keeps `awaitingConfirmation: true` (or `status:
 * "awaiting_confirmation"`) so an amber draft notice is shown at the top.
 *
 * Phase Two moves this registry into the `pages` / `page_sections` database
 * tables so the school edits it from /admin. Keep reads through `pageContent`
 * so the swap is a single-point change.
 */

import { schoolLocation, siteConfig } from "@/lib/site-config";
import {
  admissionsCms,
  classStructureCms,
  parentsCms,
  type ContentStatus,
} from "@/content/site-cms";
import type { FAQItem, JourneyStep } from "@/content/brand";

import welcomePortrait from "@/assets/honeytots-welcome-portrait.jpg.asset.json";
import { earlyYearsPhoto, primaryPhoto } from "@/content/school-photos";

export type PageSection = {
  heading: string;
  body: string[];
  /** Optional simple list rendered under the body. */
  list?: string[];
  /**
   * Stable anchor id for the section. When set, the section element carries
   * this id so in-page "on this page" links and redirects can jump straight
   * to it.
   */
  id?: string;
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
   * Position the learning-stage / brand-values tiles directly after the
   * section with this heading, instead of at the top of the content column.
   * Used by the consolidated Our School page so the decorations sit inside
   * the section they belong to.
   */
  stageCardsAfter?: string;
  valuesAfterSection?: string;
  /**
   * Optional lead image rendered at the top of the content column. `alt` is
   * read verbatim, so it must describe what the photo actually shows — never a
   * generic "image"/"photo". Inner pages stay complete and attractive without
   * one, so most pages leave this unset until the school supplies photography.
   */
  image?: { src: string; alt: string };
  /**
   * "On this page" anchor pills rendered at the top of long consolidated
   * pages, each jumping to the section with the matching `id`.
   */
  sectionAnchors?: Array<{ id: string; label: string }>;
  /**
   * Phase 6 reusable component hooks: plain-data arrays so CMS can populate
   * them later as scalar/relation tables in the admin without code changes.
   *   journeySteps → JourneySteps visual stepper component (rendered first)
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

/** Confirmed seven-step admissions process, shared by every admissions surface. */
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
  /* --------------------------------------------------------------------- */
  /* OUR SCHOOL — consolidated identity + learning destination              */
  /* --------------------------------------------------------------------- */
  "/our-school": {
    title: "Our School",
    eyebrow: "Our School",
    intro:
      "Honeytots is a Nursery and Primary school where every child is known by name — a small, warm community built on consistent routines and kind, clear expectations.",
    heroJourneyLine: true,
    status: "awaiting_confirmation",
    image: {
      src: welcomePortrait.url,
      alt: "A woman wearing glasses and a wide-brimmed hat at a Honeytots event",
    },
    valuesAfterSection: "Our Vision, Mission and Values",
    stageCardsAfter: "Our Classes and Learning Stages",
    sectionAnchors: [
      { id: "welcome", label: "Welcome" },
      { id: "about", label: "About" },
      { id: "vision-values", label: "Vision & Values" },
      { id: "learning", label: "Learning" },
      { id: "classes", label: "Classes" },
      { id: "activities", label: "Activities" },
      { id: "facilities", label: "Facilities" },
      { id: "staff", label: "Staff" },
      { id: "safeguarding", label: "Safeguarding" },
    ],
    sections: [
      {
        id: "welcome",
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
      {
        id: "about",
        heading: "About Our School",
        body: [
          "Established in 2006, Honeytots School is dedicated to benchmark early years and primary education.",
          "Honeytots offers Creche, Playgroup, Nursery and Primary education — a single, consistent path from a child's earliest years through to the end of Primary 6. Classes are organised by developmental stage, with staffing and routines suited to each age group.",
        ],
        list: [
          "Creche · Playgroup · Nursery · Primary",
          "Primary 1 – Primary 6",
          "Established 2006",
          "Fadeyi, Lagos",
        ],
      },
      {
        id: "vision-values",
        heading: "Our Vision, Mission and Values",
        body: [
          "Our vision: to be the benchmark for excellence in early years and primary education, inspiring confident learners, compassionate leaders and responsible global citizens who shape the future of Nigeria and beyond.",
          "Our mission: to nurture every child to reach their fullest potential by providing a safe, inclusive and inspiring learning environment where academic excellence, character development and lifelong curiosity flourish together.",
          "Our motto — Nurturing Excellent Leaders. We believe every child can develop the qualities of a good leader: listening, taking responsibility, doing their best, and helping others to do their best too.",
          "Our brand promise to families: " + siteConfig.tagline,
        ],
      },
      {
        id: "learning",
        heading: "Learning at Honeytots",
        body: [
          "We organise the school into two main stages — Early Years & Nursery, and Primary — with clear pathways for curriculum, subjects, assessment, enrichment, learning with technology, and the culture and values that run through everything.",
          "Honeytots follows a Nigerian & Montessori framework with blended international standards. Literacy, numeracy and good learning habits sit at the centre, with equal attention to the arts, sciences, languages, physical education and social learning. Termly timings, weekly structure and subject allocations are shared with families each term.",
          "The subject areas below are commonly taught in Nigerian Nursery and Primary schools. The school will confirm which subjects are offered at each phase and may add areas specific to the school's character and community.",
          "Teachers observe and assess children every day, so lessons match what each child needs and struggle — or readiness for more challenge — is noticed quickly. Each term, progress is shared with parents in writing and through a meeting.",
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
      {
        id: "classes",
        heading: "Our Classes and Learning Stages",
        body: [
          "Classes stay deliberately small so every child is known and supported. Group sizes and staffing for each stage are set by the school as follows.",
          "In Early Years, learning is built around play, talk, stories, songs and exploration, held together by gentle routines; our aim is for children to leave Early Years ready for Primary — confident, curious, and with strong early literacy and numeracy foundations.",
          "In Primary, each year group builds carefully on what came before. English and Mathematics receive dedicated daily time, Nigerian language teaching builds heritage connection and fluency, and children are taught to work independently and take growing responsibility for their own learning.",
          "Creche, Playgroup and Nursery — exact age bands and transitions are confirmed by the school before each entry round. Primary 6 supports transition into the next phase, whatever that looks like for each family.",
          CONFIRM,
        ],
        list: classStructure,
      },
      {
        id: "activities",
        heading: "Learning Experiences and Activities",
        body: [
          "Clubs and enrichment give children the chance to discover new interests, make friends across year groups, and develop talents beyond the timetable. Specific clubs, eligible year groups and days are published each term once staffing is confirmed.",
          "Planned visits, visitors to school, celebrations of Nigerian culture and heritage, and regular themed assemblies broaden children's experience and make learning memorable.",
          "Children learn about Nigerian history, languages, arts and community life, and about their responsibilities as citizens of their local community, their state and their country. Values are practised through classroom jobs, caring for the school environment, listening to other people's points of view, and contributing to a school where everyone can belong.",
          "Early, guided experience of digital tools supports learning when used well — technology never replaces the teacher, the book, or the hand-written page. Alongside practical skills, children learn safe, responsible and kind use of digital spaces, revisited regularly.",
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
      {
        id: "facilities",
        heading: "Our Learning Environment and Facilities",
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
      {
        id: "staff",
        heading: "Leadership and Staff",
        body: [
          "Mrs. Odunsi — Head of Operations / Authorized Contact at Honeytots School.",
          "Please contact the school office during opening hours, " +
            siteConfig.openingHours +
            ", and we will route your message to the right person.",
          "Photographs, names, roles and short biographies for the leadership team and teaching staff will be published here once supplied by the school.",
          CONFIRM,
        ],
      },
      {
        id: "safeguarding",
        heading: "Keeping Children Safe",
        body: [
          "Honeytots is committed to a safe environment where every child is protected from harm and treated with dignity. Safeguarding is the responsibility of every adult in our community — leadership, teachers, support staff, volunteers and contractors.",
          "All staff receive safeguarding training and safer-recruitment checks are completed for every adult working regularly with children.",
          "If you have a concern about a child's safety or wellbeing — your own child or another — please contact the school office. Please do not investigate a concern yourself; our designated safeguarding lead is trained to handle these situations properly and involve the right agencies. All concerns are taken seriously, handled confidentially and followed up.",
          "Named safeguarding leads, reporting routes, whistleblowing procedures and the full child protection policy will be published here once signed off in writing by Honeytots leadership.",
          CONFIRM,
        ],
        list: [
          "Age-appropriate safety teaching (personal, online, relationships)",
          "Trained designated safeguarding lead and deputy",
          "Confidential, serious handling of every concern",
          "Clear reporting and follow-up for families",
        ],
      },
    ],
    related: [
      { label: "Photo Gallery", to: "/gallery" },
      { label: "News & Events", to: "/news" },
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Admissions", to: "/admissions" },
      { label: "Parent Information", to: "/parents" },
    ],
  },

  /* --------------------------------------------------------------------- */
  /* ADMISSIONS — one consolidated conversion page                          */
  /* --------------------------------------------------------------------- */
  "/admissions": {
    title: "Admissions",
    eyebrow: "Admissions",
    intro:
      "Choosing the right school is an important decision. This page brings together everything families need to learn about Honeytots, arrange a visit and understand the next steps.",
    heroJourneyLine: true,
    status: "awaiting_confirmation",
    journeySteps: admissionsProcess,
    sectionAnchors: [
      { id: "classes", label: "Classes" },
      { id: "how-to-apply", label: "How to Apply" },
      { id: "requirements", label: "Requirements" },
      { id: "fees", label: "Fees" },
      { id: "faqs", label: "FAQs" },
    ],
    sections: [
      {
        id: "classes",
        heading: "Classes Available",
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
      {
        id: "how-to-apply",
        heading: "How to Apply",
        body: [
          "Applications begin with an enquiry or a school visit. Our admissions team guides you through the process, tells you exactly which documents are required, and supports you at each step.",
          "Places are offered subject to availability, so we encourage families to enquire early. Nothing replaces a school visit — we strongly recommend coming to see the school in session before making a final decision.",
          "Once an application is complete, the school confirms next steps and expected timescales in writing. When a place is offered, you receive everything you need for your child's first day: uniform information, timings, settling-in arrangements and onboarding details.",
          "A full online application system will be added in a later phase so families can complete the process online if they prefer.",
        ],
        list: admissionsProcess.map((step, index) => `${index + 1}. ${step.title} — ${step.text}`),
      },
      {
        id: "requirements",
        heading: "Admission Requirements",
        body: [
          "Every application needs the five documents listed below. Your application checklist is confirmed in writing once you begin the process.",
          "The more we know about your child before they start — interests, friendships, medical needs, things they find hard, things they love — the better we can care for them and plan support. Please share honestly — we are here to help, not judge.",
        ],
        list: requiredDocuments,
      },
      {
        id: "fees",
        heading: "School Fees and Enquiries",
        body: [
          "Honeytots does not publish fee amounts on this website. Please contact the administration team directly for the current fee schedule — tuition, deposits, and any extras such as meals, uniforms or learning materials.",
          "Instalment plans are available by special arrangement. Please speak with the administration team about what would work for your family before accepting a place.",
          "Questions about what is included, how billing works, and any other payment questions are all answered before a family accepts a place.",
        ],
      },
      {
        heading: "About these questions",
        body: [
          "The questions and answers below are the ones families most often ask while considering Honeytots. They are written as general guidance for the Phase 1 preview and do not replace the final, signed-off admissions process. When something depends on school confirmation, the panel below each answer says so clearly.",
          "Questions about uniform, meals and allergies, or how parents are told about a child's progress are answered in the Parents section of the website. See the links at the bottom of this page.",
          CONFIRM,
        ],
      },
    ],
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
    related: [
      { label: "Book a Visit", to: "/book-a-visit" },
      { label: "Ask Honeytots", to: "/ask" },
      { label: "Contact Us", to: "/contact" },
      { label: "Parent Information", to: "/parents" },
    ],
  },

  /* --------------------------------------------------------------------- */
  /* PARENTS — landing page + three supporting subpages                     */
  /* --------------------------------------------------------------------- */
  "/parents": {
    title: "Parent Information",
    eyebrow: "Parents",
    intro:
      "Practical, everyday information for Honeytots families — three quick pages with what you need, when you need it.",
    heroJourneyLine: true,
    sections: [
      {
        heading: "Three pages for everyday questions",
        body: [
          "School Day covers the daily timetable, food and drink, drop-off and collection, and everyday routines. Uniform sets out what children wear each day, including the Friday sports kit and grooming, jewellery and labelling guidance. Attendance & Wellbeing brings together punctuality, absence reporting, health, medication and homework & reading.",
          "Term dates sit with the school's News & Events, and the canonical Policies & Downloads page holds the documents families may need to read or download. If there is something you use regularly and it is missing, please tell the school office so we can improve these pages.",
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
      { label: "Policies & Downloads", to: "/policies" },
      { label: "News & Events", to: "/news" },
      { label: "Parent Portal", to: "/parent-portal" },
    ],
  },
  "/parents/school-day": {
    title: "School Day",
    eyebrow: "Parents",
    intro: "Times, routines, food and everyday school information.",
    status: "published",
    sectionAnchors: [
      { id: "schedule", label: "Daily schedule" },
      { id: "arrivals", label: "Arrivals" },
      { id: "food", label: "Food & drink" },
    ],
    sections: [
      {
        id: "schedule",
        heading: "The daily schedule",
        body: [...schoolDayNotes, "School office hours: " + siteConfig.openingHours + "."],
        list: schoolDayList,
      },
      {
        id: "arrivals",
        heading: "Arrivals, dismissals & after-school",
        body: [
          "Calm starts and finishes make a real difference. Staff are visible to support transitions and answer parent questions. For safeguarding, only authorised adults collect a child — any changes must be notified to the office in advance.",
          "In Early Years the day balances play, stories, songs, movement and rest, with gentle routines. In Primary the day is more structured with daily literacy and numeracy, varied subjects, valued break times and calm finishes.",
          "After-school activities and wrap-around care options are confirmed each term.",
        ],
      },
      {
        id: "food",
        heading: "Food and drink during the school day",
        body: [
          "Children bring a packed lunchbox from home. A simple, balanced lunchbox keeps energy steady through the afternoon and avoids food waste.",
          "All dietary needs — allergies, intolerances, medical diets, and religious or cultural food requirements — are taken seriously. Share these during admission and update the office whenever there is a change.",
          "If you are worried about a specific need, please raise it with the school before your child starts rather than assuming it will be covered.",
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
    ],
    related: [
      { label: "Uniform", to: "/parents/uniform" },
      { label: "Attendance & Wellbeing", to: "/parents/attendance-wellbeing" },
      { label: "News & Events", to: "/news" },
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
      { label: "Attendance & Wellbeing", to: "/parents/attendance-wellbeing" },
      { label: "Admissions", to: "/admissions" },
    ],
  },
  "/parents/attendance-wellbeing": {
    title: "Attendance & Wellbeing",
    eyebrow: "Parents",
    intro:
      "Being in school, on time, every day — and care for the whole child, physically, emotionally and socially.",
    status: "awaiting_confirmation",
    sectionAnchors: [
      { id: "attendance", label: "Attendance" },
      { id: "absence", label: "Absence" },
      { id: "health", label: "Health" },
      { id: "homework", label: "Homework" },
    ],
    sections: [
      {
        id: "attendance",
        heading: "Why attendance & punctuality matter",
        body: [
          "Regular attendance helps children settle, build friendships and make steady progress. A small number of missed days each term adds up over the years to significant lost learning time. Children who attend well usually feel more confident in class.",
          "The latest arrival time is 7:55 AM. Arriving on time means late arrivals do not miss the start-of-day routine, first lesson instructions and the settling time that makes the rest of the day calmer.",
        ],
      },
      {
        id: "absence",
        heading: "Reporting absence",
        body: [
          "If your child will be absent, notify the school line or the Head of School by 7:00 AM by call or text on every morning of absence, with a brief reason.",
          "If we have not heard by 7:00 AM we will usually call to check — this is a safeguarding routine, not a criticism. For prolonged or recurring absence, the school will work with you to support your child.",
          "Arrange routine medical appointments outside school hours or during holidays wherever possible. Leave during term is handled under the Attendance policy — please apply in writing rather than assuming leave will be granted.",
        ],
      },
      {
        id: "health",
        heading: "Health & wellbeing",
        body: [
          "Please keep your child at home if they have a fever, vomiting, diarrhoea or any contagious illness.",
          "All staff share responsibility for every child's wellbeing. Any child who is unwell, hurt or upset is attended to promptly and parents contacted as appropriate.",
          "Medication is administered only in exceptional circumstances, with prior written consent and approval from the Head of School. Please hand medicines (with instructions) directly to the office — never send them in a child's bag.",
          "Children sometimes have days or weeks when school is hard — new classes, new friendships, family changes at home, a small peer misunderstanding, or any number of other things can unsettle them in ways that are hard to put into words.",
          "Please come and talk to us early. Most things are straightforward when caught soon. Staff always take what you tell them seriously and respond with care.",
        ],
      },
      {
        id: "homework",
        heading: "Homework & reading",
        body: [
          "Reading together at home is one of the most valuable things a family can do for a child. Even a few pages a day, shared regularly, builds vocabulary, imagination and the confidence that underpins every other subject.",
          "Homework expectations — type, frequency and typical duration — are confirmed by the school each year and communicated clearly to parents. Our principle: homework should be purposeful, not done for its own sake, and never take over family evenings or weekends.",
          "Small, consistent support works best: reading together, showing interest in the day's learning, a predictable place/time for homework, and praising effort as well as results. If homework repeatedly causes arguments, takes too long, or your child really struggles, tell the class teacher — we can adjust what is set or suggest a different approach.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "School Day", to: "/parents/school-day" },
      { label: "Policies & Downloads", to: "/policies" },
      { label: "Contact Us", to: "/contact" },
    ],
  },

  /* --------------------------------------------------------------------- */
  /* CONTACT — one consolidated destination (form + map live on the route)  */
  /* --------------------------------------------------------------------- */
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
      {
        heading: "The enquiry form",
        body: [
          "The enquiry form below reaches the school office directly. Please complete it with as much detail as you are able; we read every message and respond during office hours.",
          "If you would prefer to speak on the phone, call the school office during opening hours.",
        ],
      },
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
      { label: "Admissions", to: "/admissions" },
      { label: "Ask Honeytots", to: "/ask" },
    ],
  },

  /* --------------------------------------------------------------------- */
  /* SUPPORTING PAGES                                                       */
  /* --------------------------------------------------------------------- */
  "/news": {
    title: "News & Events",
    eyebrow: "Parents",
    intro: "Updates, upcoming events and important dates from across the school.",
    sections: [
      {
        heading: "About school news",
        body: [
          "News is database-driven and will be managed from the school's admin area by trained, approved staff members. The list below shares that same source, so the homepage and this page always show the same stories.",
          "Photographs of children are only published with written family consent, and children's full names are never used in gallery or news captions.",
        ],
      },
      {
        heading: "Term dates",
        body: [
          "Term dates, INSET days and planned closures for the current and following session will be published here once confirmed by school leadership. Key dates also appear in the events list on this page.",
          "Before publication, please enquire with the school office directly for up-to-date dates when planning travel or other commitments.",
          CONFIRM,
        ],
      },
    ],
    related: [
      { label: "School Day", to: "/parents/school-day" },
      { label: "Parent Information", to: "/parents" },
      { label: "Contact the school", to: "/contact" },
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
      { label: "Our School", to: "/our-school" },
      { label: "News & Events", to: "/news" },
      { label: "Book a Visit", to: "/book-a-visit" },
    ],
  },
  "/policies": {
    title: "Policies & Downloads",
    eyebrow: "Parents",
    intro:
      "School documents families may need to read, download or refer back to during the academic year. This is the canonical policies page for the whole website.",
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
      { label: "Our School", to: "/our-school" },
      { label: "Parent Information", to: "/parents" },
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
      { label: "Our School", to: "/our-school" },
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
          "Main sections: Home · Our School · Admissions · Parents · Contact — supporting pages such as News & Events, Gallery, Policies & Downloads, Book a Visit and Ask Honeytots are reached through page content, the footer and the parent quick links.",
        ],
        list: [
          "Home page — hero, welcome, learning stages, community, useful links, news, events, location, contact CTA",
          "Our School — one page: Welcome · About · Vision & Values · Learning · Classes · Activities · Facilities · Staff · Safeguarding · Gallery preview",
          "Admissions — one page: Classes Available · How to Apply · Requirements · Fees · FAQs · Book a Visit",
          "Parents — Parent Information + School Day · Uniform · Attendance & Wellbeing · Policies & Downloads",
          "Contact — one page: contact details · enquiry form · map & directions · Book a Visit",
          "Supporting — News & Events (news, events, term dates) · Gallery · Policies & Downloads · Parent Portal",
          "Legal & utility — Privacy · Cookies · Accessibility · Sitemap · Ask Honeytots",
        ],
      },
    ],
    related: [
      { label: "Home", to: "/" },
      { label: "Our School", to: "/our-school" },
      { label: "Parent Information", to: "/parents" },
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
      { label: "News & Events", to: "/news" },
      { label: "School Day", to: "/parents/school-day" },
    ],
  },
};

/* Early Years / Primary stage photography, kept for the consolidated Our School
 * page's learning-stage cards (see `stageCardsAfter`). */
export const stagePhotos = { earlyYearsPhoto, primaryPhoto };
