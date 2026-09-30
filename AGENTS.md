<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
>
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# Honeytots School Website — Development Instructions

## 1. Project Overview

This project is the official web platform for **Honeytots Nursery/Primary School**, Nigeria.

The current development scope is **PHASE 1**.

Phase 1 is primarily a modern, responsive, accessible and professional public-facing school website.

The application must be architected so that future phases can be added without requiring a complete rebuild.

---

# 2. Long-Term Project Roadmap

## Phase 1 — Public School Website

The current phase includes:

- Home
- Our School
- Learning
- Admissions
- Parents
- Contact
- School information
- School facilities
- Curriculum information
- Admissions information
- Fees information
- School day information
- Calendar information
- Uniform information
- Policies
- News/information presentation where required
- Contact/enquiry functionality
- Book a Visit functionality
- Parent Portal entry point

Primary navigation:

HOME | OUR SCHOOL | LEARNING | ADMISSIONS | PARENTS | CONTACT

Persistent actions:

- BOOK A VISIT
- PARENT PORTAL

Mobile shortcut cards:

- Admissions
- School Day
- Parent Information
- Contact Us

---

## Phase 2 — School Administration & Admissions

Future functionality may include:

- Administrative dashboard
- Super Admin
- Staff/admin accounts
- Admissions management
- Student application management
- Parent registration
- Student registration
- Online application forms
- Document uploads
- News management
- Events management
- Calendar management
- Fee management
- Payment gateway integration
- Application status management
- Communication tools
- School content management

Do not implement these features during Phase 1 unless explicitly instructed.

However, Phase 1 architecture must not make these features difficult to add later.

---

## Phase 3 — School Management Platform

Future functionality may include:

- Student records
- Parent accounts
- Student profiles
- Academic records
- Student performance
- Attendance
- Fees and payment history
- Parent dashboard
- School communication
- Notifications
- Staff management
- Academic management
- Reports
- Other school-management functionality

Do not implement Phase 3 functionality during Phase 1.

---

# 3. Current Development Scope

The current task is ONLY Phase 1.

Do not prematurely build:

- Student databases
- Parent databases
- Staff management
- Payment processing
- Full admissions management
- Academic performance systems
- Attendance systems
- Full admin dashboards
- Complex authentication
- School management modules

unless explicitly requested.

Build the public website properly first.

---

# 4. Design Direction

The primary structural reference is:

Gayhurst Community School

https://www.gayhurst.hackney.sch.uk/

Prestfelde may also be used as a secondary reference.

The references are for:

- Information architecture
- Navigation ideas
- Content organisation
- Parent usability
- School website structure

Do NOT copy:

- Branding
- Logo
- Text
- Images
- Copyrighted content
- Exact visual design
- Exact layouts
- Proprietary assets

Honeytots must have its own identity.

---

# 5. Honeytots Design Philosophy

Honeytots is a Nigerian Nursery/Primary school.

The design should feel:

- Warm
- Bright
- Welcoming
- Friendly
- Professional
- Premium
- Trustworthy
- Child-friendly
- Modern
- Clean
- Accessible

Priority:

USABILITY > ANIMATION

Avoid unnecessary:

- Heavy animations
- Excessive transitions
- Complex visual effects
- Slow-loading components
- Decorative elements that interfere with usability

Animations may be used when they improve the experience, but they must never compromise performance or accessibility.

---

# 6. Nigerian School Context

The website is intended for a Nigerian school.

Content, terminology, examples and functionality should therefore be appropriate for:

- Nigerian parents
- Nigerian pupils/students
- Nigerian schools
- Nigerian educational expectations
- Nigerian school calendars
- Nigerian currency
- Nigerian contact formats
- Nigerian cultural context

Do not automatically copy UK educational terminology simply because Gayhurst is the primary reference.

Where curriculum information is required, use the actual curriculum information supplied or approved by Honeytots.

Do not invent official school policies, fees, curriculum claims, accreditations or certifications.

---

# 7. Parent Usability Requirement

A parent should be able to find the following information within two clicks:

- Admissions
- Fees
- School Day
- Calendar
- Uniform
- Policies
- Contact

This requirement should guide navigation, page structure and mobile navigation.

---

# 8. Responsive Design

The website MUST work properly on:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors
- Large desktop screens

Mobile usability is a first-class requirement.

Do not design desktop-first and treat mobile as an afterthought.

Pay particular attention to:

- Navigation
- Hero sections
- Cards
- Typography
- Buttons
- Forms
- Images
- Dropdown menus
- Spacing
- Touch targets

---

# 9. Component Architecture

Prefer reusable components instead of duplicated markup.

Examples may include:

- Header
- Navigation
- MobileNavigation
- Footer
- PageHero
- Breadcrumb
- SectionHeader
- CTASection
- InfoCard
- FeatureCard
- NewsCard
- EventCard
- ContactCard
- FAQ
- Button
- Form components

Before creating a new component, check whether an existing component can be reused or extended.

Avoid unnecessary duplication.

---

# 10. Content Architecture

Where practical, separate school content from presentation.

