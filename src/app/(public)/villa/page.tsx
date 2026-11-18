import { VillaFloorsSection } from "@/components/features/home/VillaFloorsSection";
import { IntroSection } from "@/components/features/home/IntroSection";
import { AmenitiesSection } from "@/components/features/home/AmenitiesSection";
import { VILLA_COPY } from "@/constants/home";

export default function VillaPage() {
  return (
    <div className="pt-8">
      <div className="mx-auto max-w-3xl px-4 py-12 text-center md:px-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {VILLA_COPY.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl text-dark md:text-5xl">
          {VILLA_COPY.title}
        </h1>
      </div>
      <IntroSection />
      <VillaFloorsSection />
      <AmenitiesSection />
    </div>
  );
}
