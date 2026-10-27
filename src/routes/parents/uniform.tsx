import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";
import { SchoolPhotoGallery } from "@/components/common/SchoolPhotoGallery";
import { uniformPhotos } from "@/content/school-photos";

export const Route = createFileRoute("/parents/uniform")({
  head: () => pageMeta("/parents/uniform"),
  component: () => <ContentPage path="/parents/uniform" appendBody={<SchoolPhotoGallery title="Uniform photographs" photos={uniformPhotos} />} />,
});
