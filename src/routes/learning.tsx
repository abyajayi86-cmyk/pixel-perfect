import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/learning")({
  head: () => pageMeta("/learning"),
  component: () => <ContentPage path="/learning" />,
});
