"use client";

import Link from "next/link";
import {
  AdminEmptyState,
  AdminTable,
  AdminTableRow,
} from "@/components/features/admin/AdminUi";
import { AdminDeleteButton } from "@/components/features/admin/AdminDeleteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ADMIN_ACTIONS } from "@/constants/admin";
import { API } from "@/constants/api";
import { ROUTES } from "@/constants/routes";

type BookingRow = {
  id: string;
  reference: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  status: string;
  paymentStatus: string;
  total: number;
  rooms: string;
};

function statusTone(status: string): "success" | "warning" | "destructive" | "neutral" | "primary" {
  if (status === "CONFIRMED" || status === "CHECKED_IN" || status === "PAID") {
    return "success";
  }
  if (status === "PENDING") return "warning";
  if (status === "CANCELLED" || status === "FAILED") return "destructive";
  if (status === "COMPLETED") return "primary";
  return "neutral";
}

export function AdminBookingsClient({ bookings }: { bookings: BookingRow[] }) {
  return (
    <div>
      {bookings.length === 0 ? (
        <AdminEmptyState message="No bookings yet." />
      ) : (
        <AdminTable
          headers={["Reference", "Guest", "Stay", "Amount", "Status", ""]}
        >
          {bookings.map((booking) => (
            <AdminTableRow key={booking.id}>
              <td className="px-4 py-3.5">
                <p className="font-medium text-dark">{booking.reference}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {booking.rooms}
                </p>
              </td>
              <td className="px-4 py-3.5">
                <p className="text-dark">{booking.guestName}</p>
                <p className="text-xs text-muted">{booking.guestEmail}</p>
              </td>
              <td className="px-4 py-3.5 text-sm text-muted">
                {new Date(booking.checkIn).toLocaleDateString("en-IN")} →{" "}
                {new Date(booking.checkOut).toLocaleDateString("en-IN")}
              </td>
              <td className="px-4 py-3.5 text-dark">
                ₹{booking.total.toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3.5">
                <div className="flex flex-wrap gap-1.5">
                  <Badge tone={statusTone(booking.status)}>{booking.status}</Badge>
                  <Badge tone={statusTone(booking.paymentStatus)}>
                    {booking.paymentStatus}
                  </Badge>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <div className="flex items-center justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={ROUTES.ADMIN.BOOKING_DETAIL(booking.id)}>
                      {ADMIN_ACTIONS.view}
                    </Link>
                  </Button>
                  <AdminDeleteButton
                    endpoint={API.ADMIN.BOOKING(booking.id)}
                    confirmMessage={`Delete booking ${booking.reference}?`}
                  />
                </div>
              </td>
            </AdminTableRow>
          ))}
        </AdminTable>
      )}
    </div>
  );
}
