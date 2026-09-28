import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/our-school/welcome")({
  head: () => pageMeta("/our-school/welcome"),
  component: () => <ContentPage path="/our-school/welcome" />,
});
