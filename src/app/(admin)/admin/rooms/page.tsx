import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { AdminRoomsClient } from "@/components/features/admin/AdminRoomsClient";
import { AdminAddButton } from "@/components/features/admin/AdminUi";
import { ROUTES } from "@/constants/routes";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminRoomsPage() {
  const rooms = await prisma.room.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminPageHeader
        title="Rooms"
        description="Manage bedroom inventory, floor plans and nightly tariffs."
        actions={
          <AdminAddButton href={ROUTES.ADMIN.ROOM_NEW} label="Add room" />
        }
      />
      <AdminRoomsClient
        rooms={rooms.map((room) => ({
          id: room.id,
          name: room.name,
          floor: room.floor,
          baseTariffPerNight: room.baseTariffPerNight,
          maxGuests: room.maxGuests,
          isActive: room.isActive,
        }))}
      />
    </div>
  );
}
