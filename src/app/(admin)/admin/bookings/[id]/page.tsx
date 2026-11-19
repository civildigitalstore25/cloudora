import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { AdminDeleteButton } from "@/components/features/admin/AdminDeleteButton";
import { AdminCard } from "@/components/features/admin/AdminUi";
import { BookingStatusForm } from "@/components/features/admin/BookingStatusForm";
import { Badge } from "@/components/ui/badge";
import { API } from "@/constants/api";
import { ROUTES } from "@/constants/routes";
import { prisma } from "@/lib/db/prisma";
import type { BookingPricing } from "@/types/booking";

type Params = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminBookingDetailPage({ params }: Params) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { rooms: { include: { room: true } } },
  });
  if (!booking) notFound();
  const pricing = booking.pricing as unknown as BookingPricing;

  return (
    <div>
      <AdminPageHeader
        title={booking.reference}
        description={`${booking.guestName} · ${booking.guestEmail}`}
        actions={
          <div className="flex items-center gap-2">
            <Badge tone="primary">{booking.status}</Badge>
            <Badge tone="neutral">{booking.paymentStatus}</Badge>
            <AdminDeleteButton
              endpoint={API.ADMIN.BOOKING(booking.id)}
              confirmMessage={`Delete booking ${booking.reference}?`}
              redirectTo={ROUTES.ADMIN.BOOKINGS}
            />
          </div>
        }
      />

      <AdminCard className="p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Stay
            </p>
            <p className="mt-1 text-sm text-dark">
              {booking.checkIn.toLocaleDateString("en-IN")} →{" "}
              {booking.checkOut.toLocaleDateString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Rooms
            </p>
            <p className="mt-1 text-sm text-dark">
              {booking.rooms.map((r) => r.room.name).join(", ")}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Phone
            </p>
            <p className="mt-1 text-sm text-dark">{booking.guestPhone}</p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              Pricing
            </p>
            <p className="mt-1 text-sm text-dark">
              ₹{pricing.total.toLocaleString("en-IN")} total · ₹
              {pricing.advancePaid.toLocaleString("en-IN")} advance · ₹
              {pricing.balanceDue.toLocaleString("en-IN")} due
            </p>
          </div>
        </div>
        <p className="mt-4">
          <Link
            href={ROUTES.ADMIN.BOOKINGS}
            className="text-sm font-semibold text-accent-strong hover:text-primary"
          >
            ← Back to bookings
          </Link>
        </p>
      </AdminCard>

      <BookingStatusForm
        bookingId={booking.id}
        status={booking.status}
        paymentStatus={booking.paymentStatus}
        adminNotes={booking.adminNotes}
      />
    </div>
  );
}
