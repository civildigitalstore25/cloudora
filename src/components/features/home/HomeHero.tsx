"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { HERO_COPY } from "@/constants/home";
import { ROUTES } from "@/constants/routes";

export function HomeHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={ASSETS.HERO}
        alt="Kodaikanal mountain view"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-28 pt-28 md:px-6 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold tracking-[0.22em] text-accent uppercase"
        >
          {HERO_COPY.eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-5 max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {HERO_COPY.titleLine1}
          <br />
          <em className="italic">{HERO_COPY.titleLine2Italic}</em>
          {HERO_COPY.titleLine2After}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 max-w-xl text-base text-white/85 md:text-lg"
        >
          {HERO_COPY.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button asChild variant="accent" size="lg">
            <Link href={ROUTES.PACKAGES}>{HERO_COPY.primaryCta}</Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <Link href={ROUTES.VILLA}>{HERO_COPY.secondaryCta}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
