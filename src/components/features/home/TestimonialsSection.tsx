"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/constants/content";
import { TESTIMONIALS_COPY } from "@/constants/home";

export function TestimonialsSection() {
  return (
    <section className="bg-background px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {TESTIMONIALS_COPY.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-dark md:text-5xl">
            {TESTIMONIALS_COPY.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm md:p-8"
            >
              <p className="text-base leading-relaxed text-dark md:text-lg">
                “{item.body}”
              </p>
              <footer className="mt-6">
                <p className="font-semibold text-dark">{item.name}</p>
                <p className="mt-1 text-sm text-muted">{item.date}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
