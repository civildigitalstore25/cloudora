import { BOOKING_STATUS, PAYMENT_STATUS } from "@/constants/booking";
import { prisma } from "@/lib/db/prisma";

function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  const ms = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export async function getUnavailableRoomIds(
  checkIn: Date,
  checkOut: Date,
  excludeBookingId?: string,
): Promise<Set<string>> {
  const pendingHoldSince = new Date(Date.now() - 30 * 60 * 1000);

  const [booked, blocked] = await Promise.all([
    prisma.bookingRoom.findMany({
      where: {
        booking: {
          ...(excludeBookingId ? { id: { not: excludeBookingId } } : {}),
          OR: [
            { paymentStatus: PAYMENT_STATUS.PAID },
            {
              status: {
                in: [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.CHECKED_IN],
              },
            },
            {
              status: BOOKING_STATUS.PENDING,
              createdAt: { gte: pendingHoldSince },
            },
          ],
          checkIn: { lt: checkOut },
          checkOut: { gt: checkIn },
        },
      },
      select: { roomId: true },
    }),
    prisma.blockedDate.findMany({
      where: {
        startDate: { lt: checkOut },
        endDate: { gt: checkIn },
      },
      select: { roomId: true },
    }),
  ]);

  const unavailable = new Set<string>();
  for (const row of booked) unavailable.add(row.roomId);
  for (const row of blocked) {
    if (row.roomId) unavailable.add(row.roomId);
    else {
      // property-wide block: mark all rooms later by caller
      unavailable.add("*");
    }
  }
  return unavailable;
}

export async function getAvailableRooms(checkIn: Date, checkOut: Date) {
  const rooms = await prisma.room.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  const unavailable = await getUnavailableRoomIds(checkIn, checkOut);
  if (unavailable.has("*")) return [];

  return rooms.filter((room) => !unavailable.has(room.id));
}

export async function assertRoomsAvailable(
  roomIds: string[],
  checkIn: Date,
  checkOut: Date,
  excludeBookingId?: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (roomIds.length === 0) {
    return { ok: false, message: "Select at least one room" };
  }

  const unique = [...new Set(roomIds)];
  const rooms = await prisma.room.findMany({
    where: { id: { in: unique }, isActive: true },
  });
  if (rooms.length !== unique.length) {
    return { ok: false, message: "One or more rooms are invalid" };
  }

  const unavailable = await getUnavailableRoomIds(
    checkIn,
    checkOut,
    excludeBookingId,
  );
  if (unavailable.has("*")) {
    return { ok: false, message: "Property is blocked for these dates" };
  }

  const conflict = unique.find((id) => unavailable.has(id));
  if (conflict) {
    return { ok: false, message: "A selected room is no longer available" };
  }

  return { ok: true };
}

export { rangesOverlap };
