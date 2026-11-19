import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
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
      <AdminPageHeader
        title="Add package"
        description="Bundle rooms into a curated stay offer."
      />
      <PackageForm rooms={rooms} />
    </div>
  );
}
