# Honeytots — Work Resumption Protocol

> **Purpose:** Step-by-step SOP to follow EVERY TIME work stops and is later resumed.
> This file exists to prevent: wrong branch, lost uncommitted changes, touching protected
> files, forgetting verification gates, and rework from missed check failures.

---

## 0. PROJECT IDENTITY (Never Assume)

| Field | Value |
|---|---|
| Project root | `C:\Users\user\Videos\SCHOOL\honeytots\pixel-perfect` |
| Framework | TanStack Start (React 19) + Vite 8 + Tailwind v4 + Nitro (Cloudflare) |
| Package manager | Bun (bun.lock) — npm scripts are OK; never write package-lock.json |
| OS | Windows (PowerShell; `&&` syntax does not work in PS 5 — use `cd X ; command`) |
| Connected branch constraint | No force-push / rebase / amend / squash on pushed commits (AGENTS.md §19) |

---

## 1. PROTECTED FILES (Read-Only — Never Modify)

If ANY of these appear in `git status` as modified, **ABORT immediately** and revert
before doing anything else:

| Path | Why protected |
|---|---|
| `src/routeTree.gen.ts` | TanStack Router auto-generated. Manual edits = route corruption. |
| `bun.lock` | Dependency lock. Modify only if you intentionally changed deps. |
| `package-lock.json` | Should not exist; untracked. Never stage it. |
| `src/assets/hero-honeytots.jpeg` | Baseline imagery, untracked. Never stage. |
| `README.md` / `AGENTS.md` / `ABOUT-THIS-APP.md` | Project contract docs. Modify only on explicit instruction. |
| `scripts/check-phase1.mjs` / `scripts/check-contrast.mjs` | Verification fixtures. Modify only to add new rule tests. |

Known-safe untracked (allowed to exist, never committed):
```
?? src/assets/hero-honeytots.jpeg
?? package-lock.json   (if present — ignore, do NOT rm)
```

---

## 2. PRE-FLIGHT (Run EVERY Session Before ANY Edit)

Execute in this exact order. Do not skip lines.

```powershell
# A. Verify correct branch
cd C:\Users\user\Videos\SCHOOL\honeytots\pixel-perfect
git branch --show-current
# EXPECTED: content/phase-1-population  (or active phase branch)

# B. Check working tree — take a mental snapshot
git status --short

# C. Confirm protected files are NOT in the modified list
git status --short | Select-String "routeTree|bun.lock|hero-honeytots.jpeg"
# EXPECTED: no output (no matches = good)

# D. Note the current HEAD commit
git rev-parse --short HEAD

# E. Baseline verification: do checks/build work BEFORE your edits?
npm run check 2>&1 | Select-Object -Last 20
# Note any FAIL lines. These are "inherited failures" from prior stop.
# Fix them BEFORE adding new work.
```

### If `npm run check` hangs or node.exe exits silently
→ Open a **fresh** terminal (new PowerShell window). Old terminals can have stuck
Node workers. Do NOT run the command twice in the same hanging shell.

---

## 3. PHASE ROADMAP (14 Phases — Recommended Sequence)

> **Source of truth for "what phase are we in?"**
> The order below was explicitly approved as the safest sequence. Do NOT reorder.
> Status legend:  ✅ DONE  ·  🟡 IN PROGRESS (current worktree)  ·  ⏭️ NEXT  ·  ⚪ NOT STARTED  ·  🚫 BLOCKED
> "DONE" = content in the worktree satisfies the scope AND the phase's
> acceptance criteria pass (npm run check green, protected files clean).

