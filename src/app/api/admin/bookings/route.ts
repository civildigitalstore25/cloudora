import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withIds } from "@/lib/db/serialize";

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { rooms: { include: { room: true } } },
  });
  return NextResponse.json({ data: withIds(bookings) });
}
