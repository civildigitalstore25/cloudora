import { BOOKING_STATUS, PAYMENT_STATUS } from "@/constants/booking";
import {
  sendBookingAdminEmail,
  sendBookingConfirmationEmail,
} from "@/lib/email/send";
import { prisma } from "@/lib/db/prisma";
import type { BookingPricing } from "@/types/booking";
import { asBookingPricing } from "@/lib/booking/pricing-json";
import { Prisma } from "@prisma/client";

export async function markBookingPaid(input: {
  bookingId: string;
  cashfreeOrderId?: string;
  cashfreePaymentId?: string;
}) {
  const booking = await prisma.booking.findUnique({
    where: { id: input.bookingId },
    include: { rooms: { include: { room: true } } },
  });
  if (!booking) return null;
  if (booking.paymentStatus === PAYMENT_STATUS.PAID) return booking;

  const pricing = booking.pricing as unknown as BookingPricing;
  const nextPricing: BookingPricing = {
    ...pricing,
    advancePaid: pricing.advanceDue,
    balanceDue: Math.round((pricing.total - pricing.advanceDue) * 100) / 100,
  };

  const updated = await prisma.booking.update({
    where: { id: booking.id },
    data: {
      paymentStatus: PAYMENT_STATUS.PAID,
      status: BOOKING_STATUS.CONFIRMED,
      cashfreeOrderId: input.cashfreeOrderId ?? booking.cashfreeOrderId,
      cashfreePaymentId:
        input.cashfreePaymentId ?? booking.cashfreePaymentId,
      pricing: nextPricing as unknown as Prisma.InputJsonValue,
    },
    include: { rooms: { include: { room: true } } },
  });

  const roomsLabel = updated.rooms.map((r) => r.room.name).join(", ");
  const checkIn = updated.checkIn.toLocaleDateString("en-IN");
  const checkOut = updated.checkOut.toLocaleDateString("en-IN");

  await Promise.allSettled([
    sendBookingConfirmationEmail({
      guestName: updated.guestName,
      guestEmail: updated.guestEmail,
      reference: updated.reference,
      checkIn,
      checkOut,
      rooms: roomsLabel,
      advancePaid: nextPricing.advancePaid,
      balanceDue: nextPricing.balanceDue,
      total: nextPricing.total,
      bookingId: updated.id,
    }),
    sendBookingAdminEmail({
      guestName: updated.guestName,
      guestEmail: updated.guestEmail,
      guestPhone: updated.guestPhone,
      reference: updated.reference,
      checkIn,
      checkOut,
      rooms: roomsLabel,
      advancePaid: nextPricing.advancePaid,
      total: nextPricing.total,
      bookingId: updated.id,
    }),
  ]);

  return updated;
}
