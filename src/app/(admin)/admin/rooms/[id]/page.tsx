import { notFound } from "next/navigation";
import { RoomForm } from "@/components/features/admin/RoomForm";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";

type Params = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminRoomEditPage({ params }: Params) {
  const { id } = await params;
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) notFound();
  const mapped = withId(room);

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl text-dark">Edit room</h1>
      <RoomForm
        initial={{
          _id: mapped._id,
          name: mapped.name,
          slug: mapped.slug,
          description: mapped.description,
          floor: mapped.floor,
          maxGuests: mapped.maxGuests,
          baseTariffPerNight: mapped.baseTariffPerNight,
          extraGuestFee: mapped.extraGuestFee,
          images: mapped.images,
          amenities: mapped.amenities,
          isActive: mapped.isActive,
          sortOrder: mapped.sortOrder,
        }}
      />
    </div>
  );
}
