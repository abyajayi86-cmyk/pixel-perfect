import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/our-school/about")({
  head: () => pageMeta("/our-school/about"),
  component: () => <ContentPage path="/our-school/about" />,
});
