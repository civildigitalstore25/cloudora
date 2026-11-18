import { BlockedDatesClient } from "@/components/features/admin/BlockedDatesClient";
import { prisma } from "@/lib/db/prisma";
import { withIds } from "@/lib/db/serialize";

export const dynamic = "force-dynamic";

export default async function AdminBlockedDatesPage() {
  const [blocks, rooms] = await Promise.all([
    prisma.blockedDate.findMany({
      orderBy: { startDate: "asc" },
      include: { room: true },
    }),
    prisma.room.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl text-dark">Blocked dates</h1>
      <BlockedDatesClient
        rooms={rooms}
        blocks={withIds(blocks).map((b) => ({
          _id: b._id,
          startDate: b.startDate.toISOString(),
          endDate: b.endDate.toISOString(),
          reason: b.reason,
          roomId: b.roomId,
          room: b.room ? { name: b.room.name } : null,
        }))}
      />
    </div>
  );
}
