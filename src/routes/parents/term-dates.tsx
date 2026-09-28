import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";

export const Route = createFileRoute("/parents/term-dates")({
  head: () => pageMeta("/parents/term-dates"),
  component: () => <ContentPage path="/parents/term-dates" />,
});
