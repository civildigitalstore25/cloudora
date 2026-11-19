"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { HERO_COPY } from "@/constants/home";
import { ROUTES } from "@/constants/routes";
import { easeOut, rise, staggerContainer } from "@/components/motion/variants";

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: easeOut }}
      >
        <Image
          src={ASSETS.HERO}
          alt="Cloudora villa exterior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-strong/50 via-transparent to-black/20" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-28 pt-28 sm:px-6 md:pb-32">
        <motion.div
          variants={staggerContainer(0.1, 0.12)}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={rise}
            className="text-[11px] font-semibold tracking-[0.22em] text-accent uppercase sm:text-xs"
          >
            {HERO_COPY.eyebrow}
          </motion.p>

          <h1 className="mt-4 font-display text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="inline-block"
                initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
              >
                {HERO_COPY.titleLine1}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block italic text-accent"
                initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.28, ease: easeOut }}
              >
                {HERO_COPY.titleLine2Italic}
                {HERO_COPY.titleLine2After}
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:mt-6 md:text-lg"
          >
            {HERO_COPY.body}
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap"
          >
            <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
              <Link href={ROUTES.PACKAGES}>{HERO_COPY.primaryCta}</Link>
            </Button>
            <Button
              asChild
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href={ROUTES.VILLA}>{HERO_COPY.secondaryCta}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#intro"
        aria-label="Scroll to intro"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-accent/80 hover:text-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
