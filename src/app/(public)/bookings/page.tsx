import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { ROUTES } from "@/constants/routes";
import { withIds } from "@/lib/db/serialize";
import type { BookingPricing } from "@/types/booking";
import { asBookingPricing } from "@/lib/booking/pricing-json";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const bookings = withIds(
    await prisma.booking.findMany({
      where: {
        OR: [
          { userId: session.user.id },
          { guestEmail: session.user.email?.toLowerCase() },
        ],
      },
      orderBy: { createdAt: "desc" },
      include: { rooms: { include: { room: true } } },
    }),
  );

  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-4xl text-dark">My bookings</h1>
        <div className="mt-8 space-y-4">
          {bookings.length === 0 ? (
            <p className="text-muted">No bookings yet.</p>
          ) : (
            bookings.map((booking) => {
              const pricing = booking.pricing as unknown as BookingPricing;
              return (
                <Link
                  key={booking._id}
                  href={ROUTES.BOOKING_DETAIL(booking._id)}
                  className="block rounded-2xl border border-border bg-card p-5 transition hover:border-accent"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-xl text-dark">
                      {booking.reference}
                    </p>
                    <p className="text-xs tracking-wide text-muted uppercase">
                      {booking.status} · {booking.paymentStatus}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {booking.checkIn.toLocaleDateString("en-IN")} →{" "}
                    {booking.checkOut.toLocaleDateString("en-IN")}
                  </p>
                  <p className="mt-1 text-sm text-dark">
                    ₹{pricing.total.toLocaleString("en-IN")} ·{" "}
                    {booking.rooms.map((r) => r.room.name).join(", ")}
                  </p>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
