import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/our-school/safeguarding")({
  head: () => pageMeta("/our-school/safeguarding"),
  component: () => <ContentPage path="/our-school/safeguarding" />,
});
