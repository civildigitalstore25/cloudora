import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { prisma } from "@/lib/db/prisma";
import type { BookingPricing } from "@/types/booking";
import { asBookingPricing } from "@/lib/booking/pricing-json";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { rooms: { include: { room: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-dark">Bookings</h1>
      <div className="mt-6 space-y-3">
        {bookings.map((booking) => {
          const pricing = booking.pricing as unknown as BookingPricing;
          return (
            <Link
              key={booking.id}
              href={ROUTES.ADMIN.BOOKING_DETAIL(booking.id)}
              className="block rounded-2xl bg-card p-4 shadow-sm transition hover:ring-1 hover:ring-accent"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-xl text-dark">{booking.reference}</p>
                <p className="text-xs uppercase tracking-wide text-muted">
                  {booking.status} · {booking.paymentStatus}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {booking.guestName} · {booking.guestEmail} · {booking.guestPhone}
              </p>
              <p className="mt-1 text-sm text-dark">
                {booking.checkIn.toLocaleDateString("en-IN")} →{" "}
                {booking.checkOut.toLocaleDateString("en-IN")} · ₹
                {pricing.total.toLocaleString("en-IN")}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
