import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/learning/early-years")({
  head: () => pageMeta("/learning/early-years"),
  component: () => <ContentPage path="/learning/early-years" />,
});
