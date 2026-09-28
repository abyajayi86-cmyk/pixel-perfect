import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/learning/subjects")({
  head: () => pageMeta("/learning/subjects"),
  component: () => <ContentPage path="/learning/subjects" />,
});
