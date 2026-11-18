import { EnquiriesClient } from "@/components/features/admin/EnquiriesClient";
import { prisma } from "@/lib/db/prisma";
import { withIds } from "@/lib/db/serialize";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const items = withIds(
    await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } }),
  );

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl text-dark">Enquiries</h1>
      <EnquiriesClient
        items={items.map((i) => ({
          _id: i._id,
          name: i.name,
          email: i.email,
          phone: i.phone,
          subject: i.subject,
          message: i.message,
          status: i.status,
          type: i.type,
          createdAt: i.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
