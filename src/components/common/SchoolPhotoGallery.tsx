import type { SchoolPhoto } from "@/content/school-photos";

export function SchoolPhotoGallery({ title, photos }: { title: string; photos: SchoolPhoto[] }) {
  return (
    <section aria-label={title}>
      <h2 className="text-2xl md:text-3xl">{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {photos.map((photo) => (
          <figure key={photo.src} className="min-w-0">
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full rounded-lg bg-card object-contain"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}