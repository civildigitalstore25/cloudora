import Link from "next/link";
import {
  BedDouble,
  CalendarCheck2,
  IndianRupee,
  MessageSquare,
} from "lucide-react";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { BOOKING_STATUS, PAYMENT_STATUS } from "@/constants/booking";
import { ROUTES } from "@/constants/routes";
import { prisma } from "@/lib/db/prisma";
import { cn } from "@/lib/utils/cn";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [bookings, rooms, enquiries, paid, upcoming] = await Promise.all([
    prisma.booking.count(),
    prisma.room.count({ where: { isActive: true } }),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.booking.findMany({
      where: { paymentStatus: PAYMENT_STATUS.PAID },
      select: { pricing: true },
    }),
    prisma.booking.findMany({
      where: {
        status: { in: [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.CHECKED_IN] },
        checkIn: { gte: new Date() },
      },
      orderBy: { checkIn: "asc" },
      take: 6,
      include: { rooms: { include: { room: true } } },
    }),
  ]);

  const revenue = paid.reduce((sum, b) => {
    const pricing = b.pricing as unknown as { advancePaid?: number };
    return sum + (pricing.advancePaid ?? 0);
  }, 0);

  const stats = [
    {
      label: "Total bookings",
      value: String(bookings),
      icon: CalendarCheck2,
      href: ROUTES.ADMIN.BOOKINGS,
      tone: "bg-primary/10 text-primary",
    },
    {
      label: "Active rooms",
      value: String(rooms),
      icon: BedDouble,
      href: ROUTES.ADMIN.ROOMS,
      tone: "bg-accent-soft text-accent-strong",
    },
    {
      label: "New enquiries",
      value: String(enquiries),
      icon: MessageSquare,
      href: ROUTES.ADMIN.ENQUIRIES,
      tone: "bg-primary-soft text-primary-strong",
    },
    {
      label: "Advance collected",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      href: ROUTES.ADMIN.BOOKINGS,
      tone: "bg-accent/20 text-primary-strong",
    },
  ] as const;

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Live snapshot of Cloudora occupancy, payments and guest requests."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">{card.label}</p>
                <p className="mt-3 font-display text-3xl text-dark">{card.value}</p>
              </div>
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  card.tone,
                )}
              >
                <card.icon className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
          <div>
            <h2 className="font-display text-xl text-dark">Upcoming arrivals</h2>
            <p className="text-sm text-muted">Confirmed stays still to check in</p>
          </div>
          <Link
            href={ROUTES.ADMIN.BOOKINGS}
            className="text-sm font-semibold text-accent-strong hover:text-primary"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-border/70">
          {upcoming.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted">
              No upcoming confirmed stays yet.
            </p>
          ) : (
            upcoming.map((b) => (
              <Link
                key={b.id}
                href={ROUTES.ADMIN.BOOKING_DETAIL(b.id)}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-cream/60"
              >
                <div>
                  <p className="font-semibold text-dark">{b.reference}</p>
                  <p className="mt-0.5 text-sm text-muted">
                    {b.guestName} · {b.rooms.map((r) => r.room.name).join(", ")}
                  </p>
                </div>
                <p className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
                  {b.checkIn.toLocaleDateString("en-IN")}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
