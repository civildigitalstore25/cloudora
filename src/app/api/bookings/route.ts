import { NextResponse } from "next/server";
import { z } from "zod";
import { BOOKING, BOOKING_STATUS, PAYMENT_STATUS } from "@/constants/booking";
import { auth } from "@/lib/auth/auth";
import {
  assertRoomsAvailable,
  nightsBetween,
} from "@/lib/booking/availability";
import {
  calculateStayPricing,
  generateBookingReference,
} from "@/lib/booking/pricing";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";
import type { BookingPricing } from "@/types/booking";
import { asBookingPricing } from "@/lib/booking/pricing-json";
import { Prisma } from "@prisma/client";

const createSchema = z.object({
  checkIn: z.string().min(8),
  checkOut: z.string().min(8),
  adults: z.number().int().min(1).max(30),
  children: z.number().int().min(0).max(20).default(0),
  roomIds: z.array(z.string().min(1)).min(1),
  packageId: z.string().optional(),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(8),
  notes: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      OR: [
        { userId: session.user.id },
        { guestEmail: session.user.email?.toLowerCase() },
      ],
    },
    include: { rooms: { include: { room: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    data: bookings.map((b) =>
      withId({
        ...b,
        pricing: b.pricing as unknown as BookingPricing,
        rooms: b.rooms.map((r) =>
          withId({
            ...r,
            name: r.room.name,
          }),
        ),
      }),
    ),
  });
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const parsed = createSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid booking" }, { status: 400 });
    }

    const checkIn = new Date(parsed.data.checkIn);
    const checkOut = new Date(parsed.data.checkOut);
    if (checkOut <= checkIn) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    const availability = await assertRoomsAvailable(
      parsed.data.roomIds,
      checkIn,
      checkOut,
    );
    if (!availability.ok) {
      return NextResponse.json({ error: availability.message }, { status: 409 });
    }

    const rooms = await prisma.room.findMany({
      where: { id: { in: parsed.data.roomIds }, isActive: true },
    });
    const nights = nightsBetween(checkIn, checkOut);
    const pricing = calculateStayPricing({
      nights,
      roomRates: rooms.map((r) => r.baseTariffPerNight),
      adults: parsed.data.adults,
      children: parsed.data.children,
      extraGuestFeesPerNight: rooms.map((r) => r.extraGuestFee),
    });

    if (parsed.data.packageId) {
      const pkg = await prisma.package.findUnique({
        where: { id: parsed.data.packageId },
      });
      if (pkg?.pricePerNight) {
        pricing.total = pkg.pricePerNight * nights;
        pricing.roomSubtotal = pricing.total;
        pricing.advanceDue =
          Math.round(((pricing.total * BOOKING.advancePercent) / 100) * 100) /
          100;
        pricing.balanceDue =
          Math.round((pricing.total - pricing.advanceDue) * 100) / 100;
      } else if (pkg?.totalPrice) {
        pricing.total = pkg.totalPrice;
        pricing.roomSubtotal = pricing.total;
        pricing.advanceDue =
          Math.round(((pricing.total * BOOKING.advancePercent) / 100) * 100) /
          100;
        pricing.balanceDue =
          Math.round((pricing.total - pricing.advanceDue) * 100) / 100;
      }
    }

    const booking = await prisma.$transaction(async (tx) => {
      const recheck = await assertRoomsAvailable(
        parsed.data.roomIds,
        checkIn,
        checkOut,
      );
      if (!recheck.ok) {
        throw new Error(recheck.message);
      }

      return tx.booking.create({
        data: {
          reference: generateBookingReference(),
          userId: session?.user?.id,
          packageId: parsed.data.packageId,
          guestName: parsed.data.guestName,
          guestEmail: parsed.data.guestEmail.toLowerCase(),
          guestPhone: parsed.data.guestPhone,
          checkIn,
          checkOut,
          adults: parsed.data.adults,
          children: parsed.data.children,
          status: BOOKING_STATUS.PENDING,
          paymentStatus: PAYMENT_STATUS.PENDING,
          pricing: pricing as unknown as Prisma.InputJsonValue,
          notes: parsed.data.notes,
          rooms: {
            create: rooms.map((room) => ({
              roomId: room.id,
              nightlyRate: room.baseTariffPerNight,
              nights,
            })),
          },
        },
        include: { rooms: { include: { room: true } } },
      });
    });

    return NextResponse.json({
      data: withId({
        ...booking,
        pricing: booking.pricing as unknown as BookingPricing,
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    const status = message.includes("available") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
