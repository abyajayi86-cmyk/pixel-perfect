import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/admissions")({
  head: () => pageMeta("/admissions"),
  component: () => <ContentPage path="/admissions" />,
});
