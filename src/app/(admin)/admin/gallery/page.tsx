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
      <h1 className="mb-6 font-display text-3xl text-dark">Gallery</h1>
      <GalleryAdminClient
        items={items.map((i) => ({
          _id: i._id,
          title: i.title,
          url: i.url,
          type: i.type,
        }))}
      />
    </div>
  );
}
