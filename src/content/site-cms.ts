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
