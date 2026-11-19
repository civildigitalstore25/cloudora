"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { headerReveal, viewportOnce } from "@/components/motion/variants";
import { GALLERY_TEASER } from "@/constants/assets";
import { GALLERY_COPY } from "@/constants/home";
import { ROUTES } from "@/constants/routes";

export function GalleryTeaserSection() {
  const [a, b, c, d, e] = GALLERY_TEASER;

  return (
    <section className="bg-sage px-4 py-14 sm:py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          variants={headerReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-xs">
            {GALLERY_COPY.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-dark sm:text-4xl md:text-5xl">
            {GALLERY_COPY.title}
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-14 bg-accent" />
        </motion.div>

        <Link href={ROUTES.GALLERY} className="mt-8 block sm:mt-12">
          {/* Mobile bento: large top + two under + wide bottom */}
          <div className="grid gap-2 sm:hidden">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src={c} alt="" fill className="object-cover" sizes="100vw" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={a} alt="" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={d} alt="" fill className="object-cover" sizes="50vw" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={b} alt="" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={e} alt="" fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          </div>

          {/* Desktop / tablet mosaic */}
          <div className="hidden gap-3 sm:grid sm:grid-cols-3 sm:grid-rows-2 sm:gap-4">
            <div className="relative min-h-[180px] overflow-hidden rounded-2xl">
              <Image src={a} alt="" fill className="object-cover" sizes="33vw" />
            </div>
            <div className="relative row-span-2 min-h-[380px] overflow-hidden rounded-2xl">
              <Image src={c} alt="" fill className="object-cover" sizes="33vw" />
            </div>
            <div className="relative min-h-[180px] overflow-hidden rounded-2xl">
              <Image src={d} alt="" fill className="object-cover" sizes="33vw" />
            </div>
            <div className="relative min-h-[180px] overflow-hidden rounded-2xl">
              <Image src={b} alt="" fill className="object-cover" sizes="33vw" />
            </div>
            <div className="relative min-h-[180px] overflow-hidden rounded-2xl">
              <Image src={e} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
