"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/constants/api";

export function BookingStatusForm({
  bookingId,
  status,
  paymentStatus,
  adminNotes,
}: {
  bookingId: string;
  status: string;
  paymentStatus: string;
  adminNotes?: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(API.ADMIN.BOOKING(bookingId), {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          status: form.get("status"),
          paymentStatus: form.get("paymentStatus"),
          adminNotes: form.get("adminNotes"),
          balanceCollected: form.get("balanceCollected") === "on",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      toast.success("Booking updated");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 space-y-4 rounded-2xl border border-border/70 bg-card p-5 shadow-sm"
    >
      <div>
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {["PENDING", "CONFIRMED", "CHECKED_IN", "COMPLETED", "CANCELLED"].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ),
          )}
        </select>
      </div>
      <div>
        <Label htmlFor="paymentStatus">Payment status</Label>
        <select
          id="paymentStatus"
          name="paymentStatus"
          defaultValue={paymentStatus}
          className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {["PENDING", "PAID", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED"].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ),
          )}
        </select>
      </div>
      <div>
        <Label htmlFor="adminNotes">Admin notes</Label>
        <Textarea
          id="adminNotes"
          name="adminNotes"
          defaultValue={adminNotes ?? ""}
          className="mt-1.5"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="balanceCollected" />
        Mark remaining balance collected
      </label>
      <Button type="submit" variant="accent" disabled={loading}>
        {loading ? "Saving…" : "Update booking"}
      </Button>
    </form>
  );
}
