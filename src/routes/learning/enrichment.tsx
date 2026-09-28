import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/learning/enrichment")({
  head: () => pageMeta("/learning/enrichment"),
  component: () => <ContentPage path="/learning/enrichment" />,
});
