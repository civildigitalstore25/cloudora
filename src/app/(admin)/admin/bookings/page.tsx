import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { AdminBookingsClient } from "@/components/features/admin/AdminBookingsClient";
import { prisma } from "@/lib/db/prisma";
import type { BookingPricing } from "@/types/booking";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { rooms: { include: { room: true } } },
  });

  return (
    <div>
      <AdminPageHeader
        title="Bookings"
        description="Confirm stays, track advances and manage guest arrivals."
      />
      <AdminBookingsClient
        bookings={bookings.map((booking) => {
          const pricing = booking.pricing as unknown as BookingPricing;
          return {
            id: booking.id,
            reference: booking.reference,
            guestName: booking.guestName,
            guestEmail: booking.guestEmail,
            checkIn: booking.checkIn.toISOString(),
            checkOut: booking.checkOut.toISOString(),
            status: booking.status,
            paymentStatus: booking.paymentStatus,
            total: pricing.total,
            rooms: booking.rooms.map((r) => r.room.name).join(", "),
          };
        })}
      />
    </div>
  );
}
