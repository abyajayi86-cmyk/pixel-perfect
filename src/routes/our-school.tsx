import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/our-school")({
  head: () => pageMeta("/our-school"),
  component: () => <ContentPage path="/our-school" />,
});
