import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/parents/health-wellbeing")({
  head: () => pageMeta("/parents/health-wellbeing"),
  component: () => <ContentPage path="/parents/health-wellbeing" />,
});
