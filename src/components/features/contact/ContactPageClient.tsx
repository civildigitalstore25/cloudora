"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, UserRound } from "lucide-react";
import { ContactForm } from "@/components/features/contact/ContactForm";
import {
  cornerIn,
  headerReveal,
  lift,
  staggerContainer,
  viewportOnce,
} from "@/components/motion/variants";
import { ASSETS } from "@/constants/assets";
import { ABOUT_META } from "@/constants/content";
import { CONTACT_PAGE } from "@/constants/experiences";
import { UI } from "@/constants/ui";

const INFO = [
  {
    label: CONTACT_PAGE.visitLabel,
    value: UI.address,
    sub: CONTACT_PAGE.directions,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(UI.mapsQuery)}`,
    icon: MapPin,
  },
  {
    label: CONTACT_PAGE.callLabel,
    value: UI.phonePrimary,
    sub: UI.phoneSecondary,
    href: `tel:${UI.phonePrimaryRaw}`,
    icon: Phone,
  },
  {
    label: CONTACT_PAGE.writeLabel,
    value: UI.email,
    sub: UI.emailAlt,
    href: `mailto:${UI.email}`,
    icon: Mail,
  },
  {
    label: CONTACT_PAGE.hostLabel,
    value: ABOUT_META.proprietor,
    sub: UI.brandFull,
    href: UI.social.whatsapp,
    icon: UserRound,
  },
] as const;

export function ContactPageClient() {
  return (
    <div className="bg-background">
      <section className="px-4 py-8 sm:py-16 md:px-6 md:py-20">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={headerReveal}
          initial="hidden"
          animate="show"
        >
          <p className="text-[10px] font-semibold tracking-[0.22em] text-primary uppercase sm:text-[11px]">
            {CONTACT_PAGE.eyebrow}
          </p>
          <h1 className="mt-2 font-display text-[1.75rem] text-dark sm:mt-3 sm:text-4xl md:text-5xl">
            {CONTACT_PAGE.title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
            {CONTACT_PAGE.body}
          </p>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-accent sm:mt-5 sm:w-14" />
        </motion.div>

        <motion.div
          className="mx-auto mt-6 grid max-w-7xl grid-cols-2 gap-2.5 sm:mt-12 sm:gap-5 lg:grid-cols-4"
          variants={staggerContainer(0.1, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {INFO.map((block) => {
            const Icon = block.icon;
            return (
              <motion.a
                key={block.label}
                href={block.href}
                target={block.href.startsWith("http") ? "_blank" : undefined}
                rel={block.href.startsWith("http") ? "noreferrer" : undefined}
                variants={cornerIn}
                className="flex flex-col justify-between rounded-xl border border-accent/25 bg-card p-3 transition hover:border-accent/50 hover:shadow-md sm:rounded-2xl sm:p-5"
              >
                <div>
                  <span className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-strong text-accent sm:mb-4 sm:h-10 sm:w-10 sm:rounded-xl">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <p className="text-[9px] font-bold tracking-widest text-accent uppercase sm:text-[10px]">
                    {block.label}
                  </p>
                  <p className="mt-1.5 line-clamp-3 font-display text-sm leading-snug text-dark sm:mt-2 sm:text-xl">
                    {block.value}
                  </p>
                </div>
                <p className="mt-3 line-clamp-2 border-t border-border/70 pt-2 text-[11px] text-muted sm:mt-4 sm:pt-3 sm:text-sm">
                  {block.sub}
                </p>
              </motion.a>
            );
          })}
        </motion.div>
      </section>

      <section className="border-t border-border/60 bg-sage px-4 py-10 sm:py-16 md:px-6 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            variants={lift}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4 sm:space-y-6"
          >
            <div className="relative mx-auto aspect-[4/5] max-w-[220px] overflow-hidden rounded-2xl border border-accent/30 bg-card sm:mx-0 sm:max-w-md sm:rounded-3xl">
              <Image
                src={ASSETS.BRAND_CARD}
                alt={`${UI.brandFull} brand`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 220px, 400px"
              />
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-6">
              <h2 className="font-display text-xl text-dark sm:text-2xl">
                {CONTACT_PAGE.paymentTitle}
              </h2>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <p>
                  <span className="text-dark">Google Pay:</span> {UI.gpay}
                </p>
                <p>
                  <span className="text-dark">Bank:</span> {UI.bank.name}
                </p>
                <p>
                  <span className="text-dark">Account name:</span>{" "}
                  {UI.bank.accountName}
                </p>
                <p>
                  <span className="text-dark">Account number:</span>{" "}
                  {UI.bank.accountNumber}
                </p>
                <p>
                  <span className="text-dark">IFSC:</span> {UI.bank.ifsc}
                </p>
                <p>
                  <span className="text-dark">Account type:</span>{" "}
                  {UI.bank.accountType}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                <Link
                  href={UI.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-strong hover:text-primary"
                >
                  {CONTACT_PAGE.whatsapp}
                </Link>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(UI.mapsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent-strong hover:text-primary"
                >
                  {CONTACT_PAGE.directions}
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cornerIn}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-8"
          >
            <h2 className="font-display text-xl text-dark sm:text-3xl">
              {CONTACT_PAGE.formTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Bookings, packages and stay questions — we usually reply the same
              day.
            </p>
            <div className="mt-4 sm:mt-6">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
