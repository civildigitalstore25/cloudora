import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { AdminPackagesClient } from "@/components/features/admin/AdminPackagesClient";
import { AdminAddButton } from "@/components/features/admin/AdminUi";
import { ROUTES } from "@/constants/routes";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Packages"
        description="Curated multi-room offers and travel partnerships."
        actions={
          <AdminAddButton href={ROUTES.ADMIN.PACKAGE_NEW} label="Add package" />
        }
      />
      <AdminPackagesClient
        packages={packages.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          shortDescription: pkg.shortDescription,
          roomIds: pkg.roomIds,
          pricePerNight: pkg.pricePerNight,
          totalPrice: pkg.totalPrice,
          isActive: pkg.isActive,
        }))}
      />
    </div>
  );
}
