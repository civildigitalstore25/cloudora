"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  rise,
  slideLeft,
  slideRight,
  staggerContainer,
  viewportOnce,
} from "@/components/motion/variants";
import { ASSETS } from "@/constants/assets";
import { INTRO_COPY } from "@/constants/home";

export function IntroSection() {
  return (
    <section id="intro" className="bg-background px-4 py-14 sm:py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-16">
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-3 hidden translate-x-3 translate-y-3 border border-accent/35 md:block" />

          {/* Mobile bento: large top + two under */}
          <div className="grid gap-2 sm:hidden">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-accent/30">
              <Image
                src={ASSETS.INTRO}
                alt="Cloudora living space"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-accent/30">
                <Image
                  src={ASSETS.EXTERIOR[0]}
                  alt="Cloudora villa exterior"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-accent/30">
                <Image
                  src={ASSETS.AMENITIES[0]}
                  alt="Cloudora campfire terrace"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>

          {/* Desktop collage: tall + two stacked */}
          <div className="hidden grid-cols-[1.2fr_0.8fr] gap-3 sm:grid">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-accent/30">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={ASSETS.INTRO}
                  alt="Cloudora living space"
                  fill
                  className="object-cover"
                  sizes="35vw"
                />
              </motion.div>
            </div>
            <div className="grid h-full min-h-[240px] grid-rows-2 gap-3">
              <div className="relative min-h-0 overflow-hidden rounded-3xl border border-accent/30">
                <Image
                  src={ASSETS.EXTERIOR[0]}
                  alt="Cloudora villa exterior"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative min-h-0 overflow-hidden rounded-3xl border border-accent/30">
                <Image
                  src={ASSETS.AMENITIES[0]}
                  alt="Cloudora campfire terrace"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-3 left-3 z-10 rounded-full bg-primary-strong px-3 py-1.5 text-[9px] font-semibold tracking-[0.12em] text-accent uppercase sm:bottom-4 sm:left-4 sm:px-4 sm:text-[10px]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.45 }}
          >
            {INTRO_COPY.badge}
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p
            variants={slideRight}
            className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-xs"
          >
            {INTRO_COPY.eyebrow}
          </motion.p>
          <motion.h2
            variants={slideRight}
            className="mt-3 font-display text-3xl text-dark sm:mt-4 sm:text-4xl md:text-5xl"
          >
            {INTRO_COPY.title}
          </motion.h2>
          <motion.p
            variants={rise}
            className="mt-4 text-sm leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg"
          >
            {INTRO_COPY.body}
          </motion.p>
          <motion.p
            variants={rise}
            className="mt-3 text-sm leading-relaxed text-muted sm:text-base md:text-lg"
          >
            {INTRO_COPY.closing}
          </motion.p>
          <motion.div
            variants={rise}
            className="mt-8 grid grid-cols-3 gap-2 border-t border-border/70 pt-6 sm:mt-10 sm:gap-4"
          >
            {INTRO_COPY.stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-accent pl-2.5 sm:pl-4">
                <p className="font-display text-xl text-dark sm:text-3xl md:text-5xl">
                  {stat.value}
                  <span className="ml-0.5 text-xs sm:ml-1 sm:text-lg md:text-2xl">
                    {stat.label}
                  </span>
                </p>
                <p className="mt-1 text-[10px] leading-snug text-muted sm:text-xs md:text-sm">
                  {stat.sub}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
