"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API } from "@/constants/api";

type Block = {
  _id: string;
  startDate: string;
  endDate: string;
  reason: string;
  room?: { name: string } | null;
  roomId?: string | null;
};

export function BlockedDatesClient({
  blocks,
  rooms,
}: {
  blocks: Block[];
  rooms: Array<{ id: string; name: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(API.ADMIN.BLOCKED, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          roomId: form.get("roomId") || null,
          startDate: form.get("startDate"),
          endDate: form.get("endDate"),
          reason: form.get("reason") || "",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      toast.success("Dates blocked");
      e.currentTarget.reset();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    const res = await fetch(API.ADMIN.BLOCKED_ITEM(id), { method: "DELETE" });
    if (!res.ok) {
      toast.error("Could not delete");
      return;
    }
    toast.success("Removed");
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl bg-card p-5 shadow-sm">
        <div>
          <Label htmlFor="roomId">Room (empty = whole property)</Label>
          <select
            id="roomId"
            name="roomId"
            className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Entire property</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="startDate">Start</Label>
            <Input id="startDate" name="startDate" type="date" required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="endDate">End</Label>
            <Input id="endDate" name="endDate" type="date" required className="mt-1.5" />
          </div>
        </div>
        <div>
          <Label htmlFor="reason">Reason</Label>
          <Input id="reason" name="reason" className="mt-1.5" />
        </div>
        <Button type="submit" variant="accent" disabled={loading}>
          Block dates
        </Button>
      </form>

      <div className="space-y-3">
        {blocks.map((block) => (
          <div
            key={block._id}
            className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm"
          >
            <div className="text-sm">
              <p className="font-medium text-dark">
                {block.room?.name ?? "Entire property"}
              </p>
              <p className="text-muted">
                {new Date(block.startDate).toLocaleDateString("en-IN")} →{" "}
                {new Date(block.endDate).toLocaleDateString("en-IN")}
              </p>
              {block.reason ? <p className="text-muted">{block.reason}</p> : null}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => remove(block._id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
