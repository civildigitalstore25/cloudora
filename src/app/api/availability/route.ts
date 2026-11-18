import { NextResponse } from "next/server";
import { z } from "zod";
import { BOOKING } from "@/constants/booking";
import { getAvailableRooms, nightsBetween } from "@/lib/booking/availability";
import { withIds } from "@/lib/db/serialize";
import { prisma } from "@/lib/db/prisma";

const schema = z.object({
  checkIn: z.string().min(8),
  checkOut: z.string().min(8),
  adults: z.coerce.number().int().min(1).max(30).default(BOOKING.defaultAdults),
  children: z.coerce
    .number()
    .int()
    .min(0)
    .max(20)
    .default(BOOKING.defaultChildren),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = schema.safeParse({
      checkIn: searchParams.get("checkIn"),
      checkOut: searchParams.get("checkOut"),
      adults: searchParams.get("adults") ?? BOOKING.defaultAdults,
      children: searchParams.get("children") ?? BOOKING.defaultChildren,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid search" }, { status: 400 });
    }

    const checkIn = new Date(parsed.data.checkIn);
    const checkOut = new Date(parsed.data.checkOut);
    if (
      Number.isNaN(checkIn.getTime()) ||
      Number.isNaN(checkOut.getTime()) ||
      checkOut <= checkIn
    ) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    const nights = nightsBetween(checkIn, checkOut);
    if (nights > BOOKING.maxNights) {
      return NextResponse.json(
        { error: `Maximum stay is ${BOOKING.maxNights} nights` },
        { status: 400 },
      );
    }

    const rooms = withIds(await getAvailableRooms(checkIn, checkOut));
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    const availableIds = new Set(rooms.map((r) => r.id));
    const availablePackages = withIds(
      packages.filter((pkg) =>
        pkg.roomIds.every((id) => availableIds.has(id)),
      ),
    );

    return NextResponse.json({
      data: {
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        adults: parsed.data.adults,
        children: parsed.data.children,
        nights,
        rooms,
        packages: availablePackages,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed" },
      { status: 500 },
    );
  }
}
