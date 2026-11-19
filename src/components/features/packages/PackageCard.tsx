"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Phone } from "lucide-react";
import { rise } from "@/components/motion/variants";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { PACKAGES_PAGE } from "@/constants/packages";
import { ROUTES } from "@/constants/routes";

type PackageCardProps = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  images: readonly string[];
  includes: readonly string[];
  priceLabel: string;
  enquiryPhones?: readonly { label: string; phone: string }[];
};

export function PackageCard(pkg: PackageCardProps) {
  const [hero, sideA, sideB] = pkg.images;
  const badge =
    PACKAGES_PAGE.badges[pkg.id as keyof typeof PACKAGES_PAGE.badges] ??
    "Package";

  return (
    <motion.article
      variants={rise}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md sm:rounded-3xl"
    >
      {/* One large + two under */}
      <div className="grid gap-1.5 p-1.5 sm:gap-2 sm:p-2">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-accent/20 sm:rounded-2xl">
          <Image
            src={hero || ASSETS.PACKAGE}
            alt={pkg.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <span className="absolute top-3 left-3 bg-primary-strong/95 px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] text-accent uppercase sm:text-[10px]">
            {badge}
          </span>
        </div>
        {(sideA || sideB) && (
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-accent/20 sm:rounded-2xl">
              <Image
                src={sideA || hero || ASSETS.PACKAGE}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-accent/20 sm:rounded-2xl">
              <Image
                src={sideB || sideA || hero || ASSETS.PACKAGE}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3 pb-4 sm:px-6 sm:pt-4 sm:pb-6 md:px-7">
        <h2 className="font-display text-xl leading-snug text-dark sm:text-2xl md:text-[1.65rem]">
          {pkg.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {pkg.shortDescription}
        </p>
        <p className="mt-2 hidden text-sm leading-relaxed text-muted lg:block">
          {pkg.description}
        </p>

        <p className="mt-5 text-[10px] font-semibold tracking-[0.16em] text-accent uppercase">
          {PACKAGES_PAGE.includesLabel}
        </p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2.5">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-dark">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                aria-hidden
              />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>

        {pkg.enquiryPhones?.length ? (
          <div className="mt-5 rounded-xl border border-accent/25 bg-cream/70 p-3 sm:p-4">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
              {PACKAGES_PAGE.enquiryLabel}
            </p>
            <div className="mt-2.5 space-y-2">
              {pkg.enquiryPhones.map((row) => (
                <a
                  key={row.phone}
                  href={`tel:${row.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-dark transition-colors hover:text-accent-strong"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-accent-strong" />
                  <span>
                    <span className="text-muted">{row.label}: </span>
                    {row.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-auto flex flex-col gap-3 border-t border-border/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg leading-none text-dark sm:text-xl">
            {pkg.priceLabel}
          </p>
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Link href={ROUTES.CONTACT}>{PACKAGES_PAGE.enquire}</Link>
            </Button>
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Link href={ROUTES.BOOK}>{PACKAGES_PAGE.book}</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
