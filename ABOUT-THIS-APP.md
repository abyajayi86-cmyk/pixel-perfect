# About This App

**Honeytots School Website — Phase One**

A production-ready public website for Honeytots School, a Nigerian Nursery & Primary school, built in Lovable. It works today as the school's professional online presence and is structured so future phases (digital admissions and payments, then parent/teacher portals) can be added without rebuilding.

---

## What it does now (Phase One)

| Area | Details |
| --- | --- |
| Home | Large photography hero, welcome message, quick links to each school stage, Book a Visit + Admissions calls to action |
| Our School | Welcome, vision & values, history, facilities, staff pages and more |
| Learning | Early years and primary stages, curriculum overviews |
| Admissions | How to apply, visits, fees & uniform (placeholder figures) |
| Parents | Term dates, communication, parent quick links |
| Contact & visits | Contact page and Book a Visit form (validated, honeypot-protected, consent checkbox) |
| Utility pages | News, Calendar, Gallery, Policies, Search, Sitemap, Privacy, Cookies, Accessibility |
| Parent Portal | "Coming soon" placeholder |

Around 40 pages are live, all sharing one header (colour-coded section menus, mobile drawer, announcement bar, parent quick links), breadcrumbs and footer.

## What is deliberately NOT built yet

- **Phase Two:** digital admissions, applicant records, student IDs, fees & invoices, Paystack payments, receipts, finance dashboard, admissions/finance roles.
- **Phase Three:** parent & teacher portals, continuous assessment, examinations, report cards, attendance, timetables, promotion, notifications.

Nothing from these phases is half-implemented — the site is fully usable without them.

## How the content works

- **One source of truth for school details** — name, motto, phone, WhatsApp, email and address all come from a single configuration file (`src/lib/site-config.ts`).
- **Draft copy registry** — inner-page text lives in one content file; every route renders it through a shared page component, so wording changes are quick and consistent.
- **Bracketed placeholders** — anything the school hasn't confirmed yet appears in square brackets, e.g. `[placeholder]`. No fees, staff names, addresses or claims have been invented.
- **Design tokens** — the warm Honeytots palette (honey gold, leaf green, sky blue, plum, coral on cream) is defined once as tokens, so final branding can be swapped centrally.

## Current limitations

- Enquiry forms validate and confirm on-screen but do **not** yet send messages anywhere — delivery is switched on in the database step.
- All copy is draft until the school confirms real details: motto, address, phone, WhatsApp, email, opening hours, fees, term dates, staff profiles and uniform list.
- The Parent Portal button is a placeholder.

## Built with

TanStack Start (React 19 + TypeScript), Vite, Tailwind CSS v4, Radix UI components, and generated school photography.

## Next steps

1. The school supplies the confirmed details listed above → placeholders are replaced.
2. Database + form delivery (contact enquiries and visit requests stored and emailed to the office).
3. Phase Two build when the school is ready.
