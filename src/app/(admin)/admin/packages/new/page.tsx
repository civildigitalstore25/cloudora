import { PackageForm } from "@/components/features/admin/PackageForm";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPackageNewPage() {
  const rooms = await prisma.room.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl text-dark">Add package</h1>
      <PackageForm rooms={rooms} />
    </div>
  );
}
