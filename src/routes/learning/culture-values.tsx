import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/learning/culture-values")({
  head: () => pageMeta("/learning/culture-values"),
  component: () => <ContentPage path="/learning/culture-values" />,
});
