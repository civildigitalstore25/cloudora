"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  headerReveal,
  staggerContainer,
  viewportOnce,
  wipeUp,
} from "@/components/motion/variants";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { PACKAGES_CONTENT } from "@/constants/content";
import { ROUTES } from "@/constants/routes";
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
            Packages
          </p>
          <h1 className="mt-2 font-display text-[1.75rem] text-dark sm:mt-3 sm:text-4xl md:text-5xl">
            Stays & travel partnerships
          </h1>
          <p className="mt-3 text-sm text-muted sm:text-base">
            For families, friends and corporate groups — up to {UI.maxGuests}{" "}
            guests at {UI.brandFull}.
          </p>
          <div className="mt-4 h-0.5 w-12 bg-accent sm:w-14" />
        </motion.div>

        <motion.div
          className="mt-6 grid gap-4 sm:mt-10 sm:gap-8 lg:grid-cols-2"
          variants={staggerContainer(0.12, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {PACKAGES_CONTENT.map((pkg) => (
            <motion.article
              key={pkg.id}
              variants={wipeUp}
              className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm sm:rounded-3xl"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={pkg.images[0] || ASSETS.PACKAGE}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                <h2 className="font-display text-xl text-dark sm:text-2xl md:text-3xl">
                  {pkg.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                  {pkg.shortDescription}
                </p>
                <p className="mt-2 hidden text-sm leading-relaxed text-muted sm:mt-3 sm:block">
                  {pkg.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="text-sm text-dark">
                      · {item}
                    </li>
                  ))}
                </ul>

                {"enquiryPhones" in pkg && pkg.enquiryPhones ? (
                  <div className="mt-5 space-y-1 text-sm text-dark">
                    <p className="font-semibold">
                      For package enquiries & bookings
                    </p>
                    {pkg.enquiryPhones.map((row) => (
                      <p key={row.phone}>
                        {row.label}:{" "}
                        <a
                          href={`tel:${row.phone.replace(/\s/g, "")}`}
                          className="text-accent-strong"
                        >
                          {row.phone}
                        </a>
                      </p>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <p className="font-display text-lg text-dark">
                    {pkg.priceLabel}
                  </p>
                  <div className="flex w-full gap-2 sm:w-auto">
                    <Button asChild variant="outline" size="sm" className="flex-1 sm:flex-none">
                      <Link href={ROUTES.CONTACT}>Enquire</Link>
                    </Button>
                    <Button asChild variant="default" size="sm" className="flex-1 sm:flex-none">
                      <Link href={ROUTES.BOOK}>Book</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