Avoid unnecessarily hard-coding the same information into multiple components.

School-specific information should be structured so that it can eventually be moved to a database or CMS.

Potential future dynamic content includes:

- News
- Events
- Calendar
- Admissions information
- Fees
- Announcements
- School information
- Policies

Do not introduce a complicated CMS during Phase 1 unless explicitly required.

---

# 11. Future Backend Compatibility

The future application may use Supabase or another backend service.

Phase 1 should therefore avoid architectural decisions that make future backend integration unnecessarily difficult.

Do not expose:

- API secrets
- Service-role keys
- Database credentials
- Private tokens

in frontend code.

Use environment variables for configuration.

Never commit `.env` secrets to GitHub.

---

# 12. Authentication

Phase 1 does not require a complete authentication system unless explicitly requested.

The visible:

PARENT PORTAL

button may initially lead to:

- A placeholder page
- A "Coming Soon" page
- An agreed external portal
- A future portal route

Do not build a fake authentication system simply to make the button functional.

---

# 13. Admissions

Phase 1 may provide:

- Admissions information
- Entry requirements
- Application process
- Fees information
- Frequently asked questions
- Book a Visit
- Contact Admissions

The full admissions management system belongs to Phase 2.

---

# 14. Payments

Phase 1 should not implement full payment processing unless explicitly requested.

Future payment functionality must be architected separately and securely.

Potential future payment functionality may include:

- Application fees
- School fees
- Payment confirmation
- Payment history
- Receipts
- Parent payment records

Never process or simulate real payments without explicit implementation requirements.

---

# 15. Accessibility

The website should follow good accessibility practices.

Pay attention to:

- Semantic HTML
- Keyboard navigation
- Focus states
- Appropriate contrast
- Alt text
- Form labels
- Button semantics
- Accessible navigation
- Responsive text sizing
- Reduced-motion preferences

Do not rely exclusively on colour to communicate information.

---

# 16. Performance

Performance is important.

Avoid unnecessary:

- Dependencies
- Large JavaScript bundles
- Unoptimized images
- Excessive animation
- Duplicate libraries
- Heavy third-party scripts

Images should be appropriately sized and optimized.

Lazy loading should be used where appropriate.

---

# 17. SEO

Phase 1 should have a proper SEO foundation.

Where appropriate include:

- Page titles
- Meta descriptions
- Semantic headings
- Clean URLs
- Open Graph metadata
- Appropriate image alt text
- Structured content

Do not keyword-stuff content.

---

# 18. Security

Never:

- Expose secrets
- Commit credentials
- Hard-code private API keys
- Disable security controls merely to make development easier
- Introduce insecure authentication shortcuts

Any security-sensitive implementation must be reviewed carefully.

---

# 19. Git Rules

Because this project is connected to Lovable:

NEVER:

- Force push
- Rewrite published history
- Rebase already-pushed commits
- Amend already-pushed commits
- Squash already-pushed commits

Keep the connected branch in a working state.

Prefer clear, logical commits.

Examples:

- `feat: create Honeytots site layout`
- `feat: add responsive navigation`
- `feat: create homepage`
- `feat: add admissions page`
- `fix: correct mobile navigation`
- `fix: improve hero responsiveness`

Do not combine unrelated changes into one large commit.

---

# 20. Development Workflow

Before making major changes:

1. Inspect the existing code.
2. Understand existing architecture.
3. Reuse existing components where appropriate.
4. Make the smallest sensible change.
5. Test the change.
6. Check responsive behaviour.
7. Run lint/type checks.
8. Review the diff.
9. Commit logical changes.
10. Push only when the project is in a working state.

Do not blindly rewrite existing code.

---

# 21. AI Agent Rules

The AI developer must NOT:

- Rebuild the entire application unnecessarily.
- Delete working functionality without explanation.
- Replace the framework without approval.
- Introduce unnecessary dependencies.
- Implement future phases prematurely.
- Create duplicate components unnecessarily.
- Invent school information.
- Invent fees.
- Invent policies.
- Invent curriculum claims.
- Invent accreditation.
- Copy content from reference websites.

When requirements are unclear, inspect existing project documentation and ask for clarification rather than making major assumptions.

---

# 22. Change Discipline

For every significant task:

1. Explain what will be changed.
2. Identify affected files.
3. Make the change.
4. Test it.
5. Report the result.

Avoid making unrelated changes while implementing a feature.

---

# 23. Definition of Done

A feature is not considered complete merely because the page renders.

Before considering a task complete:

- The application builds successfully.
- No obvious console errors exist.
- Type/lint checks pass where applicable.
- Desktop layout works.
- Mobile layout works.
- Navigation works.
- Buttons work.
- Links work.
- Forms behave correctly where applicable.
- Accessibility basics are respected.
- Existing functionality remains intact.

---

# 24. Important Principle

Build Phase 1 as a strong foundation, not as a temporary prototype.

The goal is:

Phase 1

Public School Website
        ↓
Phase 2

Admissions + Administration + Payments
        ↓
Phase 3

School Management + Parent Portal

The transition between phases should extend the existing system rather than require a complete rebuild.