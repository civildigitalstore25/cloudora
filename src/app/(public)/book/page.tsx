import { Suspense } from "react";
import { BookClient } from "@/components/features/booking/BookClient";
import { BookingSearchBar } from "@/components/features/home/BookingSearchBar";
import { BOOKING_COPY } from "@/constants/booking";

export default function BookPage() {
  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl text-dark">{BOOKING_COPY.searchTitle}</h1>
        <div className="mt-8">
          <BookingSearchBar className="grid gap-3 rounded-2xl bg-cream p-4 shadow-sm md:grid-cols-[1.2fr_1.2fr_0.7fr_0.7fr_auto] md:items-end" />
        </div>
        <div className="mt-12">
          <Suspense fallback={<p className="text-muted">Loading…</p>}>
            <BookClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
