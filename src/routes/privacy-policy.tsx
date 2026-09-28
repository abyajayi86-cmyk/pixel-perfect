import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => pageMeta("/privacy-policy"),
  component: () => <ContentPage path="/privacy-policy" />,
});
