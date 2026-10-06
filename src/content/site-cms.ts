/**
 * Smallest-practical file-based CMS content model for Phase 1.
 *
 * Keeps typed content registries that, in Phase 2, migrate cleanly
 * to database tables behind an /admin interface. Nothing in this
 * file is Phase 2 functionality — it simply centralises content shape and status
 * so the same TS interface is stable across phases.
 *
 * Content status semantics:
 *   - draft: internal working copy, not yet sent to the school
 *   - awaiting_confirmation: sent to Honeytots leadership for review / sign-off
 *   - published: school-approved copy, safe to present without warning banners
 */

export type ContentStatus = "draft" | "awaiting_confirmation" | "published";

/**
 * A policy document entry surfaced on /policies and /our-school/policies.
 *
 * `lastConfirmedBySchool` is the "has the school leadership explicitly
 * signed off this policy copy and (when populated by the school) — `true`
 * removes the amber "Requires school approval" banner;
 */
export interface PoliciesCmsEntry {
  slug: string;
  name: string;
  /** One-liner shown under the title on the policy card. */
  description: string;
  status: ContentStatus;
  /** Semver-ish or free-text version identifier shown next to the badge in the card. */
  version?: string;
  /** Date the school confirmed this version takes effect. */
  effectiveDate?: string;
  /** Absolute or site-relative URL to the policy PDF once uploaded. */
  file: string;
  /**
   * True when the school leadership has explicitly approved the copy
   * copy + document. When false, safeguarding/privacy-style banner. */
  lastConfirmedBySchool: boolean;
}

/* ---------------------------------------------------------------------------
 *  Homepage content area
 * ------------------------------------------------------------------------- */

export interface HomepageWelcomeCms {
  heading: string;
  body: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  status: ContentStatus;
}

export interface HomepageFeatureCms {
  key: "learning-stages" | "facilities" | "community";
  heading: string;
  intro: string;
  status: ContentStatus;
}

/** Conceptual content model for the homepage body sections.
 *
 * Hero slides are still sourced from `hero-slides.ts`; they keep their own
 * module because carousel rendering needs the HeroSlide asset types.
 */
export interface HomepageCms {
  welcome: HomepageWelcomeCms;
  features: HomepageFeatureCms[];
  status: ContentStatus;
}

/* ---------------------------------------------------------------------------
 *  Admissions content area
 * ------------------------------------------------------------------------- */

export interface AgeBandCms {
  classLevel: string;
  fromAge: number;
  toAge: number;
  notes?: string;
  awaitingConfirmation: boolean;
}

export interface RequiredDocumentCms {
  name: string;
  description: string;
  required: boolean;
}

export interface ApplicationStepCms {
  order: number;
  title: string;
  description: string;
}

export interface AdmissionsFaqCms {
  question: string;
  answer: string;
}

export type FeeDisplayMode = "hidden" | "placeholder_only" | "published_with_school_approval";

export interface AdmissionsCms {
  ageBands: AgeBandCms[];
  entryRequirements: string[];
  requiredDocuments: RequiredDocumentCms[];
  applicationSteps: ApplicationStepCms[];
  faqs: AdmissionsFaqCms[];
  feeDisplayMode: FeeDisplayMode;
  visitSlots: string[];
  status: ContentStatus;
}

/* ---------------------------------------------------------------------------
 *  Academics content area
 * ------------------------------------------------------------------------- */

export interface ClassStructureCms {
  stage: string;
  groupSize: string;
  staffing: string;
}

/** Client-confirmed class sizes and staffing ratios. Single source of truth. */
export const classStructureCms: ClassStructureCms[] = [
  { stage: "Creche", groupSize: "8–10 children", staffing: "2 Class Nannies" },
  {
    stage: "Playgroup",
    groupSize: "18–24 children",
    staffing: "1 Teacher, 1 Assistant, 1 Class Nanny",
  },
  {
    stage: "Lower & Upper Nursery",
    groupSize: "12–15 children",
    staffing: "1 Class Teacher, 1 Support Staff",
  },
  {
    stage: "Primary Years 1–6",
    groupSize: "Maximum 20 children",
    staffing: "1 Class Teacher, 1 Support Staff",
  },
];

