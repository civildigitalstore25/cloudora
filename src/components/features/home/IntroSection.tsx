"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ASSETS } from "@/constants/assets";
import { INTRO_COPY } from "@/constants/home";

export function IntroSection() {
  return (
    <section className="bg-background px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src={ASSETS.INTRO}
              alt="Cloudora interior"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-primary-strong px-5 py-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase whitespace-nowrap">
            {INTRO_COPY.badge}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {INTRO_COPY.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl text-dark md:text-5xl">
            {INTRO_COPY.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            {INTRO_COPY.body}
          </p>
          <div className="mt-10 flex gap-12">
            {INTRO_COPY.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl text-dark md:text-5xl">
                  {stat.value}
                  <span className="ml-1 text-2xl">{stat.label}</span>
                </p>
                <p className="mt-2 text-sm text-muted">{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
