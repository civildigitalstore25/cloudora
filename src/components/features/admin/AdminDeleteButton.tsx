"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ADMIN_ACTIONS } from "@/constants/admin";

export function AdminDeleteButton({
  endpoint,
  label = ADMIN_ACTIONS.delete,
  confirmMessage = ADMIN_ACTIONS.confirmDelete,
  redirectTo,
}: {
  endpoint: string;
  label?: string;
  confirmMessage?: string;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    if (!window.confirm(confirmMessage)) return;
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "DELETE" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || ADMIN_ACTIONS.deleteFailed);
      toast.success(ADMIN_ACTIONS.deleted);
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ADMIN_ACTIONS.deleteFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={loading}
      className="border-destructive/30 text-destructive hover:bg-destructive-soft"
    >
      {loading ? ADMIN_ACTIONS.deleting : label}
    </Button>
  );
}
