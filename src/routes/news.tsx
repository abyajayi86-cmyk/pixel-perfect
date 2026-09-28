import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/news")({
  head: () => pageMeta("/news"),
  component: () => <ContentPage path="/news" />,
});
