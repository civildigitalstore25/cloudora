"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AdminCard,
  AdminEmptyState,
} from "@/components/features/admin/AdminUi";
import { AdminDeleteButton } from "@/components/features/admin/AdminDeleteButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_ACTIONS } from "@/constants/admin";
import { API } from "@/constants/api";

type Block = {
  _id: string;
  startDate: string;
  endDate: string;
  reason: string;
  room?: { name: string } | null;
  roomId?: string | null;
};

function toDateInput(value: string) {
  return value.slice(0, 10);
}

export function BlockedDatesClient({
  blocks,
  rooms,
}: {
  blocks: Block[];
  rooms: Array<{ id: string; name: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Block | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      roomId: String(form.get("roomId") || "") || null,
      startDate: String(form.get("startDate")),
      endDate: String(form.get("endDate")),
      reason: String(form.get("reason") || ""),
    };

    try {
      const res = await fetch(
        editing ? API.ADMIN.BLOCKED_ITEM(editing._id) : API.ADMIN.BLOCKED,
        {
          method: editing ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || ADMIN_ACTIONS.createFailed);
      toast.success(editing ? ADMIN_ACTIONS.updated : "Dates blocked");
      setEditing(null);
      e.currentTarget.reset();
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : ADMIN_ACTIONS.createFailed,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <AdminCard className="h-fit p-5">
        <p className="font-display text-xl text-dark">
          {editing ? "Edit block" : "Block dates"}
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-4 space-y-4"
          key={editing?._id ?? "new"}
        >
          <div>
            <Label htmlFor="roomId">Room (empty = whole property)</Label>
            <select
              id="roomId"
              name="roomId"
              defaultValue={editing?.roomId ?? ""}
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
              <Input
                id="startDate"
                name="startDate"
                type="date"
                required
                defaultValue={
                  editing ? toDateInput(editing.startDate) : undefined
                }
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="endDate">End</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                required
                defaultValue={editing ? toDateInput(editing.endDate) : undefined}
                className="mt-1.5"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              name="reason"
              defaultValue={editing?.reason}
              className="mt-1.5"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="accent" disabled={loading}>
              {loading
                ? ADMIN_ACTIONS.saving
                : editing
                  ? ADMIN_ACTIONS.save
                  : "Block dates"}
            </Button>
            {editing ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(null)}
              >
                {ADMIN_ACTIONS.cancel}
              </Button>
            ) : null}
          </div>
        </form>
      </AdminCard>

      <div className="space-y-3">
        {blocks.length === 0 ? (
          <AdminEmptyState message="No blocked dates." />
        ) : (
          blocks.map((block) => (
            <AdminCard
              key={block._id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div>
                <p className="font-medium text-dark">
                  {block.room?.name ?? "Entire property"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {new Date(block.startDate).toLocaleDateString("en-IN")} →{" "}
                  {new Date(block.endDate).toLocaleDateString("en-IN")}
                </p>
                {block.reason ? (
                  <p className="mt-1 text-sm text-muted">{block.reason}</p>
                ) : null}
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(block)}
                >
                  {ADMIN_ACTIONS.edit}
                </Button>
                <AdminDeleteButton endpoint={API.ADMIN.BLOCKED_ITEM(block._id)} />
              </div>
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
}
