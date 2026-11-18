"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_COPY, AUTH_PROVIDERS } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";
import { GoogleSignInButton } from "@/components/features/auth/GoogleSignInButton";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const result = await signIn(AUTH_PROVIDERS.CREDENTIALS, {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      toast.error(AUTH_COPY.invalidCredentials);
      return;
    }
    toast.success(AUTH_COPY.welcomeBack);
    router.push(ROUTES.HOME);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <GoogleSignInButton />
      <p className="text-center text-xs tracking-[0.14em] text-muted uppercase">
        {AUTH_COPY.orEmail}
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">{AUTH_COPY.email}</Label>
          <Input id="email" name="email" type="email" required className="mt-1.5" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{AUTH_COPY.password}</Label>
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-xs text-accent"
            >
              {AUTH_COPY.forgotPassword}
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1.5"
          />
        </div>
        <Button type="submit" variant="accent" className="w-full" disabled={loading}>
          {loading ? AUTH_COPY.signingIn : AUTH_COPY.signIn}
        </Button>
      </form>
      <p className="text-center text-sm text-muted">
        {AUTH_COPY.noAccount}{" "}
        <Link href={ROUTES.REGISTER} className="text-accent">
          {AUTH_COPY.createOne}
        </Link>
      </p>
    </div>
  );
}
