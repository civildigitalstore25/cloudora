import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { ROUTES } from "@/constants/routes";
import type { BookingPricing } from "@/types/booking";
import { USER_ROLES } from "@/constants/auth";

type Params = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function BookingDetailPage({ params }: Params) {
  const { id } = await params;
  const session = await auth();
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { rooms: { include: { room: true } } },
  });
  if (!booking) notFound();

  const allowed =
    session?.user &&
    (session.user.role === USER_ROLES.ADMIN ||
      booking.userId === session.user.id ||
      booking.guestEmail === session.user.email?.toLowerCase());
  if (!allowed) notFound();

  const pricing = booking.pricing as unknown as BookingPricing;

  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs tracking-[0.16em] text-accent uppercase">Booking</p>
        <h1 className="mt-2 font-display text-4xl text-dark">{booking.reference}</h1>
        <div className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-6 text-sm">
          <p>
            Status: <strong>{booking.status}</strong> · Payment:{" "}
            <strong>{booking.paymentStatus}</strong>
          </p>
          <p>
            {booking.checkIn.toLocaleDateString("en-IN")} →{" "}
            {booking.checkOut.toLocaleDateString("en-IN")}
          </p>
          <p>{booking.rooms.map((r) => r.room.name).join(", ")}</p>
          <p>Total: ₹{pricing.total.toLocaleString("en-IN")}</p>
          <p>Advance: ₹{pricing.advancePaid.toLocaleString("en-IN")}</p>
          <p>Balance due: ₹{pricing.balanceDue.toLocaleString("en-IN")}</p>
        </div>
        <Link href={ROUTES.BOOKINGS} className="mt-6 inline-block text-sm text-accent">
          ← All bookings
        </Link>
      </div>
    </div>
  );
}
