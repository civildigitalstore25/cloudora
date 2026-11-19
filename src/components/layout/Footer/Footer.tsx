import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { CTA_COPY, FOOTER_COPY } from "@/constants/home";
import { ROUTES } from "@/constants/routes";
import { UI } from "@/constants/ui";

export function Footer() {
  return (
    <footer>
      <section className="bg-accent px-4 py-16 text-center md:py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary-strong uppercase">
          {CTA_COPY.eyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl text-primary-strong md:text-5xl">
          {CTA_COPY.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-primary-strong/80">
          {CTA_COPY.tamil}
        </p>
        <Button asChild variant="default" size="lg" className="mt-8">
          <Link href={ROUTES.BOOK}>{CTA_COPY.button}</Link>
        </Button>
      </section>

      <div className="bg-primary-strong px-4 py-14 text-white md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={ASSETS.LOGO}
                alt={UI.brandFull}
                width={52}
                height={52}
                className="rounded-full bg-white object-contain p-1"
              />
              <div>
                <p className="font-display text-xl tracking-wide">{UI.brand}</p>
                <p className="text-xs tracking-[0.16em] text-accent uppercase">
                  Luxury Homestay
                </p>
              </div>
            </div>
            <p className="mt-6 font-display text-2xl text-white/95">
              {FOOTER_COPY.tagline}
            </p>
            <p className="mt-2 text-sm text-accent">{FOOTER_COPY.tamil}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              {FOOTER_COPY.description}
            </p>
            <p className="mt-4 text-sm text-white/60">{FOOTER_COPY.proprietor}</p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {FOOTER_COPY.visit}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              {UI.address}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(UI.mapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-sm text-accent"
            >
              {FOOTER_COPY.directions}
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
              {FOOTER_COPY.connect}
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/85">
              <a href={`tel:${UI.phonePrimaryRaw}`} className="block">
                {UI.phonePrimary}
              </a>
              <a href={`tel:${UI.phoneSecondaryRaw}`} className="block">
                {UI.phoneSecondary}
              </a>
              <a href={`mailto:${UI.email}`} className="block">
                {UI.email}
              </a>
              <a href={`mailto:${UI.emailAlt}`} className="block">
                {UI.emailAlt}
              </a>
              <a
                href={UI.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="block text-accent"
              >
                WhatsApp
              </a>
            </div>
            <div className="mt-6 flex gap-4 text-xs font-bold tracking-[0.16em] uppercase">
              <Link href={ROUTES.TERMS}>{FOOTER_COPY.terms}</Link>
              <Link href={ROUTES.PRIVACY}>{FOOTER_COPY.privacy}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
