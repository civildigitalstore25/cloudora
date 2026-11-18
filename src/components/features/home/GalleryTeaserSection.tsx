import Image from "next/image";
import Link from "next/link";
import { ASSETS } from "@/constants/assets";
import { GALLERY_COPY } from "@/constants/home";
import { ROUTES } from "@/constants/routes";

export function GalleryTeaserSection() {
  const [a, b, c, d, e] = ASSETS.GALLERY;

  return (
    <section className="bg-sage px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {GALLERY_COPY.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-dark md:text-5xl">
            {GALLERY_COPY.title}
          </h2>
        </div>

        <Link href={ROUTES.GALLERY} className="mt-12 block">
          <div className="grid gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[180px]">
              <Image src={a} alt="" fill className="object-cover" />
            </div>
            <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[380px]">
              <Image src={c} alt="" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[180px]">
              <Image src={d} alt="" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[180px]">
              <Image src={b} alt="" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[180px]">
              <Image src={e} alt="" fill className="object-cover" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
