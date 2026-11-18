import { NextResponse } from "next/server";
import { z } from "zod";
import { PAYMENT_ERRORS } from "@/constants/payment";
import { markBookingPaid } from "@/lib/booking/mark-paid";
import { prisma } from "@/lib/db/prisma";
import { assertCashfreeCredentialsConfigured } from "@/lib/payment/cashfree-auth";
import { getCashfreeOrderStatus } from "@/lib/payment/cashfree";

const schema = z.object({
  bookingId: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid bookingId" }, { status: 400 });
    }

    const configured = assertCashfreeCredentialsConfigured();
    if (!configured.ok) {
      return NextResponse.json({ error: configured.error }, { status: 503 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: parsed.data.bookingId },
    });
    if (!booking?.cashfreeOrderId) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const status = await getCashfreeOrderStatus(booking.cashfreeOrderId);
    if (status.success) {
      await markBookingPaid({
        bookingId: booking.id,
        cashfreeOrderId: booking.cashfreeOrderId,
        cashfreePaymentId: status.paymentId,
      });
      return NextResponse.json({ data: { paid: true } });
    }

    return NextResponse.json({ data: { paid: false, state: status.state } });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : PAYMENT_ERRORS.INIT_FAILED },
      { status: 500 },
    );
  }
}