/* ---------------------------------------------------------------------------
 *  Parents content area
 * ------------------------------------------------------------------------- */

export interface SchoolDayPeriodCms {
  label: string;
  timeFrom: string;
  timeTo: string;
  /** Optional confirmed note shown after the period, e.g. handover rules. */
  note?: string;
}

export type UniformCategory =
  | "Monday to Thursday — Boys"
  | "Monday to Thursday — Girls"
  | "Outerwear"
  | "Friday sports / house"
  | "Grooming — Boys"
  | "Grooming — Girls"
  | "Jewellery & labelling";

export interface UniformCmsListEntry {
  category: UniformCategory;
  items: string[];
  awaitingConfirmation: boolean;
}

export interface ParentsFaqCms {
  question: string;
  answer: string;
}

export interface ParentsCms {
  schoolDay: SchoolDayPeriodCms[];
  uniform: UniformCmsListEntry[];
  faqs: ParentsFaqCms[];
  termDatesAwaitingConfirmation: boolean;
  status: ContentStatus;
}

/* ---------------------------------------------------------------------------
 *  Website settings / flags
 * ------------------------------------------------------------------------- */

export interface WebsiteSettingsCms {
  showWebsitePreviewNotice: boolean;
  enquiryFormIntegrationReady: boolean;
  admissionsPortalComingSoonMessage: boolean;
  schoolAddressProvisional: boolean;
  socialLinksAwaitingSetup: boolean;
  status: ContentStatus;
}

/* ---------------------------------------------------------------------------
 *  Policies (existing; kept below with existing placeholders)
 * ------------------------------------------------------------------------- */

/**
 * Exactly 9 policy placeholders for Phase 1 client preview.
 *
 * All are awaiting confirmation. Safeguarding and privacy are
 * additionally flagged lastConfirmedBySchool=false so the UI can
 * render an extra "Requires final school approval" notice above
 * their cards. Never set this to true unless the school has signed off
 * in writing.
 *
 * Slugs match the expected stable identifiers used for deep links.
 */
export const policyEntries: PoliciesCmsEntry[] = [
  {
    slug: "safeguarding-child-protection",
    name: "Safeguarding & Child Protection",
    description:
      "How the school protects children from harm, identifies concerns and works with families and agencies.",
    status: "awaiting_confirmation",
    version: "Draft for review",
    file: "",
    lastConfirmedBySchool: false,
  },
  {
    slug: "privacy-data-protection",
    name: "Privacy & Data Protection",
    description:
      "The personal information the school holds, why it is held, how long it is kept, and family rights.",
    status: "awaiting_confirmation",
    version: "Draft for review",
    file: "",
    lastConfirmedBySchool: false,
  },
  {
    slug: "behaviour",
    name: "Behaviour",
    description:
      "Expectations for behaviour, praise, rewards, and how the school supports positive conduct in a calm school community.",
    status: "awaiting_confirmation",
    file: "",
    lastConfirmedBySchool: true,
  },
  {
    slug: "attendance-punctuality",
    name: "Attendance & Punctuality",
    description:
      "Why being in school and on time matters, how attendance is followed, and who to contact when a child is absent.",
    status: "awaiting_confirmation",
    file: "",
    lastConfirmedBySchool: true,
  },
  {
    slug: "admissions",
    name: "Admissions",
    description:
      "Entry classes, age bands, application steps, required documents and offer decisions.",
    status: "awaiting_confirmation",
    file: "",
    lastConfirmedBySchool: true,
  },
  {
    slug: "complaints",
    name: "Complaints",
    description:
      "How families raise a concern, who handles it, and the stages the school follows when responding.",
    status: "awaiting_confirmation",
    file: "",
    lastConfirmedBySchool: true,
  },
  {
    slug: "online-safety-acceptable-use",
    name: "Online Safety & Acceptable Use",
    description:
      "Keeping children safe online, device use at school, and the agreements for staff and families.",
    status: "awaiting_confirmation",
    file: "",
    lastConfirmedBySchool: true,
  },
  {
    slug: "health-safety-first-aid-medication",
    name: "Health, Safety, First Aid & Medication",
    description:
      "General site safety, first-aid arrangements, medicines in school, and how health needs are supported.",
    status: "awaiting_confirmation",
    file: "",
    lastConfirmedBySchool: true,
  },
  {
    slug: "photography-media-consent",
    name: "Photography & Media Consent",
    description:
      "When photographs, where and how the school uses images of children, and how families opt out.",
    status: "awaiting_confirmation",
    file: "",
    lastConfirmedBySchool: true,
  },
];

