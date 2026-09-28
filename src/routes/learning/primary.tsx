import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/learning/primary")({
  head: () => pageMeta("/learning/primary"),
  component: () => <ContentPage path="/learning/primary" />,
});
