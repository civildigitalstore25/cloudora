"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AdminCard,
  AdminEmptyState,
} from "@/components/features/admin/AdminUi";
import { AdminDeleteButton } from "@/components/features/admin/AdminDeleteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ADMIN_ACTIONS } from "@/constants/admin";
import { API } from "@/constants/api";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: string;
  type: string;
  createdAt: string;
};

function statusTone(
  status: string,
): "success" | "warning" | "neutral" | "primary" {
  if (status === "NEW") return "warning";
  if (status === "CONTACTED") return "primary";
  if (status === "CLOSED") return "success";
  return "neutral";
}

export function EnquiriesClient({ items }: { items: Enquiry[] }) {
  const router = useRouter();

  async function setStatus(id: string, status: string) {
    const res = await fetch(API.ADMIN.ENQUIRY(id), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      toast.error(ADMIN_ACTIONS.updateFailed);
      return;
    }
    toast.success(ADMIN_ACTIONS.updated);
    router.refresh();
  }

  if (items.length === 0) {
    return <AdminEmptyState message="No enquiries yet." />;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <AdminCard key={item._id} className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl text-dark">{item.name}</p>
              <p className="mt-1 text-sm text-muted">
                {item.email}
                {item.phone ? ` · ${item.phone}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">{item.type}</Badge>
              <Badge tone={statusTone(item.status)}>{item.status}</Badge>
              <p className="text-xs text-muted">
                {new Date(item.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-dark">{item.subject}</p>
          <p className="mt-2 text-sm whitespace-pre-wrap text-muted">
            {item.message}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setStatus(item._id, "CONTACTED")}
            >
              Mark contacted
            </Button>
            <Button
              type="button"
              size="sm"
              variant="default"
              onClick={() => setStatus(item._id, "CLOSED")}
            >
              Close
            </Button>
            <AdminDeleteButton
              endpoint={API.ADMIN.ENQUIRY(item._id)}
              confirmMessage={`Delete enquiry from ${item.name}?`}
            />
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
