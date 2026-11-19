"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AdminCard,
  AdminEmptyState,
  AdminStatusPill,
} from "@/components/features/admin/AdminUi";
import { AdminDeleteButton } from "@/components/features/admin/AdminDeleteButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ADMIN_ACTIONS } from "@/constants/admin";
import { API } from "@/constants/api";

type Item = {
  _id: string;
  title: string;
  url: string;
  type: string;
  alt: string;
  sortOrder: number;
  isActive: boolean;
};

export function GalleryAdminClient({ items }: { items: Item[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      title: String(form.get("title") || ""),
      url: String(form.get("url")),
      type: String(form.get("type") || "IMAGE"),
      alt: String(form.get("alt") || form.get("title") || ""),
      sortOrder: Number(form.get("sortOrder") || 0),
      isActive: form.get("isActive") === "on",
    };

    try {
      const res = await fetch(
        editing ? API.ADMIN.GALLERY_ITEM(editing._id) : API.ADMIN.GALLERY,
        {
          method: editing ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || ADMIN_ACTIONS.createFailed);
      toast.success(editing ? ADMIN_ACTIONS.updated : ADMIN_ACTIONS.created);
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
          {editing ? "Edit media" : "Add media"}
        </p>
        <form onSubmit={onSubmit} className="mt-4 space-y-4" key={editing?._id ?? "new"}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={editing?.title}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="url">URL / path</Label>
            <Input
              id="url"
              name="url"
              required
              defaultValue={editing?.url}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="alt">Alt text</Label>
            <Input
              id="alt"
              name="alt"
              defaultValue={editing?.alt}
              className="mt-1.5"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                name="type"
                defaultValue={editing?.type ?? "IMAGE"}
                className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
            </div>
            <div>
              <Label htmlFor="sortOrder">Sort</Label>
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={editing?.sortOrder ?? 0}
                className="mt-1.5"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={editing?.isActive ?? true}
            />
            Active
          </label>
          <div className="flex gap-2">
            <Button type="submit" variant="accent" disabled={loading}>
              {loading
                ? ADMIN_ACTIONS.saving
                : editing
                  ? ADMIN_ACTIONS.save
                  : "Add media"}
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
        {items.length === 0 ? (
          <AdminEmptyState message="No gallery items yet." />
        ) : (
          items.map((item) => (
            <AdminCard
              key={item._id}
              className="flex flex-wrap items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-dark">
                    {item.title || item.url}
                  </p>
                  <AdminStatusPill active={item.isActive} />
                </div>
                <p className="mt-1 truncate text-sm text-muted">
                  {item.type} · {item.url}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(item)}
                >
                  {ADMIN_ACTIONS.edit}
                </Button>
                <AdminDeleteButton endpoint={API.ADMIN.GALLERY_ITEM(item._id)} />
              </div>
            </AdminCard>
          ))
        )}
      </div>
    </div>
  );
}
