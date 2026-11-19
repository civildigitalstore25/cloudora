"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AdminEmptyState,
  AdminTable,
  AdminTableRow,
} from "@/components/features/admin/AdminUi";
import { AdminDeleteButton } from "@/components/features/admin/AdminDeleteButton";
import { Badge } from "@/components/ui/badge";
import { ADMIN_ACTIONS } from "@/constants/admin";
import { API } from "@/constants/api";

type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "user" | "admin";
  createdAt: string;
};

export function AdminUsersClient({ users }: { users: UserRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function setRole(id: string, role: "user" | "admin") {
    setBusyId(id);
    try {
      const res = await fetch(API.ADMIN.USER(id), {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || ADMIN_ACTIONS.updateFailed);
      toast.success(ADMIN_ACTIONS.updated);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ADMIN_ACTIONS.updateFailed);
    } finally {
      setBusyId(null);
    }
  }

  if (users.length === 0) {
    return <AdminEmptyState message="No users registered yet." />;
  }

  return (
    <AdminTable headers={["Name", "Contact", "Joined", "Role", ""]}>
      {users.map((user) => (
        <AdminTableRow key={user.id}>
          <td className="px-4 py-3.5 font-medium text-dark">{user.name}</td>
          <td className="px-4 py-3.5">
            <p className="text-dark">{user.email}</p>
            {user.phone ? (
              <p className="text-xs text-muted">{user.phone}</p>
            ) : null}
          </td>
          <td className="px-4 py-3.5 text-sm text-muted">
            {new Date(user.createdAt).toLocaleDateString("en-IN")}
          </td>
          <td className="px-4 py-3.5">
            <Badge tone={user.role === "admin" ? "primary" : "neutral"}>
              {user.role}
            </Badge>
          </td>
          <td className="px-4 py-3.5">
            <div className="flex items-center justify-end gap-2">
              <select
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                value={user.role}
                disabled={busyId === user.id}
                onChange={(e) =>
                  setRole(user.id, e.target.value as "user" | "admin")
                }
                aria-label={`Role for ${user.name}`}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <AdminDeleteButton
                endpoint={API.ADMIN.USER(user.id)}
                confirmMessage={`Delete user ${user.email}?`}
              />
            </div>
          </td>
        </AdminTableRow>
      ))}
    </AdminTable>
  );
}
