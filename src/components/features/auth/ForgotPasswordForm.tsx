"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API } from "@/constants/api";
import { AUTH_COPY } from "@/constants/auth";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(API.AUTH_FORGOT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: form.get("email") }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setSent(true);
      toast.success(AUTH_COPY.forgotSent);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return <p className="text-sm text-muted">{AUTH_COPY.forgotSent}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">{AUTH_COPY.email}</Label>
        <Input id="email" name="email" type="email" required className="mt-1.5" />
      </div>
      <Button type="submit" variant="accent" className="w-full" disabled={loading}>
        {AUTH_COPY.forgotSubmit}
      </Button>
    </form>
  );
}
