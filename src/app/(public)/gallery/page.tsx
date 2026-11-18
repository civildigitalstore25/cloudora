import Image from "next/image";
import { ASSETS } from "@/constants/assets";
import { GALLERY_COPY } from "@/constants/home";

export default function GalleryPage() {
  return (
    <div className="bg-sage px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {GALLERY_COPY.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl text-dark md:text-5xl">
            {GALLERY_COPY.title}
          </h1>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ASSETS.GALLERY.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image src={src} alt="Cloudora gallery" fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {ASSETS.VIDEOS.map((src) => (
            <video
              key={src}
              src={src}
              controls
              className="w-full rounded-2xl bg-dark"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
