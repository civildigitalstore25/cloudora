import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { PACKAGE_TEASER } from "@/constants/home";
import { ROUTES } from "@/constants/routes";
import { UI } from "@/constants/ui";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

type PackageView = {
  id: string;
  name: string;
  description: string;
  images: string[];
  pricePerNight: number | null;
};

export default async function PackagesPage() {
  let packages: PackageView[] = [];
  try {
    packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
        shortDescription: true,
        images: true,
        pricePerNight: true,
      },
    }).then((rows) =>
      rows.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.shortDescription || row.description,
        images: row.images,
        pricePerNight: row.pricePerNight,
      })),
    );
  } catch {
    packages = [];
  }

  if (packages.length === 0) {
    packages = [
      {
        id: "signature",
        name: PACKAGE_TEASER.title,
        description: PACKAGE_TEASER.body,
        images: [ASSETS.PACKAGE],
        pricePerNight: null,
      },
    ];
  }

  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-display text-4xl text-dark md:text-5xl">Packages</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Flexible stays for families, friends and corporate groups — up to{" "}
          {UI.maxGuests} guests.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="overflow-hidden rounded-3xl bg-card shadow-sm"
            >
              <div className="relative aspect-[16/11]">
                <Image
                  src={pkg.images[0] || ASSETS.PACKAGE}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl text-dark">{pkg.name}</h2>
                <p className="mt-3 text-sm text-muted">{pkg.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <p className="font-display text-lg text-dark">
                    {pkg.pricePerNight
                      ? `From ₹${pkg.pricePerNight.toLocaleString("en-IN")}/night`
                      : "Tariff on request"}
                  </p>
                  <Button asChild variant="default" size="sm">
                    <Link href={ROUTES.BOOK}>Book</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
