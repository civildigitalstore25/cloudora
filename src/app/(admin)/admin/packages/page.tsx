import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-dark">Packages</h1>
        <Button asChild variant="accent" size="sm">
          <Link href={ROUTES.ADMIN.PACKAGE_NEW}>Add package</Link>
        </Button>
      </div>
      <div className="mt-6 space-y-3">
        {packages.map((pkg) => (
          <Link
            key={pkg.id}
            href={ROUTES.ADMIN.PACKAGE_EDIT(pkg.id)}
            className="block rounded-2xl bg-card p-4 shadow-sm"
          >
            <p className="font-display text-xl text-dark">{pkg.name}</p>
            <p className="text-sm text-muted">
              {pkg.isActive ? "Active" : "Hidden"} · {pkg.roomIds.length} rooms
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