| # | Phase | Scope & Acceptance Criteria | Status | Dependencies |
|---|---|---|------|---|
| **Phase 1** | **Baseline scaffold + 46 public routes** | TanStack Start baseline, route skeleton, Header/Footer/Layout, 46 routes all reachable, 136 route-checks pass, cream/navy/honey tokens + OKLCH palette in place. Commits pre `9dffb22`. | ✅ DONE | — |
| **Phase 2** | **Fix header + reconcile visual identity** | Resolve header crowding: BOOK-A-VISIT + PARENT-PORTAL removed from desktop global nav (search icon rightmost confirmed). Logo sizing, mega-menu column spacing, mobile nav spacing, WebsitePreviewNotice rendered full-width strip *above* the Header on every page (not over hero overlay), provisional address amber strip wired to `schoolLocation.provisional`. | ✅ DONE | Phase 1 |
| **Phase 3** | **Simplify content / Information Architecture (IA)** | "SIMPLIFY, NOT ELABORATE" rule: rewrite 31 pages in [pages.ts](file:///C:/Users/user/Videos/SCHOOL/honeytots/pixel-perfect/src/content/pages.ts) to quick-info chips, facility lists, short paragraphs. Add `related` cross-link array to `PageContent` type. Update [ContentPage.tsx](file:///C:/Users/user/Videos/SCHOOL/honeytots/pixel-perfect/src/components/common/ContentPage.tsx) to render `related` links *before* falling back to sibling nav children. Move "A day in the life" content to `/parents/school-day`. Centralise admissions requirements. Sitemap populated full-tree from pages defs. Duplicate admissions FAQs removed. | ✅ DONE | Phase 2 |
| **Phase 4** | **Redesign homepage visually** | HeroCarousel 7 slides intact (protected per spec), Quick Access 6-tile grid, Welcome ImageTextSplit arch variant with "Our full welcome message will be provided by the school" notice preserved, 3 placeholder SVGs + imagePlaceholder badges preserved, CurvedBreak surfaces between ALL section boundaries (cream/cream-deep/sand/muted — NO hard edges). CallToAction navy-dome band with muted-surface curves on both sides. LocationSection placed after closing CTA. Homepage contrast 24/24 pass. | ✅ DONE | Phase 3 |
| **Phase 5** | **Establish inner-page visual language** | Same token system as homepage: PageHero eyebrow-family-tint consistent across all 31 content pages; CurvedBreak patterns where applicable; JourneyLine + CircularFeature + ValuesPlaceholderSection components *available* for use. ContentPage decoration flag system: `heroJourneyLine`, `learningStageCards`, `brandValuesTiles` booleans added to PageContent type. Decor flags applied to 8 highest-traffic inner landing pages only (/our-school, /our-school/vision-values, /learning x3, /admissions x2, /parents). JourneyLine tone matched to nav section family colour. No hard-coded JSX inserted into page definitions — *registry stays plain data*, Phase 2 CMS-ready. | ✅ DONE | Phase 4 |
| **Phase 6** | **Make reusable components (de-duplicate)** | Centralise: (a) BRAND_VALUES tiles array (currently duplicated in ValuesPlaceholderSection + ContentPage — extract to single [brand.ts](file:///C:/Users/user/Videos/SCHOOL/honeytots/pixel-perfect/src/content/brand.ts) registry); (b) Build `JourneySteps` reusable step-chip component for admissions 4-step process pattern (replace plain ordered-list chips with visual stepper); (c) Audit FAQ rendering on /admissions/faqs — build `FAQAccordion` if using raw `<details>`; (d) DRY any remaining duplicated prose-lists across sections; (e) Confirm PageHero/SectionHeading/QuickLinkGrid/RelatedPages/PolicyList/CurvedBreak all consumed through single components (no inline copies). | ✅ DONE | Phase 5 |
| **Phase 7** | **Reconcile the client's actual photos / assets** | DO NOT invent/copyright/download imagery. Audit: (a) Matrix of every image position across site: page, position, current value (real JPG / placeholder SVG / imagePlaceholder: true / missing), expected real asset name from client. (b) Verify the 4 real JPGs that DO exist match their slot intents. (c) Add per-position placeholder notices ("Photograph pending Honeytots School supply") where an SVG/badge is used AND the page has no banner-level "placeholder" disclosure. (d) Ensure og-image placeholder stays labelled, not presented as final asset. (e) Produce [asset-status.md](file:///C:/Users/user/Videos/SCHOOL/honeytots/pixel-perfect/public/policies/README.md)-style matrix in a new src/content/asset-matrix.ts (typed) so Phase 12 audit can scan it programmatically. | ✅ DONE | Phase 6 |
| **Phase 8** | **Resolve content discrepancies** | Cross-page reconciliations flagged in prior audits: (a) Values-list discrepancy between `/our-school/vision-values` draft copy (4 values) vs. homepage brand board (6 values) — align to ONE canonical set and mark every surface consistently as DRAFT. (b) Term dates, fees, staff names, safeguarding lead name, accreditation claims, results % — confirm ZERO surfaces present invented values. Any claim-like sentence left must carry `awaitingConfirmation: true`. (c) Sitemap tree actual vs pages.ts defs exact match. (d) Policy CMS entries count == 9, safeguard+privacy each have `lastConfirmedBySchool === false`. (e) Cross-check 82+ `related:` entries against real routes existence. | ✅ DONE | Phase 7 |
| **Phase 9** | **Responsive refinement** | Mobile-first sweep: (a) < 390px viewport no horizontal scroll, no clipped text/CTAs; check WebsitePreviewNotice, all QuickLinkGrids, PolicyList, CircularFeature grids, FAQ accordions, breadcrumbs. (b) Tablet 768–1024: grid columns tune correctly (2-col fallback instead of 3-col on QuickLinkGrid). (c) HeroCarousel controls safe on touch. (d) ParentLinks rail slide distance correct on small widths. (e) EnquiryForm fields never narrower than 48px touch targets. (f) Final 320px width pass on all 46 routes via dev server. | ✅ DONE | Phase 8 |
| **Phase 10** | **Accessibility + interactions polish** | (a) All decorative aria-hidden applied (CurvedBreak/JourneyLine/placeholder SVGs — verified). (b) Keyboard: skip-link → notice → header flow works, focus rings always visible, ParentLinks handle is focusable with aria-expanded + aria-controls (already in checks). (c) All `<img>` have alt (decorative use empty alt=""). (d) Policy badges: colour + text/ICON never colour alone. (e) Hover vs. focus-visible: every interactive element has distinct focus-visible ring honey-tinted. (f) prefers-reduced-motion respected on all animations (CircularFeature/JourneyLine/ParentLinks/CTA — audit every transform/transition). (g) Screen-reader semantic landmarks: `<header>`, `<nav>`, `<main id="main-content">`, `<footer>` structure intact. | ✅ DONE | Phase 9 |
| **Phase 11** | **Search / 404 / sitemap / utility polish** | (a) `/search` page: verify it reads the pageContent registry for indexable entries, returns real results, no fake hits. (b) TanStack Router 404 (notFoundRoute): brand-appropriate, CTA back to Home, search shortcut. (c) `/sitemap` route: full tree from pages.ts + routes, 136 route-check links match. (d) `/accessibility` page has real content (placeholder → concrete WCAG 2.2 statement with "pending final school review" banner). (e) `/news`, `/calendar`, `/gallery` pages: honest "Coming soon" copy that does NOT fake entries — NO localStorage date hacks. (f) `/book-a-visit`: EnquiryForm variant labelled correctly; `Parent Portal` route: honest "Coming soon — no fake login prompt" banner per Authenticity Principle in project_memory. (g) robots.txt + sitemap.xml generation if build supports it; otherwise manual sitemap matching route list. | ✅ DONE | Phase 10 |
| **Phase 12** | **Final audit — content + component rule check** | Manual 15-point audit against AGENTS.md + project_memory rules: (1) No invented phone/email/fees/term-dates/staff-name/accreditation/result%. (2) schoolLocation.provisional === true (still). (3) routeTree.gen.ts: ZERO diff vs baseline. (4) package-lock.json never staged, bun.lock untouched. (5) hero-honeytots.jpeg never staged/committed. (6) WebsitePreviewNotice present on EVERY page via SiteLayout (single instance). (7) `isPlaceholder()` strictly required before ANY `tel:`, `mailto:`, `wa.me:` link wrapping — check ContactCard + Footer. (8) AdminPreview read-only demo component ONLY — no `/admin` route exposed. (9) Policies: 9 entries, no fake PDFs. (10) Sitemap count === sitemap route count. (11) No superlative violations (>1 use of "world-class / cutting-edge / unlock / holistic"). (12) awaitingConfirmation flags correct on every claim page. (13) Homepage Welcome banner still contains "Our full welcome message will be provided by the school." (14) 3 placeholder SVGs still in situ (not replaced with external imagery). (15) 7 hero slides intact, carousel controls unchanged from spec. | ✅ DONE | Phase 11 |
| **Phase 13** | **Final verification — check + build stress test** | Automation gate (must pass 3x in fresh terminals to rule out flake): (a) `npm run check` → exit 0 (routes 136/136, phase1 137/137, contrast 24/24). (b) `npm run build` → exit 0 (Nitro clean, no warnings about missing deps). (c) TSC --noEmit → exit 0. (d) ESLint no errors (warnings OK). (e) `check-phase1.mjs` FAIL list === empty. (f) `check-contrast.mjs` FAIL list === empty. (g) Protected-file grep: 0 matches. (h) git diff --stat after all phases: no surprise files outside allowlist. (i) Nitro preview: smoke-test 10 key routes render (Home, Learning, Admissions, Parents, Contact, Policies, Sitemap, Book a Visit, Search, 404) — no console errors in browser. | ✅ DONE | Phase 12 |
| **Phase 14** | **Git safety + staged commit strategy (NO PUSH until user approves)** | **RULE: Nothing is pushed to Lovable-connected branch until Phase 14 sign-off.** Commit sequence (4–7 granular commits, each independently checkable, then STOP — no push until user explicitly confirms):<br/>1. `fix(checks): add muted-surface CurvedBreaks to homepage`<br/>2. `feat(component): export JourneyLineTone + add ContentPage decor flag renderer (heroJourneyLine/learningStageCards/brandValuesTiles)`<br/>3. `feat(cms): add Phase 5 decor flags to 8 landing pages in pages.ts + extend PageContent type`<br/>4. `feat(cms): Phase 6 — centralise BRAND_VALUES to brand.ts + add JourneySteps + FAQAccordion reusable components`<br/>5. `feat(cms): Phase 7 — asset status matrix registry + placeholder notices audit`<br/>6. `feat(content): Phase 8 — content discrepancy reconciliation (values, flags, related links)`<br/>7. `chore: add WORKFLOW.md (resumption protocol + 14-phase roadmap)`<br/>Then `git status --short`, confirm ONLY files that match commit scope are staged. Then STOP — hold for user approval push. Re-push rule: AGENTS.md §19 — NEVER force, rebase, amend, squash already-pushed commits.<br/>**End state:** worktree clean OR worktree matches exactly the documented §3 checkpoint (if user prefers to keep post-Phase 14 work uncommitted until review). | 🟡 IN PROGRESS | Phase 13 |

### Current phase pointer
🟡 **Active = Phase 14** (Git safety + staged commit strategy).
Execute §4 Standard Work Sequence, §4 G0 → G10, per session.

After Phase 14 completes → 📍 **END OF PHASE 1 WORK** — ready for user approval push.

---

## 4. RESUME CHECKPOINT (State As Of Last Stop)

> Copy-paste the output of §2 into this section at the END of every session
> so the next resume can diff against it.

### Checkpoint: 2026-10-05 (End Of Session — Phase 13 Complete, Phase 14 Ready for Commit)

```
Branch: content/phase-1-population
HEAD:   07b0f4f feat(content): populate admissions, learning, parents, facilities and draft inner-page copy
Commits ahead of 9dffb22: 3 (unchanged from prior stop — work done in worktree only)
  07b0f4f content
  686b610 chore(content): policy placeholders + PolicyList
  f513ff3 feat(cms): site-config, preview notice, conditional links, typed model

Uncommitted (worktree dirty — 13 modified, 18 untracked):
  M src/components/common/ContentPage.tsx        (related support + heroJourneyLine + learningStageCards + brandValuesTiles wiring + JourneySteps + FAQAccordion)
  M src/components/common/FormField.tsx          (min-h-12 for 48px touch targets)
  M src/components/common/WebsitePreviewNotice.tsx
  M src/components/layout/Header.tsx
  M src/components/layout/HeroCarousel.tsx       (size-12 carousel controls)
  M src/components/layout/ParentLinks.tsx        (min-h-12 inline pills)
  M src/components/layout/SiteLayout.tsx
  M src/content/pages.ts                        (31 pages SIMPLIFY + 42 related entries + 3 decor booleans + journeySteps/faqItems on 8 pages)
  M src/content/site-cms.ts
  M src/lib/simple-page.tsx
  M src/routes/index.tsx                        (CircularFeature/JourneyLine/ValuesPlaceholderSection imported + muted CurvedBreaks)
  M src/routes/search.tsx
  M public/robots.txt                            (Sitemap reference added)
  ?? .trae/specs/phase-1-client-preview/        (spec.md + tasks.md)
  ?? WORKFLOW.md                                 (this file — Session resumption SOP)
  ?? public/og-image-placeholder.svg
  ?? public/sitemap.xml                          (Phase 11: generated sitemap.xml - 46 routes)
  ?? src/assets/hero-honeytots.jpeg             (protected untracked, IGNORE / never commit)
  ?? src/components/admin/AdminDashboardPreview.tsx
  ?? src/components/common/CircularFeature.tsx
  ?? src/components/common/FAQAccordion.tsx
  ?? src/components/common/JourneyLine.tsx
  ?? src/components/common/JourneySteps.tsx
  ?? src/components/common/ValuesPlaceholderSection.tsx
  ?? src/content/asset-matrix.ts                (Phase 7: typed asset position matrix - 14 positions)
  ?? src/content/brand.ts
  ?? scripts/check-mainnav.mjs                  (audit helper)
  ?? scripts/check-related-links.mjs            (audit helper)
  ?? scripts/generate-sitemap.mjs               (Phase 11: sitemap generator)

Verification state — ALL PASS (no inherited failures):
  npm run check        → exit 0   (0 failures. Routes 136/136. Phase1 137/137. Contrast 24/24.)
  npm run build        → exit 0   (Nitro build completed; .output/ generated cleanly)
  npx tsc --noEmit     → exit 0   (no TS errors)
  npm run lint         → 0 errors (10 warnings OK)
  Protected-file audit → CLEAN    (no routeTree.gen.ts / bun.lock / AGENTS.md / README.md changes)
```

**Next action on resume (Gate 0):**
1. Pre-flight per §2 — confirm still on correct branch and checks pass.
2. Active phase = 🟡 **Phase 14** (Git safety + staged commit strategy). Execute §5 (Standard Work Sequence) G0 → G10 for:
   - Create 4–7 granular commits per §7 commit pattern:
     1. `fix(checks): add muted-surface CurvedBreaks to homepage`
     2. `feat(component): export JourneyLineTone + add ContentPage decor flag renderer`
     3. `feat(cms): add Phase 5 decor flags to 8 landing pages in pages.ts + extend PageContent type`
     4. `feat(cms): Phase 6 — centralise BRAND_VALUES to brand.ts + add JourneySteps + FAQAccordion`
     5. `feat(cms): Phase 7 — asset status matrix registry + placeholder notices audit`
     6. `feat(content): Phase 8 — content discrepancy reconciliation`
     7. `chore: add WORKFLOW.md (resumption protocol + 14-phase roadmap)`
   - After each commit, re-run §5 G4 (protected audit) + §5 G9 (build gate).
   - `git status --short` — confirm ONLY files matching commit scope are staged.
   - STOP — **do not push** until user explicitly approves.
3. §3 (Phase Roadmap) is the SOURCE OF TRUTH for phase statuses. Update the `Status` column in §3 when a phase completes acceptance criteria.

---

## 5. STANDARD WORK SEQUENCE (Every Session)

1. **PRE-FLIGHT** (§2). If anything wrong, stop and fix before touching code.
2. **GATE 0 — Inherited failure cleanup.** Fix any FAIL lines from the check
   you ran in pre-flight. Do not add new features on top of red checks.
3. **GATE 1 — One logical change.** Edit a focused set of files (1–5 typically).
4. **GATE 2 — Immediate local smoke check:**
   ```powershell
   npx tsc --noEmit 2>&1 | Select-Object -First 30
   ```
   Fix TS errors before proceeding.
5. **GATE 3 — Full verification:**
   ```powershell
   npm run check
   ```
   Expected end summary: `X check(s) failed.` → must be `0` (or count of known
   failures documented in §3 Resume Checkpoint, reduced compared to start).
6. **GATE 4 — Protected-file audit:**
   ```powershell
   git status --short | Select-String "routeTree|bun.lock|hero-honeytots.jpeg|AGENTS.md|README.md"
   ```
   → No output = clean. If output: revert those files NOW.
7. **GATE 5 — git status sanity:**
   ```powershell
   git diff --stat
   ```
   Review file count. If > 8–10 files, consider splitting into smaller commits.
8. **COMMIT.** Use granular, scoped messages per AGENTS.md §19 pattern:
   - `feat(content): ...`  (copy / page definitions)
   - `feat(cms): ...`       (config / CMS foundation / content model)
   - `feat(component): ...` (new reusable components / rendering)
   - `fix(checks): ...`     (verification / contrast / boundary fixes)
   - `chore: ...`           (directory scaffolding only)
   Never commit: routeTree.gen.ts, bun.lock, protected docs, hero-honeytots.jpeg.
9. **BUILD GATE (before stop, or after large batches):**
   ```powershell
   npm run build 2>&1 | Select-Object -Last 15
   ```
   Must exit 0.
10. **UPDATE §3 CHECKPOINT** at the end of this WORKFLOW.md with the current
    state BEFORE closing the session. Include: HEAD short hash, modified/untracked
    file list, and any remaining FAIL lines from `npm run check`.

---

## 6. VERIFICATION FAILURE PLAYBOOK

When `npm run check` reports FAIL, use this table to diagnose. Do not guess.

| # | Failure message | Root cause | Fix |
|---|---|---|---|
| F1 | `home: the cream -> muted boundary is still a hard edge` | `routes/index.tsx` has no `<CurvedBreak ... fill="muted" />`. The test requires the homepage to explicitly enter the muted surface via a curve. | Before a section that should sit on `bg-muted`, add: `<CurvedBreak from="cream" fill="muted" />` (or the correct `from=` tone for the section above). |
| F2 | `home: the muted -> cream boundary is still a hard edge` | `routes/index.tsx` has no `<CurvedBreak ... from="muted" />`. The test requires the muted surface to be left by a curve. | After the `bg-muted` section, add: `<CurvedBreak from="muted" fill="cream" />` (or the correct `fill=` tone for the section below). |
| F3 | `curve #N does not name its incoming surface` | CurvedBreak call on homepage omits `from=`. | Add `from="cream"` (or correct upper tone) to every CurvedBreak usage in index.tsx. Surface must be explicitly named on both sides. |
| F4 | `curve: the path fill is never a bare tone key` | You used `<path fill="cream">` string literal instead of token lookup. | CurvedBreak must reference `surfaces[fill]` (object lookup) — never pass a bare CSS colour string to `<path fill=...>`. Check recent edits to `CurvedBreak.tsx`. |
| F5 | Route count mismatch (expected 136) | A route was added/deleted/renamed OR `routeTree.gen.ts` was hand-edited. | 1. NEVER edit routeTree.gen.ts. 2. Check `src/routes/` for any new/deleted `.tsx` files. Do not touch routes without explicit instruction. 3. If file count is intact but gen is stale: run route regeneration command from package.json and then REVERT routeTree.gen.ts changes (the protected baseline version should match). |
| F6 | Contrast failures (e.g., `23 / 24 PASS`) | A text/background colour pair no longer meets WCAG AA. | Find the failing pair name in the check script output (near the FAIL line). Edit `styles.css` tokens OR the specific component's classes — NEVER weaken the check script. |
| F7 | TSC errors mentioning `routeTree.gen.ts` | This file is protected but its content drifted. | 1. Do not edit routeTree.gen.ts. 2. Remove any new route files you introduced under `src/routes/` that are not in the baseline. 3. If you deleted a route, restore it. 4. Stash your changes and compare to baseline commit `9dffb22`. |
| F8 | `npm run build` exit non-zero but checks pass | Usually a Nitro/Vite production bundling issue. | Run `npm run build 2>&1 | Select-String -Pattern "error|Error" -CaseSensitive` and fix first error in order — typically an import path (`@/...`) resolved for dev but not for build. |

### When the cause is NOT in the table
1. Run ONLY the failing sub-check:
   ```powershell
   node scripts/check-phase1.mjs 2>&1 | Select-Object -Last 40
   # or
   node scripts/check-contrast.mjs 2>&1 | Select-Object -Last 40
   ```
2. Read the exact assertion regex from `scripts/check-phase1.mjs` that
   corresponds to the FAIL label.
3. Do NOT modify the script's regex to make it pass — that defeats the gate.
   Fix the source file to satisfy the regex.

---

## 7. GIT DISCIPLINE (Hard Rules)

- **One commit = one logical concern.** Examples:
  - Commit 1: `fix(checks): add muted-surface CurvedBreaks to homepage`
  - Commit 2: `feat(component): wire CircularFeature + JourneyLine into learning pages`
  - Commit 3: `feat(content): add related cross-links for admissions pages`
- **Never commit:** `routeTree.gen.ts`, `bun.lock` modifications, `hero-honeytots.jpeg`,
  `package-lock.json`, `README.md`, `AGENTS.md`. If `git status --short` shows them
  staged, **unstage NOW**:
  ```powershell
  git reset HEAD src/routeTree.gen.ts bun.lock "src/assets/hero-honeytots.jpeg" README.md AGENTS.md package-lock.json 2>$null
  ```
- **Never force-push, rebase, amend, or squash** once commits are pushed to the
  connected branch (AGENTS.md §19). History rewrites break Lovable sync.
- **Push only when:**
  1. `npm run check` → 0 FAIL
  2. `npm run build` → exit 0
  3. Protected-file audit (§4 G4) → clean
  4. §3 Checkpoint UPDATED in WORKFLOW.md

---

## 8. STOP CRITERIA — Safe to End Session

Before closing the IDE/terminal, ALL of the following must be true:

- [ ] §3 **RESUME CHECKPOINT in this file is updated** with: branch name, HEAD
      short hash, exact `git status --short` output (M/?? lists), and the exact
      FAIL count + labels from latest `npm run check`.
- [ ] If you committed: the commit is small, scoped, and message matches the
      AGENTS.md §19 pattern. Protected files are NOT in the commit.
- [ ] If you did NOT commit (work in progress): the changes are in < 5 files and
      clearly scoped; the next session can pick them up without guessing intent.
- [ ] No terminal window has a hanging/stuck `npm run check` or `npm run build`
      process (kill them via Task Manager → Details → node.exe → End Task if
      unsure — stale workers cause next session false failures).
- [ ] The **last command you ran** was a verification command (`npm run check`
      or at minimum `npx tsc --noEmit`). You know its result.

---

## 9. QUICK REFERENCE — Windows PowerShell Snippets

Wrong branch or detached HEAD?
```powershell
git checkout content/phase-1-population
```

Accidentally modified a protected file? Restore from HEAD:
```powershell
git checkout HEAD -- src/routeTree.gen.ts
# same pattern for bun.lock, README.md, AGENTS.md
```

Accidentally staged protected files? Unstage:
```powershell
git reset HEAD src/routeTree.gen.ts
```

See only modified (not untracked):
```powershell
git diff --name-only
```

See exact failure lines in check script (filtered):
```powershell
node scripts/check-phase1.mjs 2>&1 | Select-String "FAIL|check.s. failed|PASS  .* PASS"
```

Run checks then build (one after the other):
```powershell
cd C:\Users\user\Videos\SCHOOL\honeytots\pixel-perfect ; npm run check ; npm run build
```

---

End of protocol. Update §3 on every stop.
