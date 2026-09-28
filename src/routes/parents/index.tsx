import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/parents/")({
  head: () => pageMeta("/parents"),
  component: () => <ContentPage path="/parents" />,
});
