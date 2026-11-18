import type { BookingPricing } from "@/types/booking";
import type { Prisma } from "@prisma/client";

export function asBookingPricing(value: Prisma.JsonValue): BookingPricing {
  return value as unknown as BookingPricing;
}
