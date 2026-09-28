import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/admissions/entry-guide")({
  head: () => pageMeta("/admissions/entry-guide"),
  component: () => <ContentPage path="/admissions/entry-guide" />,
});
