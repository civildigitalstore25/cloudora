import { AmenitiesSection } from "@/components/features/home/AmenitiesSection";
import { BookingSearchBar } from "@/components/features/home/BookingSearchBar";
import { ExperiencesSection } from "@/components/features/home/ExperiencesSection";
import { GalleryTeaserSection } from "@/components/features/home/GalleryTeaserSection";
import { HomeHero } from "@/components/features/home/HomeHero";
import { IntroSection } from "@/components/features/home/IntroSection";
import { PackageTeaserSection } from "@/components/features/home/PackageTeaserSection";
import { VillaFloorsSection } from "@/components/features/home/VillaFloorsSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="relative z-10 px-4 md:px-6">
        <BookingSearchBar />
      </div>
      <IntroSection />
      <AmenitiesSection />
      <VillaFloorsSection />
      <ExperiencesSection />
      <PackageTeaserSection />
      <GalleryTeaserSection />
    </>
  );
}
