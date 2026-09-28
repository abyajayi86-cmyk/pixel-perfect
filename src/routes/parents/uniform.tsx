import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/parents/uniform")({
  head: () => pageMeta("/parents/uniform"),
  component: () => <ContentPage path="/parents/uniform" />,
});
