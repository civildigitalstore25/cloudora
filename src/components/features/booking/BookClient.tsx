"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { API } from "@/constants/api";
import { ASSETS } from "@/constants/assets";
import { BOOKING_COPY } from "@/constants/booking";
import { BOOKING_STORAGE_KEY, ROUTES } from "@/constants/routes";
import type { PackageCard, RoomCard } from "@/types/booking";

type AvailabilityResponse = {
  nights: number;
  rooms: RoomCard[];
  packages: PackageCard[];
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
};

export function BookClient() {
  const params = useSearchParams();
  const [data, setData] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const checkIn = params.get("checkIn");
    const checkOut = params.get("checkOut");
    if (!checkIn || !checkOut) {
      setLoading(false);
      setError("Choose dates to search availability.");
      return;
    }

    const query = new URLSearchParams({
      checkIn,
      checkOut,
      adults: params.get("adults") ?? "2",
      children: params.get("children") ?? "0",
    });

    fetch(`${API.AVAILABILITY}?${query}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Search failed");
        setData(json.data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed"))
      .finally(() => setLoading(false));
  }, [params]);

  function toggleRoom(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function continueCheckout() {
    if (!data || selected.length === 0) return;
    const draft = {
      checkIn: data.checkIn.slice(0, 10),
      checkOut: data.checkOut.slice(0, 10),
      adults: data.adults,
      children: data.children,
      roomIds: selected,
    };
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(draft));
  }

  if (loading) {
    return <p className="text-muted">Searching availability…</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-muted">{error}</p>
        <Button asChild variant="accent">
          <Link href={ROUTES.HOME}>Back to search</Link>
        </Button>
      </div>
    );
  }

  if (!data?.rooms.length) {
    return <p className="text-muted">{BOOKING_COPY.noRooms}</p>;
  }

  return (
    <div>
      <p className="text-sm text-muted">
        {BOOKING_COPY.nights(data.nights)} ·{" "}
        {BOOKING_COPY.guests(data.adults, data.children)}
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {data.rooms.map((room) => {
          const active = selected.includes(room._id);
          return (
            <article
              key={room._id}
              className="overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={room.images[0] || ASSETS.ROOM_DEFAULT}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="font-display text-2xl text-dark">{room.name}</h2>
                <p className="mt-1 text-sm text-muted">
                  Up to {room.maxGuests} guests · {room.floor.toLowerCase()} floor
                </p>
                <p className="mt-3 font-display text-xl text-dark">
                  ₹{room.baseTariffPerNight.toLocaleString("en-IN")} / night
                </p>
                <Button
                  type="button"
                  variant={active ? "default" : "accent"}
                  className="mt-4"
                  onClick={() => toggleRoom(room._id)}
                >
                  {active ? "Selected" : BOOKING_COPY.selectRoom}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10">
        <Button
          asChild
          variant="accent"
          size="lg"
          disabled={selected.length === 0}
          onClick={continueCheckout}
        >
          <Link href={ROUTES.CHECKOUT}>Continue to checkout</Link>
        </Button>
      </div>
    </div>
  );
}
