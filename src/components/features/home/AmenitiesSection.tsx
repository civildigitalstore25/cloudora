"use client";

import {
  BedDouble,
  Car,
  Droplets,
  Flame,
  Heart,
  Mountain,
  Sofa,
  Tv,
  Users,
  UtensilsCrossed,
  Wifi,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  headerReveal,
  staggerContainer,
  viewportOnce,
  wipeUp,
} from "@/components/motion/variants";
import { AMENITIES, AMENITIES_COPY } from "@/constants/home";

const ICONS = {
  bed: BedDouble,
  users: Users,
  mountain: Mountain,
  car: Car,
  wifi: Wifi,
  utensils: UtensilsCrossed,
  flame: Flame,
  tv: Tv,
  heart: Heart,
  droplets: Droplets,
  zap: Zap,
  sofa: Sofa,
} as const;

export function AmenitiesSection() {
  return (
    <section className="bg-primary-strong px-4 py-14 text-accent sm:py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between"
          variants={headerReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase sm:text-xs">
              {AMENITIES_COPY.eyebrow}
            </p>
            <h2 className="mt-2 max-w-xl font-display text-3xl text-accent sm:mt-3 sm:text-4xl md:text-5xl">
              {AMENITIES_COPY.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-accent/80 md:text-right">
            {AMENITIES_COPY.body}
          </p>
        </motion.div>
        <div className="mt-4 h-0.5 w-14 bg-accent/70" />

        <motion.div
          className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4"
          variants={staggerContainer(0.05, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {AMENITIES.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? BedDouble;
            return (
              <motion.div
                key={item.id}
                variants={wipeUp}
                className="group flex flex-col gap-3 rounded-2xl border border-accent/25 bg-primary/25 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/55 hover:bg-primary/40 sm:p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-primary-strong text-accent transition group-hover:border-accent group-hover:bg-accent group-hover:text-primary-strong sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <p className="text-xs leading-snug font-medium sm:text-sm">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
