import { AmenitiesSection } from "@/components/features/home/AmenitiesSection";
import { IntroSection } from "@/components/features/home/IntroSection";
import { PropertyPhotosStrip } from "@/components/features/home/PropertyPhotosStrip";
import { VillaFloorsSection } from "@/components/features/home/VillaFloorsSection";
import { ASSETS } from "@/constants/assets";
import { COMMON_FACILITIES, IDEAL_FOR, WELCOME_COPY } from "@/constants/content";
import { VILLA_COPY } from "@/constants/home";

export default function VillaPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-8 text-center sm:py-12 md:px-6 md:py-14">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-xs">
          {VILLA_COPY.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl text-dark sm:mt-3 sm:text-4xl md:text-5xl">
          {WELCOME_COPY.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base">
          {WELCOME_COPY.body}
        </p>
        <p className="mt-2 text-xs text-accent-strong sm:mt-3 sm:text-sm">
          {WELCOME_COPY.tamilTagline}
        </p>
        <div className="mx-auto mt-4 h-0.5 w-12 bg-accent" />
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6 md:pb-10">
        <PropertyPhotosStrip images={ASSETS.EXTERIOR} altPrefix="Cloudora exterior" />
      </section>

      <IntroSection />
      <VillaFloorsSection />

      <section className="bg-cream px-4 py-10 sm:py-14 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-dark sm:text-3xl">
                Common facilities
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:mt-5">
                {COMMON_FACILITIES.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl text-dark sm:text-3xl">
                Ideal for
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-2 md:grid-cols-1">
                {IDEAL_FOR.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 sm:mt-10">
            <PropertyPhotosStrip
              images={ASSETS.AMENITIES}
              altPrefix="Cloudora amenities"
            />
          </div>
        </div>
      </section>

      <AmenitiesSection />
    </div>
  );
}
