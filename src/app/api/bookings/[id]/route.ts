import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";
import type { BookingPricing } from "@/types/booking";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const session = await auth();

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { rooms: { include: { room: true } } },
  });

  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner =
    session?.user &&
    (booking.userId === session.user.id ||
      booking.guestEmail === session.user.email?.toLowerCase());

  if (!isOwner && session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    data: withId({
      ...booking,
      pricing: booking.pricing as unknown as BookingPricing,
      rooms: booking.rooms.map((r) =>
        withId({ ...r, name: r.room.name }),
      ),
    }),
  });
}
