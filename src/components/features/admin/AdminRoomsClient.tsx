"use client";

import Link from "next/link";
import {
  AdminEmptyState,
  AdminStatusPill,
  AdminTable,
  AdminTableRow,
} from "@/components/features/admin/AdminUi";
import { AdminDeleteButton } from "@/components/features/admin/AdminDeleteButton";
import { Button } from "@/components/ui/button";
import { ADMIN_ACTIONS } from "@/constants/admin";
import { API } from "@/constants/api";
import { ROUTES } from "@/constants/routes";

type RoomRow = {
  id: string;
  name: string;
  floor: string;
  baseTariffPerNight: number;
  maxGuests: number;
  isActive: boolean;
};

export function AdminRoomsClient({ rooms }: { rooms: RoomRow[] }) {
  if (rooms.length === 0) {
    return <AdminEmptyState message="No rooms yet. Add your first bedroom." />;
  }

  return (
    <AdminTable headers={["Name", "Floor", "Guests", "Tariff", "Status", ""]}>
      {rooms.map((room) => (
        <AdminTableRow key={room.id}>
          <td className="px-4 py-3.5 font-medium text-dark">{room.name}</td>
          <td className="px-4 py-3.5 text-xs font-semibold tracking-wide text-muted uppercase">
            {room.floor}
          </td>
          <td className="px-4 py-3.5 text-muted">{room.maxGuests}</td>
          <td className="px-4 py-3.5 text-dark">
            ₹{room.baseTariffPerNight.toLocaleString("en-IN")}
          </td>
          <td className="px-4 py-3.5">
            <AdminStatusPill active={room.isActive} />
          </td>
          <td className="px-4 py-3.5">
            <div className="flex items-center justify-end gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={ROUTES.ADMIN.ROOM_EDIT(room.id)}>
                  {ADMIN_ACTIONS.edit}
                </Link>
              </Button>
              <AdminDeleteButton
                endpoint={API.ADMIN.ROOM(room.id)}
                confirmMessage={`Delete “${room.name}”? This cannot be undone.`}
              />
            </div>
          </td>
        </AdminTableRow>
      ))}
    </AdminTable>
  );
}
