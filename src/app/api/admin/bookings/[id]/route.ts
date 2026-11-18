import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";
import type { BookingPricing } from "@/types/booking";
import { Prisma } from "@prisma/client";

const updateSchema = z.object({
  status: z
    .enum(["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"])
    .optional(),
  paymentStatus: z
    .enum(["PENDING", "PAID", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED"])
    .optional(),
  adminNotes: z.string().optional(),
  balanceCollected: z.boolean().optional(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { rooms: { include: { room: true } } },
  });
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ data: withId(booking) });
}

export async function PATCH(request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }

  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let pricing = existing.pricing as unknown as BookingPricing;
  if (parsed.data.balanceCollected) {
    pricing = { ...pricing, balanceDue: 0, advancePaid: pricing.total };
  }

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      status: parsed.data.status,
      paymentStatus: parsed.data.paymentStatus,
      adminNotes: parsed.data.adminNotes,
      pricing: pricing as unknown as Prisma.InputJsonValue,
    },
    include: { rooms: { include: { room: true } } },
  });

  return NextResponse.json({ data: withId(booking) });
}
