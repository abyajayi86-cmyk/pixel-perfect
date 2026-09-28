import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/admissions/requirements")({
  head: () => pageMeta("/admissions/requirements"),
  component: () => <ContentPage path="/admissions/requirements" />,
});
