"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BOOKING, BOOKING_COPY } from "@/constants/booking";
import { ROUTES } from "@/constants/routes";

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function tomorrowIso(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function BookingSearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(todayIso());
  const [checkOut, setCheckOut] = useState(tomorrowIso());
  const [adults, setAdults] = useState<number>(BOOKING.defaultAdults);
  const [children, setChildren] = useState<number>(BOOKING.defaultChildren);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
    });
    router.push(`${ROUTES.BOOK}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        className ??
        "mx-auto -mt-12 grid max-w-5xl grid-cols-1 gap-3 rounded-2xl bg-cream p-4 shadow-xl sm:-mt-16 sm:grid-cols-2 md:-mt-20 md:grid-cols-[1.2fr_1.2fr_0.7fr_0.7fr_auto] md:items-end"
      }
    >
      <div>
        <Label htmlFor="checkIn">{BOOKING_COPY.checkIn}</Label>
        <Input
          id="checkIn"
          type="date"
          value={checkIn}
          min={todayIso()}
          onChange={(e) => setCheckIn(e.target.value)}
          required
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="checkOut">{BOOKING_COPY.checkOut}</Label>
        <Input
          id="checkOut"
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          required
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="adults">{BOOKING_COPY.adults}</Label>
        <Input
          id="adults"
          type="number"
          min={1}
          max={30}
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="children">{BOOKING_COPY.children}</Label>
        <Input
          id="children"
          type="number"
          min={0}
          max={20}
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          className="mt-1.5"
        />
      </div>
      <Button
        type="submit"
        variant="accent"
        className="h-11 w-full sm:col-span-2 md:col-span-1 md:mb-0.5"
      >
        {BOOKING_COPY.searchCta}
      </Button>
    </form>
  );
}
