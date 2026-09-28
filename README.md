# Honeytots School — Website

The official website for Honeytots School, a Nigerian Nursery & Primary school. Built as a fast, mobile-friendly public site with draft-friendly page content that the school can update before launch.

## What's inside

- **Public site** — Home, Our School, Learning, Admissions, Parents, News, Calendar, Gallery, Policies, Contact, Book a Visit, Search, Sitemap, Parent Portal (coming soon) and the legal pages (Privacy, Cookies, Accessibility).
- **Shared layout** — sticky header with colour-coded section menus, mobile drawer, announcement bar, parent quick links, breadcrumbs and footer.
- **Enquiry forms** — Contact and Book a Visit forms with validation, a honeypot and a privacy consent checkbox. Message delivery is switched off until the database step.
- **Placeholder copy** — text the school still needs to confirm appears in square brackets. No fees, staff names, addresses or claims have been invented.

## Tech stack

- TanStack Start (React 19) with file-based routing via TanStack Router
- TypeScript, Vite 7
- Tailwind CSS v4 with semantic brand tokens (honey, leaf, sky, plum, coral, cream)
- Radix UI primitives via shadcn-style components

## Local development

```sh
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run lint     # eslint
```

## Project structure

```
src/
  assets/           # generated photography
  components/
    common/         # page building blocks (PageHero, ContentPage, forms, cards)
    forms/          # Contact + Book a Visit enquiry forms
    layout/         # header, footer, announcement bar, mobile nav, logo
  content/pages.ts  # draft copy for all inner pages (single registry)
  lib/              # siteConfig (name, contact details, nav), colour families
  routes/           # one file per URL, plus shared layouts
```

### Key conventions

- All school details (name, motto, phone, WhatsApp, email, address) are read through `src/lib/site-config.ts` — update that one file (or its future database table) to change them everywhere.
- All colours go through the design tokens in `src/styles.css`; never hard-code hex values in components.
- Inner-page copy lives in `src/content/pages.ts`; each route renders it through the shared `ContentPage` component.

## Roadmap

- **Phase One (current)** — public website and lightweight content structure.
- **Phase Two (planned)** — digital admissions, student/parent records, academic sessions, fees, invoices, online payments and finance dashboard.
- **Phase Three (planned)** — parent/teacher portals, continuous assessment, results, report cards, attendance and notifications.

The architecture keeps Phase Two and Three additive: no rebuild is required to add them.

## Details the school still needs to confirm

Motto, address, phone, WhatsApp, email, opening hours, fees, term dates, staff profiles, uniform list and the final welcome message.
