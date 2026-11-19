"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/constants/api";
import { ROUTES } from "@/constants/routes";

type Values = {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  roomIds: string[];
  pricePerNight: number | null;
  totalPrice: number | null;
  maxGuests: number;
  includes: string[];
  isActive: boolean;
  sortOrder: number;
};

export function PackageForm({
  initial,
  rooms,
}: {
  initial?: Values;
  rooms: Array<{ id: string; name: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const editing = Boolean(initial?._id);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const roomIds = form.getAll("roomIds").map(String);
    const payload = {
      name: String(form.get("name")),
      slug: String(form.get("slug")),
      description: String(form.get("description") || ""),
      shortDescription: String(form.get("shortDescription") || ""),
      images: String(form.get("images") || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      roomIds,
      pricePerNight: form.get("pricePerNight")
        ? Number(form.get("pricePerNight"))
        : null,
      totalPrice: form.get("totalPrice") ? Number(form.get("totalPrice")) : null,
      maxGuests: Number(form.get("maxGuests") || 15),
      includes: String(form.get("includes") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isActive: form.get("isActive") === "on",
      sortOrder: Number(form.get("sortOrder") || 0),
    };

    try {
      const res = await fetch(
        editing ? API.ADMIN.PACKAGE(initial!._id!) : API.ADMIN.PACKAGES,
        {
          method: editing ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      toast.success("Package saved");
      router.push(ROUTES.ADMIN.PACKAGES);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl space-y-4 rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required defaultValue={initial?.name} className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" required defaultValue={initial?.slug} className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="shortDescription">Short description</Label>
        <Textarea
          id="shortDescription"
          name="shortDescription"
          defaultValue={initial?.shortDescription}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initial?.description}
          className="mt-1.5"
        />
      </div>
      <fieldset>
        <legend className="text-sm font-medium">Included rooms</legend>
        <div className="mt-2 space-y-2">
          {rooms.map((room) => (
            <label key={room.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="roomIds"
                value={room.id}
                defaultChecked={initial?.roomIds?.includes(room.id)}
              />
              {room.name}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="pricePerNight">Price / night</Label>
          <Input
            id="pricePerNight"
            name="pricePerNight"
            type="number"
            defaultValue={initial?.pricePerNight ?? undefined}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="totalPrice">Fixed total</Label>
          <Input
            id="totalPrice"
            name="totalPrice"
            type="number"
            defaultValue={initial?.totalPrice ?? undefined}
            className="mt-1.5"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="images">Images (one URL per line)</Label>
        <Textarea
          id="images"
          name="images"
          defaultValue={initial?.images?.join("\n")}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="includes">Includes (comma separated)</Label>
        <Input
          id="includes"
          name="includes"
          defaultValue={initial?.includes?.join(", ")}
          className="mt-1.5"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isActive" defaultChecked={initial?.isActive ?? true} />
        Active
      </label>
      <input type="hidden" name="sortOrder" defaultValue={initial?.sortOrder ?? 0} />
      <input type="hidden" name="maxGuests" defaultValue={initial?.maxGuests ?? 15} />
      <Button type="submit" variant="accent" disabled={loading}>
        {loading ? "Saving…" : "Save package"}
      </Button>
    </form>
  );
}
