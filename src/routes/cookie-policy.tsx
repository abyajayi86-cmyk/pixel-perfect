import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () => pageMeta("/cookie-policy"),
  component: () => <ContentPage path="/cookie-policy" />,
});
