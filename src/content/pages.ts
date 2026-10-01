/**
 * Draft editorial content for Phase One inner pages.
 *
 * Every string here is replaceable placeholder copy written for review — no
 * school-specific facts are asserted. Phase Two moves this registry into the
 * `pages` / `page_sections` tables so the school edits it from /admin.
 */

import { schoolLocation } from "@/lib/site-config";

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
  /** Shown as an amber notice: content awaiting school confirmation. */
  awaitingConfirmation?: boolean;
};

const CONFIRM =
  "Information on this page will be updated following confirmation from Honeytots School.";

export const pageContent: Record<string, PageContent> = {
  "/our-school": {
    title: "Our School",
    eyebrow: "Our School",
    intro:
      "Honeytots is a Nursery and Primary school where children are known as individuals and supported to grow in confidence, kindness and curiosity.",
    sections: [
      {
        heading: "A caring school community",
        body: [
          "Our school brings together children, families and staff in a warm and orderly environment. Everything we do is designed around the wellbeing and progress of each child.",
          "Use the pages in this section to learn about our people, our values, our facilities and the way we keep children safe.",
        ],
      },
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
          "Thank you for taking the time to learn about our school. Choosing where your child begins their education is an important decision, and we are glad you are considering Honeytots.",
          "We believe children learn best when they feel safe, valued and encouraged. Our staff work closely with families so that every child settles well and makes steady progress.",
          CONFIRM,
        ],
      },
    ],
  },
  "/our-school/about": {
    title: "About Honeytots",
    eyebrow: "Our School",
    intro: "Who we are and how our Nursery and Primary school works day to day.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our school at a glance",
        body: [
          "Honeytots provides Creche, Playgroup, Nursery and Primary education in Nigeria, supporting children from their earliest years through to the end of Primary 6.",
          CONFIRM,
        ],
        list: [
          "Creche, Playgroup and Nursery classes",
          "Primary 1 to Primary 6",
          "Class sizes and staffing details awaiting confirmation",
          "Session structure awaiting confirmation",
        ],
      },
    ],
  },
  "/our-school/vision-values": {
    title: "Vision, Mission & Values",
    eyebrow: "Our School",
    intro: "The principles that shape teaching, care and school life at Honeytots.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "What we stand for",
        body: [
          "Our draft values describe the character we hope to nurture in every child. The school's final vision and mission statements will replace this text once confirmed.",
        ],
        list: [
          "Kindness — we treat one another with respect",
          "Curiosity — we ask questions and explore",
          "Confidence — we try, and we try again",
          "Community — we learn alongside our families",
        ],
      },
    ],
  },
  "/our-school/staff": {
    title: "Leadership & Staff",
    eyebrow: "Our School",
    intro: "The team who teach, care for and support our children.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our team",
        body: [
          "Staff profiles — photograph, name, role and a short biography — will be published here once supplied by the school.",
          "From Phase One onwards this page is designed to be managed from the school's admin area, so profiles can be added, reordered and updated without a developer.",
        ],
      },
    ],
  },
  "/our-school/facilities": {
    title: "Our Facilities",
    eyebrow: "Our School",
    intro: "The spaces where our children learn, play and grow.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Learning spaces",
        body: [
          "Descriptions and photographs of the school's classrooms, play areas and specialist spaces will be published here once confirmed.",
          CONFIRM,
        ],
      },
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
          "Honeytots is committed to providing a safe environment in which every child is protected from harm and treated with dignity.",
          "The school's safeguarding lead, reporting routes and full child protection policy will be published here once confirmed by the school.",
        ],
      },
      {
        heading: "Raising a concern",
        body: [
          "If you have a concern about a child's safety, please contact the school office using the details on our contact page. Concerns are taken seriously and handled confidentially.",
        ],
      },
    ],
  },
  "/our-school/policies": {
    title: "School Policies",
    eyebrow: "Our School",
    intro: "Policies that explain how the school is run and what families can expect.",
    sections: [
      {
        heading: "Policy documents",
        body: [
          "Policy documents will be published in the downloads area once supplied by the school. No policy documents are currently available to download.",
        ],
      },
    ],
  },

  "/learning": {
    title: "Learning at Honeytots",
    eyebrow: "Learning",
    intro:
      "Learning at Honeytots is designed to build strong foundations while encouraging curiosity, creativity, character and confidence.",
    sections: [
      {
        heading: "Learning that fits the child",
        body: [
          "Our Early Years classes learn largely through play, conversation and hands-on discovery. As children move into Primary, learning becomes more structured while remaining active and engaging.",
          "Teachers plan for the range of learners in every class, so that children who need more support and children ready for greater challenge are both well served.",
        ],
      },
    ],
  },
  "/learning/early-years": {
    title: "Early Years / Nursery",
    eyebrow: "Learning",
    intro: "Playful, purposeful learning for our youngest children.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "How our youngest children learn",
        body: [
          "Early Years learning at Honeytots is built around play, talk, stories, songs and exploration, with gentle routines that help children feel secure.",
        ],
        list: [
          "Communication and language",
          "Early literacy and early numeracy",
          "Physical development",
          "Social and emotional development",
          "Creativity and expression",
          "Health habits and cultural awareness",
          "School readiness",
        ],
      },
      {
        heading: "Classes offered",
        body: [
          "Our Early Years classes are Creche, Playgroup and Nursery, with age bands to be confirmed by the school.",
        ],
      },
    ],
  },
  "/learning/primary": {
    title: "Primary School",
    eyebrow: "Learning",
    intro: "Primary 1 to Primary 6: building knowledge, skills and independence.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Primary 1 to Primary 6",
        body: [
          "In Primary, children build secure literacy and numeracy alongside science, technology, the arts, and social and citizenship learning.",
          "Teachers encourage children to work independently and collaboratively, and to take growing responsibility for their own learning.",
        ],
        list: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
      },
    ],
  },
  "/learning/curriculum": {
    title: "Curriculum",
    eyebrow: "Learning",
    intro: "How learning is organised across the school.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Our curriculum framework",
        body: [
          "Curriculum information will be updated following confirmation from Honeytots School. We will not describe a curriculum model the school has not confirmed.",
          "The website is built so that curriculum pages, subject lists and stage descriptions can be edited by the school at any time.",
        ],
      },
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
          "The list below shows subject areas commonly taught in Nigerian Nursery and Primary schools. The school will confirm which of these Honeytots offers, and may add its own.",
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
        ],
      },
    ],
  },
  "/learning/assessment": {
    title: "Assessment",
    eyebrow: "Learning",
    intro: "How we follow and share each child's progress.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Following progress",
        body: [
          "Details of continuous assessment, examinations and reporting to parents will be published here once confirmed by the school.",
          CONFIRM,
        ],
      },
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
          "Children benefit from early, guided experience of digital tools alongside clear teaching about safe and responsible use.",
          "The school's ICT facilities and programme details will be confirmed before publication.",
        ],
      },
    ],
  },
  "/learning/enrichment": {
    title: "Enrichment & Clubs",
    eyebrow: "Learning",
    intro: "Learning that continues beyond the classroom.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Clubs and activities",
        body: [
          "Clubs, activities and enrichment opportunities will be listed here once confirmed by the school.",
        ],
      },
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
          "Children learn about Nigerian history, languages, arts and community life, and about their responsibilities as citizens.",
          "We celebrate contemporary Nigeria as well as heritage, and encourage respect for the many cultures represented in our school community.",
        ],
      },
    ],
  },

  "/admissions": {
    title: "Admissions",
    eyebrow: "Admissions",
    intro:
      "Choosing the right school is an important decision. This section brings together the information families need to learn about Honeytots, arrange a visit and understand the next steps.",
    sections: [
      {
        heading: "Your admissions journey",
        body: ["Four simple steps take you from first enquiry to joining our school community."],
        list: [
          "1. Explore Honeytots — read about our school and learning",
          "2. Book a visit — see the school and meet our team",
          "3. Review requirements — check entry classes and what is needed",
          "4. Contact admissions — we will guide you through the next steps",
        ],
      },
    ],
  },
  "/admissions/how-to-apply": {
    title: "How to Apply",
    eyebrow: "Admissions",
    intro: "The steps to joining Honeytots, explained simply.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Applying to Honeytots",
        body: [
          "In Phase One, applications begin with an enquiry or a school visit. Our admissions team will then guide you through the school's process.",
          "A full online application will be added to this website in a later phase.",
          CONFIRM,
        ],
      },
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
          "Age ranges for each entry class will be published here once confirmed by the school. Please contact our admissions team for guidance in the meantime.",
        ],
      },
    ],
  },
  "/admissions/requirements": {
    title: "Admission Requirements",
    eyebrow: "Admissions",
    intro: "What we will need from families.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Requirements",
        body: [
          "Admission requirements and supporting documents will be published here once confirmed by the school.",
        ],
      },
    ],
  },
  "/admissions/fees": {
    title: "School Fees",
    eyebrow: "Admissions",
    intro: "Fee information for prospective and current families.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Current fees",
        body: [
          "Please contact admissions for current fees. Fee amounts are not published on this website until confirmed by the school.",
          "The website is built so that the school can later choose to publish a full fee schedule, selected fees, or continue to direct families to the admissions team.",
        ],
      },
    ],
  },
  "/admissions/faqs": {
    title: "Frequently Asked Questions",
    eyebrow: "Admissions",
    intro: "Answers to questions families often ask.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Admissions questions",
        body: [
          "Questions and answers will be published here once confirmed by the school. If your question is not answered, our admissions team will be glad to help.",
        ],
      },
    ],
  },

  "/parents": {
    title: "Parent Information",
    eyebrow: "Parents",
    intro: "Practical, everyday information for Honeytots families.",
    sections: [
      {
        heading: "Everything for the school day",
        body: [
          "This section brings together the information parents need most often — school times, term dates, uniform, meals, attendance, homework and wellbeing.",
        ],
      },
    ],
  },
  "/parents/school-day": {
    title: "School Day",
    eyebrow: "Parents",
    intro: "Times, routines and everyday school information.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "A typical day",
        body: [
          "Arrival, assembly, lesson, break and closing times will be published here once confirmed by the school.",
          CONFIRM,
        ],
      },
    ],
  },
  "/parents/term-dates": {
    title: "Term Dates",
    eyebrow: "Parents",
    intro: "Session dates, holidays and mid-term breaks.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Academic session",
        body: [
          "Term dates will be published here once confirmed by the school. Upcoming school events appear on the school calendar.",
        ],
      },
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
          "Uniform items, sports kit and where uniform can be purchased will be published here once confirmed by the school.",
        ],
      },
    ],
  },
  "/parents/meals": {
    title: "School Meals",
    eyebrow: "Parents",
    intro: "Food, snacks and arrangements during the school day.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Meals and snacks",
        body: [
          "Meal arrangements, menus and guidance on packed lunches will be published here once confirmed by the school.",
        ],
      },
    ],
  },
  "/parents/attendance": {
    title: "Attendance & Punctuality",
    eyebrow: "Parents",
    intro: "Being in school, on time, every day.",
    sections: [
      {
        heading: "Why attendance matters",
        body: [
          "Regular attendance helps children settle, build friendships and make steady progress. Arriving on time means each day begins calmly.",
          "If your child will be absent, please inform the school office as early as possible using the contact details provided.",
        ],
      },
    ],
  },
  "/parents/homework-reading": {
    title: "Homework & Reading",
    eyebrow: "Parents",
    intro: "Supporting learning at home.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Learning at home",
        body: [
          "Reading together at home is one of the most valuable things a family can do. Homework expectations for each class will be confirmed by the school.",
        ],
      },
    ],
  },
  "/parents/health-wellbeing": {
    title: "Health & Wellbeing",
    eyebrow: "Parents",
    intro: "Care for the whole child.",
    awaitingConfirmation: true,
    sections: [
      {
        heading: "Health in school",
        body: [
          "Arrangements for first aid, medication, illness and pastoral support will be published here once confirmed by the school.",
        ],
      },
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
          "For now we are at " +
            schoolLocation.address +
            ". This address is still to be confirmed by the school as its permanent location.",
          "The map and a Get Directions link are on the Contact Us page.",
        ],
      },
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
          "School news will appear here once published. News articles are database-driven and will be managed from the school's admin area.",
        ],
      },
    ],
  },
  "/calendar": {
    title: "Calendar & Events",
    eyebrow: "Parents",
    intro: "Upcoming events and important dates.",
    sections: [
      {
        heading: "No events listed yet",
        body: [
          "Upcoming events will appear here once published by the school. Events are database-driven and will be managed from the school's admin area.",
        ],
      },
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
          "Photo albums will appear here once the school's own photographs are uploaded. Children's full names are never published in gallery captions.",
        ],
      },
    ],
  },
  "/policies": {
    title: "Policies & Downloads",
    eyebrow: "Parents",
    intro: "School documents families can read and download.",
    sections: [
      {
        heading: "No documents available yet",
        body: [
          "Policy documents will be available to download here once uploaded by the school. Documents will be grouped by category and searchable.",
        ],
      },
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
          "We collect only the information we need in order to respond to enquiries and arrange school visits, and we store it securely.",
          "This website is being built with the Nigeria Data Protection Act in mind. The school's full privacy notice will be published here once confirmed.",
        ],
      },
      {
        heading: "Information we collect through this website",
        body: [
          "Contact and visit request forms collect a parent or guardian's name and contact details, and any message provided. We do not collect sensitive information about children through this website.",
        ],
      },
    ],
  },
  "/cookie-policy": {
    title: "Cookie Policy",
    intro: "How this website uses cookies.",
    sections: [
      {
        heading: "Necessary and analytics cookies",
        body: [
          "Necessary cookies keep the website working and are always active. Optional analytics cookies are only used if you agree to them, and analytics is disabled by default.",
        ],
      },
    ],
  },
  "/accessibility": {
    title: "Accessibility",
    intro: "Our commitment to a website everyone can use.",
    sections: [
      {
        heading: "How we build for accessibility",
        body: [
          "This website is being built to WCAG 2.2 AA standards: keyboard-accessible navigation, visible focus, clear headings, labelled forms, strong colour contrast, generous touch targets and support for reduced-motion settings.",
          "If you have difficulty using any part of this website, please contact the school office so we can help and improve.",
        ],
      },
    ],
  },
  "/sitemap": {
    title: "Sitemap",
    intro: "Every page on the Honeytots School website.",
    sections: [],
  },
};
