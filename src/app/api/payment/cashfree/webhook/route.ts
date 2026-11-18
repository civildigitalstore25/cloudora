import { NextResponse } from "next/server";
import { CASHFREE_WEBHOOK_TYPES, PAYMENT_ERRORS } from "@/constants/payment";
import { markBookingPaid } from "@/lib/booking/mark-paid";
import { prisma } from "@/lib/db/prisma";
import { verifyCashfreeWebhookSignature } from "@/lib/payment/webhook-auth";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const verified = verifyCashfreeWebhookSignature(request, rawBody);
    if (!verified.ok) {
      return NextResponse.json(
        { error: verified.error ?? PAYMENT_ERRORS.CALLBACK_UNAUTHORIZED },
        { status: 401 },
      );
    }

    const body = JSON.parse(rawBody) as {
      type?: string;
      data?: {
        order?: { order_id?: string };
        payment?: { cf_payment_id?: string | number };
      };
    };

    const cashfreeOrderId = body.data?.order?.order_id;
    if (!cashfreeOrderId) {
      return NextResponse.json({ data: { ok: true } });
    }

    const booking = await prisma.booking.findFirst({
      where: { cashfreeOrderId },
    });
    if (!booking) {
      return NextResponse.json({ data: { ok: true } });
    }

    if (body.type === CASHFREE_WEBHOOK_TYPES.PAYMENT_SUCCESS) {
      await markBookingPaid({
        bookingId: booking.id,
        cashfreeOrderId,
        cashfreePaymentId: String(body.data?.payment?.cf_payment_id ?? ""),
      });
    } else if (
      body.type === CASHFREE_WEBHOOK_TYPES.PAYMENT_FAILED ||
      body.type === CASHFREE_WEBHOOK_TYPES.PAYMENT_USER_DROPPED
    ) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { paymentStatus: "FAILED" },
      });
    }

    return NextResponse.json({ data: { ok: true } });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook failed" },
      { status: 500 },
    );
  }
}
