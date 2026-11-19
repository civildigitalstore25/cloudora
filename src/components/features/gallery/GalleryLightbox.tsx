"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_PAGE } from "@/constants/gallery";
import type { GalleryItem } from "@/constants/gallery";

export function GalleryLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-primary-strong/95 p-4 sm:p-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
            {item.category}
          </p>
          <p className="mt-1 text-sm text-white/75">
            {index + 1} {GALLERY_PAGE.of} {items.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-full border border-accent/40 p-2.5 text-white hover:border-accent hover:text-accent"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center py-4">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous"
          className="absolute left-0 z-10 rounded-full border border-accent/40 bg-primary-strong/80 p-2.5 text-white hover:bg-accent hover:text-primary-strong sm:left-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative mx-10 aspect-[4/3] w-full max-w-4xl overflow-hidden border border-accent/40 bg-primary-strong sm:mx-16">
          <Image
            src={item.src}
            alt={item.title}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next"
          className="absolute right-0 z-10 rounded-full border border-accent/40 bg-primary-strong/80 p-2.5 text-white hover:bg-accent hover:text-primary-strong sm:right-2"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl text-center sm:text-left">
        <h3 className="font-display text-xl text-white sm:text-2xl">{item.title}</h3>
      </div>
    </div>
  );
}
