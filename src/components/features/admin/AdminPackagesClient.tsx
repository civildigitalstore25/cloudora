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

type PackageRow = {
  id: string;
  name: string;
  shortDescription: string;
  roomIds: string[];
  pricePerNight: number | null;
  totalPrice: number | null;
  isActive: boolean;
};

function priceLabel(pkg: PackageRow) {
  if (pkg.totalPrice != null) {
    return `₹${pkg.totalPrice.toLocaleString("en-IN")} total`;
  }
  if (pkg.pricePerNight != null) {
    return `₹${pkg.pricePerNight.toLocaleString("en-IN")}/night`;
  }
  return "—";
}

export function AdminPackagesClient({ packages }: { packages: PackageRow[] }) {
  if (packages.length === 0) {
    return (
      <AdminEmptyState message="No packages yet. Create a curated offer." />
    );
  }

  return (
    <AdminTable headers={["Name", "Rooms", "Price", "Status", ""]}>
      {packages.map((pkg) => (
        <AdminTableRow key={pkg.id}>
          <td className="px-4 py-3.5">
            <p className="font-medium text-dark">{pkg.name}</p>
            {pkg.shortDescription ? (
              <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                {pkg.shortDescription}
              </p>
            ) : null}
          </td>
          <td className="px-4 py-3.5 text-muted">{pkg.roomIds.length} linked</td>
          <td className="px-4 py-3.5 text-dark">{priceLabel(pkg)}</td>
          <td className="px-4 py-3.5">
            <AdminStatusPill active={pkg.isActive} />
          </td>
          <td className="px-4 py-3.5">
            <div className="flex items-center justify-end gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={ROUTES.ADMIN.PACKAGE_EDIT(pkg.id)}>
                  {ADMIN_ACTIONS.edit}
                </Link>
              </Button>
              <AdminDeleteButton
                endpoint={API.ADMIN.PACKAGE(pkg.id)}
                confirmMessage={`Delete “${pkg.name}”? This cannot be undone.`}
              />
            </div>
          </td>
        </AdminTableRow>
      ))}
    </AdminTable>
  );
}
