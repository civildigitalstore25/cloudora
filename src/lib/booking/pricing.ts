import { BOOKING } from "@/constants/booking";
import type { BookingPricing } from "@/types/booking";

export function calculateStayPricing(input: {
  nights: number;
  roomRates: number[];
  adults: number;
  children: number;
  extraGuestFeesPerNight?: number[];
}): BookingPricing {
  const roomSubtotal = input.roomRates.reduce(
    (sum, rate) => sum + rate * input.nights,
    0,
  );

  const includedCapacity =
    BOOKING.baseAdultsIncluded + BOOKING.baseChildrenIncluded;
  const guestCount = input.adults + input.children;
  const extraGuests = Math.max(0, guestCount - includedCapacity);
  const feePerNight =
    input.extraGuestFeesPerNight?.reduce((a, b) => a + b, 0) ?? 0;
  const extraGuestFees = extraGuests * feePerNight * input.nights;

  const total = Math.round((roomSubtotal + extraGuestFees) * 100) / 100;
  const advanceDue =
    Math.round(((total * BOOKING.advancePercent) / 100) * 100) / 100;
  const balanceDue = Math.round((total - advanceDue) * 100) / 100;

  return {
    nights: input.nights,
    roomSubtotal,
    extraGuestFees,
    total,
    advancePercent: BOOKING.advancePercent,
    advanceDue,
    advancePaid: 0,
    balanceDue,
    currency: "INR",
  };
}

export function generateBookingReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `${BOOKING.referencePrefix}-${stamp}${rand}`;
}
