"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API } from "@/constants/api";
import { AUTH_COPY, AUTH_PROVIDERS } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";
import { GoogleSignInButton } from "@/components/features/auth/GoogleSignInButton";

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));
    const confirm = String(form.get("confirmPassword"));
    if (password !== confirm) {
      toast.error(AUTH_COPY.passwordMismatch);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(API.AUTH_REGISTER, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone") || undefined,
          password,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || AUTH_COPY.registerFailed);

      const login = await signIn(AUTH_PROVIDERS.CREDENTIALS, {
        email: String(form.get("email")),
        password,
        redirect: false,
      });
      if (login?.error) {
        router.push(ROUTES.LOGIN);
        return;
      }
      toast.success(AUTH_COPY.accountCreated);
      router.push(ROUTES.HOME);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : AUTH_COPY.registerFailed);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <GoogleSignInButton />
      <p className="text-center text-xs tracking-[0.14em] text-muted uppercase">
        {AUTH_COPY.orEmail}
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">{AUTH_COPY.name}</Label>
          <Input id="name" name="name" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">{AUTH_COPY.email}</Label>
          <Input id="email" name="email" type="email" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="phone">
            {AUTH_COPY.phone} ({AUTH_COPY.phoneOptional})
          </Label>
          <Input id="phone" name="phone" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="password">{AUTH_COPY.password}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1.5"
          />
          <p className="mt-1 text-xs text-muted">{AUTH_COPY.passwordHint}</p>
        </div>
        <div>
          <Label htmlFor="confirmPassword">{AUTH_COPY.confirmPassword}</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="mt-1.5"
          />
        </div>
        <Button type="submit" variant="accent" className="w-full" disabled={loading}>
          {loading ? AUTH_COPY.registering : AUTH_COPY.register}
        </Button>
      </form>
      <p className="text-center text-sm text-muted">
        {AUTH_COPY.hasAccount}{" "}
        <Link href={ROUTES.LOGIN} className="text-accent">
          {AUTH_COPY.signInLink}
        </Link>
      </p>
    </div>
  );
}
