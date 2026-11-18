import { prisma } from "@/lib/db/prisma";
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/constants/booking";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [bookings, rooms, enquiries, paid] = await Promise.all([
    prisma.booking.count(),
    prisma.room.count({ where: { isActive: true } }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.booking.findMany({
      where: { paymentStatus: PAYMENT_STATUS.PAID },
      select: { pricing: true, checkIn: true, status: true },
      orderBy: { checkIn: "asc" },
      take: 8,
    }),
  ]);

  const revenue = paid.reduce((sum, b) => {
    const pricing = b.pricing as unknown as { advancePaid?: number };
    return sum + (pricing.advancePaid ?? 0);
  }, 0);

  const upcoming = await prisma.booking.findMany({
    where: {
      status: { in: [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.CHECKED_IN] },
      checkIn: { gte: new Date() },
    },
    orderBy: { checkIn: "asc" },
    take: 5,
    include: { rooms: { include: { room: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-3xl text-dark">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Bookings", value: bookings },
          { label: "Active rooms", value: rooms },
          { label: "New enquiries", value: enquiries },
          { label: "Advance collected", value: `₹${revenue.toLocaleString("en-IN")}` },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl bg-card p-5 shadow-sm">
            <p className="text-xs tracking-[0.14em] text-muted uppercase">
              {card.label}
            </p>
            <p className="mt-2 font-display text-3xl text-dark">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-card p-5 shadow-sm">
        <h2 className="font-display text-xl text-dark">Upcoming arrivals</h2>
        <div className="mt-4 space-y-3">
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted">No upcoming confirmed stays.</p>
          ) : (
            upcoming.map((b) => (
              <div
                key={b.id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-sm"
              >
                <div>
                  <p className="font-medium text-dark">{b.reference}</p>
                  <p className="text-muted">
                    {b.guestName} · {b.rooms.map((r) => r.room.name).join(", ")}
                  </p>
                </div>
                <p className="text-muted">
                  {b.checkIn.toLocaleDateString("en-IN")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
