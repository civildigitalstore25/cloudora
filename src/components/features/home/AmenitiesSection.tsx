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
import { AMENITIES, AMENITIES_COPY } from "@/constants/home";
import { cn } from "@/lib/utils/cn";

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
    <section className="bg-primary-strong px-4 py-20 text-accent md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase">
              {AMENITIES_COPY.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl text-accent md:text-5xl">
              {AMENITIES_COPY.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-accent/80 md:text-right">
            {AMENITIES_COPY.body}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 border border-accent/20 md:grid-cols-4">
          {AMENITIES.map((item, index) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? BedDouble;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "flex flex-col gap-3 border-accent/20 p-5 md:p-6",
                  "border-r border-b",
                )}
              >
                <Icon className="h-5 w-5" />
                <p className="text-sm font-medium">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
