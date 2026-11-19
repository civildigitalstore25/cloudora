"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/features/contact/ContactForm";
import {
  cornerIn,
  headerReveal,
  lift,
  staggerContainer,
  viewportOnce,
  wipeUp,
} from "@/components/motion/variants";
import { Button } from "@/components/ui/button";
import { EXPERIENCE_ITEMS, EXPERIENCES_PAGE } from "@/constants/experiences";
import { ROUTES } from "@/constants/routes";

export function ExperiencesPageClient() {
  return (
    <div>
      <section className="bg-primary-strong px-4 py-10 text-white sm:py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={headerReveal}
          initial="hidden"
          animate="show"
        >
          <p className="text-[10px] font-semibold tracking-[0.22em] text-accent uppercase sm:text-[11px]">
            {EXPERIENCES_PAGE.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-[1.75rem] leading-tight sm:mt-3 sm:text-4xl md:text-5xl">
            {EXPERIENCES_PAGE.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-base">
            {EXPERIENCES_PAGE.body}
          </p>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-accent sm:mt-5 sm:w-14" />
          <Button asChild variant="accent" size="sm" className="mt-5 sm:mt-8 sm:h-11 sm:px-6">
            <Link href={EXPERIENCES_PAGE.enquireHref}>
              {EXPERIENCES_PAGE.enquireCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      <section className="bg-background px-4 py-10 sm:py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto grid max-w-7xl gap-4 sm:gap-8 md:grid-cols-2"
          variants={staggerContainer(0.12, 0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {EXPERIENCE_ITEMS.map((item) => (
            <motion.article
              key={item.id}
              id={item.id}
              variants={wipeUp}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm sm:rounded-3xl"
            >
              <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-3 left-3 border border-accent/40 bg-primary-strong px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-accent uppercase sm:top-4 sm:left-4 sm:px-3 sm:py-1 sm:text-[10px]">
                  {item.number}
                </span>
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="font-display text-xl text-dark sm:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                  {item.body}
                </p>
                <ul className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
                  {item.details.map((detail) => (
                    <li key={detail} className="text-sm text-dark">
                      <span className="mr-2 text-accent">·</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${ROUTES.CONTACT}?topic=${item.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-accent-strong uppercase transition hover:text-primary sm:mt-5 sm:text-xs"
                >
                  Enquire
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="bg-sage px-4 py-10 sm:py-16 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 sm:gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <motion.div
            variants={lift}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="rounded-2xl border border-accent/30 bg-primary-strong p-4 text-white sm:p-8"
          >
            <p className="text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
              Ready when you are
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl">
              Tell us how you’d like to experience Cloudora
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Share your dates, group size and preferred experience — we’ll help
              you shape the stay.
            </p>
          </motion.div>
          <motion.div
            variants={cornerIn}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6"
          >
            <h3 className="font-display text-xl text-dark sm:text-2xl">
              Experience enquiry
            </h3>
            <div className="mt-5">
              <ContactForm defaultSubject="Experience enquiry" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