/* ---------------------------------------------------------------------------
 *  Concrete registries for Phase 1 (demo-content safe, placeholders labelled)
 * ------------------------------------------------------------------------- */

export const homepageCms: HomepageCms = {
  status: "awaiting_confirmation",
  welcome: {
    heading: "Growing curious minds. Building confident futures.",
    body: "At Honeytots School, we want children to feel secure, valued and excited to learn. Our learning environment is designed to encourage curiosity, good character, independence and a positive attitude towards learning.",
    ctaPrimaryLabel: "Book a Visit",
    ctaSecondaryLabel: "Learn more",
    status: "awaiting_confirmation",
  },
  features: [
    {
      key: "learning-stages",
      heading: "Learning stages",
      intro: "Creche, Playgroup, Nursery and Primary — a single, consistent path.",
      status: "awaiting_confirmation",
    },
    {
      key: "facilities",
      heading: "Our facilities",
      intro: "Calm classrooms, outdoor play space and dedicated areas for younger children.",
      status: "awaiting_confirmation",
    },
    {
      key: "community",
      heading: "Our community",
      intro: "A school where parents are welcome partners in every child's journey.",
      status: "awaiting_confirmation",
    },
  ],
};

export const admissionsCms: AdmissionsCms = {
  status: "awaiting_confirmation",
  feeDisplayMode: "placeholder_only",
  visitSlots: ["Morning tours", "Midday tours", "Afternoon tours"],
  ageBands: [
    {
      classLevel: "Creche",
      fromAge: 3 / 12,
      toAge: 2,
      awaitingConfirmation: true,
      notes: "Age bands to be confirmed by Honeytots leadership.",
    },
    { classLevel: "Playgroup", fromAge: 2, toAge: 3, awaitingConfirmation: true },
    { classLevel: "Nursery", fromAge: 3, toAge: 5, awaitingConfirmation: true },
    { classLevel: "Primary 1 – Primary 6", fromAge: 5, toAge: 11, awaitingConfirmation: true },
  ],
  entryRequirements: [
    "Birth Certificate",
    "Passport Photographs",
    "Immunisation / Medical Records",
    "Previous School Reports",
    "Parent / Guardian Identification",
  ],
  requiredDocuments: [
    {
      name: "Birth Certificate",
      description: "Proof of your child's date of birth.",
      required: true,
    },
    {
      name: "Passport Photographs",
      description: "Recent passport-style photographs for the school record.",
      required: true,
    },
    {
      name: "Immunisation / Medical Records",
      description: "Up-to-date immunisation and medical records.",
      required: true,
    },
    {
      name: "Previous School Reports",
      description: "For children transferring from another school.",
      required: false,
    },
    {
      name: "Parent / Guardian Identification",
      description: "Identification for the parent or guardian named on the application.",
      required: true,
    },
  ],
  applicationSteps: [
    {
      order: 1,
      title: "Enquiry",
      description: "Contact the school regarding class availability.",
    },
    {
      order: 2,
      title: "School Visit",
      description: "Tour the school and learn more about the environment.",
    },
    {
      order: 3,
      title: "Application",
      description: "Complete the official application form and provide the required documentation.",
    },
    {
      order: 4,
      title: "Assessment / Interaction",
      description: "Age-appropriate assessment or informal interaction.",
    },
    {
      order: 5,
      title: "Admission Offer",
      description: "Offer subject to seat availability.",
    },
    {
      order: 6,
      title: "Enrolment",
      description: "Fee settlement and final documentation.",
    },
    {
      order: 7,
      title: "Welcome to HS",
      description: "Receive onboarding information and begin the Honeytots journey.",
    },
  ],
  faqs: [
    {
      question: "When do admissions open each year?",
      answer:
        "Admissions windows are published on this website and communicated directly to interested families. Please contact the school office for the current year's dates once confirmed by leadership.",
    },
    {
      question: "Can my child start partway through a term?",
      answer:
        "Transfer places are sometimes available in-year, subject to capacity and admissions policy. Please enquire at the office so we can check availability for the specific class level.",
    },
    {
      question: "Is there a waiting list?",
      answer:
        "When a class is full, families who still wish to apply are placed on a waiting list and contacted if a place becomes available.",
    },
    {
      question: "Do you accept children with additional learning needs?",
      answer:
        "Every child is considered individually. We discuss support with families at the point of application so we can be clear about what the school is able to provide.",
    },
  ],
};

