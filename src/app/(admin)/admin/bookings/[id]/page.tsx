import { notFound } from "next/navigation";
import { BookingStatusForm } from "@/components/features/admin/BookingStatusForm";
import { prisma } from "@/lib/db/prisma";
import type { BookingPricing } from "@/types/booking";

type Params = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminBookingDetailPage({ params }: Params) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { rooms: { include: { room: true } } },
  });
  if (!booking) notFound();
  const pricing = booking.pricing as unknown as BookingPricing;

  return (
    <div>
      <h1 className="font-display text-3xl text-dark">{booking.reference}</h1>
      <div className="mt-4 space-y-2 text-sm text-muted">
        <p>
          {booking.guestName} · {booking.guestEmail} · {booking.guestPhone}
        </p>
        <p>
          {booking.checkIn.toLocaleDateString("en-IN")} →{" "}
          {booking.checkOut.toLocaleDateString("en-IN")}
        </p>
        <p>{booking.rooms.map((r) => r.room.name).join(", ")}</p>
        <p>
          Total ₹{pricing.total.toLocaleString("en-IN")} · Advance ₹
          {pricing.advancePaid.toLocaleString("en-IN")} · Balance ₹
          {pricing.balanceDue.toLocaleString("en-IN")}
        </p>
      </div>
      <BookingStatusForm
        bookingId={booking.id}
        status={booking.status}
        paymentStatus={booking.paymentStatus}
        adminNotes={booking.adminNotes}
      />
    </div>
  );
}
