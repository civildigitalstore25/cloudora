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

type RoomFormValues = {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  floor: "GROUND" | "FIRST";
  maxGuests: number;
  baseTariffPerNight: number;
  extraGuestFee: number;
  images: string[];
  amenities: string[];
  isActive: boolean;
  sortOrder: number;
};

export function RoomForm({ initial }: { initial?: RoomFormValues }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const editing = Boolean(initial?._id);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name")),
      slug: String(form.get("slug")),
      description: String(form.get("description") || ""),
      floor: String(form.get("floor")) as "GROUND" | "FIRST",
      maxGuests: Number(form.get("maxGuests")),
      baseTariffPerNight: Number(form.get("baseTariffPerNight")),
      extraGuestFee: Number(form.get("extraGuestFee") || 0),
      images: String(form.get("images") || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      amenities: String(form.get("amenities") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isActive: form.get("isActive") === "on",
      sortOrder: Number(form.get("sortOrder") || 0),
    };

    try {
      const res = await fetch(
        editing ? API.ADMIN.ROOM(initial!._id!) : API.ADMIN.ROOMS,
        {
          method: editing ? "PUT" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      toast.success("Room saved");
      router.push(ROUTES.ADMIN.ROOMS);
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initial?.description}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="floor">Floor</Label>
        <select
          id="floor"
          name="floor"
          defaultValue={initial?.floor ?? "GROUND"}
          className="mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="GROUND">Ground</option>
          <option value="FIRST">First</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="maxGuests">Max guests</Label>
          <Input
            id="maxGuests"
            name="maxGuests"
            type="number"
            required
            defaultValue={initial?.maxGuests ?? 3}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="baseTariffPerNight">Tariff / night</Label>
          <Input
            id="baseTariffPerNight"
            name="baseTariffPerNight"
            type="number"
            required
            defaultValue={initial?.baseTariffPerNight ?? 5000}
            className="mt-1.5"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="extraGuestFee">Extra guest fee / night</Label>
          <Input
            id="extraGuestFee"
            name="extraGuestFee"
            type="number"
            defaultValue={initial?.extraGuestFee ?? 0}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="sortOrder">Sort order</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={initial?.sortOrder ?? 0}
            className="mt-1.5"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="images">Image URLs (one per line)</Label>
        <Textarea
          id="images"
          name="images"
          defaultValue={initial?.images?.join("\n")}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="amenities">Amenities (comma separated)</Label>
        <Input
          id="amenities"
          name="amenities"
          defaultValue={initial?.amenities?.join(", ")}
          className="mt-1.5"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={initial?.isActive ?? true}
        />
        Active
      </label>
      <Button type="submit" variant="accent" disabled={loading}>
        {loading ? "Saving…" : "Save room"}
      </Button>
    </form>
  );
}
