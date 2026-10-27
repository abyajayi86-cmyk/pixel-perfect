import { createFileRoute } from "@tanstack/react-router";
import { ContentPage, pageMeta } from "@/components/common/ContentPage";
import { SchoolPhotoGallery } from "@/components/common/SchoolPhotoGallery";
import { culturePhotos } from "@/content/school-photos";

export const Route = createFileRoute("/learning/culture-values")({
  head: () => pageMeta("/learning/culture-values"),
  component: () => <ContentPage path="/learning/culture-values" appendBody={<SchoolPhotoGallery title="Celebrating our heritage" photos={culturePhotos} />} />,
});
