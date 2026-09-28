import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/admissions/fees")({
  head: () => pageMeta("/admissions/fees"),
  component: () => <ContentPage path="/admissions/fees" />,
});
