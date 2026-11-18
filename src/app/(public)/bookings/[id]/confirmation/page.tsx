import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BOOKING_COPY } from "@/constants/booking";
import { ROUTES } from "@/constants/routes";
import { markBookingPaid } from "@/lib/booking/mark-paid";
import { prisma } from "@/lib/db/prisma";
import { getCashfreeOrderStatus } from "@/lib/payment/cashfree";
import type { BookingPricing } from "@/types/booking";

type Params = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string }>;
};

export const dynamic = "force-dynamic";

export default async function BookingConfirmationPage({
  params,
  searchParams,
}: Params) {
  const { id } = await params;
  const query = await searchParams;

  let booking = await prisma.booking.findUnique({
    where: { id },
    include: { rooms: { include: { room: true } } },
  });
  if (!booking) notFound();

  if (
    query.payment === "return" &&
    booking.cashfreeOrderId &&
    booking.paymentStatus !== "PAID"
  ) {
    const status = await getCashfreeOrderStatus(booking.cashfreeOrderId);
    if (status.success) {
      await markBookingPaid({
        bookingId: booking.id,
        cashfreeOrderId: booking.cashfreeOrderId,
        cashfreePaymentId: status.paymentId,
      });
      booking = await prisma.booking.findUnique({
        where: { id },
        include: { rooms: { include: { room: true } } },
      });
    }
  }

  if (!booking) notFound();
  const pricing = booking.pricing as unknown as BookingPricing;
  const paid = booking.paymentStatus === "PAID";

  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl text-dark">
          {paid ? BOOKING_COPY.confirmationTitle : "Booking received"}
        </h1>
        <p className="mt-4 text-muted">
          {paid ? BOOKING_COPY.confirmationBody : BOOKING_COPY.pendingPayment}
        </p>
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left text-sm">
          <p className="font-display text-2xl text-dark">{booking.reference}</p>
          <p className="mt-3">
            {booking.checkIn.toLocaleDateString("en-IN")} →{" "}
            {booking.checkOut.toLocaleDateString("en-IN")}
          </p>
          <p className="mt-1">
            {booking.rooms.map((r) => r.room.name).join(", ")}
          </p>
          <p className="mt-3">
            Advance paid: ₹{pricing.advancePaid.toLocaleString("en-IN")}
          </p>
          <p>Balance due: ₹{pricing.balanceDue.toLocaleString("en-IN")}</p>
        </div>
        <Button asChild variant="accent" className="mt-8">
          <Link href={ROUTES.HOME}>Back home</Link>
        </Button>
      </div>
    </div>
  );
}
