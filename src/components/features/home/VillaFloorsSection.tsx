"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  headerReveal,
  staggerContainer,
  viewportOnce,
  wipeUp,
} from "@/components/motion/variants";
import { VILLA_COPY, VILLA_FLOORS } from "@/constants/home";

export function VillaFloorsSection() {
  return (
    <section className="bg-background px-4 py-14 sm:py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={headerReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-xs">
            {VILLA_COPY.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-dark sm:text-4xl md:text-5xl">
            {VILLA_COPY.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {VILLA_COPY.subtitle}
          </p>
          <div className="mx-auto mt-4 h-0.5 w-14 bg-accent" />
        </motion.div>

        {/* Mobile: side-by-side floor previews; desktop: full cards */}
        <motion.div
          className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4 md:grid-cols-2 md:gap-8"
          variants={staggerContainer(0.1, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {VILLA_FLOORS.map((floor) => (
            <motion.article
              key={floor.id}
              variants={wipeUp}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm sm:rounded-3xl"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src={floor.image}
                  alt={floor.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
              </div>
              <div className="p-3 sm:p-6 md:p-8">
                <p className="text-[9px] font-semibold tracking-[0.16em] text-accent uppercase sm:text-xs">
                  {floor.label}
                </p>
                <h3 className="mt-1 font-display text-base text-dark sm:mt-2 sm:text-2xl md:text-3xl">
                  {floor.title}
                </h3>
                <ul className="mt-3 hidden gap-3 sm:mt-6 sm:grid sm:grid-cols-1 md:grid-cols-2">
                  {floor.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
