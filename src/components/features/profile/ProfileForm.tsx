"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API } from "@/constants/api";
import { PROFILE_COPY } from "@/constants/header";

type ProfileValues = {
  name: string;
  email: string;
  phone?: string | null;
};

export function ProfileForm({ initial }: { initial: ProfileValues }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch(API.PROFILE, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || "").trim(),
          phone: String(form.get("phone") || "").trim() || null,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || PROFILE_COPY.saveFailed);
      toast.success(PROFILE_COPY.saved);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : PROFILE_COPY.saveFailed,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl space-y-5 rounded-2xl border border-border/70 bg-card p-6 shadow-sm"
    >
      <div>
        <Label htmlFor="name">{PROFILE_COPY.name}</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={initial.name}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="email">{PROFILE_COPY.email}</Label>
        <Input
          id="email"
          name="email"
          value={initial.email}
          disabled
          className="mt-1.5"
        />
        <p className="mt-1.5 text-xs text-muted">{PROFILE_COPY.emailHint}</p>
      </div>
      <div>
        <Label htmlFor="phone">{PROFILE_COPY.phone}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={initial.phone ?? ""}
          className="mt-1.5"
        />
      </div>
      <Button type="submit" variant="accent" disabled={loading}>
        {loading ? PROFILE_COPY.saving : PROFILE_COPY.save}
      </Button>
    </form>
  );
}
