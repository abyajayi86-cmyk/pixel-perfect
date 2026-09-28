import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/learning/digital-learning")({
  head: () => pageMeta("/learning/digital-learning"),
  component: () => <ContentPage path="/learning/digital-learning" />,
});
