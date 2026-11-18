"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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

export function EnquiriesClient({ items }: { items: Enquiry[] }) {
  const router = useRouter();

  async function setStatus(id: string, status: string) {
    const res = await fetch(API.ADMIN.ENQUIRY(id), {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      toast.error("Update failed");
      return;
    }
    toast.success("Updated");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item._id} className="rounded-2xl bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-display text-xl text-dark">{item.name}</p>
            <p className="text-xs uppercase tracking-wide text-muted">
              {item.type} · {item.status}
            </p>
          </div>
          <p className="mt-1 text-sm text-muted">
            {item.email}
            {item.phone ? ` · ${item.phone}` : ""}
          </p>
          <p className="mt-3 text-sm font-medium text-dark">{item.subject}</p>
          <p className="mt-2 text-sm text-muted">{item.message}</p>
          <div className="mt-4 flex gap-2">
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
          </div>
        </article>
      ))}
    </div>
  );
}
