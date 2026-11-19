"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  headerReveal,
  staggerContainer,
  viewportOnce,
  wipeUp,
} from "@/components/motion/variants";
import { EXPERIENCES, EXPERIENCES_COPY } from "@/constants/home";
import { ROUTES } from "@/constants/routes";

export function ExperiencesSection() {
  return (
    <section className="bg-background px-4 py-16 sm:py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={headerReveal}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-xs">
            {EXPERIENCES_COPY.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-dark sm:text-4xl md:text-5xl">
            {EXPERIENCES_COPY.title}
          </h2>
          <div className="mt-4 h-0.5 w-14 bg-accent" />
        </motion.div>

        <motion.div
          className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3"
          variants={staggerContainer(0.12, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {EXPERIENCES.map((item) => (
            <motion.article
              key={item.id}
              variants={wipeUp}
              className="group relative min-h-[360px] overflow-hidden rounded-2xl sm:min-h-[420px] sm:rounded-3xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-display text-xl text-white sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-white/80">{item.body}</p>
                <Link
                  href={`${ROUTES.EXPERIENCES}?topic=${item.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-accent uppercase transition group-hover:translate-x-1"
                >
                  {EXPERIENCES_COPY.enquire}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
