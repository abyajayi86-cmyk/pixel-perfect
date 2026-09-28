import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/our-school/vision-values")({
  head: () => pageMeta("/our-school/vision-values"),
  component: () => <ContentPage path="/our-school/vision-values" />,
});
