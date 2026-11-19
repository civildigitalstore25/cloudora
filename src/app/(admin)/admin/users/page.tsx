import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { AdminUsersClient } from "@/components/features/admin/AdminUsersClient";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader
        title="Users"
        description="Guests who registered and admin operators."
      />
      <AdminUsersClient
        users={users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
