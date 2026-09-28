import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/learning/curriculum")({
  head: () => pageMeta("/learning/curriculum"),
  component: () => <ContentPage path="/learning/curriculum" />,
});
