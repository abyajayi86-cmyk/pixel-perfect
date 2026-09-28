import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/our-school/policies")({
  head: () => pageMeta("/our-school/policies"),
  component: () => <ContentPage path="/our-school/policies" />,
});
