import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";
import { EventList } from "@/components/common/EventList";

export const Route = createFileRoute("/calendar")({
  head: () => pageMeta("/calendar"),
  component: () => <ContentPage path="/calendar" appendBody={<EventList />} />,
});
