"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Maximize2 } from "lucide-react";
import { GalleryLightbox } from "@/components/features/gallery/GalleryLightbox";
import {
  easeOut,
  headerReveal,
  staggerContainer,
  swingIn,
} from "@/components/motion/variants";
import { ASSETS } from "@/constants/assets";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  GALLERY_PAGE,
  type GalleryCategoryId,
} from "@/constants/gallery";
import { cn } from "@/lib/utils/cn";

function spanClass(span?: "tall" | "wide" | "normal") {
  if (span === "tall") return "row-span-2 min-h-[220px] sm:min-h-[420px]";
  if (span === "wide") return "col-span-2 min-h-[140px] sm:min-h-[280px]";
  return "min-h-[140px] sm:min-h-[260px]";
}

export function GalleryPageClient() {
  const [category, setCategory] = useState<GalleryCategoryId>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      category === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === category),
    [category],
  );

  return (
    <div className="bg-sage">
      <section className="px-4 py-8 sm:py-16 md:px-6 md:py-20">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={headerReveal}
          initial="hidden"
          animate="show"
        >
          <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.22em] text-primary uppercase sm:text-[11px]">
            <Camera className="h-3.5 w-3.5 text-accent-strong" />
            {GALLERY_PAGE.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-[1.75rem] text-dark sm:mt-3 sm:text-4xl md:text-5xl">
            {GALLERY_PAGE.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
            {GALLERY_PAGE.body}
          </p>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-accent sm:mt-5 sm:w-14" />
        </motion.div>

        <motion.div
          className="mx-auto mt-5 flex max-w-5xl gap-1.5 overflow-x-auto pb-1 sm:mt-10 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:pb-0"
          variants={staggerContainer(0.05, 0.05)}
          initial="hidden"
          animate="show"
        >
          {GALLERY_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              variants={swingIn}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "shrink-0 border px-2.5 py-1.5 text-[9px] font-bold tracking-widest uppercase transition sm:px-4 sm:py-2 sm:text-xs",
                category === cat.id
                  ? "border-accent bg-accent text-primary-strong"
                  : "border-accent/30 bg-card text-dark hover:border-accent hover:text-accent-strong",
              )}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="mx-auto mt-5 grid max-w-7xl grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, rotate: -2, y: 18 }}
                animate={{ opacity: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.03, ease: easeOut }}
                onClick={() => setLightboxIndex(idx)}
                className={cn(
                  "group relative overflow-hidden border border-accent/20 bg-card text-left shadow-sm",
                  spanClass(item.span),
                )}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-strong/85 via-transparent to-transparent sm:bg-primary-strong/80 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100" />
                <div className="absolute inset-0 z-[1] flex flex-col justify-between p-2.5 sm:p-5 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
                  <span className="hidden self-end rounded-full bg-accent p-2 text-primary-strong sm:inline-flex">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  <div className="mt-auto">
                    <p className="text-[8px] font-bold tracking-widest text-accent uppercase sm:text-[10px]">
                      {item.category}
                    </p>
                    <p className="mt-0.5 line-clamp-2 font-display text-sm text-white sm:mt-1 sm:text-xl">
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="border-t border-border/60 bg-background px-4 py-10 sm:py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-xl text-dark sm:text-3xl">
            {GALLERY_PAGE.videosTitle}
          </h2>
          <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-2">
            {ASSETS.VIDEOS.map((src) => (
              <video
                key={src}
                src={src}
                controls
                playsInline
                className="w-full border border-accent/20 bg-dark"
              />
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev === null
                ? 0
                : prev === 0
                  ? items.length - 1
                  : prev - 1,
            )
          }
          onNext={() =>
            setLightboxIndex((prev) =>
              prev === null
                ? 0
                : prev === items.length - 1
                  ? 0
                  : prev + 1,
            )
          }
        />
      ) : null}
    </div>
  );
}
