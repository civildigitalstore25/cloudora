import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { PACKAGE_TEASER } from "@/constants/home";
import { ROUTES } from "@/constants/routes";

export function PackageTeaserSection() {
  return (
    <section className="bg-cream-dark px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-xl">
        <article className="overflow-hidden rounded-3xl bg-card shadow-sm">
          <div className="relative aspect-[16/11]">
            <Image
              src={ASSETS.PACKAGE}
              alt={PACKAGE_TEASER.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex justify-between text-xs tracking-wide text-muted">
              <span>{PACKAGE_TEASER.metaLeft}</span>
              <span>{PACKAGE_TEASER.metaRight}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-dark md:text-3xl">
              {PACKAGE_TEASER.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {PACKAGE_TEASER.body}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <div>
                <p className="text-[11px] tracking-[0.16em] text-muted uppercase">
                  {PACKAGE_TEASER.tariffLabel}
                </p>
                <p className="font-display text-xl text-dark">
                  {PACKAGE_TEASER.tariffValue}
                </p>
              </div>
              <Button asChild variant="default">
                <Link href={ROUTES.PACKAGES}>{PACKAGE_TEASER.cta}</Link>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
