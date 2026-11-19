import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { PackageForm } from "@/components/features/admin/PackageForm";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";

type Params = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function AdminPackageEditPage({ params }: Params) {
  const { id } = await params;
  const [pkg, rooms] = await Promise.all([
    prisma.package.findUnique({ where: { id } }),
    prisma.room.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true },
    }),
  ]);
  if (!pkg) notFound();
  const mapped = withId(pkg);

  return (
    <div>
      <AdminPageHeader
        title="Edit package"
        description="Update offer details, linked rooms and pricing."
      />
      <PackageForm
        rooms={rooms}
        initial={{
          _id: mapped._id,
          name: mapped.name,
          slug: mapped.slug,
          description: mapped.description,
          shortDescription: mapped.shortDescription,
          images: mapped.images,
          roomIds: mapped.roomIds,
          pricePerNight: mapped.pricePerNight,
          totalPrice: mapped.totalPrice,
          maxGuests: mapped.maxGuests,
          includes: mapped.includes,
          isActive: mapped.isActive,
          sortOrder: mapped.sortOrder,
        }}
      />
    </div>
  );
}
