"use client";

import { motion } from "framer-motion";
import { PackageCard } from "@/components/features/packages/PackageCard";
import {
  headerReveal,
  staggerContainer,
} from "@/components/motion/variants";
import { PACKAGES_CONTENT } from "@/constants/content";
import { PACKAGES_PAGE } from "@/constants/packages";
import { UI } from "@/constants/ui";

export default function PackagesPage() {
  return (
    <div className="bg-background px-4 py-8 sm:py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={headerReveal}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <p className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-[11px]">
            {PACKAGES_PAGE.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-[1.75rem] text-dark sm:mt-3 sm:text-4xl md:text-5xl">
            {PACKAGES_PAGE.title}
          </h1>
          <p className="mt-3 text-sm text-muted sm:text-base">
            {PACKAGES_PAGE.body} Up to {UI.maxGuests} guests at {UI.brandFull}.
          </p>
          <div className="mt-4 h-0.5 w-12 bg-accent sm:w-14" />
        </motion.div>

        <motion.div
          className="mt-6 grid gap-5 sm:mt-10 sm:gap-8 lg:grid-cols-2 lg:items-stretch"
          variants={staggerContainer(0.14, 0.12)}
          initial="hidden"
          animate="show"
        >
          {PACKAGES_CONTENT.map((pkg) => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              name={pkg.name}
              shortDescription={pkg.shortDescription}
              description={pkg.description}
              images={pkg.images}
              includes={pkg.includes}
              priceLabel={pkg.priceLabel}
              enquiryPhones={
                "enquiryPhones" in pkg ? pkg.enquiryPhones : undefined
              }
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
