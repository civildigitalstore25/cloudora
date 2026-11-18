import { NextResponse } from "next/server";
import { z } from "zod";
import { CASHFREE_ORDER_STATUS, PAYMENT_ERRORS } from "@/constants/payment";
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/constants/booking";
import { ROUTES } from "@/constants/routes";
import { markBookingPaid } from "@/lib/booking/mark-paid";
import { prisma } from "@/lib/db/prisma";
import {
  assertCashfreeCredentialsConfigured,
  getCashfreeMode,
} from "@/lib/payment/cashfree-auth";
import {
  createCashfreePayment,
  getCashfreeOrderStatus,
} from "@/lib/payment/cashfree";
import { resolveSiteUrl } from "@/lib/payment/site-url";
import type { BookingPricing } from "@/types/booking";
import { asBookingPricing } from "@/lib/booking/pricing-json";

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
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (
      booking.paymentStatus === PAYMENT_STATUS.PAID ||
      booking.paymentStatus === PAYMENT_STATUS.REFUNDED
    ) {
      return NextResponse.json(
        {
          error: PAYMENT_ERRORS.ALREADY_PAID,
          data: { paymentStatus: booking.paymentStatus },
        },
        { status: 409 },
      );
    }
    if (booking.status === BOOKING_STATUS.CANCELLED) {
      return NextResponse.json(
        { error: PAYMENT_ERRORS.ORDER_CANCELLED },
        { status: 409 },
      );
    }

    if (booking.cashfreeOrderId) {
      const previous = await getCashfreeOrderStatus(booking.cashfreeOrderId);
      if (previous.success) {
        await markBookingPaid({
          bookingId: booking.id,
          cashfreeOrderId: booking.cashfreeOrderId,
          cashfreePaymentId: previous.paymentId,
        });
        return NextResponse.json(
          {
            error: PAYMENT_ERRORS.ALREADY_PAID,
            data: { paymentStatus: PAYMENT_STATUS.PAID },
          },
          { status: 409 },
        );
      }
      if (
        previous.state === CASHFREE_ORDER_STATUS.ACTIVE &&
        previous.paymentSessionId
      ) {
        return NextResponse.json({
          data: {
            paymentSessionId: previous.paymentSessionId,
            cashfreeOrderId: booking.cashfreeOrderId,
            mode: getCashfreeMode(),
            bookingId: booking.id,
          },
        });
      }
    }

    const pricing = booking.pricing as unknown as BookingPricing;
    const siteUrl = resolveSiteUrl(request);
    const cashfreeOrderId = `CLD-${booking.id.slice(-8).toUpperCase()}-${Date.now().toString().slice(-6)}`;

    const payment = await createCashfreePayment({
      orderId: cashfreeOrderId,
      amountInr: pricing.advanceDue,
      customerId: booking.userId ?? booking.id,
      customerPhone: booking.guestPhone,
      customerEmail: booking.guestEmail,
      customerName: booking.guestName,
      returnUrl: `${siteUrl}${ROUTES.BOOKING_CONFIRMATION(booking.id)}?payment=return`,
      notifyUrl: `${siteUrl}/api/payment/cashfree/webhook`,
    });

    if ("error" in payment) {
      return NextResponse.json({ error: payment.error }, { status: 502 });
    }

    await prisma.booking.update({
      where: { id: booking.id },
      data: { cashfreeOrderId: payment.cashfreeOrderId },
    });

    return NextResponse.json({
      data: {
        paymentSessionId: payment.paymentSessionId,
        cashfreeOrderId: payment.cashfreeOrderId,
        mode: payment.mode,
        bookingId: booking.id,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : PAYMENT_ERRORS.INIT_FAILED },
      { status: 500 },
    );
  }
}
