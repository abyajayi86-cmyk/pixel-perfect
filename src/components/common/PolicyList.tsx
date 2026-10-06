import { AlertCircle, Download, FileText, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { policyEntries, type ContentStatus, type PoliciesCmsEntry } from "@/content/site-cms";

/**
 * Accessible text label for each content status.
 *
 * NFR: status badges must never rely on colour alone — a text label is always
 * shown alongside the colour variant so screen-reader and low-vision users
 * understand the state.
 */
const STATUS_META: Record<
  ContentStatus,
  { label: string; variant: "outline" | "secondary" | "default" }
> = {
  draft: { label: "Draft", variant: "outline" },
  awaiting_confirmation: { label: "Awaiting school confirmation", variant: "secondary" },
  published: { label: "Published", variant: "default" },
};

function StatusBadge({ status }: { status: ContentStatus }) {
  const meta = STATUS_META[status];
  return (
    <Badge variant={meta.variant} className="inline-flex items-center gap-1.5 font-medium">
      {meta.variant === "default" ? (
        <ShieldCheck aria-hidden="true" className="size-3.5" />
      ) : meta.variant === "secondary" ? (
        <AlertCircle aria-hidden="true" className="size-3.5" />
      ) : null}
      <span>{meta.label}</span>
    </Badge>
  );
}

/**
 * Extra notice rendered above policy cards whose text copy and/or uploaded
 * document has not been signed off by the school leadership in writing.
 *
 * Safeguarding and Privacy are the two policies the spec requires to be
 * visibly flagged this way during Phase 1 preview.
 */
function SchoolApprovalNotice({ name }: { name: string }) {
  return (
    <p className="mb-4 flex items-start gap-2 rounded-2xl bg-honey-soft px-4 py-3 text-sm leading-relaxed text-navy-deep">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>
        <strong className="font-bold">Requires final school approval.</strong> The final version of
        the {name} policy (and its wording) will be reviewed and signed off by Honeytots leadership
        before the website goes live.
      </span>
    </p>
  );
}

function PolicyCard({ entry }: { entry: PoliciesCmsEntry }) {
  const hasApproval = entry.lastConfirmedBySchool;
  const hasFile = Boolean(entry.file && entry.file.trim().length > 0);

  return (
    <Card className="overflow-hidden rounded-[1.5rem] border border-card bg-card shadow-[var(--shadow-card)] transition hover:shadow-none">
      <CardContent className="p-5 md:p-6">
        {!hasApproval ? <SchoolApprovalNotice name={entry.name} /> : null}

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex size-9 items-center justify-center rounded-full bg-cream-deep text-navy">
            <FileText aria-hidden="true" className="size-4.5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-navy">{entry.name}</h3>
          </div>
          <StatusBadge status={entry.status} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
          {entry.description}
        </p>

        <dl className="mt-5 grid gap-x-5 gap-y-2 text-sm text-muted-foreground sm:grid-cols-2">
          {entry.version ? (
            <>
              <dt className="font-semibold text-navy">Version</dt>
              <dd>{entry.version}</dd>
            </>
          ) : null}
          {entry.effectiveDate ? (
            <>
              <dt className="font-semibold text-navy">Effective date</dt>
              <dd>{entry.effectiveDate}</dd>
            </>
          ) : null}
        </dl>

        <div className="mt-5">
          {hasFile ? (
            <a
              href={entry.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream hover:bg-navy-deep"
              aria-label={`Download ${entry.name} document (opens in a new tab)`}
            >
              <Download aria-hidden="true" className="size-4" />
              <span>Download policy</span>
            </a>
          ) : (
            <p className="inline-flex items-center gap-2 rounded-full bg-cream-deep px-4 py-2 text-sm font-semibold text-navy-tint">
              <FileText aria-hidden="true" className="size-4" />
              <span>Document pending — awaiting school upload</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Shared renderer reused on `/policies` (parent downloads) and
 * `/our-school/policies` (school governance list).
 *
 * Reads every entry from the single policy registry in site-cms.ts so the
 * two pages can never get out of sync — a single source of truth for Phase 1.
 */
export function PolicyList() {
  return (
    <section className="mt-10 space-y-5">
      {policyEntries.map((entry) => (
        <PolicyCard key={entry.slug} entry={entry} />
      ))}
    </section>
  );
}
