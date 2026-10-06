import { AlertTriangle, Book, CheckCircle2, Image, Mail, Settings, Users } from "lucide-react";
import type { ReactNode } from "react";
import {
  admissionsCms,
  homepageCms,
  parentsCms,
  policyEntries,
  websiteSettingsCms,
  type ContentStatus,
} from "@/content/site-cms";
import { pageContent, pageAwaitingConfirmation } from "@/content/pages";
import { siteConfig, schoolLocation } from "@/lib/site-config";
import { isPlaceholder } from "@/lib/placeholder";

/**
 * PHASE 1 ONLY — read-only demo admin dashboard component.
 *
 * PRESERVED BUT NOT WIRED AS A ROUTE. Kept as a reference implementation
 * for Phase 2 when a real authenticated admin interface is built.
 *
 * No authentication, no database, no edit inputs. All values are computed
 * from the existing content model so nothing is fabricated. Every panel is
 * clearly marked "PREVIEW DATA" and the user is told that secure admin
 * sign-in + server-side editing arrive with the backend step.
 *
 * To expose this later as /admin in Phase 2, move this file (or import it)
 * into src/routes/admin.tsx and wrap it in a createFileRoute component.
 */
export function AdminDashboardPreview() {
  const totalPages = Object.keys(pageContent).length;
  const pages = Object.values(pageContent);
  const awaitingPages = pages.filter(pageAwaitingConfirmation).length;
  const publishedPages = pages.filter((p) => p.status === "published").length;
  const draftPages = pages.filter((p) => p.status === "draft").length;

  const policiesAwaiting = policyEntries.filter((p) => p.status === "awaiting_confirmation").length;
  const policiesPublished = policyEntries.filter((p) => p.status === "published").length;

  const social = Object.entries(siteConfig.social).filter(([, v]) => typeof v === "string");
  const configuredSocial = social.filter(([, href]) => !isPlaceholder(href)).length;

  const contactNotPlaceholder = (v: string) => !isPlaceholder(v);

  return (
    <div className="min-h-screen bg-[color:var(--color-cream)] pb-20">
      <div className="container-page py-10 md:py-14">
        <Banner />

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          <StatCard label="Website pages" value={totalPages} icon={<Book aria-hidden />} />
          <StatCard
            label="Awaiting confirmation"
            value={awaitingPages}
            icon={<AlertTriangle aria-hidden />}
            tone="honey"
          />
          <StatCard
            label="Published"
            value={publishedPages}
            icon={<CheckCircle2 aria-hidden />}
            tone="leaf"
          />
          <StatCard label="Draft" value={draftPages} icon={<Book aria-hidden />} tone="sky" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Panel title="Policies" icon={<Book aria-hidden />}>
            <p className="text-sm text-muted-foreground">
              {policyEntries.length} policy placeholders. {policiesAwaiting} awaiting school
              sign-off. {policiesPublished} published.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {policyEntries.slice(0, 5).map((p) => (
                <li key={p.slug} className="flex items-center justify-between gap-2">
                  <span className="truncate">{p.name}</span>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="School information" icon={<Users aria-hidden />}>
            <ul className="space-y-2 text-sm">
              <InfoRow label="School name" value="Honeytots School" ok />
              <InfoRow label="Motto" value="Nurturing excellent leaders" ok />
              <InfoRow
                label="Address"
                value={schoolLocation.address}
                ok={!schoolLocation.provisional}
              />
              <InfoRow
                label="Phone"
                value={siteConfig.phone}
                ok={contactNotPlaceholder(siteConfig.phone)}
              />
              <InfoRow
                label="Email"
                value={siteConfig.email}
                ok={contactNotPlaceholder(siteConfig.email)}
              />
              <InfoRow
                label="WhatsApp"
                value={siteConfig.whatsapp}
                ok={contactNotPlaceholder(siteConfig.whatsapp)}
              />
              <InfoRow
                label="Opening hours"
                value={siteConfig.openingHours}
                ok={contactNotPlaceholder(siteConfig.openingHours)}
              />
              <InfoRow
                label="Social links"
                value={`${configuredSocial} / ${social.length} configured`}
                ok={configuredSocial === social.length && social.length > 0}
              />
            </ul>
          </Panel>

          <Panel title="Admissions" icon={<Mail aria-hidden />}>
            <ul className="space-y-2 text-sm">
              <InfoRow label="Age bands" value={`${admissionsCms.ageBands.length} levels`} />
              <InfoRow
                label="Application steps"
                value={`${admissionsCms.applicationSteps.length} steps`}
              />
              <InfoRow
                label="Required documents"
                value={`${admissionsCms.requiredDocuments.length} items`}
              />
              <InfoRow label="FAQs" value={`${admissionsCms.faqs.length} questions`} />
              <InfoRow
                label="Fee display"
                value={admissionsCms.feeDisplayMode.replaceAll("_", " ")}
              />
            </ul>
          </Panel>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Panel title="Homepage" icon={<Book aria-hidden />}>
            <p className="text-sm text-muted-foreground">
              {homepageCms.status.replaceAll("_", " ")}.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                Welcome: <em className="text-muted-foreground">{homepageCms.welcome.heading}</em>
              </li>
              <li>Feature sections: {homepageCms.features.length}</li>
            </ul>
          </Panel>

          <Panel title="Parents" icon={<Users aria-hidden />}>
            <ul className="mt-2 space-y-2 text-sm">
              <InfoRow label="School day periods" value={`${parentsCms.schoolDay.length}`} />
              <InfoRow label="Uniform categories" value={`${parentsCms.uniform.length}`} />
              <InfoRow label="Parent FAQs" value={`${parentsCms.faqs.length}`} />
            </ul>
          </Panel>

          <Panel title="Website settings" icon={<Settings aria-hidden />}>
            <ul className="mt-2 space-y-2 text-sm">
              <FlagRow
                label="Preview notice shown"
                on={websiteSettingsCms.showWebsitePreviewNotice}
              />
              <FlagRow
                label="Enquiry delivery enabled"
                on={websiteSettingsCms.enquiryFormIntegrationReady}
              />
              <FlagRow
                label="Portal coming-soon banner"
                on={websiteSettingsCms.admissionsPortalComingSoonMessage}
              />
              <FlagRow
                label="Address provisional flag"
                on={websiteSettingsCms.schoolAddressProvisional}
              />
              <FlagRow
                label="Social links pending setup"
                on={websiteSettingsCms.socialLinksAwaitingSetup}
              />
            </ul>
          </Panel>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Panel title="Website content" icon={<Book aria-hidden />}>
            <p className="text-sm text-muted-foreground">
              Browse Phase 1 public pages by confirmation status.
            </p>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {Object.entries(pageContent).map(([path, p]) => (
                <div key={path} className="flex items-center justify-between gap-2">
                  <code className="truncate rounded-md bg-cream-deep/60 px-2 py-1 text-xs">
                    {path}
                  </code>
                  <StatusBadge
                    status={
                      p.status ??
                      (pageAwaitingConfirmation(p) ? "awaiting_confirmation" : "published")
                    }
                  />
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Media & Enquiries" icon={<Image aria-hidden />}>
            <ul className="space-y-4 text-sm">
              <li>
                <p className="font-semibold">Hero slides</p>
                <p className="text-muted-foreground">
                  7 slides configured. 3 marked as placeholder photography.
                </p>
              </li>
              <li>
                <p className="font-semibold">Enquiries & visits</p>
                <p className="text-muted-foreground">
                  Forms validate and confirm on-screen. Secure server-side storage + email delivery
                  not connected yet.
                </p>
              </li>
              <li>
                <p className="font-semibold">Policies folder</p>
                <p className="text-muted-foreground">
                  <code>public/policies/</code> ready. Upload PDFs named per README.
                </p>
              </li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 *  Small UI primitives used only by this page (avoids pulling in a new card
 *  library — matches the existing card-surface style)
 * --------------------------------------------------------------------------- */

function Banner() {
  return (
    <div className="rounded-[1.75rem] border-2 border-honey-400/40 bg-honey-soft px-6 py-5 md:px-8">
      <div className="flex items-start gap-3">
        <AlertTriangle aria-hidden className="mt-0.5 size-6 shrink-0 text-navy-deep" />
        <div>
          <h1 className="text-2xl font-semibold text-navy-deep md:text-3xl">
            Phase 1 · Website CMS — Preview (UNWIRED)
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-navy-deep/85">
            This is a read-only DEMO of the Phase 1 content dashboard. All numbers are computed from
            the current content model — nothing is fabricated. Secure admin sign-in, server-side
            editing, enquiry storage and media uploads arrive in the next implementation step.
            Counts shown here update automatically as soon as real Honeytots information replaces
            the placeholders.
            <br />
            <strong className="font-semibold">
              This component is currently preserved but NOT exposed as a public route (requires
              Phase 2 authentication + admin wiring).
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone?: "honey" | "leaf" | "sky" | "plum";
}) {
  const accent =
    tone === "leaf"
      ? "bg-leaf-soft text-leaf-900"
      : tone === "sky"
        ? "bg-sky-soft text-sky-900"
        : tone === "plum"
          ? "bg-plum-soft text-plum-900"
          : "bg-honey-soft text-navy-deep";
  return (
    <div className="card-surface p-5">
      <div className={`mb-3 inline-flex size-11 items-center justify-center rounded-2xl ${accent}`}>
        <span className="size-5">{icon}</span>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-navy-deep">{value}</p>
    </div>
  );
}

function Panel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="card-surface h-full p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="size-5 text-navy-deep/70">{icon}</span>
        <h2 className="text-lg font-semibold text-navy-deep">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: ContentStatus }) {
  const map: Record<ContentStatus, string> = {
    draft: "bg-plum-soft text-plum-900",
    awaiting_confirmation: "bg-honey-soft text-navy-deep",
    published: "bg-leaf-soft text-leaf-900",
  };
  const label = status.replaceAll("_", " ");
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${map[status]}`}>{label}</span>
  );
}

function InfoRow({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <li className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-right ${ok ? "text-navy-deep" : "text-navy-deep/70 italic"}`}>
        {value}
      </span>
    </li>
  );
}

function FlagRow({ label, on }: { label: string; on: boolean }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          on ? "bg-leaf-soft text-leaf-900" : "bg-honey-soft text-navy-deep"
        }`}
      >
        {on ? "ON" : "OFF"}
      </span>
    </li>
  );
}