export const parentsCms: ParentsCms = {
  status: "awaiting_confirmation",
  termDatesAwaitingConfirmation: true,
  schoolDay: [
    { label: "Drop-Off Begins", timeFrom: "07:00 AM", timeTo: "" },
    {
      label: "Assembly",
      timeFrom: "08:00 AM",
      timeTo: "",
      note: "After 8:00 AM, handover moves to Reception.",
    },
    { label: "Fruit Break", timeFrom: "09:00 AM", timeTo: "" },
    { label: "Lunch", timeFrom: "11:30 AM", timeTo: "" },
    { label: "Snack", timeFrom: "01:15 PM", timeTo: "" },
    { label: "Home Time — Monday to Thursday", timeFrom: "02:00 PM", timeTo: "" },
    { label: "Home Time — Friday", timeFrom: "01:00 PM", timeTo: "" },
  ],
  uniform: [
    {
      category: "Monday to Thursday — Boys",
      items: [
        "White short-sleeve shirt with crest",
        "Navy shorts",
        "Navy fold-down socks",
        "Plain black leather school shoes",
      ],
      awaitingConfirmation: false,
    },
    {
      category: "Monday to Thursday — Girls",
      items: [
        "White short-sleeve shirt with crest",
        "Navy pinafore or skirt",
        "Navy fold-down socks",
        "Plain black leather shoes",
      ],
      awaitingConfirmation: false,
    },
    {
      category: "Outerwear",
      items: ["Official navy Honeytots round-neck jumper"],
      awaitingConfirmation: false,
    },
    {
      category: "Friday sports / house",
      items: [
        "House colour polo: red, blue, green or yellow",
        "Navy blue sports shorts",
        "Navy socks",
        "Plain white trainers",
      ],
      awaitingConfirmation: false,
    },
    {
      category: "Grooming — Boys",
      items: ["Short, neat, natural hair.", "No designs or lines in the hair."],
      awaitingConfirmation: false,
    },
    {
      category: "Grooming — Girls",
      items: [
        "Neatly braided or flat cornrows.",
        "No extensions or additional hair.",
        "Black, navy or yellow ribbons.",
      ],
      awaitingConfirmation: false,
    },
    {
      category: "Jewellery & labelling",
      items: [
        "No necklaces or chains.",
        "Small plain studs or sleeper earrings, for girls only.",
        "All uniforms, shoes, bags and flasks clearly labelled.",
      ],
      awaitingConfirmation: false,
    },
  ],
  faqs: [
    {
      question: "What is the best way to contact my child's teacher?",
      answer:
        "For routine matters, send a note via your child's diary or contact the school office, who will pass the message on. For urgent matters, please phone the office during school hours.",
    },
    {
      question: "What happens if my child is ill and cannot come to school?",
      answer:
        "Please let the office know before registration on every day of absence. When children return after a fever, sickness or diarrhoea, we follow the standard 48-hour clear period before they return to class.",
    },
    {
      question: "Can anyone other than a parent collect my child at the end of the day?",
      answer:
        "For safeguarding reasons, only adults listed on your child's collection-authorisation form will be allowed to collect them. Please tell the office in advance if someone different is collecting on a specific day.",
    },
    {
      question: "How often will I receive reports?",
      answer:
        "Parents receive a written report at the end of each term, plus an opportunity to discuss progress with teachers in a scheduled parents' meeting.",
    },
  ],
};

export const websiteSettingsCms: WebsiteSettingsCms = {
  status: "awaiting_confirmation",
  showWebsitePreviewNotice: true,
  enquiryFormIntegrationReady: false,
  admissionsPortalComingSoonMessage: true,
  schoolAddressProvisional: false,
  socialLinksAwaitingSetup: false,
};
