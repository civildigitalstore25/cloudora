import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { GalleryAdminClient } from "@/components/features/admin/GalleryAdminClient";
import { prisma } from "@/lib/db/prisma";
import { withIds } from "@/lib/db/serialize";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = withIds(
    await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } }),
  );

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Photos and videos shown across the public site."
      />
      <GalleryAdminClient
        items={items.map((i) => ({
          _id: i._id,
          title: i.title,
          url: i.url,
          type: i.type,
          alt: i.alt,
          sortOrder: i.sortOrder,
          isActive: i.isActive,
        }))}
      />
    </div>
  );
}
