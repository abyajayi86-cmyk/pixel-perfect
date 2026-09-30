import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink } from "@/components/common/Button";
import { SimplePage, meta } from "@/lib/simple-page";

export const Route = createFileRoute("/parent-portal")({
  head: () => meta("Parent Portal", "The Honeytots parent portal is coming soon."),
  component: () => (
    <SimplePage
      title="Parent Portal"
      eyebrow="Parents"
      intro="A secure space for families is coming soon."
      family="plum"
    >
      <div className="card-surface max-w-2xl p-8">
        <h2 className="text-2xl">Coming soon</h2>
        <p className="mt-3 text-muted-foreground">
          Parents will soon be able to view reports, notices and school updates here. Until then,
          please contact the school office.
        </p>
        <div className="mt-6">
          <ButtonLink to="/contact">Contact the school</ButtonLink>
        </div>
      </div>
    </SimplePage>
  ),
});
