import Image from "next/image";
import Link from "next/link";
import { FooterSocialIcons } from "@/components/layout/Footer/FooterSocialIcons";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { CTA_COPY, FOOTER_COPY } from "@/constants/home";
import { ROUTES } from "@/constants/routes";
import { UI } from "@/constants/ui";

export function Footer() {
  return (
    <footer>
      <section className="bg-accent px-4 py-12 text-center sm:py-16 md:py-20">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-primary-strong uppercase sm:text-xs">
          {CTA_COPY.eyebrow}
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-2xl text-primary-strong sm:mt-4 sm:text-3xl md:text-5xl">
          {CTA_COPY.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-primary-strong/80 sm:mt-4 sm:text-base">
          {CTA_COPY.tamil}
        </p>
        <Button asChild variant="default" size="lg" className="mt-6 sm:mt-8">
          <Link href={ROUTES.BOOK}>{CTA_COPY.button}</Link>
        </Button>
      </section>

      <div className="bg-primary-strong px-4 py-10 text-white sm:py-14 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
            <div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <Image
                  src={ASSETS.LOGO}
                  alt={UI.brandFull}
                  width={52}
                  height={52}
                  className="h-11 w-11 rounded-full bg-white object-contain p-1 sm:h-[52px] sm:w-[52px]"
                />
                <div>
                  <p className="font-display text-lg tracking-wide sm:text-xl">
                    {UI.brand}
                  </p>
                  <p className="text-[10px] tracking-[0.16em] text-accent uppercase sm:text-xs">
                    Luxury Homestay
                  </p>
                </div>
              </div>
              <p className="mt-4 font-display text-xl text-white/95 sm:mt-6 sm:text-2xl">
                {FOOTER_COPY.tagline}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                {FOOTER_COPY.description}
              </p>
              <p className="mt-3 text-xs text-white/60 sm:mt-4 sm:text-sm">
                {FOOTER_COPY.proprietor}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:contents">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-accent uppercase sm:text-xs">
                  {FOOTER_COPY.visit}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-white/85 sm:mt-4 sm:text-sm">
                  {UI.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(UI.mapsQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-xs text-accent sm:mt-3 sm:text-sm"
                >
                  {FOOTER_COPY.directions}
                </a>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] text-accent uppercase sm:text-xs">
                  {FOOTER_COPY.connect}
                </p>
                <div className="mt-3 space-y-1.5 text-xs text-white/85 sm:mt-4 sm:space-y-2 sm:text-sm">
                  <a href={`tel:${UI.phonePrimaryRaw}`} className="block">
                    {UI.phonePrimary}
                  </a>
                  <a href={`tel:${UI.phoneSecondaryRaw}`} className="block">
                    {UI.phoneSecondary}
                  </a>
                  <a href={`mailto:${UI.email}`} className="block break-all">
                    {UI.email}
                  </a>
                  <a
                    href={`mailto:${UI.emailAlt}`}
                    className="hidden break-all sm:block"
                  >
                    {UI.emailAlt}
                  </a>
                </div>

                {/* Desktop: social under Connect */}
                <FooterSocialIcons className="mt-5 hidden md:block" />
              </div>
            </div>
          </div>

          {/* Mobile: full-width social + legal row */}
          <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 md:hidden">
            <FooterSocialIcons align="center" />
            <div className="flex gap-4 text-[10px] font-bold tracking-[0.14em] uppercase">
              <Link href={ROUTES.TERMS}>{FOOTER_COPY.terms}</Link>
              <Link href={ROUTES.PRIVACY}>{FOOTER_COPY.privacy}</Link>
            </div>
            <p className="text-center text-[10px] text-white/55">
              {FOOTER_COPY.creditPrefix}{" "}
              <a
                href={FOOTER_COPY.creditHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:underline"
              >
                {FOOTER_COPY.creditName}
              </a>
            </p>
          </div>

          {/* Desktop: legal under grid */}
          <div className="mt-10 hidden items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex">
            <p className="text-xs text-white/55">
              {FOOTER_COPY.creditPrefix}{" "}
              <a
                href={FOOTER_COPY.creditHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:underline"
              >
                {FOOTER_COPY.creditName}
              </a>
            </p>
            <div className="flex gap-5 text-xs font-bold tracking-[0.14em] uppercase">
              <Link href={ROUTES.TERMS}>{FOOTER_COPY.terms}</Link>
              <Link href={ROUTES.PRIVACY}>{FOOTER_COPY.privacy}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
