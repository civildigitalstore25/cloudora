import type {
  BOOKING_STATUS,
  PAYMENT_STATUS,
  ROOM_FLOOR,
} from "@/constants/booking";

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export type RoomFloor = (typeof ROOM_FLOOR)[keyof typeof ROOM_FLOOR];

export interface BookingPricing {
  nights: number;
  roomSubtotal: number;
  extraGuestFees: number;
  total: number;
  advancePercent: number;
  advanceDue: number;
  advancePaid: number;
  balanceDue: number;
  currency: "INR";
}

export interface RoomCard {
  _id: string;
  name: string;
  slug: string;
  description: string;
  floor: RoomFloor;
  maxGuests: number;
  baseTariffPerNight: number;
  extraGuestFee: number;
  images: string[];
  amenities: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface PackageCard {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  roomIds: string[];
  pricePerNight: number | null;
  totalPrice: number | null;
  maxGuests: number;
  includes: string[];
  isActive: boolean;
}

export interface AvailabilitySearch {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

export interface BookingDraft {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomIds: string[];
  packageId?: string;
}

export interface BookingSummary {
  _id: string;
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  pricing: BookingPricing;
  rooms: Array<{ _id: string; name: string; nightlyRate: number; nights: number }>;
  createdAt: string;
}
