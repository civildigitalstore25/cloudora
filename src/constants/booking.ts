export const BOOKING = {
  advancePercent: 50,
  baseAdultsIncluded: 2,
  baseChildrenIncluded: 1,
  childMaxAge: 8,
  minNights: 1,
  maxNights: 30,
  defaultAdults: 2,
  defaultChildren: 0,
  referencePrefix: "CLD",
} as const;

export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CHECKED_IN: "CHECKED_IN",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
} as const;

export const ROOM_FLOOR = {
  GROUND: "GROUND",
  FIRST: "FIRST",
} as const;

export const BOOKING_COPY = {
  searchTitle: "Search availability",
  searchCta: "Search availability",
  checkIn: "Check in",
  checkOut: "Check out",
  adults: "Adults",
  children: "Children",
  datePlaceholder: "dd-mm-yyyy",
  noRooms: "No rooms available for these dates.",
  selectRoom: "Select room",
  bookNow: "Book your stay",
  explorePackages: "Explore packages",
  discover: "Discover Cloudora",
  advanceLabel: "Advance (50%)",
  balanceLabel: "Balance due at property",
  totalLabel: "Total stay",
  nights: (n: number) => (n === 1 ? "1 night" : `${n} nights`),
  guests: (adults: number, children: number) => {
    const parts = [`${adults} adult${adults === 1 ? "" : "s"}`];
    if (children > 0) {
      parts.push(`${children} child${children === 1 ? "" : "ren"}`);
    }
    return parts.join(", ");
  },
  confirmationTitle: "Booking confirmed",
  confirmationBody: "We’ve emailed your confirmation. We look forward to hosting you.",
  pendingPayment: "Complete payment to confirm your stay.",
  unavailable: "This room is no longer available for the selected dates.",
} as const;

export const CANCELLATION_POLICY = [
  {
    title: "22 days before arrival",
    body: "90% refund of the advance paid.",
  },
  {
    title: "8 to 21 days before arrival",
    body: "50% of the proposed period of stay retained as retention charges.",
  },
  {
    title: "7 days before arrival",
    body: "No refund.",
  },
  {
    title: "Last-minute bookings",
    body: "No refund is possible for last-minute bookings.",
  },
] as const;

export const TARIFF_NOTE =
  "The plan tariff is for 2 persons and one kid (below 8 years). Breakfast is complementary.";
