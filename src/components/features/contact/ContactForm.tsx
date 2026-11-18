"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API } from "@/constants/api";
import { EMAIL_COPY } from "@/constants/email";

export function ContactForm({
  defaultSubject = "General enquiry",
}: {
  defaultSubject?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(API.CONTACT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          subject: form.get("subject") || defaultSubject,
          message: form.get("message"),
          type: form.get("type") || "CONTACT",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || EMAIL_COPY.contactError);
      toast.success(EMAIL_COPY.contactThanks);
      e.currentTarget.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : EMAIL_COPY.contactError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">{EMAIL_COPY.contactName}</Label>
        <Input id="name" name="name" required className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="email">{EMAIL_COPY.contactEmail}</Label>
        <Input id="email" name="email" type="email" required className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="phone">{EMAIL_COPY.contactPhone}</Label>
        <Input id="phone" name="phone" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          defaultValue={defaultSubject}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label htmlFor="message">{EMAIL_COPY.contactMessage}</Label>
        <Textarea id="message" name="message" required rows={5} className="mt-1.5" />
      </div>
      <input type="hidden" name="type" value="CONTACT" />
      <Button type="submit" variant="accent" disabled={loading}>
        {loading ? EMAIL_COPY.contactSending : EMAIL_COPY.contactSubmit}
      </Button>
    </form>
  );
}
