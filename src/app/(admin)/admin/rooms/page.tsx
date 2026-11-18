import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminRoomsPage() {
  const rooms = await prisma.room.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-dark">Rooms</h1>
        <Button asChild variant="accent" size="sm">
          <Link href={ROUTES.ADMIN.ROOM_NEW}>Add room</Link>
        </Button>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Floor</th>
              <th className="px-4 py-3 font-medium">Tariff</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-t border-border">
                <td className="px-4 py-3 text-dark">{room.name}</td>
                <td className="px-4 py-3">{room.floor}</td>
                <td className="px-4 py-3">
                  ₹{room.baseTariffPerNight.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  {room.isActive ? "Active" : "Hidden"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={ROUTES.ADMIN.ROOM_EDIT(room.id)}
                    className="text-accent"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
