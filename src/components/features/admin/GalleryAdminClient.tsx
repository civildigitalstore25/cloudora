"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API } from "@/constants/api";

type Item = {
  _id: string;
  title: string;
  url: string;
  type: string;
};

export function GalleryAdminClient({ items }: { items: Item[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(API.ADMIN.GALLERY, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: form.get("title") || "",
          url: form.get("url"),
          type: form.get("type") || "IMAGE",
          alt: form.get("title") || "",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      toast.success("Added");
      e.currentTarget.reset();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    await fetch(API.ADMIN.GALLERY_ITEM(id), { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl bg-card p-5 shadow-sm">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="url">URL / path</Label>
          <Input id="url" name="url" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            name="type"
            className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="IMAGE">Image</option>
            <option value="VIDEO">Video</option>
          </select>
        </div>
        <Button type="submit" variant="accent" disabled={loading}>
          Add media
        </Button>
      </form>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm"
          >
            <div className="text-sm">
              <p className="font-medium text-dark">{item.title || item.url}</p>
              <p className="text-muted">
                {item.type} · {item.url}
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => remove(item._id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
