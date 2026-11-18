"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API } from "@/constants/api";
import { BOOKING_COPY } from "@/constants/booking";
import { BOOKING_STORAGE_KEY, ROUTES } from "@/constants/routes";
import { openCashfreeCheckout } from "@/lib/payment/cashfree-checkout";
import type { BookingDraft } from "@/types/booking";

export function CheckoutClient() {
  const router = useRouter();
  const { data: session } = useSession();
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(BOOKING_STORAGE_KEY);
    if (!raw) {
      router.replace(ROUTES.BOOK);
      return;
    }
    try {
      setDraft(JSON.parse(raw) as BookingDraft);
    } catch {
      router.replace(ROUTES.BOOK);
    }
  }, [router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!draft) return;
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const createRes = await fetch(API.BOOKINGS, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...draft,
          guestName: form.get("guestName"),
          guestEmail: form.get("guestEmail"),
          guestPhone: form.get("guestPhone"),
          notes: form.get("notes") || undefined,
        }),
      });
      const createJson = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createJson.error || "Could not create booking");
      }

      const bookingId = createJson.data._id as string;
      const payRes = await fetch(API.PAYMENT_CASHFREE, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const payJson = await payRes.json();

      if (payRes.status === 409 && payJson.data?.paymentStatus === "PAID") {
        localStorage.removeItem(BOOKING_STORAGE_KEY);
        router.push(ROUTES.BOOKING_CONFIRMATION(bookingId));
        return;
      }

      if (!payRes.ok) {
        throw new Error(payJson.error || "Payment init failed");
      }

      localStorage.removeItem(BOOKING_STORAGE_KEY);
      await openCashfreeCheckout(
        payJson.data.paymentSessionId,
        payJson.data.mode,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (!draft) {
    return <p className="text-muted">Loading checkout…</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <div className="rounded-2xl bg-cream p-4 text-sm text-muted">
        <p>
          {draft.checkIn} → {draft.checkOut}
        </p>
        <p className="mt-1">
          {BOOKING_COPY.guests(draft.adults, draft.children)} ·{" "}
          {draft.roomIds.length} room(s)
        </p>
        <p className="mt-2 font-medium text-dark">
          {BOOKING_COPY.advanceLabel} payable online
        </p>
      </div>

      <div>
        <Label htmlFor="guestName">Full name</Label>
        <Input
          id="guestName"
          name="guestName"
          required
          defaultValue={session?.user?.name ?? ""}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="guestEmail">Email</Label>
        <Input
          id="guestEmail"
          name="guestEmail"
          type="email"
          required
          defaultValue={session?.user?.email ?? ""}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="guestPhone">Phone</Label>
        <Input id="guestPhone" name="guestPhone" required className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Input id="notes" name="notes" className="mt-1.5" />
      </div>

      <Button type="submit" variant="accent" size="lg" disabled={loading}>
        {loading ? "Processing…" : "Pay 50% advance"}
      </Button>
    </form>
  );
}
